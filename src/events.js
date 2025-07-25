// events.js
import * as api from './api.js';
import { startCountdownAndPlay, togglePauseResume, stopRhythmExecution, playDictationPatternWithCountdown } from './audio.js';
import { AppState } from './state.js';
import { updateActivePatternAndTimeSignature, generateDictation, checkDictation, getCurrentDictationPattern, processPattern } from './core.js';
import { switchMode, renderRhythm, updateMessage, updateLoginUI, showModal, hideAllModals, populateLoadRhythmModal, hideEditPopover, updateFigureFocusDisplay, populateLessonModal, renderDictationFeedback } from './ui.js';

const saveRhythmModal = document.getElementById('save-rhythm-modal');
const loadRhythmModal = document.getElementById('load-rhythm-modal');
const lessonModal = document.getElementById('lesson-modal');
const rhythmNameInput = document.getElementById('rhythm-name-input');
const continuousMetronomeToggle = document.getElementById('continuous-metronome-toggle');

async function addPointsAndUpdateUI(points) {
    if (!AppState.user.currentUser || points <= 0) {
        return;
    }

    try {
        const updatedUser = await api.addPoints(points);
        if (updatedUser) {
            updateLoginUI(updatedUser);
        }
    } catch (error) {
        console.error('Erro de rede ao tentar adicionar pontos:', error);
        updateMessage(error.message || "Erro de rede ao salvar pontos.", "error");
    }
}

function startAutoSave() {
    if (AppState.autoSaveInterval) {
        clearInterval(AppState.autoSaveInterval);
    }
    AppState.autoSaveInterval = setInterval(() => {
        if (AppState.currentMode === 'freeCreate' && AppState.customPattern.length > 0) {
            const draft = {
                pattern: AppState.customPattern,
                timeSignature: AppState.activeTimeSignature,
                timestamp: new Date().toISOString()
            };
            localStorage.setItem('lrc_autoDraft', JSON.stringify(draft));
            console.log("Rascunho salvo automaticamente.");
        }
    }, 30000);
}

async function handleSaveRhythm() {
    if (!AppState.user.currentUser) {
        updateMessage("Faça login para salvar.", "error");
        hideAllModals();
        return;
    }
    if (!AppState.customPattern || AppState.customPattern.length === 0) {
        updateMessage("Não há ritmo para salvar.", "error");
        hideAllModals();
        return;
    }
    const rhythmName = rhythmNameInput.value.trim();
    if (rhythmName) {
        try {
            const rhythmData = {
                name: rhythmName,
                pattern: AppState.customPattern,
                timeSignature: AppState.activeTimeSignature
            };
            await api.saveRhythm(rhythmData);
            updateMessage(`Ritmo "${rhythmName}" salvo com sucesso.`, "success");
            hideAllModals();
            rhythmNameInput.value = '';
        } catch (error) {
            updateMessage(error.message || "Erro ao salvar o ritmo.", "error");
        }
    } else {
        updateMessage("Por favor, dê um nome para o seu ritmo.", "error");
    }
}

function handleLoadRhythm(rhythm) {
    if (!rhythm) {
        updateMessage("Seleção inválida.", "error");
        return;
    }

    AppState.customPattern = JSON.parse(JSON.stringify(rhythm.pattern));
    
    const beatsSelect = document.getElementById('custom-beats-select');
    const typeSelect = document.getElementById('custom-type-select');

    const newBeatOption = beatsSelect.querySelector(`.custom-option[data-value="${rhythm.timeSignature.beats}"]`);
    if(newBeatOption) {
        beatsSelect.querySelector('.custom-option.selected')?.classList.remove('selected');
        newBeatOption.classList.add('selected');
        beatsSelect.querySelector('.custom-select-trigger').textContent = newBeatOption.textContent;
    }

    const newTypeOption = typeSelect.querySelector(`.custom-option[data-value="${rhythm.timeSignature.beatType}"]`);
    if(newTypeOption) {
        typeSelect.querySelector('.custom-option.selected')?.classList.remove('selected');
        newTypeOption.classList.add('selected');
        typeSelect.querySelector('.custom-select-trigger').textContent = newTypeOption.textContent;
    }
    
    switchMode('freeCreate'); 
    updateActivePatternAndTimeSignature();
    renderRhythm();
    updateMessage(`Ritmo "${rhythm.name}" carregado.`, "success");
    hideAllModals();
}


function setupCustomSelect(selectElement, panelElement, onSelectCallback) {
     selectElement.addEventListener('click', (e) => {
        e.stopPropagation();
        const isOpen = selectElement.classList.toggle('open');
        if (panelElement) {
            panelElement.classList.toggle('panel-on-top', isOpen);
        }
    });

    selectElement.querySelectorAll('.custom-option').forEach(option => {
        option.addEventListener('click', (e) => {
            e.stopPropagation();
            const selectedValue = option.dataset.value;
            const selectedText = option.textContent;

            selectElement.querySelector('.custom-option.selected')?.classList.remove('selected');
            option.classList.add('selected');
            selectElement.querySelector('.custom-select-trigger').textContent = selectedText;

            selectElement.classList.remove('open');
            if (panelElement) {
                panelElement.classList.remove('panel-on-top');
            }
            
            if (onSelectCallback) {
                onSelectCallback(selectedValue);
            }
        });
    });
}

export function setupEventListeners() {
    
    const customModeSelect = document.getElementById('custom-mode-select');
    const modePanel = customModeSelect.closest('.panel');
    setupCustomSelect(customModeSelect, modePanel, switchMode);

    const customBeatsSelect = document.getElementById('custom-beats-select');
    const customTypeSelect = document.getElementById('custom-type-select');
    const creationPanel = document.getElementById('custom-rhythm-creator');

    const onTimeSignatureChange = () => {
         if (AppState.currentMode === 'freeCreate') {
            stopRhythmExecution(true);
            updateActivePatternAndTimeSignature();
            renderRhythm();
        }
    }

    setupCustomSelect(customBeatsSelect, creationPanel, onTimeSignatureChange);
    setupCustomSelect(customTypeSelect, creationPanel, onTimeSignatureChange);

    document.addEventListener('click', (e) => {
        const openCustomSelects = document.querySelectorAll('.custom-select.open');
        openCustomSelects.forEach(select => {
            if (!select.contains(e.target)) {
                 select.classList.remove('open');
                 select.closest('.panel')?.classList.remove('panel-on-top');
            }
        });
    });

    const tempoDisplay = document.getElementById('tempo-display');
    const updateTempo = (newTempo) => {
        tempoDisplay.textContent = newTempo;
        if(AppState.isPlaying) Tone.Transport.bpm.rampTo(newTempo, 0.1);
    };

    document.getElementById('tempo-decrease').addEventListener('click', () => updateTempo(Math.max(30, parseInt(tempoDisplay.textContent) - 5)));
    document.getElementById('tempo-increase').addEventListener('click', () => updateTempo(Math.min(280, parseInt(tempoDisplay.textContent) + 5)));

    document.getElementById('play-pause-button').addEventListener('click', () => {
        if (AppState.isPlaying || Tone.Transport.state === 'paused') {
            togglePauseResume();
        } else {
            startCountdownAndPlay();
        }
    });

    document.getElementById('reset-button').addEventListener('click', () => {
        stopRhythmExecution(true);
    });
    
    continuousMetronomeToggle.addEventListener('change', (e) => {
        AppState.continuousMetronome = e.target.checked;
        if (!e.target.checked && AppState.metronomeEventId && !AppState.isPlaying) {
            stopRhythmExecution(true);
        }
    });

    document.getElementById('clear-custom-rhythm').addEventListener('click', () => {
        if(confirm("Tem a certeza que deseja limpar o padrão atual?")) {
            AppState.customPattern = [];
            AppState.selectedIndexForEditing = null;
            hideEditPopover();
            updateActivePatternAndTimeSignature();
            renderRhythm();
            updateMessage("Padrão limpo.");
        }
    });
    
    document.getElementById('save-rhythm-button').addEventListener('click', () => showModal(saveRhythmModal));
    
    document.getElementById('load-rhythms-button').addEventListener('click', async () => {
        if (!AppState.user.currentUser) {
            updateMessage("Faça login para carregar ritmos.", "error");
            return;
        }
        try {
            const userRhythms = await api.getRhythms();
            AppState.user.savedRhythms = userRhythms;
            populateLoadRhythmModal(userRhythms);
            showModal(loadRhythmModal);
        } catch (error) {
            updateMessage(error.message || "Erro ao carregar ritmos.", "error");
        }
    });
    
    document.getElementById('save-confirm-button').addEventListener('click', handleSaveRhythm);
    document.getElementById('save-cancel-button').addEventListener('click', hideAllModals);
    document.getElementById('load-cancel-button').addEventListener('click', hideAllModals);
    document.getElementById('error-ok-button').addEventListener('click', hideAllModals);

    document.getElementById('load-rhythm-list').addEventListener('click', (e) => {
        const button = e.target.closest('.load-item-button');
        if (button) {
            const index = parseInt(button.dataset.index);
            const rhythmToLoad = AppState.user.savedRhythms[index];
            handleLoadRhythm(rhythmToLoad);
        }
    });

    rhythmNameInput.addEventListener('keyup', (e) => {
        if (e.key === 'Enter') handleSaveRhythm();
    });

    const rhythmDisplayContainer = document.getElementById('rhythm-display-container');
    rhythmDisplayContainer.addEventListener('click', (e) => {
        if (e.target === rhythmDisplayContainer && AppState.selectedIndexForEditing !== null) {
            AppState.selectedIndexForEditing = null;
            renderRhythm();
        }
    });

    let lastHoveredIndex = null;
    rhythmDisplayContainer.addEventListener('mouseover', (e) => {
        const figureContainer = e.target.closest('.figure-container');

        if (figureContainer) {
            const patternIndex = figureContainer.dataset.patternIndex;
            if (patternIndex !== lastHoveredIndex) {
                lastHoveredIndex = patternIndex;
                const item = AppState.activePattern[parseInt(patternIndex)];
                if (item) {
                    updateFigureFocusDisplay(item);
                }
            }
        }
    });
    
    rhythmDisplayContainer.addEventListener('mouseleave', () => {
        lastHoveredIndex = null;
        updateFigureFocusDisplay(null);
    });

    document.getElementById('popover-delete-button').addEventListener('click', (e) => {
        e.stopPropagation();
        if (AppState.selectedIndexForEditing === null) return;
        AppState.customPattern.splice(AppState.selectedIndexForEditing, 1);
        AppState.selectedIndexForEditing = null;
        updateActivePatternAndTimeSignature();
        renderRhythm();
        updateMessage("Figura apagada.");
    });

    document.getElementById('popover-tie-button').addEventListener('click', (e) => {
        e.stopPropagation();
        if (AppState.selectedIndexForEditing === null) return;
        const result = handlePaletteFigureClick({ name: 'Ligadura' });
        updateMessage(result.message, result.success ? 'info' : 'error');
        if(result.success) {
            updateActivePatternAndTimeSignature();
            renderRhythm();
        }
    });

    document.getElementById('open-lesson-modal-button').addEventListener('click', () => {
        populateLessonModal();
        showModal(lessonModal);
    });

    document.getElementById('close-lesson-modal-button').addEventListener('click', hideAllModals);
    document.getElementById('lesson-modal-content').addEventListener('click', (e) => {
        const moduleHeader = e.target.closest('.accordion-module-header');
        if (moduleHeader) {
            const list = moduleHeader.nextElementSibling;
            const icon = moduleHeader.querySelector('i');
            const wasOpen = list.classList.contains('open');
            
            document.querySelectorAll('.accordion-lessons-list.open').forEach(openList => {
                if (openList !== list) {
                    openList.classList.remove('open');
                    openList.previousElementSibling.querySelector('i').classList.replace('fa-chevron-up', 'fa-chevron-down');
                }
            });
            
            list.classList.toggle('open', !wasOpen);
            icon.classList.toggle('fa-chevron-down', wasOpen);
            icon.classList.toggle('fa-chevron-up', !wasOpen);
        }

        const lessonItem = e.target.closest('.accordion-lesson-item');
        if (lessonItem) {
            const lessonIndex = parseInt(lessonItem.dataset.index);
            AppState.currentLessonIndex = lessonIndex;
            switchMode('lessons');
            hideAllModals();
        }
    });

    const startDictationBtn = document.getElementById('start-dictation-btn');
    const checkDictationBtn = document.getElementById('check-dictation-btn');
    const gameFeedbackEl = document.getElementById('game-feedback');
    const gameFigureHintEl = document.getElementById('game-figure-hint');

    startDictationBtn.addEventListener('click', () => {
        document.getElementById('rhythm-display-container').innerHTML = '<div id="rhythm-display"></div>';
        gameFeedbackEl.classList.add('hidden');

        if (startDictationBtn.textContent === "Repetir Áudio") {
            playDictationPatternWithCountdown(getCurrentDictationPattern());
        } else {
            const { pattern, figuresUsed } = generateDictation(AppState.currentGameLevel);
            playDictationPatternWithCountdown(pattern);
            
            AppState.customPattern = [];
            renderRhythm();
            
            checkDictationBtn.classList.remove('hidden');
            
            gameFigureHintEl.innerHTML = 'Figuras neste exercício: ' + figuresUsed.map(f => `<span>${f.symbol}</span>`).join(' ');
            gameFigureHintEl.classList.remove('hidden');

            startDictationBtn.textContent = "Repetir Áudio";
            updateMessage("Recrie o ritmo que você ouviu.");
        }
    });

    checkDictationBtn.addEventListener('click', async () => {
        const result = checkDictation(AppState.customPattern);
        
        await addPointsAndUpdateUI(result.score);
        
        gameFeedbackEl.textContent = result.message;
        gameFeedbackEl.className = 'game-feedback';
        gameFeedbackEl.classList.add(result.score > 0 ? 'feedback-correct' : 'feedback-incorrect');
        gameFeedbackEl.classList.remove('hidden');
        
        const levelDisplay = document.getElementById('game-level-display');
        if (levelDisplay) levelDisplay.textContent = `Nível: ${AppState.currentGameLevel}`;
        
        renderDictationFeedback(result.annotatedPattern, getCurrentDictationPattern());
        
        startDictationBtn.textContent = "Próximo Ditado";
        checkDictationBtn.classList.add('hidden');
        updateMessage("Compare a sua resposta. Clique em 'Próximo Ditado' para continuar.");
    });
    
    startAutoSave();
}