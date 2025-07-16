// core.js

import { AppState } from './state.js';
import { lessons, rhythmicFigures } from './config.js';

/**
 * Calcula o valor de uma figura em tempos, com base na fórmula de compasso ativa.
 */
export function getBeatValue(figureDuration, timeSig) {
    if (!timeSig || !timeSig.beatType) return 0;
    const beatUnitValue = 4 / timeSig.beatType;
    return figureDuration / beatUnitValue;
}

/**
 * Retorna uma string descritiva para a duração de uma figura.
 */
export function getDurationText(beatValue) {
    if (beatValue === 1) return `1 tempo`;
    if (beatValue < 1) return `${beatValue.toFixed(2).replace('0.', '.')} de tempo`;
    return `${beatValue} tempos`;
}

/**
 * Processa um padrão para adicionar sílabas e calcular durações de ligaduras.
 */
function processPattern(pattern) {
    const newPattern = JSON.parse(JSON.stringify(pattern));

    // Resetar e calcular durações de ligaduras
    newPattern.forEach(fig => {
        delete fig.isTiedContinuation;
        delete fig.totalTiedDuration;
    });

    for (let i = 0; i < newPattern.length; i++) {
        if (newPattern[i].tiedToNext && i + 1 < newPattern.length) {
            let nextNote = newPattern[i + 1];
            if (nextNote && nextNote.type === 'note') {
                nextNote.isTiedContinuation = true;
                newPattern[i].totalTiedDuration = (newPattern[i].duration || 0) + (nextNote.duration || 0);
            }
        }
    }

    // Atribuir sílabas
    for (const fig of newPattern) {
        if (fig.isControl || fig.isTiedContinuation) continue;
        const duration = fig.totalTiedDuration || fig.duration;
        if (fig.type === 'rest') {
            fig.syllable = '&nbsp;';
            continue;
        }
        if (duration === 4) fig.syllable = 'Ta-a-a-a';
        else if (duration === 3) fig.syllable = 'Ta-a-a';
        else if (duration === 2) fig.syllable = 'Ta-a';
        else if (duration === 1.5) fig.syllable = 'Tai-a';
        else if (duration === 1) fig.syllable = 'Ta';
        else if (duration === 0.75) fig.syllable = 'Tai-ti';
        else if (duration === 0.5) fig.syllable = 'Ti-ti';
        else if (duration === 0.25) fig.syllable = 'Tiri';
        else fig.syllable = 'Ta';
    }
    
    return newPattern;
}

/**
 * Atualiza o padrão rítmico ativo e a fórmula de compasso.
 */
export function updateActivePatternAndTimeSignature() {
    let rawPattern;
    if (AppState.currentMode === 'lessons') {
        const lesson = lessons[AppState.currentLessonIndex];
        rawPattern = lesson.pattern;
        AppState.activeTimeSignature = lesson.timeSignature;
        if (lesson.tempo) document.getElementById('tempo-display').textContent = lesson.tempo;
    } else {
        rawPattern = AppState.customPattern;
        AppState.activeTimeSignature = {
            beats: parseInt(document.getElementById('time-signature-beats').value),
            beatType: parseInt(document.getElementById('time-signature-type').value)
        };
    }
    AppState.activePattern = processPattern(rawPattern);
}

/**
 * Valida se um padrão rítmico respeita as regras de compasso.
 */
function isPatternValid(pattern) {
    if (!pattern || pattern.length === 0) return true;
    
    const timeSig = AppState.activeTimeSignature;
    const totalMeasureBeats = parseFloat(timeSig.beats);
    const tolerance = 0.001;
    let currentBeatsInMeasure = 0;

    for (const item of pattern) {
        if (item.isControl) continue;
        
        const itemBeatValue = getBeatValue(item.duration, timeSig);
        currentBeatsInMeasure += itemBeatValue;

        if (currentBeatsInMeasure > totalMeasureBeats + tolerance) {
            return false; // Excedeu o compasso
        }

        if (Math.abs(currentBeatsInMeasure - totalMeasureBeats) < tolerance) {
            currentBeatsInMeasure = 0; // Zera para o próximo compasso
        }
    }
    return true;
}

/**
 * Lida com o clique numa figura da paleta.
 */
export function handlePaletteFigureClick(figure) {
    if (figure.name === 'Ligadura') {
        // A lógica de ligadura é tratada separadamente, sem validação de compasso
        if (AppState.selectedIndexForEditing !== null && AppState.customPattern[AppState.selectedIndexForEditing]) {
            const selectedItem = AppState.customPattern[AppState.selectedIndexForEditing];
            if (selectedItem.type === 'note') {
                selectedItem.tiedToNext = !selectedItem.tiedToNext;
                return { success: true, message: selectedItem.tiedToNext ? "Ligadura adicionada." : "Ligadura removida." };
            }
        }
        return { success: false, message: "Selecione uma nota para ligar." };
    }
    
    const tempPattern = JSON.parse(JSON.stringify(AppState.customPattern));
    
    if (AppState.selectedIndexForEditing !== null) {
        tempPattern.splice(AppState.selectedIndexForEditing, 1, figure);
    } else {
        tempPattern.push(figure);
    }

    if (isPatternValid(tempPattern)) {
        AppState.customPattern = tempPattern;
        AppState.selectedIndexForEditing = null;
        return { success: true, message: `${figure.name} adicionada.` };
    } else {
        return { success: false, message: "A figura não cabe no compasso!" };
    }
}

/**
 * Lida com a seleção de uma figura para edição.
 */
export function handleFigureSelectionForEditing(index) {
    AppState.selectedIndexForEditing = (AppState.selectedIndexForEditing === index) ? null : index;
}