// core.js

import { AppState } from './state.js';
import { lessons, rhythmicFigures } from './config.js';
import { renderRhythm, populateFigureLegend, updateMessage } from './ui.js';

/**
 * Calcula o valor de uma figura em tempos, com base na fórmula de compasso ativa.
 * @param {number} figureDuration - A duração base da figura (ex: 1 para semínima).
 * @param {object} timeSig - O objeto da fórmula de compasso (ex: { beats: 4, beatType: 4 }).
 * @returns {number} O valor da figura em tempos.
 */
export function getBeatValue(figureDuration, timeSig) {
    const beatUnitValue = 4 / timeSig.beatType;
    return figureDuration / beatUnitValue;
}

/**
 * Retorna uma string descritiva para a duração de uma figura.
 * @param {number} beatValue - O valor da figura em tempos.
 * @returns {string} Texto formatado (ex: "1 tempo", "2 tempos").
 */
export function getDurationText(beatValue) {
    if (beatValue < 1) return `${beatValue} tempo`;
    return `${beatValue} ${beatValue > 1 ? 'tempos' : 'tempo'}`;
}

/**
 * Atribui sílabas rítmicas a um padrão de notas, tratando durações e pausas.
 * @param {Array} pattern - O padrão de figuras a ser processado.
 * @returns {Array} Um novo array de padrão com as sílabas atribuídas.
 */
function assignSyllablesToPattern(pattern) {
    const newPattern = JSON.parse(JSON.stringify(pattern));
    let i = 0;
    while (i < newPattern.length) {
        const currentFig = newPattern[i];
        if (currentFig.isControl || currentFig.isTiedContinuation) {
            i++;
            continue;
        }

        if (currentFig.tiedToNext) {
            currentFig.syllable = 'Tá -';
            i++;
            continue;
        }

        if (currentFig.type === 'rest') {
            currentFig.syllable = 'Silêncio';
            i++;
            continue;
        }
        
        // Lógica de sílabas para notas longas
        if (currentFig.duration >= 1) {
            if (currentFig.duration === 4) currentFig.syllable = 'Tá-a-a-a';
            else if (currentFig.duration === 3) currentFig.syllable = 'Tá-a-a';
            else if (currentFig.duration === 2) currentFig.syllable = 'Tá-a';
            else if (currentFig.duration === 1.5) currentFig.syllable = 'Tā-a';
            else if (currentFig.duration === 1) currentFig.syllable = 'Tá';
        }
        
        // Agrupamento para sílabas rápidas
        let group = [];
        let j = i;
        while(j < newPattern.length && newPattern[j].type === 'note' && !newPattern[j].isControl && !newPattern[j].tiedToNext && !newPattern[j].isTiedContinuation && [0.5, 0.25, 0.125, 0.0625].includes(newPattern[j].duration)) {
             group.push(newPattern[j]);
             j++;
        }
        
        if (group.length > 1 && group.every(item => item.duration === group[0].duration)) {
            const duration = group[0].duration;
            let syllables = [];
            if (duration === 0.5) syllables = ['Ta', 'Ka'];
            else if (duration === 0.25) syllables = ['Ti', 'ri', 'ti', 'ri'];
            else if (duration === 0.125) syllables = ['To', 'ca', 'to', 'ca'];
            
            for(let k = 0; k < group.length; k++) {
                group[k].syllable = syllables[k % syllables.length];
            }
            i = j;
        } else {
             if (currentFig.type === 'note' && !currentFig.syllable) {
                if (currentFig.duration === 0.75) currentFig.syllable = 'Tā-i';
                else if (currentFig.duration === 0.5) currentFig.syllable = 'Ta';
                else if (currentFig.duration === 0.25) currentFig.syllable = 'Ti';
                else currentFig.syllable = 'Tá';
             }
             i++;
        }
    }
    return newPattern;
}

/**
 * Função central que atualiza o padrão rítmico ativo e a fórmula de compasso.
 */
export function updateActivePatternAndTimeSignature() {
    if (AppState.currentMode === 'lessons') {
        const lesson = lessons[AppState.currentLessonIndex];
        AppState.activePattern = assignSyllablesToPattern(lesson.pattern);
        AppState.activeTimeSignature = lesson.timeSignature;
        if (lesson.tempo) {
            document.getElementById('tempo-display').textContent = lesson.tempo;
        }
    } else { // Modo 'freeCreate'
        AppState.activePattern = assignSyllablesToPattern(AppState.customPattern);
        AppState.activeTimeSignature = {
            beats: parseInt(document.getElementById('time-signature-beats').value),
            beatType: parseInt(document.getElementById('time-signature-type').value)
        };
    }
    
    document.getElementById('time-signature-display').textContent = `${AppState.activeTimeSignature.beats}/${AppState.activeTimeSignature.beatType}`;
    
    // As chamadas de renderização e legenda são feitas pelo event handler/switchMode
}

/**
 * Valida se um padrão rítmico respeita as regras de compasso.
 * @param {Array} pattern - O padrão a ser validado.
 * @returns {boolean} True se o padrão for válido, False caso contrário.
 */
function isPatternValid(pattern) {
    const totalMeasureBeats = parseFloat(AppState.activeTimeSignature.beats);
    const tolerance = 0.001;
    let currentBeatsInMeasure = 0;

    for (const item of pattern) {
        if (item.isControl) {
            if (currentBeatsInMeasure > tolerance && Math.abs(currentBeatsInMeasure - totalMeasureBeats) > tolerance) {
                updateMessage(`Ação inválida. Barras de controle devem fechar um compasso.`);
                return false;
            }
            currentBeatsInMeasure = 0;
            continue;
        }

        if (item.isTiedContinuation) continue;

        currentBeatsInMeasure += getBeatValue(item.duration, AppState.activeTimeSignature);

        if (currentBeatsInMeasure > totalMeasureBeats + tolerance) {
            updateMessage(`Ação inválida. O compasso excederia ${totalMeasureBeats} tempos.`);
            return false;
        }

        if (Math.abs(currentBeatsInMeasure - totalMeasureBeats) < tolerance) {
            currentBeatsInMeasure = 0;
        }
    }
    return true;
}


/**
 * Lida com o clique em uma figura na paleta de criação.
 * @param {object} figure - O objeto da figura clicada.
 */
export function handlePaletteFigureClick(figure) {
    const tempPattern = JSON.parse(JSON.stringify(AppState.customPattern));

    if (AppState.selectedIndexForEditing !== null) {
        // Se a nota substituída era uma ligadura, a próxima deve perder o status de continuação
        const oldItem = tempPattern[AppState.selectedIndexForEditing];
        if (oldItem.tiedToNext && (AppState.selectedIndexForEditing + 1) < tempPattern.length) {
            tempPattern[AppState.selectedIndexForEditing + 1].isTiedContinuation = false;
        }
        tempPattern.splice(AppState.selectedIndexForEditing, 1, figure);
    } else {
        tempPattern.push(figure);
    }

    if (isPatternValid(tempPattern)) {
        AppState.customPattern = tempPattern; // Aplica a mudança
        if (AppState.selectedIndexForEditing !== null) {
            updateMessage(`${figure.name} inserido.`);
            AppState.selectedIndexForEditing = null;
        } else {
            updateMessage(`${figure.name} adicionado.`);
        }
        updateActivePatternAndTimeSignature();
        renderRhythm();
    }
}

/**
 * Lida com a seleção de uma figura na área de display para edição.
 * @param {number} index - O índice da figura clicada.
 */
export function handleFigureSelectionForEditing(index) {
    if (AppState.selectedIndexForEditing === index) {
        AppState.selectedIndexForEditing = null;
        updateMessage("Seleção removida.");
    } else {
        AppState.selectedIndexForEditing = index;
        const item = AppState.activePattern[index];
        const figureDef = rhythmicFigures.find(rf => rf.symbol === item.symbol && rf.duration === item.duration);
        const beatValue = getBeatValue(item.duration, AppState.activeTimeSignature);
        updateMessage(`Item ${index + 1} (${figureDef.name}) selecionado. Dura ${getDurationText(beatValue)}.`);
    }
    
    renderRhythm(); // Apenas renderiza novamente para mostrar a seleção
}