// ui.js

import { AppState } from './state.js';
import { rhythmicFigures, lessons } from './config.js';
import { getBeatValue, getDurationText, getFractionalNotation, handlePaletteFigureClick, handleFigureSelectionForEditing, updateActivePatternAndTimeSignature, processPattern } from './core.js';
import { playFigurePreview } from './audio.js';
import { theorySections } from './theoryContent.js';

const rhythmDisplayEl = document.getElementById('rhythm-display');
const rhythmDisplayContainer = document.getElementById('rhythm-display-container');
const figureFocusDisplayEl = document.getElementById('figure-focus-display');
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
const theoryGuideModal = document.getElementById('theory-guide-modal');

export function renderDictationFeedback(annotatedPattern, correctPattern) {
    rhythmDisplayContainer.innerHTML = `
        <div class="dictation-feedback-container">
            <div class="feedback-section">
                <h3 class="feedback-section-title">Sua Resposta</h3>
                <div id="user-rhythm-display"></div>
            </div>
            <div class="feedback-section">
                <h3 class="feedback-section-title">Resposta Correta</h3>
                <div id="correct-rhythm-display"></div>
            </div>
        </div>
    `;

    const originalActivePattern = AppState.activePattern;
    const userDisplayEl = document.getElementById('user-rhythm-display');
    const correctDisplayEl = document.getElementById('correct-rhythm-display');
    
    AppState.activePattern = annotatedPattern;
    renderRhythm(userDisplayEl);

    const correctPatternProcessed = processPattern(correctPattern);
    AppState.activePattern = correctPatternProcessed;
    renderRhythm(correctDisplayEl);

    AppState.activePattern = originalActivePattern;
}

export function showModal(modalElement) {
    if (modalOverlay) modalOverlay.classList.remove('hidden');
    if (modalElement) modalElement.classList.remove('hidden');
}

export function hideAllModals() {
    if (modalOverlay) modalOverlay.classList.add('hidden');
    if (loginModal) loginModal.classList.add('hidden');
    if (saveRhythmModal) saveRhythmModal.classList.add('hidden');
    if (loadRhythmModal) loadRhythmModal.classList.add('hidden');
    if (errorModal) errorModal.classList.add('hidden');
    if (lessonModal) lessonModal.classList.add('hidden');
    if (theoryGuideModal) theoryGuideModal.classList.add('hidden');
}

export function showErrorModal(message) {
    if (errorModalText) errorModalText.textContent = message;
    showModal(errorModal);
}

export function populateLoadRhythmModal(userRhythms) {
    const listContainer = document.getElementById('load-rhythm-list');
    if (!listContainer) return;
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
    if (editPopover) editPopover.classList.add('hidden');
}

export function showEditPopover(figureElement) {
    if (!editPopover || !rhythmDisplayContainer) return;
    const containerRect = rhythmDisplayContainer.getBoundingClientRect();
    const figureRect = figureElement.getBoundingClientRect();

    const top = figureRect.top - containerRect.top + rhythmDisplayContainer.scrollTop - editPopover.offsetHeight - 10;
    const left = figureRect.left - containerRect.left + rhythmDisplayContainer.scrollLeft + (figureRect.width / 2) - (editPopover.offsetWidth / 2);

    editPopover.style.top = `${top}px`;
    editPopover.style.left = `${left}px`;
    editPopover.classList.remove('hidden');
}

export function updateMessage(text, type = 'info') {
    if (!messageArea) return;
    messageArea.textContent = text;
    messageArea.style.color = '';
    switch (type) {
        case 'error': messageArea.style.color = 'var(--glow-red)'; break;
        case 'success': messageArea.style.color = 'var(--glow-green)'; break;
        default: messageArea.style.color = 'var(--glow-cyan)'; break;
    }
}

export function updateCountdownDisplay(text) {
    if (countdownDisplay) countdownDisplay.textContent = text;
}

export function updatePlaybackButtons(isPlaying) {
    if (!playPauseButton) return;
    if (isPlaying) {
        playPauseButton.innerHTML = `<i class="fas fa-pause"></i> Pausar`;
    } else {
        playPauseButton.innerHTML = `<i class="fas fa-play"></i> Tocar`;
    }
}

export function enableAllControls() {
    document.querySelectorAll('button, .custom-select').forEach(el => el.style.pointerEvents = 'auto');
    updateLoginUI(AppState.user.currentUser);
}

export function disablePlaybackControls(keepPlaybackButtonsEnabled = false) {
    document.querySelectorAll('button, .custom-select').forEach(el => {
        if (!el.closest('.playback-panel')) {
            el.style.pointerEvents = 'none';
        }
    });
    if (keepPlaybackButtonsEnabled) {
        if (playPauseButton) playPauseButton.style.pointerEvents = 'auto';
        const resetButton = document.getElementById('reset-button');
        if(resetButton) resetButton.style.pointerEvents = 'auto';
    }
}

export function highlightActiveVisualElement(patternIndex, activeBeatIndex = 0) {
    document.querySelectorAll('.figure-container.highlight, .figure-container.beat-pulse-glow').forEach(el => {
        el.classList.remove('highlight', 'beat-pulse-glow');
    });
    document.querySelectorAll('.beat-active').forEach(el => el.classList.remove('beat-active'));

    if (patternIndex !== null && AppState.activePattern[patternIndex]) {
        const currentFigureContainers = document.querySelectorAll(`.figure-container[data-pattern-index="${patternIndex}"]`);
        currentFigureContainers.forEach(container => {
            if (container) {
                container.classList.add('highlight', 'beat-pulse-glow');
                const beatSpan = container.querySelector(`.beat-counter-text span[data-beat-index="${activeBeatIndex}"]`);
                if (beatSpan) {
                    beatSpan.classList.add('beat-active');
                }
                if (container.closest('#rhythm-display')) {
                    updateFigureFocusDisplay(AppState.activePattern[patternIndex]);
                    container.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
                }
            }
        });
    } else {
        updateFigureFocusDisplay(null);
    }
}

export function updateFigureFocusDisplay(item) {
    if (!figureFocusDisplayEl) return;
    if (item && !item.isControl) {
        const figureDef = rhythmicFigures.find(rf => (rf.baseSymbol || rf.symbol) === (item.baseSymbol || item.symbol) && Math.abs(rf.duration - item.duration) < 0.01);
        if (!figureDef) {
            figureFocusDisplayEl.innerHTML = `<div class="focus-placeholder">Passe o mouse sobre uma figura para ver os detalhes.</div>`;
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
            </div>`;
        figureFocusDisplayEl.classList.add('visible');
    } else {
        figureFocusDisplayEl.innerHTML = `<div class="focus-placeholder">Passe o mouse sobre uma figura para ver os detalhes.</div>`;
        figureFocusDisplayEl.classList.remove('visible');
    }
}

function drawTie(row, startEl, endEl) {
    if (!row || !startEl || !endEl) return;
    const startRect = startEl.getBoundingClientRect();
    const endRect = endEl.getBoundingClientRect();
    const startX = startEl.offsetLeft + (startRect.width / 2);
    const endX = endEl.offsetLeft + (endRect.width / 2);
    const width = endX - startX;
    const noteItem = startEl.querySelector('.note-item');
    if (!noteItem) return;
    const yPos = noteItem.offsetTop + noteItem.offsetHeight;
    const curvature = 20 + (width * 0.2);
    const M = `M ${startX},${yPos}`;
    const Q = `Q ${startX + width / 2},${yPos + curvature} ${endX},${yPos}`;
    const svgNS = "http://www.w3.org/2000/svg";
    const svg = document.createElementNS(svgNS, "svg");
    svg.classList.add('tie-svg');
    const path = document.createElementNS(svgNS, "path");
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
            const tupletGroup = { type: 'tuplet_group', tupletN: item.tupletN, items: [], originalIndices: [] };
            let tempIndex = i;
            while (tempIndex < pattern.length && pattern[tempIndex].isTupletChild && pattern[tempIndex].tupletN === tupletGroup.tupletN && tupletGroup.items.length < tupletGroup.tupletN) {
                tupletGroup.items.push(pattern[tempIndex]);
                tupletGroup.originalIndices.push(tempIndex);
                tempIndex++;
            }
            groupedPattern.push(tupletGroup);
            i = tempIndex;
        } else {
            groupedPattern.push({ ...item, originalIndex: i });
            i++;
        }
    }
    return groupedPattern;
}

function renderFigure(item, index, beatContext) {
    const figureContainer = document.createElement('div');
    figureContainer.className = 'figure-container';
    figureContainer.dataset.patternIndex = index;

    if ((AppState.currentMode === 'freeCreate' || AppState.currentMode === 'gameRhythmicDictation') && !item.isControl) {
        figureContainer.addEventListener('click', (e) => {
            e.stopPropagation();
            handleFigureSelectionForEditing(index);
            renderRhythm();
            const newFigureElement = rhythmDisplayEl.querySelector(`.figure-container[data-pattern-index="${index}"]`);
            if (newFigureElement && AppState.selectedIndexForEditing === index) {
                showEditPopover(newFigureElement);
            }
        });
        if (AppState.selectedIndexForEditing === index) {
            figureContainer.classList.add('selected-for-edit');
        }
    }

    const beatCounterElement = document.createElement('div');
    beatCounterElement.className = 'beat-counter-text';
    if (beatContext && !item.isControl && beatContext.currentBeatsInMeasure >= 0) {
        const { currentBeatsInMeasure, timeSig, tolerance } = beatContext;
        const beatValue = getBeatValue(item.duration, timeSig);
        let beatHTML = '';
        if (beatValue >= 1 && Math.abs(beatValue - Math.round(beatValue)) < tolerance) {
            const roundedBeatValue = Math.round(beatValue);
            for (let i = 0; i < roundedBeatValue; i++) {
                const beatNumber = Math.floor(currentBeatsInMeasure + tolerance) + 1 + i;
                beatHTML += `<span data-beat-index="${i}">${beatNumber}</span>`;
            }
        } else {
            const beatNumber = Math.floor(currentBeatsInMeasure + tolerance) + 1;
            const fraction = currentBeatsInMeasure - Math.floor(currentBeatsInMeasure + tolerance);
            let beatDisplay = '';
            if (Math.abs(fraction) < tolerance) beatDisplay = String(beatNumber);
            else if (Math.abs(fraction - 0.5) < tolerance) beatDisplay = 'e';
            else if (Math.abs(fraction - 0.25) < tolerance) beatDisplay = '+';
            else if (Math.abs(fraction - 0.75) < tolerance) beatDisplay = 'a';
            else if (item.isTupletChild && Math.abs(fraction) > tolerance) beatDisplay = '&';
            beatHTML = `<span data-beat-index="0">${beatDisplay || '&nbsp;'}</span>`;
        }
        beatCounterElement.innerHTML = beatHTML;
    }

    const noteItemElement = document.createElement('div');
    noteItemElement.className = `note-item ${item.type === 'note' ? 'bg-blue-500' : 'bg-gray-300'}`;
    noteItemElement.innerHTML = item.baseSymbol || item.symbol;
    if (item.isControl) noteItemElement.classList.add('control-item');
    if (typeof item.isCorrect === 'boolean') {
        noteItemElement.classList.add(item.isCorrect ? 'feedback-correct' : 'feedback-incorrect');
    }

    const syllableElement = document.createElement('div');
    syllableElement.className = 'syllable-text';
    syllableElement.innerHTML = item.syllable || '&nbsp;';
    
    figureContainer.append(beatCounterElement, noteItemElement, syllableElement);
    return figureContainer;
}

export function renderRhythm(targetElement = null) {
    const displayEl = targetElement || document.getElementById('rhythm-display');
    const containerEl = targetElement ? displayEl.closest('.feedback-section, #rhythm-display-container') : rhythmDisplayContainer;
    
    displayEl.innerHTML = '';
    if (!targetElement) {
        updateFigureFocusDisplay(null);
        hideEditPopover();
    }
    
    const timeSig = AppState.activeTimeSignature;
    
    if (!AppState.activePattern || AppState.activePattern.length === 0) {
        if (AppState.currentMode !== 'freeCreate') {
            const row = document.createElement('div');
            row.className = 'rhythm-row';
            const system = document.createElement('div');
            system.className = 'rhythm-system';
            system.appendChild(row);
            displayEl.appendChild(system);
            if (!targetElement) {
                 const timeSigEl = document.createElement('div');
                 timeSigEl.className = 'time-signature-main';
                 timeSigEl.innerHTML = `<span>${timeSig.beats}</span><span>${timeSig.beatType}</span>`;
                 row.appendChild(timeSigEl);
            }
        } else {
             const message = "Comece a adicionar figuras no Painel de Criação.";
             displayEl.innerHTML = `<p class="text-slate-400 text-center w-full text-lg self-center">${message}</p>`;
        }
        return;
    }

    const totalMeasureBeats = parseFloat(timeSig.beats);
    const tolerance = 0.001;
    let currentBeatsInMeasure = 0;
    
    const containerWidth = containerEl.clientWidth > 0 ? containerEl.clientWidth - 30 : 800;
    const timeSigWidth = 60 + 16;
    const figureWidthWithGap = 60 + 4;
    const barlineWidthWithGap = 18 + 8;

    let currentSystem = document.createElement('div');
    currentSystem.className = 'rhythm-system';
    displayEl.appendChild(currentSystem);
    let currentRow = document.createElement('div');
    currentRow.className = 'rhythm-row';
    currentSystem.appendChild(currentRow);
    let currentRowWidth = timeSigWidth;
    
    const addTimeSignature = (row) => {
        const timeSigEl = document.createElement('div');
        timeSigEl.className = 'time-signature-main';
        timeSigEl.innerHTML = `<span>${timeSig.beats}</span><span>${timeSig.beatType}</span>`;
        row.appendChild(timeSigEl);
    };
    addTimeSignature(currentRow);
    
    const groupedPattern = groupTuplets(AppState.activePattern);

    groupedPattern.forEach((group) => {
        let elementToAppend, elementWidth = 0, lastOriginalIndex = -1;
        if (group.type === 'tuplet_group') {
            const tupletContainer = document.createElement('div');
            tupletContainer.className = 'tuplet-container';
            const tupletIndicator = document.createElement('div');
            tupletIndicator.className = 'tuplet-indicator';
            tupletIndicator.innerHTML = `<span class="tuplet-number">${group.tupletN}</span>`;
            tupletContainer.appendChild(tupletIndicator);
            group.items.forEach((item, itemIndex) => {
                const beatContext = { currentBeatsInMeasure, timeSig, tolerance };
                const figureEl = renderFigure(item, group.originalIndices[itemIndex], beatContext);
                tupletContainer.appendChild(figureEl);
                if (!item.isControl) currentBeatsInMeasure += getBeatValue(item.duration, timeSig);
            });
            elementToAppend = tupletContainer;
            elementWidth = group.items.length * figureWidthWithGap;
            lastOriginalIndex = group.originalIndices[group.originalIndices.length - 1];
        } else {
            const item = group;
            lastOriginalIndex = item.originalIndex;
            if (item.type === 'final_barline') return;
            const beatContext = { currentBeatsInMeasure, timeSig, tolerance };
            elementToAppend = renderFigure(item, lastOriginalIndex, beatContext);
            elementWidth = figureWidthWithGap;
            if (!item.isControl) currentBeatsInMeasure += getBeatValue(item.duration, timeSig);
        }
        if (currentRowWidth + elementWidth > containerWidth && currentRow.children.length > 1) {
            currentRow = document.createElement('div');
            currentRow.className = 'rhythm-row';
            currentSystem.appendChild(currentRow);
            currentRowWidth = 0;
        }
        currentRow.appendChild(elementToAppend);
        currentRowWidth += elementWidth;
        if (Math.abs(currentBeatsInMeasure - totalMeasureBeats) < tolerance) {
            currentBeatsInMeasure = 0;
            const hasMoreMusic = AppState.activePattern.slice(lastOriginalIndex + 1).some(fig => !fig.isControl && fig.type !== 'final_barline');
            if (hasMoreMusic) {
                if (currentRowWidth + barlineWidthWithGap > containerWidth) {
                    currentRow = document.createElement('div');
                    currentRow.className = 'rhythm-row';
                    currentSystem.appendChild(currentRow);
                    currentRowWidth = 0;
                }
                const barlineEl = document.createElement('div');
                barlineEl.className = 'barline-container';
                barlineEl.innerHTML = `<div class="barline-item"></div>`;
                currentRow.appendChild(barlineEl);
                currentRowWidth += barlineWidthWithGap;
            }
        }
    });

    const lastItem = AppState.activePattern[AppState.activePattern.length - 1];
    if (lastItem && lastItem.type === 'final_barline') {
        const finalBarEl = document.createElement('div');
        finalBarEl.className = 'final-barline-container';
        finalBarEl.innerHTML = `<div class="final-barline-item"><div class="thin-bar"></div><div class="thick-bar"></div></div>`;
        currentRow.appendChild(finalBarEl);
    }

    displayEl.querySelectorAll('.rhythm-row').forEach(row => {
        AppState.activePattern.forEach((item, index) => {
            if (item.tiedToNext) {
                const startEl = row.querySelector(`.figure-container[data-pattern-index="${index}"]`);
                let nextNoteIndex = index + 1;
                while (nextNoteIndex < AppState.activePattern.length && (AppState.activePattern[nextNoteIndex].isControl || AppState.activePattern[nextNoteIndex].type === 'rest')) {
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
        header.innerHTML = `<span>${moduleName}</span><i class="fas fa-chevron-down"></i>`;
        const list = document.createElement('div');
        list.className = 'accordion-lessons-list';
        modules[moduleName].forEach(lesson => {
            const item = document.createElement('div');
            item.className = 'accordion-lesson-item';
            item.dataset.index = lesson.originalIndex;
            let difficultyHTML = '<div class="lesson-difficulty">';
            for (let i = 1; i <= 3; i++) {
                difficultyHTML += `<span class="${i <= (lesson.difficulty || 1) ? 'active' : ''}"></span>`;
            }
            difficultyHTML += '</div>';
            item.innerHTML = `
                <div class="lesson-item-title">${lesson.name.split(': ')[1]}</div>
                <div class="lesson-item-meta">
                    <span>${lesson.timeSignature.beats}/${lesson.timeSignature.beatType}</span>
                    ${difficultyHTML}
                </div>`;
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
    
    const paletteFigures = rhythmicFigures.filter(fig => !fig.isControl);

    paletteFigures.forEach(fig => {
        const button = document.createElement('button');
        button.className = 'figure-button';
        button.innerHTML = fig.symbol;
        button.title = fig.name;

        button.addEventListener('mouseenter', () => playFigurePreview(fig));
        button.addEventListener('click', () => {
            const result = handlePaletteFigureClick({ ...fig });
            if (result.success) {
                updateActivePatternAndTimeSignature();
                renderRhythm();
            } else {
                updateMessage(result.message, 'error');
            }
        });
        figurePaletteDiv.appendChild(button);
    });
}

export function populateTheoryGuideModal() {
    const contentEl = document.getElementById('theory-guide-content');
    if (!contentEl) return;
    contentEl.innerHTML = '';

    theorySections.forEach(section => {
        const sectionDiv = document.createElement('div');
        sectionDiv.className = 'theory-section';
        
        const title = document.createElement('h3');
        title.textContent = section.title;
        
        const content = document.createElement('div');
        content.innerHTML = section.content;

        sectionDiv.appendChild(title);
        sectionDiv.appendChild(content);
        contentEl.appendChild(sectionDiv);
    });
}

export function switchMode(mode) {
    AppState.currentMode = mode;
    AppState.selectedIndexForEditing = null;
    const gamePanel = document.getElementById('game-panel');
    const lessonSelectorContainer = document.getElementById('lesson-selector-container');
    const customRhythmCreatorDiv = document.getElementById('custom-rhythm-creator');
    const gameFigureHintEl = document.getElementById('game-figure-hint');
    rhythmDisplayContainer.innerHTML = '<div id="rhythm-display"></div>';
    gamePanel.classList.add('hidden');
    lessonSelectorContainer.style.display = 'none';
    customRhythmCreatorDiv.classList.add('hidden');
    gameFigureHintEl.classList.add('hidden');
    AppState.customPattern = [];
    if (mode === 'lessons') {
        lessonSelectorContainer.style.display = 'block';
        updateMessage("Selecione uma lição na lista.");
    } else if (mode === 'freeCreate') {
        customRhythmCreatorDiv.classList.remove('hidden');
        updateMessage("Modo de Criação Livre ativado.");
    } else if (mode === 'gameRhythmicDictation') {
        gamePanel.classList.remove('hidden');
        customRhythmCreatorDiv.classList.remove('hidden');
        updateMessage("Jogo: Ditado Rítmico. Clique em 'Ouvir Ditado'.");
        document.getElementById('start-dictation-btn').textContent = "Ouvir Ditado";
        document.getElementById('check-dictation-btn').classList.add('hidden');
        let levelDisplay = document.getElementById('game-level-display');
        levelDisplay.textContent = `Nível: ${AppState.currentGameLevel}`;
    }
    updateActivePatternAndTimeSignature();
    setTimeout(() => renderRhythm(), 50);
    updateLoginUI(AppState.user.currentUser);
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
        if (loggedInView) {
            loggedInView.classList.remove('hidden');
            loggedInView.classList.add('visible');
        }
        if (loggedOutView) {
            loggedOutView.classList.remove('visible');
            loggedOutView.classList.add('hidden');
        }
        if (userNameSpan) userNameSpan.textContent = user.displayName;
        if (userAvatarImg) userAvatarImg.src = user.photo;
        if (userPointsSpan) userPointsSpan.textContent = `${user.points || 0} PONTOS`;
        AppState.user.currentUser = user;
    } else {
        if (loggedOutView) {
            loggedOutView.classList.remove('hidden');
            loggedOutView.classList.add('visible');
        }
        if (loggedInView) {
            loggedInView.classList.remove('visible');
            loggedInView.classList.add('hidden');
        }
        AppState.user.currentUser = null;
    }
    
    const showUserButtons = isLoggedIn && (AppState.currentMode === 'freeCreate' || AppState.currentMode === 'gameRhythmicDictation');
    if (saveRhythmButton) saveRhythmButton.classList.toggle('hidden', !showUserButtons);
    if (loadRhythmsButton) loadRhythmsButton.classList.toggle('hidden', !showUserButtons);
}