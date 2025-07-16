// ui.js

import { AppState } from './state.js';
import { rhythmicFigures, lessons } from './config.js';
import { getBeatValue, getDurationText, handlePaletteFigureClick, handleFigureSelectionForEditing } from './core.js';

// --- Elementos do DOM ---
const rhythmDisplayEl = document.getElementById('rhythm-display');
const customRhythmCreatorDiv = document.getElementById('custom-rhythm-creator');
const lessonSelectorContainer = document.getElementById('lesson-selector-container');
const figurePaletteDiv = document.getElementById('figure-palette');
const deleteSelectedFigureButton = document.getElementById('delete-selected-figure-button');
const messageArea = document.getElementById('message-area');
const countdownDisplay = document.getElementById('countdown-display');
const figureLegendContainer = document.getElementById('figure-legend-container');
const playPauseButton = document.getElementById('play-pause-button');
const loginButton = document.getElementById('login-button');
const logoutButton = document.getElementById('logout-button');
const saveRhythmButton = document.getElementById('save-rhythm-button');
const loadRhythmsButton = document.getElementById('load-rhythms-button');

// Esconde o select nativo que serve de fallback
const nativeLessonSelect = document.getElementById('lesson-select');
if (nativeLessonSelect) {
    nativeLessonSelect.classList.add('hidden-native-select');
}

// --- Funções de Manipulação da UI Exportadas ---

export function updateMessage(text) {
    messageArea.textContent = text;
}

export function updateCountdownDisplay(text) {
    countdownDisplay.textContent = text;
}

export function updatePlaybackButtons(isPlaying) {
    if (isPlaying) {
        playPauseButton.innerHTML = `<i class="fas fa-pause"></i> Pausar`;
        playPauseButton.classList.remove('btn-play');
        playPauseButton.classList.add('btn-pause');
    } else {
        playPauseButton.innerHTML = `<i class="fas fa-play"></i> Tocar`;
        playPauseButton.classList.remove('btn-pause');
        playPauseButton.classList.add('btn-play');
    }
}

export function enableAllControls() {
    document.querySelectorAll('button, select, input').forEach(el => el.disabled = false);
    deleteSelectedFigureButton.classList.toggle('hidden', AppState.selectedIndexForEditing === null);
    updateLoginUI();
}

export function disablePlaybackControls(keepPlaybackButtonsEnabled = false) {
    document.querySelectorAll('button, select, input').forEach(el => {
        // Mantém os controlos principais de reprodução e tempo sempre ativos se `keepPlaybackButtonsEnabled` for verdadeiro
        if (keepPlaybackButtonsEnabled && (el.id === 'play-pause-button' || el.id === 'reset-button' || el.id.includes('tempo'))) {
            el.disabled = false;
        } else {
            el.disabled = true;
        }
    });
    // Garante que os botões de play/pause/reset sejam reativados após a contagem
    playPauseButton.disabled = false;
    document.getElementById('reset-button').disabled = false;
}

export function highlightActiveVisualElement(patternIndex, activeBeatIndex = null) {
    document.querySelectorAll('.figure-container.highlight').forEach(el => el.classList.remove('highlight'));
    document.querySelectorAll('.beat-active').forEach(el => el.classList.remove('beat-active'));

    if (patternIndex !== null) {
        const currentFigureContainer = document.querySelector(`.figure-container[data-pattern-index="${patternIndex}"]`);
        if (currentFigureContainer) {
            currentFigureContainer.classList.add('highlight');
            
            if (activeBeatIndex !== null) {
                const beatSpan = currentFigureContainer.querySelector(`span[data-beat-index="${activeBeatIndex}"]`);
                if (beatSpan) beatSpan.classList.add('beat-active');
            }
            
            const rect = currentFigureContainer.getBoundingClientRect();
            const rhythmDisplayRect = rhythmDisplayEl.parentElement.getBoundingClientRect();
            if (rect.top < rhythmDisplayRect.top || rect.bottom > rhythmDisplayRect.bottom) {
                 currentFigureContainer.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        }
    }
}

function drawTie(startEl, endEl) {
    const tie = document.createElement('div');
    tie.className = 'tie';
    const startRect = startEl.getBoundingClientRect();
    const endRect = endEl.getBoundingClientRect();
    const displayRect = rhythmDisplayEl.getBoundingClientRect();
    const left = startRect.left - displayRect.left + (startRect.width / 2);
    const width = endRect.left - startRect.left;
    tie.style.left = `${left}px`;
    tie.style.width = `${width}px`;
    rhythmDisplayEl.appendChild(tie);
}

export function renderRhythm() {
    rhythmDisplayEl.innerHTML = '';
    
    if (AppState.activePattern.length === 0 && AppState.currentMode === 'freeCreate') {
        rhythmDisplayEl.innerHTML = `<p class="text-slate-400 text-center w-full text-lg self-center">Comece a adicionar figuras no Painel de Criação.</p>`;
        deleteSelectedFigureButton.classList.add('hidden');
        return;
    }

    let currentBeatsInMeasure = 0;
    const timeSig = AppState.activeTimeSignature;
    const totalMeasureBeats = parseFloat(timeSig.beats);
    const beatUnit = 4 / timeSig.beatType;
    const tolerance = 0.001;

    AppState.activePattern.forEach((item, index) => {
        if (item.isTiedContinuation) return;

        const beatValue = getBeatValue(item.duration, timeSig);
        const figureContainer = document.createElement('div');
        figureContainer.className = 'figure-container';
        figureContainer.dataset.patternIndex = index;

        if (item.isControl) figureContainer.dataset.isControl = "true";
        if (AppState.selectedIndexForEditing === index) figureContainer.classList.add('selected-for-edit');
        if (AppState.currentMode === 'freeCreate') {
            figureContainer.addEventListener('click', () => handleFigureSelectionForEditing(index));
        }

        const beatCounterElement = document.createElement('div');
        beatCounterElement.className = 'beat-counter-text';

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
                 else if (Math.abs(subBeatPosition - 0.25) < tolerance) beatCounterElement.innerHTML = `<span data-beat-index="0">e</span>`;
                 else if (Math.abs(subBeatPosition - 0.5) < tolerance) beatCounterElement.innerHTML = `<span data-beat-index="0">+</span>`;
                 else if (Math.abs(subBeatPosition - 0.75) < tolerance) beatCounterElement.innerHTML = `<span data-beat-index="0">a</span>`;
                 else beatCounterElement.innerHTML = `<span data-beat-index="0">${beatNumber}</span>`;
            }
        } else {
             beatCounterElement.innerHTML = '&nbsp;';
        }

        const noteItemElement = document.createElement('div');
        noteItemElement.id = `figure-${index}`;
        noteItemElement.className = `note-item ${item.type === 'note' ? 'bg-blue-500' : 'bg-gray-300'}`;
        noteItemElement.textContent = item.symbol;

        const syllableElement = document.createElement('div');
        syllableElement.className = 'syllable-text';
        syllableElement.innerHTML = item.syllable || '&nbsp;';
        
        figureContainer.append(beatCounterElement, noteItemElement, syllableElement);
        rhythmDisplayEl.appendChild(figureContainer);

        if (!item.isControl) currentBeatsInMeasure += beatValue;

        if (Math.abs(currentBeatsInMeasure - totalMeasureBeats) < tolerance) {
             if (index < AppState.activePattern.length - 1 && !AppState.activePattern[index + 1]?.isControl) {
                 rhythmDisplayEl.insertAdjacentHTML('beforeend', `<div class="barline-container"><div class="barline-item"></div></div>`);
             }
             currentBeatsInMeasure = 0;
        } else if (currentBeatsInMeasure > totalMeasureBeats + tolerance) {
             currentBeatsInMeasure %= totalMeasureBeats;
        }
    });

    AppState.activePattern.forEach((item, index) => {
        if (item.tiedToNext && index + 1 < AppState.activePattern.length) {
            const startEl = document.getElementById(`figure-${index}`);
            let nextVisibleIndex = index + 1;
            while (AppState.activePattern[nextVisibleIndex] && AppState.activePattern[nextVisibleIndex].isTiedContinuation) {
                nextVisibleIndex++;
            }
            const endEl = document.getElementById(`figure-${nextVisibleIndex}`);
            if (startEl && endEl) drawTie(startEl, endEl);
        }
    });

    deleteSelectedFigureButton.classList.toggle('hidden', AppState.selectedIndexForEditing === null);
}

export function switchMode(mode) {
    AppState.currentMode = mode;
    AppState.selectedIndexForEditing = null;
    const isLessonMode = mode === 'lessons';
    
    lessonSelectorContainer.style.display = isLessonMode ? 'block' : 'none';
    customRhythmCreatorDiv.classList.toggle('hidden', isLessonMode);
    figureLegendContainer.classList.toggle('hidden', !isLessonMode);
    rhythmDisplayEl.classList.toggle('edit-mode', !isLessonMode);
    
    updateMessage(isLessonMode ? "Selecione uma lição na lista." : "Modo de Criação Livre ativado.");
    //stopRhythmExecution();
    updateActivePatternAndTimeSignature();
    renderRhythm();
    if (isLessonMode) {
        populateFigureLegend();
    }
}

export function populateCustomLessonDropdown() {
    const customOptionsContainer = document.querySelector('.custom-options');
    if (!customOptionsContainer) return;
    customOptionsContainer.innerHTML = '';
    lessons.forEach((lesson, index) => {
        const optionEl = document.createElement('span');
        optionEl.className = 'custom-option';
        optionEl.textContent = lesson.name;
        optionEl.dataset.value = index;
        customOptionsContainer.appendChild(optionEl);
    });
}

export function updateCustomDropdownTrigger(text) {
    const trigger = document.querySelector('.custom-select-trigger');
    if (trigger) trigger.textContent = text;
}

export function populateFigureLegend() {
    const content = document.getElementById('figure-legend-content');
    if (!content) return;
    content.innerHTML = '';
    const uniqueFigures = [...new Map(AppState.activePattern.filter(item => !item.isControl && !item.isTiedContinuation).map(item => [JSON.stringify([item.symbol, item.duration]), item])).values()];
    
    uniqueFigures.forEach(fig => {
        const figureDef = rhythmicFigures.find(rf => rf.symbol === fig.symbol && rf.duration === fig.duration);
        if(!figureDef) return;
        const beatValue = getBeatValue(fig.duration, AppState.activeTimeSignature);
        content.insertAdjacentHTML('beforeend', `<div class="legend-item"><span class="legend-symbol">${fig.symbol}</span><span class="legend-name">${figureDef.name} - ${getDurationText(beatValue)}</span></div>`);
    });
}

export function populateFigurePalette() {
    figurePaletteDiv.innerHTML = '';
    const tieButton = document.createElement('button');
    tieButton.className = 'figure-button';
    tieButton.innerHTML = '&#9900;';
    tieButton.title = 'Ligadura';
    tieButton.addEventListener('click', () => handlePaletteFigureClick({name: 'Ligadura'}));
    figurePaletteDiv.appendChild(tieButton);

    rhythmicFigures.forEach(fig => {
        const button = document.createElement('button');
        button.className = 'figure-button';
        if (fig.isControl) button.classList.add('figure-button-control');
        button.textContent = fig.symbol;
        button.title = fig.name;
        button.addEventListener('click', () => handlePaletteFigureClick({...fig}));
        figurePaletteDiv.appendChild(button);
    });
}

export function updateLoginUI() {
    const isLoggedIn = !!AppState.user.currentUser;
    loginButton.classList.toggle('hidden', isLoggedIn);
    logoutButton.classList.toggle('hidden', !isLoggedIn);
    saveRhythmButton.classList.toggle('hidden', !isLoggedIn || AppState.currentMode !== 'freeCreate');
    loadRhythmsButton.classList.toggle('hidden', !isLoggedIn || AppState.currentMode !== 'freeCreate');
}