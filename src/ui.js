// ui.js

import { AppState } from './state.js';
import { rhythmicFigures, lessons } from './config.js';
import { getBeatValue, getDurationText, handlePaletteFigureClick, handleFigureSelectionForEditing, updateActivePatternAndTimeSignature } from './core.js';

// --- Elementos do DOM ---
const rhythmDisplayEl = document.getElementById('rhythm-display');
const figureFocusDisplayEl = document.getElementById('figure-focus-display');
const customRhythmCreatorDiv = document.getElementById('custom-rhythm-creator');
const lessonSelectorContainer = document.getElementById('lesson-selector-container');
const messageArea = document.getElementById('message-area');
const countdownDisplay = document.getElementById('countdown-display');
const playPauseButton = document.getElementById('play-pause-button');
const customLessonSelect = document.getElementById('custom-lesson-select');

// --- Funções de Manipulação da UI Exportadas ---

export function updateMessage(text, type = 'info') {
    messageArea.textContent = text;
    messageArea.className = 'text-center text-lg h-8 font-medium my-2 ';
    switch (type) {
        case 'error': messageArea.classList.add('text-red-400'); break;
        case 'success': messageArea.classList.add('text-green-400'); break;
        default: messageArea.classList.add('text-purple-300'); break;
    }
}

export function updateCountdownDisplay(text) {
    if(text) {
        countdownDisplay.classList.remove('empty');
        countdownDisplay.textContent = text;
    } else {
        countdownDisplay.classList.add('empty');
        countdownDisplay.textContent = '';
    }
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
    document.getElementById('delete-selected-figure-button').classList.toggle('hidden', AppState.selectedIndexForEditing === null);
    updateLoginUI();
}

export function disablePlaybackControls(keepPlaybackButtonsEnabled = false) {
    document.querySelectorAll('button, select, input').forEach(el => {
        if (!el.closest('.playback-panel')) {
            el.disabled = true;
        }
    });
    if (keepPlaybackButtonsEnabled) {
        playPauseButton.disabled = false;
        document.getElementById('reset-button').disabled = false;
    }
}

export function highlightActiveVisualElement(patternIndex, activeBeatIndex = 0) {
    document.querySelectorAll('.figure-container.highlight').forEach(el => el.classList.remove('highlight'));
    document.querySelectorAll('.beat-active').forEach(el => el.classList.remove('beat-active'));

    if (patternIndex !== null && AppState.activePattern[patternIndex]) {
        const currentFigureContainer = document.querySelector(`.figure-container[data-pattern-index="${patternIndex}"]`);
        if (currentFigureContainer) {
            currentFigureContainer.classList.add('highlight');
            updateFigureFocusDisplay(AppState.activePattern[patternIndex]);
            
            const beatSpan = currentFigureContainer.querySelector(`.beat-counter-text span[data-beat-index="${activeBeatIndex}"]`);
            if (beatSpan) {
                beatSpan.classList.add('beat-active');
            }
            
            currentFigureContainer.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
    } else {
        updateFigureFocusDisplay(null);
    }
}


function updateFigureFocusDisplay(item) {
    if (!figureFocusDisplayEl) return;

    if (item && !item.isControl) {
        const figureDef = rhythmicFigures.find(rf => rf.symbol === item.symbol && rf.duration === item.duration);
        if (!figureDef) {
             figureFocusDisplayEl.classList.remove('visible');
             return;
        }
        const beatValue = getBeatValue(item.duration, AppState.activeTimeSignature);
        const durationText = getDurationText(beatValue);

        figureFocusDisplayEl.innerHTML = `
            <div class="focus-symbol">${item.symbol}</div>
            <div class="focus-details">
                <div class="focus-name">${figureDef.name}</div>
                <div class="focus-duration">Duração: ${durationText}</div>
            </div>
        `;
        figureFocusDisplayEl.classList.add('visible');
    } else {
        figureFocusDisplayEl.innerHTML = '';
        figureFocusDisplayEl.classList.remove('visible');
    }
}


function drawTie(row, startEl, endEl) {
    const tie = document.createElement('div');
    tie.className = 'tie';
    const rowRect = row.getBoundingClientRect();
    const startRect = startEl.getBoundingClientRect();
    const endRect = endEl.getBoundingClientRect();
    
    if(!startRect || !endRect) return;

    const left = startRect.left - rowRect.left + (startRect.width / 2);
    const width = endRect.left - startRect.left;
    
    tie.style.position = 'absolute';
    tie.style.left = `${left}px`;
    tie.style.width = `${width}px`;
    
    const noteItemHeight = startEl.querySelector('.note-item')?.offsetHeight || 60;
    tie.style.bottom = `${noteItemHeight - 50}px`;

    row.appendChild(tie);
}

export function renderRhythm() {
    rhythmDisplayEl.innerHTML = '';
    updateFigureFocusDisplay(null);
    
    if (!AppState.activePattern || AppState.activePattern.length === 0) {
        const message = AppState.currentMode === 'freeCreate'
            ? "Comece a adicionar figuras no Painel de Criação."
            : "Bem-vindo! Selecione uma lição para começar.";
        rhythmDisplayEl.innerHTML = `<p class="text-slate-400 text-center w-full text-lg self-center">${message}</p>`;
        document.getElementById('delete-selected-figure-button').classList.add('hidden');
        return;
    }

    const timeSig = AppState.activeTimeSignature;
    const totalMeasureBeats = parseFloat(timeSig.beats);
    const tolerance = 0.001;
    let currentBeatsInMeasure = 0;

    const containerWidth = rhythmDisplayEl.clientWidth;
    const timeSigWidth = 80;
    let currentRowWidth = timeSigWidth;
    
    let currentRow = document.createElement('div');
    currentRow.className = 'rhythm-row';
    rhythmDisplayEl.appendChild(currentRow);

    const addTimeSignature = (row) => {
        const timeSigEl = document.createElement('div');
        timeSigEl.className = 'time-signature-main';
        timeSigEl.innerHTML = `<span>${timeSig.beats}</span><span>${timeSig.beatType}</span>`;
        row.appendChild(timeSigEl);
    };
    
    addTimeSignature(currentRow);

    AppState.activePattern.forEach((item, index) => {
        if (item.isTiedContinuation) return;
        
        const figureWidth = 70;
        
        if (currentRowWidth + figureWidth > containerWidth) {
            currentRow = document.createElement('div');
            currentRow.className = 'rhythm-row';
            rhythmDisplayEl.appendChild(currentRow);
            addTimeSignature(currentRow);
            currentRowWidth = timeSigWidth;
        }

        const figureContainer = document.createElement('div');
        figureContainer.className = 'figure-container';
        figureContainer.dataset.patternIndex = index;
        
        figureContainer.addEventListener('mouseenter', () => updateFigureFocusDisplay(item));
        figureContainer.addEventListener('mouseleave', () => updateFigureFocusDisplay(null));
        
        if (AppState.currentMode === 'freeCreate' && !item.isControl) {
            figureContainer.addEventListener('click', () => {
                handleFigureSelectionForEditing(index);
                renderRhythm();
            });
            if (AppState.selectedIndexForEditing === index) {
                figureContainer.classList.add('selected-for-edit');
            }
        }
        
        const beatCounterElement = document.createElement('div');
        beatCounterElement.className = 'beat-counter-text';
        
        const beatValue = getBeatValue(item.duration, timeSig);

        if (!item.isControl) {
            const startBeatInMeasure = (currentBeatsInMeasure % totalMeasureBeats);
            const roundedBeatValue = Math.round(beatValue);
            let beatHTML = '';
            
            if (beatValue >= 1 && Math.abs(beatValue - roundedBeatValue) < tolerance) {
                for (let i = 0; i < roundedBeatValue; i++) {
                    const beatNumber = Math.floor(startBeatInMeasure) + 1 + i;
                    if (beatNumber <= totalMeasureBeats) {
                         beatHTML += `<span data-beat-index="${i}">${beatNumber}</span> `;
                    }
                }
            } else {
                 const beatNumber = Math.floor(startBeatInMeasure) + 1;
                 beatHTML = `<span data-beat-index="0">${beatNumber}</span>`;
            }
            beatCounterElement.innerHTML = beatHTML;
        }
        
        const noteItemElement = document.createElement('div');
        noteItemElement.className = `note-item ${item.type === 'note' ? 'bg-blue-500' : 'bg-gray-300'}`;
        noteItemElement.textContent = item.symbol;
        
        if(item.isControl) {
            noteItemElement.classList.add('control-item');
        }

        const syllableElement = document.createElement('div');
        syllableElement.className = 'syllable-text';
        syllableElement.innerHTML = item.syllable || '&nbsp;';
        
        figureContainer.append(beatCounterElement, noteItemElement, syllableElement);
        currentRow.appendChild(figureContainer);
        currentRowWidth += figureWidth;

        if (!item.isControl) {
            currentBeatsInMeasure += beatValue;
        }
        
        // Lógica da Barra de Compasso
        if (Math.abs(currentBeatsInMeasure - totalMeasureBeats) < tolerance) {
            const isLastElement = index === AppState.activePattern.length - 1;
            
            if (!isLastElement) {
                 const barlineWidth = 20;
                 if (currentRowWidth + barlineWidth > containerWidth) {
                    currentRow = document.createElement('div');
                    currentRow.className = 'rhythm-row';
                    rhythmDisplayEl.appendChild(currentRow);
                    addTimeSignature(currentRow);
                    currentRowWidth = timeSigWidth;
                 }
                const barlineEl = document.createElement('div');
                barlineEl.className = 'barline-container';
                barlineEl.innerHTML = `<div class="barline-item"></div>`;
                currentRow.appendChild(barlineEl);
                currentRowWidth += barlineWidth;
            }
            currentBeatsInMeasure = 0;
        }
    });

    // Lógica da Barra Final (renderizada no final, se presente)
    const lastItem = AppState.activePattern[AppState.activePattern.length - 1];
    if(lastItem && lastItem.type === 'final_barline'){
        const finalBarEl = document.createElement('div');
        finalBarEl.className = 'final-barline-container';
        finalBarEl.innerHTML = `<div class="final-barline-item"></div>`;
        currentRow.appendChild(finalBarEl);
    }


    rhythmDisplayEl.querySelectorAll('.rhythm-row').forEach(row => {
        AppState.activePattern.forEach((item, index) => {
            if (item.tiedToNext) {
                const startEl = row.querySelector(`.figure-container[data-pattern-index="${index}"]`);
                let nextVisibleIndex = index + 1;
                while(nextVisibleIndex < AppState.activePattern.length && AppState.activePattern[nextVisibleIndex].isTiedContinuation) {
                    nextVisibleIndex++;
                }
                const endEl = row.querySelector(`.figure-container[data-pattern-index="${nextVisibleIndex}"]`);
                if (startEl && endEl) {
                    drawTie(row, startEl, endEl);
                }
            }
        });
    });
    
    document.getElementById('delete-selected-figure-button').classList.toggle('hidden', AppState.selectedIndexForEditing === null);
}

export function switchMode(mode) {
    AppState.currentMode = mode;
    AppState.selectedIndexForEditing = null;
    const isLessonMode = mode === 'lessons';
    
    lessonSelectorContainer.style.display = isLessonMode ? 'block' : 'none';
    customRhythmCreatorDiv.classList.toggle('hidden', isLessonMode);
    
    updateMessage(isLessonMode ? "Selecione uma lição na lista." : "Modo de Criação Livre ativado.");
    
    if(isLessonMode) {
        AppState.customPattern = [];
    }

    updateActivePatternAndTimeSignature();
    // A renderização precisa de um pequeno atraso para obter a largura correta do container
    setTimeout(renderRhythm, 50); 
    updateLoginUI();
}

export function populateCustomLessonDropdown() {
    const customOptionsContainer = customLessonSelect.querySelector('.custom-options');
    if (!customOptionsContainer) return;
    customOptionsContainer.innerHTML = '';
    const lessonPanel = customLessonSelect.closest('.panel');
    
    lessons.forEach((lesson, index) => {
        const optionEl = document.createElement('div');
        optionEl.className = 'custom-option';
        optionEl.textContent = lesson.name;
        optionEl.dataset.value = index;
        optionEl.addEventListener('click', (e) => {
            e.stopPropagation();
            const selectedValue = e.currentTarget.dataset.value;
            AppState.currentLessonIndex = parseInt(selectedValue);
            updateCustomDropdownTrigger(lessons[selectedValue].name);
            customOptionsContainer.querySelectorAll('.custom-option').forEach(opt => opt.classList.remove('selected'));
            e.currentTarget.classList.add('selected');
            
            customLessonSelect.classList.remove('open');
            lessonPanel.classList.remove('panel-on-top');
            
            updateActivePatternAndTimeSignature();
            renderRhythm();
        });
        customOptionsContainer.appendChild(optionEl);
    });
}

export function updateCustomDropdownTrigger(text) {
    const trigger = customLessonSelect.querySelector('.custom-select-trigger');
    if (trigger) trigger.textContent = text;
}

export function populateFigurePalette() {
    const figurePaletteDiv = document.getElementById('figure-palette');
    if (!figurePaletteDiv) return;
    figurePaletteDiv.innerHTML = '';
    
    const tieButton = document.createElement('button');
    tieButton.className = 'figure-button figure-button-control';
    tieButton.innerHTML = '&#9900;';
    tieButton.title = 'Adicionar/Remover Ligadura';
    tieButton.addEventListener('click', () => {
        const result = handlePaletteFigureClick({ name: 'Ligadura' });
        updateMessage(result.message, result.success ? 'info' : 'error');
        if(result.success) {
            updateActivePatternAndTimeSignature();
            renderRhythm();
        }
    });
    figurePaletteDiv.appendChild(tieButton);

    rhythmicFigures.forEach(fig => {
        const button = document.createElement('button');
        button.className = 'figure-button';
        if (fig.isControl) button.classList.add('figure-button-control');
        button.textContent = fig.symbol;
        button.title = fig.name;
        button.addEventListener('click', () => {
            const result = handlePaletteFigureClick({ ...fig });
            if (result.success) {
                updateActivePatternAndTimeSignature();
                renderRhythm();
                updateMessage(result.message);
            } else {
                updateMessage(result.message, 'error');
            }
        });
        figurePaletteDiv.appendChild(button);
    });
}

export function updateLoginUI() {
    const loginButton = document.getElementById('login-button');
    const logoutButton = document.getElementById('logout-button');
    const saveRhythmButton = document.getElementById('save-rhythm-button');
    const loadRhythmsButton = document.getElementById('load-rhythms-button');
    
    const isLoggedIn = !!AppState.user.currentUser;
    loginButton.classList.toggle('hidden', isLoggedIn);
    logoutButton.classList.toggle('hidden', !isLoggedIn);
    const showUserButtons = isLoggedIn && AppState.currentMode === 'freeCreate';
    saveRhythmButton.classList.toggle('hidden', !showUserButtons);
    loadRhythmsButton.classList.toggle('hidden', !showUserButtons);
}