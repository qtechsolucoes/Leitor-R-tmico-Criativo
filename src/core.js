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

function processPattern(pattern) {
    const newPattern = JSON.parse(JSON.stringify(pattern));

    newPattern.forEach(fig => {
        delete fig.isTiedContinuation;
        delete fig.totalTiedDuration;
    });

    for (let i = 0; i < newPattern.length; i++) {
        if (newPattern[i].isTiedContinuation || newPattern[i].isControl) continue;
        if (newPattern[i].tiedToNext) {
            let totalDuration = newPattern[i].duration;
            let currentIndex = i;
            let continueChain = true;
            while (continueChain) {
                let nextNoteIndex = -1;
                let searchIndex = currentIndex + 1;
                while (searchIndex < newPattern.length && nextNoteIndex === -1) {
                    if (newPattern[searchIndex].type === 'note') nextNoteIndex = searchIndex;
                    searchIndex++;
                }
                if (nextNoteIndex !== -1) {
                    const nextNote = newPattern[nextNoteIndex];
                    totalDuration += nextNote.duration;
                    nextNote.isTiedContinuation = true;
                    if (nextNote.tiedToNext) currentIndex = nextNoteIndex;
                    else continueChain = false;
                } else {
                    continueChain = false;
                }
            }
            newPattern[i].totalTiedDuration = totalDuration;
        }
    }

    let lastSyllableWasTa = false;
    let tupletCounter = 0;

    for (let i = 0; i < newPattern.length; i++) {
        const fig = newPattern[i];
        const duration = fig.totalTiedDuration || fig.duration;

        if (!fig.isTupletChild) {
            tupletCounter = 0;
        }

        if (fig.isControl || fig.isTiedContinuation || fig.type === 'rest') {
            fig.syllable = '&nbsp;';
            lastSyllableWasTa = false;
            continue;
        }
        
        if (fig.isTupletChild) {
            const tupletSyllables = ['Ta', 'Ki', 'Da', 'Te', 'Re', 'Ti'];
            fig.syllable = tupletSyllables[tupletCounter % tupletSyllables.length];
            tupletCounter++;
            lastSyllableWasTa = false;
        }
        else if (duration >= 1) {
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
    } else if (AppState.currentMode === 'gameRhythmicDictation') {
        rawPattern = AppState.customPattern;
        AppState.activeTimeSignature = { beats: 4, beatType: 4 }; 
    } else {
        const beatsSelect = document.querySelector('#custom-beats-select .custom-option.selected');
        const typeSelect = document.querySelector('#custom-type-select .custom-option.selected');
        
        const beatsValue = beatsSelect ? beatsSelect.dataset.value : '4';
        const typeValue = typeSelect ? typeSelect.dataset.value : '4';

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

        currentBeatsInMeasure += itemBeatValue;

        if (Math.abs(currentBeatsInMeasure - totalMeasureBeats) < tolerance) {
            currentBeatsInMeasure = 0;
        }
    }
    
    return true;
}

export function handlePaletteFigureClick(figure) {
    if (AppState.currentMode !== 'freeCreate' && AppState.currentMode !== 'gameRhythmicDictation') {
        return { success: false, message: "Mude para o Modo de Criação ou Jogo para editar." };
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

// --- LÓGICA DO JOGO: DITADO RÍTMICO ATUALIZADA ---

let currentDictationPattern = [];

export function generateDictation() {
    const figuresUsed = [
        { type: 'note', duration: 1, symbol: '♩' },
        { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮' }
    ];
    
    let pattern = [];
    let currentBeats = 0;
    const totalBeats = 4;

    while (currentBeats < totalBeats) {
        let randomFigure;
        if (currentBeats <= totalBeats - 1) {
             randomFigure = figuresUsed[Math.floor(Math.random() * figuresUsed.length)];
        } else {
             randomFigure = figuresUsed[1];
        }
       
        const figureBeats = getBeatValue(randomFigure.duration, { beats: 4, beatType: 4 });

        if (currentBeats + figureBeats <= totalBeats) {
            pattern.push(randomFigure);
            currentBeats += figureBeats;
        }
    }
    
    currentDictationPattern = pattern;
    return { pattern, figuresUsed };
}

/**
 * Compara o padrão do utilizador com o ditado correto e calcula a pontuação.
 * Retorna um objeto com a pontuação, mensagem e o padrão do utilizador anotado.
 */
export function checkDictation(userPattern) {
    let correctNotes = 0;
    const annotatedPattern = JSON.parse(JSON.stringify(userPattern)); // Cria uma cópia para anotar

    const maxLength = Math.max(userPattern.length, currentDictationPattern.length);

    for (let i = 0; i < maxLength; i++) {
        const userFig = annotatedPattern[i];
        const correctFig = currentDictationPattern[i];

        if (userFig && correctFig && userFig.duration === correctFig.duration) {
            userFig.isCorrect = true;
            correctNotes++;
        } else if (userFig) {
            userFig.isCorrect = false;
        }
    }
    
    const score = correctNotes * 10;
    const isPerfect = correctNotes === currentDictationPattern.length && userPattern.length === currentDictationPattern.length;

    let message = "";
    if (isPerfect) {
        message = `Perfeito! +${score + 50} Pontos!`;
    } else {
        message = `Você acertou ${correctNotes} de ${currentDictationPattern.length}. +${score} Pontos.`;
    }

    return { 
        score: isPerfect ? score + 50 : score, 
        message: message,
        annotatedPattern: annotatedPattern // Retorna o padrão do utilizador com anotações
    };
}


export function getCurrentDictationPattern() {
    return currentDictationPattern;
}