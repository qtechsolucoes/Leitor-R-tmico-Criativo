// events.js
import { startCountdownAndPlay, togglePauseResume, stopRhythmExecution, exportWavOffline } from './audio.js';
import { AppState } from './state.js';
import { updateActivePatternAndTimeSignature, handlePaletteFigureClick, handleFigureSelectionForEditing } from './core.js';
import { switchMode, renderRhythm, updateMessage, updateLoginUI, showModal, hideAllModals, populateLoadRhythmModal, hideEditPopover, updateFigureFocusDisplay, populateLessonModal } from './ui.js';
import { lessons } from './config.js';

const loginModal = document.getElementById('login-modal');
const saveRhythmModal = document.getElementById('save-rhythm-modal');
const loadRhythmModal = document.getElementById('load-rhythm-modal');
const lessonModal = document.getElementById('lesson-modal');
const usernameInput = document.getElementById('username-input');
const rhythmNameInput = document.getElementById('rhythm-name-input');

function handleLogin() {
    const username = usernameInput.value.trim();
    if(username) {
        AppState.user.currentUser = { username };
        localStorage.setItem('lrc_currentUser', JSON.stringify(AppState.user.currentUser));
        updateMessage(`Login como ${username}.`, "success");
        updateLoginUI();
        hideAllModals();
        usernameInput.value = '';
    } else {
        updateMessage("Por favor, insira um nome de utilizador.", "error");
    }
}

function logoutUser() {
    AppState.user.currentUser = null;
    localStorage.removeItem('lrc_currentUser');
    updateMessage("Logout efetuado.");
    updateLoginUI();
}

function handleSaveRhythm() {
    if (!AppState.user.currentUser) {
        updateMessage("Faça login para salvar.", "error");
        hideAllModals();
        return;
    }
    if(!AppState.customPattern || AppState.customPattern.length === 0) {
        updateMessage("Não há ritmo para salvar.", "error");
        hideAllModals();
        return;
    }
    const rhythmName = rhythmNameInput.value.trim();
    if (rhythmName) {
        const username = AppState.user.currentUser.username;
        const savedRhythms = JSON.parse(localStorage.getItem('lrc_savedRhythms')) || {};
        if (!savedRhythms[username]) {
            savedRhythms[username] = [];
        }
        savedRhythms[username].push({
            name: rhythmName,
            pattern: AppState.customPattern,
            timeSignature: AppState.activeTimeSignature
        });
        localStorage.setItem('lrc_savedRhythms', JSON.stringify(savedRhythms));
        updateMessage(`Ritmo "${rhythmName}" salvo.`, "success");
        hideAllModals();
        rhythmNameInput.value = '';
    } else {
        updateMessage("Por favor, dê um nome para o seu ritmo.", "error");
    }
}

function handleLoadRhythm(index) {
    const username = AppState.user.currentUser.username;
    const savedRhythms = JSON.parse(localStorage.getItem('lrc_savedRhythms')) || {};
    const userRhythms = savedRhythms[username];

    if (userRhythms && !isNaN(index) && index >= 0 && index < userRhythms.length) {
        const rhythm = userRhythms[index];
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

    } else {
        updateMessage("Seleção inválida.", "error");
    }
}

function setupCustomSelect(selectElement, panelElement, onSelectCallback) {
     selectElement.addEventListener('click', (e) => {
        e.stopPropagation();
        const isOpen = selectElement.classList.toggle('open');
        panelElement.classList.toggle('panel-on-top', isOpen);
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
            panelElement.classList.remove('panel-on-top');
            
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
            stopRhythmExecution();
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

    document.getElementById('reset-button').addEventListener('click', stopRhythmExecution);

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
    
    document.getElementById('login-button').addEventListener('click', () => showModal(loginModal));
    document.getElementById('logout-button').addEventListener('click', logoutUser);
    document.getElementById('save-rhythm-button').addEventListener('click', () => showModal(saveRhythmModal));
    document.getElementById('load-rhythms-button').addEventListener('click', () => {
        const username = AppState.user.currentUser?.username;
        if (!username) {
            updateMessage("Faça login para carregar ritmos.", "error");
            return;
        }
        const savedRhythms = JSON.parse(localStorage.getItem('lrc_savedRhythms')) || {};
        const userRhythms = savedRhythms[username];
        populateLoadRhythmModal(userRhythms);
        showModal(loadRhythmModal);
    });

    document.getElementById('export-wav-button').addEventListener('click', exportWavOffline);

    document.getElementById('login-confirm-button').addEventListener('click', handleLogin);
    document.getElementById('login-cancel-button').addEventListener('click', hideAllModals);
    document.getElementById('save-confirm-button').addEventListener('click', handleSaveRhythm);
    document.getElementById('save-cancel-button').addEventListener('click', hideAllModals);
    document.getElementById('load-cancel-button').addEventListener('click', hideAllModals);
    document.getElementById('error-ok-button').addEventListener('click', hideAllModals);

    document.getElementById('load-rhythm-list').addEventListener('click', (e) => {
        if (e.target && e.target.classList.contains('load-item-button')) {
            const index = parseInt(e.target.dataset.index);
            handleLoadRhythm(index);
        }
    });

    usernameInput.addEventListener('keyup', (e) => {
        if (e.key === 'Enter') handleLogin();
    });
    rhythmNameInput.addEventListener('keyup', (e) => {
        if (e.key === 'Enter') handleSaveRhythm();
    });

    const rhythmDisplayContainer = document.getElementById('rhythm-display-container');

    rhythmDisplayContainer.addEventListener('click', () => {
        if (AppState.selectedIndexForEditing !== null) {
            AppState.selectedIndexForEditing = null;
            renderRhythm();
        }
    });

    let lastHoveredIndex = null;
    let hideInfoBoxTimer = null;

    rhythmDisplayContainer.addEventListener('mouseover', (e) => {
        clearTimeout(hideInfoBoxTimer);
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
        } else {
            lastHoveredIndex = null;
            hideInfoBoxTimer = setTimeout(() => {
                updateFigureFocusDisplay(null);
            }, 100);
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

    // --- LÓGICA DO NOVO MODAL DE LIÇÕES ---
    document.getElementById('open-lesson-modal-button').addEventListener('click', () => {
        populateLessonModal();
        showModal(lessonModal);
    });

    document.getElementById('close-lesson-modal-button').addEventListener('click', hideAllModals);

    document.getElementById('lesson-modal-content').addEventListener('click', (e) => {
        if (e.target.classList.contains('accordion-module-header')) {
            const list = e.target.nextElementSibling;
            list.style.display = list.style.display === 'block' ? 'none' : 'block';
        }

        if (e.target.classList.contains('accordion-lesson-item')) {
            const lessonIndex = parseInt(e.target.dataset.index);
            AppState.currentLessonIndex = lessonIndex;
            updateActivePatternAndTimeSignature();
            renderRhythm();
            hideAllModals();
        }
    });
}