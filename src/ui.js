// ui.js

import { AppState } from './state.js';
import { rhythmicFigures, lessons } from './config.js';
import { getBeatValue, getDurationText, handlePaletteFigureClick, handleFigureSelectionForEditing } from './core.js';

// --- Elementos do DOM ---
const modeSelect = document.getElementById('mode-select');
const lessonSelect = document.getElementById('lesson-select');
const timeSignatureDisplay = document.getElementById('time-signature-display');
const playPauseButton = document.getElementById('play-pause-button');
const resetButton = document.getElementById('reset-button');
const rhythmDisplayEl = document.getElementById('rhythm-display');
const customRhythmCreatorDiv = document.getElementById('custom-rhythm-creator');
const lessonSelectorContainer = document.getElementById('lesson-selector-container');
const figurePaletteDiv = document.getElementById('figure-palette');
const deleteSelectedFigureButton = document.getElementById('delete-selected-figure-button');
const messageArea = document.getElementById('message-area');
const countdownDisplay = document.getElementById('countdown-display');
const figureLegendContainer = document.getElementById('figure-legend-container');

// Elementos para login e exportação
const loginButton = document.getElementById('login-button');
const logoutButton = document.getElementById('logout-button');
const saveRhythmButton = document.getElementById('save-rhythm-button');
const loadRhythmsButton = document.getElementById('load-rhythms-button');

// --- Funções de Manipulação da UI Exportadas ---

export function updateMessage(text) {
    messageArea.textContent = text;
}

export function updateCountdownDisplay(text) {
    countdownDisplay.textContent = text;
}

export function updatePlaybackButtons(isPlaying) {
    playPauseButton.textContent = isPlaying ? 'Pausar' : 'Tocar';
    playPauseButton.classList.toggle('btn-play', !isPlaying);
    playPauseButton.classList.toggle('btn-pause', isPlaying);
}

// CORRIGIDO: Funções de controle dos botões
export function enableAllControls() {
    document.querySelectorAll('button, select').forEach(el => el.disabled = false);
    deleteSelectedFigureButton.classList.toggle('hidden', AppState.selectedIndexForEditing === null);
    updateLoginUI();
}

export function disablePlaybackControls() {
    document.querySelectorAll('button, select').forEach(el => el.disabled = true);
}


export function highlightActiveVisualElement(patternIndex, activeBeatIndex = null) {
    // Limpa destaques anteriores
    document.querySelectorAll('.figure-container.highlight').forEach(el => el.classList.remove('highlight'));
    document.querySelectorAll('.beat-active').forEach(el => el.classList.remove('beat-active'));

    if (patternIndex !== null) {
        const currentFigureContainer = document.querySelector(`.figure-container[data-pattern-index="${patternIndex}"]`);
        if (currentFigureContainer) {
            currentFigureContainer.classList.add('highlight');
            
            // NOVO: Ativa o número do tempo específico
            if (activeBeatIndex !== null) {
                const beatSpan = currentFigureContainer.querySelector(`span[data-beat-index="${activeBeatIndex}"]`);
                if (beatSpan) {
                    beatSpan.classList.add('beat-active');
                }
            }
            
            // Só faz scroll se o elemento não estiver visível
            const rect = currentFigureContainer.getBoundingClientRect();
            const rhythmDisplayRect = rhythmDisplayEl.parentElement.getBoundingClientRect();
            if (rect.left < rhythmDisplayRect.left || rect.right > rhythmDisplayRect.right) {
                 currentFigureContainer.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
            }
        }
    }
}


export function renderRhythm() {
    rhythmDisplayEl.innerHTML = '';
    rhythmDisplayEl.className = 'flex items-end flex-wrap';

    const tsContainer = document.createElement('div');
    tsContainer.className = 'figure-container';
    tsContainer.innerHTML = `<div class="beat-counter-text">&nbsp;</div><div class="time-signature-item p-2 sm:p-3 text-3xl sm:text-4xl font-bold text-slate-700 flex flex-col justify-center items-center"><span>${AppState.activeTimeSignature.beats}</span><span>${AppState.activeTimeSignature.beatType}</span></div><div>&nbsp;</div>`;
    rhythmDisplayEl.appendChild(tsContainer);

    if (AppState.activePattern.length === 0) {
        rhythmDisplayEl.className += ' justify-center items-center';
        rhythmDisplayEl.innerHTML = `<p class="text-slate-400 text-lg">Selecione uma lição ou comece a criar.</p>`;
        deleteSelectedFigureButton.classList.add('hidden');
        return;
    }

    let currentBeatsInMeasure = 0;
    const tolerance = 0.001;

    AppState.activePattern.forEach((item, index) => {
        if (item.isTiedContinuation) return;

        const beatValue = getBeatValue(item.duration, AppState.activeTimeSignature);
        const figureContainer = document.createElement('div');
        figureContainer.className = 'figure-container';
        figureContainer.dataset.patternIndex = index;

        if (item.isControl) {
            figureContainer.dataset.isControl = "true";
        }

        if (AppState.selectedIndexForEditing === index) figureContainer.classList.add('selected-for-edit');
        if (AppState.currentMode === 'freeCreate') {
            figureContainer.addEventListener('click', () => handleFigureSelectionForEditing(index));
        }

        const beatCounterElement = document.createElement('div');
        beatCounterElement.className = 'beat-counter-text';

        // NOVO: Lógica para renderizar spans individuais para os números
        if (!item.isControl) {
            const startBeat = currentBeatsInMeasure + 1;
            if (beatValue >= 1 && Math.abs(beatValue - Math.round(beatValue)) < tolerance) {
                const beatsArray = Array.from({ length: Math.round(beatValue) }, (_, i) => Math.floor(startBeat) + i);
                let beatSpansHTML = '';
                beatsArray.forEach((beatNum, beatIndex) => {
                    beatSpansHTML += `<span data-beat-index="${beatIndex}">${beatNum}</span>`;
                });
                beatCounterElement.innerHTML = beatSpansHTML;
            } else {
                 const beatNumber = Math.floor(currentBeatsInMeasure) + 1;
                 const subBeatPosition = currentBeatsInMeasure - Math.floor(currentBeatsInMeasure);
                 if (subBeatPosition < tolerance) beatCounterElement.innerHTML = `<span data-beat-index="0">${beatNumber}</span>`;
                 else if (Math.abs(subBeatPosition - 0.25) < tolerance) beatCounterElement.textContent = 'e';
                 else if (Math.abs(subBeatPosition - 0.5) < tolerance) beatCounterElement.textContent = '+';
                 else if (Math.abs(subBeatPosition - 0.75) < tolerance) beatCounterElement.textContent = 'a';
                 else beatCounterElement.innerHTML = `<span data-beat-index="0">${beatNumber}</span>`;
            }
        } else {
             beatCounterElement.innerHTML = '&nbsp;';
        }

        const noteItemElement = document.createElement('div');
        noteItemElement.className = `note-item ${item.type === 'note' ? 'bg-blue-500' : 'bg-gray-300'}`;
        noteItemElement.textContent = item.symbol;

        const syllableElement = document.createElement('div');
        syllableElement.className = 'syllable-text';
        syllableElement.innerHTML = item.syllable || '&nbsp;';

        figureContainer.append(beatCounterElement, noteItemElement, syllableElement);
        rhythmDisplayEl.appendChild(figureContainer);

        if (!item.isControl) currentBeatsInMeasure += beatValue;

        if (Math.abs(currentBeatsInMeasure - AppState.activeTimeSignature.beats) < tolerance) {
             if (index < AppState.activePattern.length - 1 && !AppState.activePattern[index + 1]?.isControl) {
                 rhythmDisplayEl.insertAdjacentHTML('beforeend', `<div class="barline-container"><div class="barline-item"></div></div>`);
             }
             currentBeatsInMeasure = 0;
        } else if (currentBeatsInMeasure > AppState.activeTimeSignature.beats + tolerance) {
             currentBeatsInMeasure %= AppState.activeTimeSignature.beats;
        }
    });

    deleteSelectedFigureButton.classList.toggle('hidden', AppState.selectedIndexForEditing === null);
}

export function switchMode(mode) {
    AppState.currentMode = mode;
    AppState.selectedIndexForEditing = null;
    const isLessonMode = mode === 'lessons';
    
    lessonSelectorContainer.classList.toggle('hidden', !isLessonMode);
    customRhythmCreatorDiv.classList.toggle('hidden', isLessonMode);
    figureLegendContainer.classList.toggle('hidden', !isLessonMode);
    rhythmDisplayEl.classList.toggle('edit-mode', !isLessonMode);
    
    updateMessage(isLessonMode ? "Modo de Lições. Escolha uma lição." : "Modo de Criação Livre.");
    updateActivePatternAndTimeSignature();
    renderRhythm();
    if(isLessonMode) populateFigureLegend();
}

export function populateLessonSelect() {
    lessonSelect.innerHTML = ''; 
    lessons.forEach((lesson, index) => {
        const option = document.createElement('option');
        option.value = index;
        option.textContent = lesson.name;
        lessonSelect.appendChild(option);
    });
}

export function populateFigureLegend() {
    const content = document.getElementById('figure-legend-content');
    if (!content) return;
    content.innerHTML = '';
    const uniqueFigures = [...new Map(AppState.activePattern.filter(item => !item.isControl).map(item => [JSON.stringify([item.symbol, item.duration]), item])).values()];
    
    uniqueFigures.forEach(fig => {
        const figureDef = rhythmicFigures.find(rf => rf.symbol === fig.symbol && rf.duration === fig.duration);
        if(!figureDef) return;
        const beatValue = getBeatValue(fig.duration, AppState.activeTimeSignature);
        content.insertAdjacentHTML('beforeend', `<div class="legend-item"><span class="legend-symbol">${fig.symbol}</span><span class="legend-name">${figureDef.name} - Dura ${getDurationText(beatValue)}</span></div>`);
    });
}

export function populateFigurePalette() {
    figurePaletteDiv.innerHTML = ''; 
    rhythmicFigures.forEach(fig => {
        const button = document.createElement('button');
        button.className = 'figure-button p-2.5 sm:p-3 rounded-lg shadow text-2xl sm:text-3xl transition-all duration-150 ease-in-out';
        if (fig.isControl) button.classList.add('figure-button-control');
        button.textContent = fig.symbol;
        button.title = fig.name;
        button.addEventListener('click', () => handlePaletteFigureClick({...fig}));
        figurePaletteDiv.appendChild(button);
    });
}

export function updateLoginUI() {
    const isLoggedIn = !!AppState.user.currentUser;
    if (loginButton) loginButton.classList.toggle('hidden', isLoggedIn);
    if (logoutButton) logoutButton.classList.toggle('hidden', !isLoggedIn);
    if (saveRhythmButton) saveRhythmButton.classList.toggle('hidden', !isLoggedIn);
    if (loadRhythmsButton) loadRhythmsButton.classList.toggle('hidden', !isLoggedIn);
}