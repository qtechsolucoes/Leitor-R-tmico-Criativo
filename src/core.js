// core.js

import { AppState } from './state.js';
import { lessons, rhythmicFigures } from './config.js';

function round(value, decimals = 5) {
    return Number(Math.round(value + 'e' + decimals) + 'e-' + decimals);
}

export function getBeatValue(figureDuration, timeSig) {
    if (!timeSig || !timeSig.beatType) return 0;
    const beatUnitValue = 4 / timeSig.beatType;
    return figureDuration / beatUnitValue;
}

export function getDurationText(beatValue) {
    if (beatValue === 1) return `1 tempo`;
    if (beatValue < 1) return `${beatValue.toFixed(2)} de tempo`;
    return `${beatValue} tempos`;
}

export function getFractionalNotation(beatValue) {
    if (beatValue >= 1 || beatValue <= 0) return "";
    const tolerance = 1.0E-6;
    let h1=1, h2=0, k1=0, k2=1;
    let b = beatValue;
    do {
        let a = Math.floor(b);
        let aux = h1; h1 = a*h1+h2; h2 = aux;
        aux = k1; k1 = a*k1+k2; k2 = aux;
        b = 1/(b-a);
    } while (Math.abs(beatValue - h1/k1) > beatValue * tolerance);

    if ([2, 3, 4, 6, 8, 12, 16, 24, 32].includes(k1)) {
       return `(${h1}/${k1} de tempo)`;
    }
    return "";
}

// --- LÓGICA DE LIGADURA (SOM) CORRIGIDA ---
function processPattern(pattern) {
    const newPattern = JSON.parse(JSON.stringify(pattern));

    newPattern.forEach(fig => {
        delete fig.isTiedContinuation;
        delete fig.totalTiedDuration;
    });

    for (let i = 0; i < newPattern.length; i++) {
        // Se a figura atual já é uma continuação de ligadura, pule-a
        if (newPattern[i].isTiedContinuation || newPattern[i].isControl) {
            continue;
        }

        // Se a figura atual está ligada à próxima
        if (newPattern[i].tiedToNext) {
            let totalDuration = newPattern[i].duration;
            let currentIndex = i;
            let continueChain = true;

            while (continueChain) {
                // Encontra a próxima nota real para a qual ligar
                let nextNoteIndex = -1;
                let searchIndex = currentIndex + 1;
                while (searchIndex < newPattern.length && nextNoteIndex === -1) {
                    if (newPattern[searchIndex].type === 'note') {
                        nextNoteIndex = searchIndex;
                    }
                    searchIndex++;
                }

                if (nextNoteIndex !== -1) {
                    const nextNote = newPattern[nextNoteIndex];
                    totalDuration += nextNote.duration;
                    nextNote.isTiedContinuation = true;

                    // Se a próxima nota também estiver ligada, continue a cadeia
                    if (nextNote.tiedToNext) {
                        currentIndex = nextNoteIndex;
                    } else {
                        continueChain = false; // Fim da cadeia de ligaduras
                    }
                } else {
                    continueChain = false; // Não há mais notas para ligar
                }
            }
            newPattern[i].totalTiedDuration = totalDuration;
        }
    }

    // Lógica de atribuição de sílabas (permanece a mesma)
    let lastSyllableWasTa = false;
    for (let i = 0; i < newPattern.length; i++) {
        const fig = newPattern[i];
        const duration = fig.totalTiedDuration || fig.duration;

        if (fig.isControl || fig.isTiedContinuation || fig.type === 'rest') {
            fig.syllable = '&nbsp;';
            lastSyllableWasTa = false;
            continue;
        }

        if (duration >= 1) {
            if (duration === 4) fig.syllable = 'Ta-a-a-a';
            else if (duration === 3) fig.syllable = 'Ta-a-a';
            else if (duration === 2) fig.syllable = 'Ta-a';
            else if (duration === 1.5) fig.syllable = 'Tai-a';
            else if (duration === 1) fig.syllable = 'Ta';
            else fig.syllable = 'Ta';
            lastSyllableWasTa = false;
        }
        else if (duration === 0.5) {
            if (lastSyllableWasTa) {
                fig.syllable = 'Ca';
                lastSyllableWasTa = false;
            } else {
                fig.syllable = 'Ta';
                lastSyllableWasTa = true;
            }
        }
        else if (duration === 0.25) {
            const semiSyllables = ['Ti', 'Ri', 'Ti', 'Ri'];
            let positionInGroup = 0;
            let k = i - 1;
            while (k >= 0 && newPattern[k].duration === 0.25 && newPattern[k].type === 'note' && !newPattern[k].isControl && !newPattern[k].isTiedContinuation) {
                positionInGroup++;
                k--;
            }
            fig.syllable = semiSyllables[positionInGroup % 4];
            lastSyllableWasTa = false;
        }
        else if (duration === 0.75) {
            fig.syllable = 'Tai-ti';
            lastSyllableWasTa = false;
        }
        else {
            fig.syllable = '&nbsp;';
            lastSyllableWasTa = false;
        }

        if (duration === 0.5) {
            let nextFig = newPattern[i + 1];
            if (!nextFig || nextFig.duration !== 0.5 || nextFig.type !== 'note') {
                lastSyllableWasTa = false;
            }
        }
    }
    
    return newPattern;
}

export function updateActivePatternAndTimeSignature() {
    let rawPattern;
    if (AppState.currentMode === 'lessons') {
        const lesson = lessons[AppState.currentLessonIndex];
        rawPattern = lesson.pattern;
        AppState.activeTimeSignature = lesson.timeSignature;
        if (lesson.tempo) document.getElementById('tempo-display').textContent = lesson.tempo;
    } else {
        const beatsValue = document.querySelector('#custom-beats-select .custom-option.selected').dataset.value;
        const typeValue = document.querySelector('#custom-type-select .custom-option.selected').dataset.value;

        rawPattern = AppState.customPattern;
        AppState.activeTimeSignature = {
            beats: parseInt(beatsValue),
            beatType: parseInt(typeValue)
        };
    }
    
    if (typeof Tone !== 'undefined' && Tone.Transport) {
        const { beats, beatType } = AppState.activeTimeSignature;
        Tone.Transport.timeSignature = [beats, beatType];
    }

    AppState.activePattern = processPattern(rawPattern);
}

function isPatternValid(pattern) {
    if (!pattern || pattern.length === 0) return true;
    
    const timeSig = AppState.activeTimeSignature;
    const totalMeasureBeats = parseFloat(timeSig.beats);
    const tolerance = 0.001;
    let currentBeatsInMeasure = 0;

    for (const item of pattern) {
        if (item.isControl || item.isTiedContinuation) continue;
        
        const itemBeatValue = getBeatValue(item.duration, timeSig);
        
        if (round(currentBeatsInMeasure + itemBeatValue) > totalMeasureBeats + tolerance) {
            return false;
        }

        currentBeatsInMeasure = round(currentBeatsInMeasure + itemBeatValue);

        if (Math.abs(currentBeatsInMeasure - totalMeasureBeats) < tolerance) {
            currentBeatsInMeasure = 0;
        }
    }
    
    return true;
}

export function handlePaletteFigureClick(figure) {
    if (AppState.currentMode !== 'freeCreate') {
        return { success: false, message: "Mude para o Modo de Criação Livre para editar." };
    }

    if (figure.name === 'Ligadura') {
        if (AppState.selectedIndexForEditing !== null && AppState.customPattern[AppState.selectedIndexForEditing]) {
            const selectedItem = AppState.customPattern[AppState.selectedIndexForEditing];
            
            if (selectedItem.type !== 'note' || selectedItem.isControl) {
                 return { success: false, message: "Selecione uma nota para ligar (não uma pausa)." };
            }

            let nextNoteIndex = AppState.selectedIndexForEditing + 1;
            while(nextNoteIndex < AppState.customPattern.length && (AppState.customPattern[nextNoteIndex].isControl || AppState.customPattern[nextNoteIndex].type === 'rest')) {
                nextNoteIndex++;
            }
            
            if (nextNoteIndex >= AppState.customPattern.length) {
                if (selectedItem.tiedToNext) {
                    delete selectedItem.tiedToNext;
                     return { success: true, message: "Ligadura removida." };
                }
                return { success: false, message: "Não há uma próxima nota para ligar." };
            }
            
            selectedItem.tiedToNext = !selectedItem.tiedToNext;
            
            if (!selectedItem.tiedToNext) {
                delete selectedItem.tiedToNext;
            }
            
            return { success: true, message: selectedItem.tiedToNext ? "Ligadura adicionada." : "Ligadura removida." };
        }
        return { success: false, message: "Selecione uma nota para adicionar ou remover uma ligadura." };
    }
    
    const tempPattern = JSON.parse(JSON.stringify(AppState.customPattern));
    
    const newFigure = { ...figure };
    delete newFigure.syllable; 
    delete newFigure.totalTiedDuration;
    delete newFigure.isTiedContinuation;

    if (AppState.selectedIndexForEditing !== null) {
        tempPattern.splice(AppState.selectedIndexForEditing, 1, newFigure);
    } else {
        tempPattern.push(newFigure);
    }

    if (isPatternValid(tempPattern)) {
        AppState.customPattern = tempPattern;
        AppState.selectedIndexForEditing = null;
        return { success: true, message: `${figure.name} adicionada.` };
    } else {
        return { success: false, message: "A figura não cabe no compasso!" };
    }
}

export function handleFigureSelectionForEditing(index) {
    AppState.selectedIndexForEditing = (AppState.selectedIndexForEditing === index) ? null : index;
}