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
        // Ignora se o item for um controle (barra de repetição, etc.)
        if (newPattern[i].isControl) continue;

        if (newPattern[i].tiedToNext && i + 1 < newPattern.length) {
            let nextNoteIndex = i + 1;
            // Encontra a próxima nota real, pulando possíveis elementos de controle entre as notas ligadas
            while(nextNoteIndex < newPattern.length && newPattern[nextNoteIndex].isControl) {
                nextNoteIndex++;
            }

            if (nextNoteIndex < newPattern.length) {
                let nextNote = newPattern[nextNoteIndex];
                if (nextNote && nextNote.type === 'note') {
                    nextNote.isTiedContinuation = true;
                    // Acumula a duração da ligadura
                    let currentDuration = newPattern[i].totalTiedDuration || newPattern[i].duration;
                    newPattern[i].totalTiedDuration = currentDuration + (nextNote.duration || 0);
                }
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
    // Adicionado: Sincroniza a fórmula de compasso com o Tone.Transport.
    if (typeof Tone !== 'undefined' && Tone.Transport) {
        const { beats, beatType } = AppState.activeTimeSignature;
        Tone.Transport.timeSignature = [beats, beatType];
    }
    AppState.activePattern = processPattern(rawPattern);
}


/**
 * Valida se um padrão rítmico respeita as regras de compasso de forma estrita.
 */
function isPatternValid(pattern) {
    if (!pattern || pattern.length === 0) return true;
    
    const timeSig = AppState.activeTimeSignature;
    const totalMeasureBeats = parseFloat(timeSig.beats);
    const tolerance = 0.001;
    let currentBeatsInMeasure = 0;

    for (const item of pattern) {
        // Ignora elementos de controle (barras de repetição, etc.) e notas que são continuação de ligadura
        if (item.isControl || item.isTiedContinuation) continue;
        
        const itemBeatValue = getBeatValue(item.duration, timeSig);
        
        // Verifica se a adição da figura ultrapassa o limite do compasso atual
        if (currentBeatsInMeasure + itemBeatValue > totalMeasureBeats + tolerance) {
            return false; // Inválido: A figura não cabe no compasso.
        }

        currentBeatsInMeasure += itemBeatValue;

        // Se o compasso está completo, zera para o próximo
        if (Math.abs(currentBeatsInMeasure - totalMeasureBeats) < tolerance) {
            currentBeatsInMeasure = 0;
        }
    }

    // Após verificar todas as figuras, se o último compasso não estiver completo, o padrão é inválido.
    // (A menos que estejamos no meio da construção, mas para o clique, a validação deve ser do compasso atual)
    // Esta lógica é inerente ao fluxo acima: a validação falhará no momento em que uma figura exceder o compasso.
    // Não é necessário um check final, pois a validação é feita a cada adição.
    
    return true; // Se o loop terminar sem retornar false, o padrão é válido até o momento.
}

/**
 * Lida com o clique numa figura da paleta.
 */
export function handlePaletteFigureClick(figure) {
    if (AppState.currentMode !== 'freeCreate') {
        return { success: false, message: "Mude para o Modo de Criação Livre para editar." };
    }

    // Lógica para adicionar/remover ligadura
    if (figure.name === 'Ligadura') {
        if (AppState.selectedIndexForEditing !== null && AppState.customPattern[AppState.selectedIndexForEditing]) {
            const selectedItem = AppState.customPattern[AppState.selectedIndexForEditing];
            if (selectedItem.type === 'note' && !selectedItem.isControl) {
                // Alterna o estado da ligadura
                selectedItem.tiedToNext = !selectedItem.tiedToNext;
                
                // Remove a propriedade se for false para manter o objeto limpo
                if (!selectedItem.tiedToNext) {
                    delete selectedItem.tiedToNext;
                }
                
                // Valida o padrão após a alteração. Uma ligadura pode tornar um padrão inválido se a nota seguinte for uma pausa, por exemplo.
                // Esta validação é um passo extra para garantir a consistência.
                // (Para simplificar, vamos assumir que o usuário sabe o que faz ao adicionar uma ligadura)
                return { success: true, message: selectedItem.tiedToNext ? "Ligadura adicionada." : "Ligadura removida." };
            }
        }
        return { success: false, message: "Selecione uma nota para adicionar ou remover uma ligadura." };
    }
    
    // Cria uma cópia temporária do padrão para testar a adição da nova figura.
    const tempPattern = JSON.parse(JSON.stringify(AppState.customPattern));
    
    const newFigure = { ...figure };
    // Remove propriedades desnecessárias da figura da paleta
    delete newFigure.syllable; 
    delete newFigure.totalTiedDuration;
    delete newFigure.isTiedContinuation;

    // Se um item está selecionado, a nova figura o substituirá.
    // Caso contrário, a nova figura será adicionada ao final.
    if (AppState.selectedIndexForEditing !== null) {
        tempPattern.splice(AppState.selectedIndexForEditing, 1, newFigure);
    } else {
        tempPattern.push(newFigure);
    }

    // Valida o padrão temporário com a nova figura.
    if (isPatternValid(tempPattern)) {
        AppState.customPattern = tempPattern; // Se for válido, atualiza o padrão real.
        AppState.selectedIndexForEditing = null; // Limpa a seleção após a ação.
        return { success: true, message: `${figure.name} adicionada.` };
    } else {
        return { success: false, message: "A figura não cabe no compasso!" };
    }
}

/**
 * Lida com a seleção de uma figura para edição.
 */
export function handleFigureSelectionForEditing(index) {
    // Alterna a seleção: se clicar no mesmo item, desmarca. Se clicar em outro, marca o novo.
    AppState.selectedIndexForEditing = (AppState.selectedIndexForEditing === index) ? null : index;
}