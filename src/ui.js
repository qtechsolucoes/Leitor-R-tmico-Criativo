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
const modalOverlay = document.getElementById('modal-overlay');
const loginModal = document.getElementById('login-modal');
const saveRhythmModal = document.getElementById('save-rhythm-modal');
const loadRhythmModal = document.getElementById('load-rhythm-modal');
const errorModal = document.getElementById('error-modal');
const errorModalText = document.getElementById('error-modal-text');
const editPopover = document.getElementById('edit-popover');
const lessonModal = document.getElementById('lesson-modal');

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
    lessonModal.classList.add('hidden');
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
    updateLoginUI(AppState.user.currentUser);
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
        const figureDef = rhythmicFigures.find(rf => (rf.baseSymbol || rf.symbol) === (item.baseSymbol || item.symbol) && Math.abs(rf.duration - item.duration) < 0.01);
        if (!figureDef) {
             figureFocusDisplayEl.classList.remove('visible');
             return;
        }
        
        const beatValue = getBeatValue(item.duration, AppState.activeTimeSignature);
        const durationText = getDurationText(beatValue);
        const fractionText = getFractionalNotation(beatValue);

        figureFocusDisplayEl.innerHTML = `
            <div class="focus-symbol">${item.baseSymbol || item.symbol}</div>
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

function groupTuplets(pattern) {
    const groupedPattern = [];
    let i = 0;
    while (i < pattern.length) {
        const item = pattern[i];
        if (item.isTupletChild) {
            const tupletGroup = {
                type: 'tuplet_group',
                tupletN: item.tupletN,
                items: [],
                originalIndices: []
            };
            while (i < pattern.length && 
                   pattern[i].isTupletChild && 
                   pattern[i].tupletN === tupletGroup.tupletN &&
                   tupletGroup.items.length < tupletGroup.tupletN) {
                tupletGroup.items.push(pattern[i]);
                tupletGroup.originalIndices.push(i);
                i++;
            }
            groupedPattern.push(tupletGroup);
        } else {
            groupedPattern.push(item);
            i++;
        }
    }
    return groupedPattern;
}

function renderFigure(item, index, beatContext) {
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
    
    if (beatContext && !item.isControl) {
        const { currentBeatsInMeasure, timeSig, tolerance } = beatContext;
        const beatValue = getBeatValue(item.duration, timeSig);
        let beatHTML = '';

        if (beatValue >= 1) {
             const roundedBeatValue = Math.floor(beatValue);
             for (let i = 0; i < roundedBeatValue; i++) {
                 const beatNumber = Math.floor(currentBeatsInMeasure) + 1 + i;
                 beatHTML += `<span data-beat-index="${i}">${beatNumber}</span>`;
             }
        } else {
            const beatNumber = Math.floor(currentBeatsInMeasure) + 1;
            const fraction = currentBeatsInMeasure - Math.floor(currentBeatsInMeasure);
            let beatDisplay = '&nbsp;';

            if (Math.abs(fraction) < tolerance) beatDisplay = beatNumber;
            else if (Math.abs(fraction - 0.5) < tolerance) beatDisplay = 'e';
            else if (Math.abs(fraction - 0.25) < tolerance) beatDisplay = '+';
            else if (Math.abs(fraction - 0.75) < tolerance) beatDisplay = 'a';
            else if (item.isTupletChild && Math.abs(fraction) > tolerance) beatDisplay = '&';
            
            beatHTML = `<span data-beat-index="0">${beatDisplay}</span>`;
        }
        beatCounterElement.innerHTML = beatHTML;
    }

    const noteItemElement = document.createElement('div');
    noteItemElement.className = `note-item ${item.type === 'note' ? 'bg-blue-500' : 'bg-gray-300'}`;
    noteItemElement.innerHTML = item.baseSymbol || item.symbol;
    if(item.isControl) noteItemElement.classList.add('control-item');

    const syllableElement = document.createElement('div');
    syllableElement.className = 'syllable-text';
    syllableElement.innerHTML = item.syllable || '&nbsp;';
    
    figureContainer.append(beatCounterElement, noteItemElement, syllableElement);
    return figureContainer;
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
    const timeSigWidth = 76;
    const figureWidth = 60;
    const barlineWidth = 18;
    const gapWidth = 4;
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
    
    const groupedPattern = groupTuplets(AppState.activePattern);

    groupedPattern.forEach((group) => {
        let elementToAppend;
        let elementWidth = 0;
        let currentItemIndex = -1;

        if (group.type === 'tuplet_group') {
            const tupletContainer = document.createElement('div');
            tupletContainer.className = 'tuplet-container';

            const tupletIndicator = document.createElement('div');
            tupletIndicator.className = 'tuplet-indicator';
            tupletIndicator.innerHTML = `<span class="tuplet-number">${group.tupletN}</span>`;
            tupletContainer.appendChild(tupletIndicator);
            
            let tupletBeats = 0;
            group.items.forEach((item, itemIndex) => {
                const originalIndex = group.originalIndices[itemIndex];
                const beatContext = { currentBeatsInMeasure, timeSig, tolerance };
                const figureEl = renderFigure(item, originalIndex, beatContext);
                tupletContainer.appendChild(figureEl);
                if (!item.isControl) {
                    const itemBeats = getBeatValue(item.duration, timeSig);
                    currentBeatsInMeasure += itemBeats;
                    tupletBeats += itemBeats;
                }
            });
            elementToAppend = tupletContainer;
            elementWidth = group.items.length * (figureWidth + gapWidth);
            currentItemIndex = group.originalIndices[group.originalIndices.length - 1];
        } else {
            const item = group;
            currentItemIndex = AppState.activePattern.findIndex(p => p === item);
            if (item.type === 'final_barline') return;
            
            const beatContext = { currentBeatsInMeasure, timeSig, tolerance };
            elementToAppend = renderFigure(item, currentItemIndex, beatContext);
            elementWidth = figureWidth;
             if (!item.isControl) {
                currentBeatsInMeasure += getBeatValue(item.duration, timeSig);
            }
        }

        if (containerWidth > 0 && currentRowWidth + gapWidth + elementWidth > containerWidth && currentRow.children.length > 1) {
            currentRow = document.createElement('div');
            currentRow.className = 'rhythm-row';
            rhythmDisplayEl.appendChild(currentRow);
            addTimeSignature(currentRow);
            currentRowWidth = timeSigWidth;
        }
        
        currentRow.appendChild(elementToAppend);
        currentRowWidth += gapWidth + elementWidth;

        if (Math.abs(currentBeatsInMeasure - totalMeasureBeats) < tolerance) {
            const hasMoreMusic = AppState.activePattern.slice(currentItemIndex + 1).some(fig => !fig.isControl && fig.type !== 'final_barline');
            if (hasMoreMusic) {
                 if (containerWidth > 0 && currentRowWidth + gapWidth + barlineWidth > containerWidth) {
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
    updateLoginUI(AppState.user.currentUser);
}

export function populateLessonModal() {
    const contentEl = document.getElementById('lesson-modal-content');
    if (!contentEl) return;
    contentEl.innerHTML = '';

    const modules = {};
    lessons.forEach((lesson, index) => {
        const moduleName = lesson.name.split(' - ')[0];
        if (!modules[moduleName]) {
            modules[moduleName] = [];
        }
        modules[moduleName].push({ ...lesson, originalIndex: index });
    });

    for (const moduleName in modules) {
        const moduleContainer = document.createElement('div');
        
        const header = document.createElement('div');
        header.className = 'accordion-module-header';
        header.textContent = moduleName;
        
        const list = document.createElement('div');
        list.className = 'accordion-lessons-list';
        
        modules[moduleName].forEach(lesson => {
            const item = document.createElement('div');
            item.className = 'accordion-lesson-item';
            item.textContent = lesson.name.split(': ')[1];
            item.dataset.index = lesson.originalIndex;
            list.appendChild(item);
        });

        moduleContainer.appendChild(header);
        moduleContainer.appendChild(list);
        contentEl.appendChild(moduleContainer);
    }
}

export function populateFigurePalette() {
    const figurePaletteDiv = document.getElementById('figure-palette');
    if (!figurePaletteDiv) return;
    figurePaletteDiv.innerHTML = '';
    
    rhythmicFigures.forEach(fig => {
        const button = document.createElement('button');
        button.className = 'figure-button';
        if (fig.isControl) button.classList.add('figure-button-control');
        
        button.innerHTML = fig.symbol; 
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

export function updateLoginUI(user) {
    const loggedOutView = document.getElementById('logged-out-view');
    const loggedInView = document.getElementById('logged-in-view');
    
    const saveRhythmButton = document.getElementById('save-rhythm-button');
    const loadRhythmsButton = document.getElementById('load-rhythms-button');
    
    const userNameSpan = document.getElementById('user-name');
    const userAvatarImg = document.getElementById('user-avatar');
    const userPointsSpan = document.getElementById('user-points');
    
    const isLoggedIn = !!user;

    if (isLoggedIn) {
        loggedInView.classList.remove('hidden');
        loggedInView.classList.add('visible');
        loggedOutView.classList.remove('visible');
        loggedOutView.classList.add('hidden');

        userNameSpan.textContent = user.displayName;
        userAvatarImg.src = user.photo;
        userPointsSpan.textContent = `${user.points || 0} PONTOS`;

        AppState.user.currentUser = user;
    } else {
        loggedOutView.classList.remove('hidden');
        loggedOutView.classList.add('visible');
        loggedInView.classList.remove('visible');
        loggedInView.classList.add('hidden');

        AppState.user.currentUser = null;
    }
    
    const showUserButtons = isLoggedIn && AppState.currentMode === 'freeCreate';
    saveRhythmButton.classList.toggle('hidden', !showUserButtons);
    loadRhythmsButton.classList.toggle('hidden', !showUserButtons);
}