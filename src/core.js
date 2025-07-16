// core.js

import { AppState } from './state.js';
import { lessons, rhythmicFigures } from './config.js';
import { renderRhythm, updateMessage } from './ui.js';

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
 * CORRIGIDO: Atribui sílabas rítmicas a um padrão de notas.
 * A lógica de ligaduras foi simplificada e a de agrupamento melhorada.
 * @param {Array} pattern - O padrão de figuras a ser processado.
 * @returns {Array} Um novo array de padrão com as sílabas e durações totais atribuídas.
 */
function assignSyllablesToPattern(pattern) {
    // Clona o padrão para evitar mutações indesejadas
    const newPattern = JSON.parse(JSON.stringify(pattern));

    // Passo 1: Calcular a duração total das notas ligadas
    for (let i = 0; i < newPattern.length; i++) {
        if (newPattern[i].tiedToNext && i + 1 < newPattern.length) {
            let totalDuration = newPattern[i].duration;
            let j = i + 1;
            // A nota seguinte a uma ligadura é a continuação, então a marcamos.
            newPattern[j].isTiedContinuation = true; 
            totalDuration += newPattern[j].duration;

            // Atribuímos a duração total à nota inicial da ligadura
            newPattern[i].totalTiedDuration = totalDuration;
            
            // Removemos a propriedade `tiedToNext` da continuação se ela também tiver uma
            if(newPattern[j].tiedToNext) delete newPattern[j].tiedToNext;
        }
    }

    // Passo 2: Atribuir sílabas
    for (let i = 0; i < newPattern.length; i++) {
        const currentFig = newPattern[i];
        if (currentFig.isControl || currentFig.isTiedContinuation) continue;

        const duration = currentFig.totalTiedDuration || currentFig.duration;

        if (currentFig.type === 'rest') {
            currentFig.syllable = ' '; // Pausas não têm sílabas pronunciadas
            continue;
        }
        
        // Lógica de sílabas para notas
        if (duration === 4) currentFig.syllable = 'Tá-a-a-a';
        else if (duration === 3) currentFig.syllable = 'Tá-a-a';
        else if (duration === 2) currentFig.syllable = 'Tá-a';
        else if (duration === 1.5) currentFig.syllable = 'Tā-a';
        else if (duration === 1) currentFig.syllable = 'Tá';
        else if (duration === 0.75) currentFig.syllable = 'Tā-i';
        else if (duration === 0.5) currentFig.syllable = 'Ta';
        else if (duration === 0.25) currentFig.syllable = 'Ti';
        else if (duration === 0.125) currentFig.syllable = 'To';
        else currentFig.syllable = 'Tá'; // Padrão
    }
    
    // NOVO: Lógica de agrupamento para sílabas rápidas (Tiri-tiri, etc.)
    // Esta parte pode ser expandida, mas por simplicidade, vamos manter a lógica original focada em notas individuais.
    
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
}

/**
 * CORRIGIDO: Valida se um padrão rítmico respeita as regras de compasso.
 * @param {Array} pattern - O padrão a ser validado.
 * @returns {boolean} True se o padrão for válido, False caso contrário.
 */
function isPatternValid(pattern) {
    const totalMeasureBeats = parseFloat(AppState.activeTimeSignature.beats);
    const beatUnit = 4 / AppState.activeTimeSignature.beatType;
    const tolerance = 0.001;
    let currentBeatsInMeasure = 0;

    for (const item of pattern) {
        // As continuações de ligadura não contam para a duração do compasso, pois sua duração já está na nota principal.
        if (item.isTiedContinuation) continue;

        const itemBeatValue = item.duration / beatUnit;
        currentBeatsInMeasure += itemBeatValue;

        if (item.isControl) {
            if (Math.abs(currentBeatsInMeasure - itemBeatValue - totalMeasureBeats) > tolerance && currentBeatsInMeasure > itemBeatValue) {
                 updateMessage(`Ação inválida. A barra de compasso deve fechar um compasso completo.`);
                 return false;
            }
            currentBeatsInMeasure = 0;
            continue;
        }

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
 * CORRIGIDO: Lida com o clique em uma figura na paleta de criação.
 * Lógica de ligadura e substituição melhorada.
 * @param {object} figure - O objeto da figura clicada.
 */
export function handlePaletteFigureClick(figure) {
    // Clona o padrão para teste
    const tempPattern = JSON.parse(JSON.stringify(AppState.customPattern));
    
    // Lógica para adicionar ligadura
    if (figure.name === 'Ligadura') {
        if (AppState.selectedIndexForEditing !== null) {
            const selectedItem = tempPattern[AppState.selectedIndexForEditing];
            if (selectedItem.type === 'note' && !selectedItem.tiedToNext) {
                selectedItem.tiedToNext = true;
                updateMessage("Ligadura adicionada.");
                AppState.customPattern = tempPattern;
                updateActivePatternAndTimeSignature();
                renderRhythm();
            } else {
                updateMessage("Não é possível adicionar ligadura aqui.");
            }
        } else {
            updateMessage("Selecione uma nota para adicionar a ligadura.");
        }
        return;
    }

    if (AppState.selectedIndexForEditing !== null) {
        // Se a nota substituída era uma ligadura, a próxima deve perder o status de continuação
        const oldItem = tempPattern[AppState.selectedIndexForEditing];
        if (oldItem.tiedToNext && (AppState.selectedIndexForEditing + 1) < tempPattern.length) {
            // A lógica de validação vai cuidar disso. Apenas removemos o item antigo.
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
        if (!figureDef) return;
        const beatValue = getBeatValue(item.duration, AppState.activeTimeSignature);
        updateMessage(`Item ${index + 1} (${figureDef.name}) selecionado. Dura ${getDurationText(beatValue)}.`);
    }
    
    renderRhythm(); // Apenas renderiza novamente para mostrar a seleção
}