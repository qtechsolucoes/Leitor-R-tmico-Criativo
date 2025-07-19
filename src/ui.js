// ui.js

import { AppState } from './state.js';
import { rhythmicFigures, lessons } from './config.js';
import { getBeatValue, getDurationText, getFractionalNotation, handlePaletteFigureClick, handleFigureSelectionForEditing, updateActivePatternAndTimeSignature } from './core.js';

const rhythmDisplayEl = document.getElementById('rhythm-display');
const figureFocusDisplayEl = document.getElementById('figure-focus-display');
const customRhythmCreatorDiv = document.getElementById('custom-rhythm-creator');
const lessonSelectorContainer = document.getElementById('lesson-selector-container');
const messageArea = document.getElementById('message-area');
const countdownDisplay = document.getElementById('countdown-display');
const playPauseButton = document.getElementById('play-pause-button');
const customLessonSelect = document.getElementById('custom-lesson-select');
const modalOverlay = document.getElementById('modal-overlay');
const loginModal = document.getElementById('login-modal');
const saveRhythmModal = document.getElementById('save-rhythm-modal');
const loadRhythmModal = document.getElementById('load-rhythm-modal');
const errorModal = document.getElementById('error-modal');
const errorModalText = document.getElementById('error-modal-text');
const editPopover = document.getElementById('edit-popover');

export function showModal(modalElement) {
    modalOverlay.classList.remove('hidden');
    modalElement.classList.remove('hidden');
}

export function hideAllModals() {
    modalOverlay.classList.add('hidden');
    loginModal.classList.add('hidden');
    saveRhythmModal.classList.add('hidden');
    loadRhythmModal.classList.add('hidden');
    errorModal.classList.add('hidden');
}

export function showErrorModal(message) {
    errorModalText.textContent = message;
    showModal(errorModal);
}

export function populateLoadRhythmModal(userRhythms) {
    const listContainer = document.getElementById('load-rhythm-list');
    listContainer.innerHTML = ''; 

    if (!userRhythms || userRhythms.length === 0) {
        listContainer.innerHTML = '<p class="text-center text-slate-400">Nenhum ritmo salvo encontrado.</p>';
        return;
    }

    userRhythms.forEach((rhythm, index) => {
        const button = document.createElement('button');
        button.className = 'load-item-button';
        button.textContent = rhythm.name;
        button.dataset.index = index;
        listContainer.appendChild(button);
    });
}

export function hideEditPopover() {
    editPopover.classList.add('hidden');
}

export function showEditPopover(figureElement) {
    const displayContainer = document.getElementById('rhythm-display-container');
    const containerRect = displayContainer.getBoundingClientRect();
    const figureRect = figureElement.getBoundingClientRect();

    const top = figureRect.top - containerRect.top + displayContainer.scrollTop - editPopover.offsetHeight - 10;
    const left = figureRect.left - containerRect.left + displayContainer.scrollLeft + (figureRect.width / 2) - (editPopover.offsetWidth / 2);

    editPopover.style.top = `${top}px`;
    editPopover.style.left = `${left}px`;
    editPopover.classList.remove('hidden');
}

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

export function updateFigureFocusDisplay(item) {
    if (!figureFocusDisplayEl) return;

    if (item && !item.isControl) {
        const figureDef = rhythmicFigures.find(rf => rf.symbol === item.symbol && rf.duration === item.duration);
        if (!figureDef) {
             figureFocusDisplayEl.classList.remove('visible');
             return;
        }
        
        const beatValue = getBeatValue(item.duration, AppState.activeTimeSignature);
        const durationText = getDurationText(beatValue);
        const fractionText = getFractionalNotation(beatValue);

        figureFocusDisplayEl.innerHTML = `
            <div class="focus-symbol">${item.symbol}</div>
            <div class="focus-details">
                <div class="focus-name">${figureDef.name}</div>
                <div class="focus-duration">Duração: ${durationText} ${fractionText}</div>
            </div>
        `;
        figureFocusDisplayEl.classList.add('visible');
    } else {
        figureFocusDisplayEl.innerHTML = '';
        figureFocusDisplayEl.classList.remove('visible');
    }
}

function drawTie(row, startEl, endEl) {
    const rowRect = row.getBoundingClientRect();
    const startRect = startEl.getBoundingClientRect();
    const endRect = endEl.getBoundingClientRect();
    
    if(!startRect || !endRect) return;

    const startX = startRect.left - rowRect.left + (startRect.width / 2);
    const endX = endRect.left - rowRect.left + (endRect.width / 2);
    const width = endX - startX;
    
    const noteItem = startEl.querySelector('.note-item');
    if (!noteItem) return;

    const yPos = noteItem.offsetTop + noteItem.offsetHeight; 
    const minCurvature = 20;
    const curvature = minCurvature + (width * 0.2);

    const M = `M ${startX},${yPos}`;
    const Q = `Q ${startX + width / 2},${yPos + curvature} ${endX},${yPos}`;
    
    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.classList.add('tie-svg');
    svg.style.left = `0px`;
    svg.style.top = `0px`;

    const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path.setAttribute('d', `${M} ${Q}`);
    
    svg.appendChild(path);
    row.appendChild(svg);
}


export function renderRhythm() {
    rhythmDisplayEl.innerHTML = '';
    updateFigureFocusDisplay(null);
    hideEditPopover();
    
    if (!AppState.activePattern || AppState.activePattern.length === 0) {
        const message = AppState.currentMode === 'freeCreate'
            ? "Comece a adicionar figuras no Painel de Criação."
            : "Bem-vindo! Selecione uma lição para começar.";
        rhythmDisplayEl.innerHTML = `<p class="text-slate-400 text-center w-full text-lg self-center">${message}</p>`;
        return;
    }

    const timeSig = AppState.activeTimeSignature;
    const totalMeasureBeats = parseFloat(timeSig.beats);
    const tolerance = 0.001;
    let currentBeatsInMeasure = 0;

    const containerWidth = rhythmDisplayEl.clientWidth;
    // --- LARGURAS AJUSTADAS PARA QUEBRA DE LINHA PRECISA ---
    const timeSigWidth = 76;   // 60px de largura + 16px de margem
    const figureWidth = 60;    // 60px de largura do .note-item
    const barlineWidth = 18;   // 2px de largura + 16px de margem
    const gapWidth = 4;        // 4px de espaçamento entre elementos
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
        if (item.type === 'final_barline') return;
        
        if (currentRowWidth + gapWidth + figureWidth > containerWidth) {
            currentRow = document.createElement('div');
            currentRow.className = 'rhythm-row';
            rhythmDisplayEl.appendChild(currentRow);
            addTimeSignature(currentRow);
            currentRowWidth = timeSigWidth;
        }

        const figureContainer = document.createElement('div');
        figureContainer.className = 'figure-container';
        figureContainer.dataset.patternIndex = index;
        
        if (AppState.currentMode === 'freeCreate' && !item.isControl) {
            figureContainer.addEventListener('click', (e) => {
                e.stopPropagation();
                handleFigureSelectionForEditing(index);
                renderRhythm();
                const newFigureElement = rhythmDisplayEl.querySelector(`.figure-container[data-pattern-index="${index}"]`);
                if(newFigureElement && AppState.selectedIndexForEditing === index) {
                    showEditPopover(newFigureElement);
                }
            });
            if (AppState.selectedIndexForEditing === index) {
                figureContainer.classList.add('selected-for-edit');
            }
        }
        
        const beatCounterElement = document.createElement('div');
        beatCounterElement.className = 'beat-counter-text';
        const beatValue = getBeatValue(item.duration, timeSig);

        if (!item.isControl) {
            let beatHTML = '';
            const startBeatInMeasure = currentBeatsInMeasure % totalMeasureBeats;

            if (beatValue >= 1) {
                const roundedBeatValue = Math.floor(beatValue);
                for (let i = 0; i < roundedBeatValue; i++) {
                    const beatNumber = Math.floor(startBeatInMeasure) + 1 + i;
                    if (beatNumber <= totalMeasureBeats) {
                        beatHTML += `<span data-beat-index="${i}">${beatNumber}</span>`;
                    }
                }
            } else {
                const mainBeatNumber = Math.floor(startBeatInMeasure) + 1;
                const fraction = startBeatInMeasure - Math.floor(startBeatInMeasure);
                let beatDisplay = '&nbsp;';

                if (mainBeatNumber <= totalMeasureBeats) {
                    if (Math.abs(fraction) < tolerance) {
                        beatDisplay = mainBeatNumber;
                    } else if (Math.abs(fraction - 0.5) < tolerance) {
                        beatDisplay = 'e';
                    } else if (Math.abs(fraction - 0.25) < tolerance) {
                        beatDisplay = '+';
                    } else if (Math.abs(fraction - 0.75) < tolerance) {
                        beatDisplay = 'a';
                    }
                }
                beatHTML = `<span data-beat-index="0">${beatDisplay}</span>`;
            }
            beatCounterElement.innerHTML = beatHTML;
        }
        
        const noteItemElement = document.createElement('div');
        noteItemElement.className = `note-item ${item.type === 'note' ? 'bg-blue-500' : 'bg-gray-300'}`;
        noteItemElement.textContent = item.symbol;
        if(item.isControl) noteItemElement.classList.add('control-item');

        const syllableElement = document.createElement('div');
        syllableElement.className = 'syllable-text';
        syllableElement.innerHTML = item.syllable || '&nbsp;';
        
        figureContainer.append(beatCounterElement, noteItemElement, syllableElement);
        currentRow.appendChild(figureContainer);
        currentRowWidth += gapWidth + figureWidth;

        if (!item.isControl) currentBeatsInMeasure += beatValue;
        
        if (Math.abs(currentBeatsInMeasure - totalMeasureBeats) < tolerance) {
            const hasMoreMusic = AppState.activePattern.slice(index + 1).some(fig => !fig.isControl && fig.type !== 'final_barline');
            if (hasMoreMusic) {
                 if (currentRowWidth + gapWidth + barlineWidth > containerWidth) {
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
                currentRowWidth += gapWidth + barlineWidth;
            }
            currentBeatsInMeasure = 0;
        }
    });

    const lastItem = AppState.activePattern[AppState.activePattern.length - 1];
    if(lastItem && lastItem.type === 'final_barline'){
        const finalBarEl = document.createElement('div');
        finalBarEl.className = 'final-barline-container';
        finalBarEl.innerHTML = `<div class="final-barline-item"><div class="thin-bar"></div><div class="thick-bar"></div></div>`;
        currentRow.appendChild(finalBarEl);
    }

    rhythmDisplayEl.querySelectorAll('.rhythm-row').forEach(row => {
        AppState.activePattern.forEach((item, index) => {
            if (item.tiedToNext) {
                const startEl = row.querySelector(`.figure-container[data-pattern-index="${index}"]`);
                
                let nextNoteIndex = index + 1;
                while(nextNoteIndex < AppState.activePattern.length && (AppState.activePattern[nextNoteIndex].isControl || AppState.activePattern[nextNoteIndex].type === 'rest')) {
                    nextNoteIndex++;
                }
                
                if (nextNoteIndex < AppState.activePattern.length) {
                    const endEl = row.querySelector(`.figure-container[data-pattern-index="${nextNoteIndex}"]`);
                    if (startEl && endEl) {
                        drawTie(row, startEl, endEl);
                    }
                }
            }
        });
    });
}

export function switchMode(mode) {
    AppState.currentMode = mode;
    AppState.selectedIndexForEditing = null;
    const isLessonMode = mode === 'lessons';
    
    lessonSelectorContainer.style.display = isLessonMode ? 'block' : 'none';
    customRhythmCreatorDiv.classList.toggle('hidden', isLessonMode);
    
    updateMessage(isLessonMode ? "Selecione uma lição na lista." : "Modo de Criação Livre ativado.");
    
    if(isLessonMode) AppState.customPattern = [];

    updateActivePatternAndTimeSignature();
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