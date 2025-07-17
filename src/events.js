// events.js
import { startCountdownAndPlay, togglePauseResume, stopRhythmExecution, exportWavOffline } from './audio.js';
import { AppState } from './state.js';
import { updateActivePatternAndTimeSignature, handlePaletteFigureClick, handleFigureSelectionForEditing } from './core.js';
import { switchMode, renderRhythm, updateMessage, populateFigurePalette, updateLoginUI, showModal, hideAllModals, populateLoadRhythmModal, hideEditPopover } from './ui.js';

// --- Elementos do DOM ---
const modeSelect = document.getElementById('mode-select');
const customLessonSelect = document.getElementById('custom-lesson-select');

// --- Elementos do Modal ---
const loginModal = document.getElementById('login-modal');
const saveRhythmModal = document.getElementById('save-rhythm-modal');
const loadRhythmModal = document.getElementById('load-rhythm-modal');
const usernameInput = document.getElementById('username-input');
const rhythmNameInput = document.getElementById('rhythm-name-input');


// --- Funções de Persistência ---

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

    if (!isNaN(index) && index >= 0 && index < userRhythms.length) {
        const rhythm = userRhythms[index];
        AppState.customPattern = JSON.parse(JSON.stringify(rhythm.pattern));
        document.getElementById('time-signature-beats').value = rhythm.timeSignature.beats;
        document.getElementById('time-signature-type').value = rhythm.timeSignature.beatType;
        
        switchMode('freeCreate'); 
        updateActivePatternAndTimeSignature();
        renderRhythm();
        updateMessage(`Ritmo "${rhythm.name}" carregado.`, "success");
        hideAllModals();

    } else {
        updateMessage("Seleção inválida.", "error");
    }
}


/**
 * Configura todos os event listeners da aplicação.
 */
export function setupEventListeners() {
    // REMOVIDO: O event listener antigo para o select.
    // modeSelect.addEventListener('change', (e) => switchMode(e.target.value));

    // --- NOVO: Lógica para o seletor de MODO customizado ---
    const customModeSelect = document.getElementById('custom-mode-select');
    const modePanel = customModeSelect.closest('.panel');
    
    customModeSelect.addEventListener('click', (e) => {
        // Abre e fecha o dropdown
        const isOpen = customModeSelect.classList.toggle('open');
        modePanel.classList.toggle('panel-on-top', isOpen);
    });

    customModeSelect.querySelectorAll('.custom-option').forEach(option => {
        option.addEventListener('click', (e) => {
            e.stopPropagation(); // Impede que o clique feche o menu imediatamente
            const selectedValue = option.dataset.value;
            const selectedText = option.textContent;

            // Remove a seleção anterior e adiciona à nova
            customModeSelect.querySelector('.custom-option.selected').classList.remove('selected');
            option.classList.add('selected');

            // Atualiza o texto do gatilho
            customModeSelect.querySelector('.custom-select-trigger').textContent = selectedText;

            // Fecha o dropdown
            customModeSelect.classList.remove('open');
            modePanel.classList.remove('panel-on-top');
            
            // Chama a função original para trocar o modo
            switchMode(selectedValue);
        });
    });

    const lessonPanel = customLessonSelect.closest('.panel');
    customLessonSelect.addEventListener('click', () => {
        const isOpen = customLessonSelect.classList.toggle('open');
        lessonPanel.classList.toggle('panel-on-top', isOpen);
    });

    document.addEventListener('click', (e) => {
        if (!customLessonSelect.contains(e.target)) {
            if (customLessonSelect.classList.contains('open')) {
                customLessonSelect.classList.remove('open');
                lessonPanel.classList.remove('panel-on-top');
            }
        }
        // --- NOVO: Lógica para fechar o dropdown de MODO ao clicar fora ---
        if (!customModeSelect.contains(e.target)) {
            if (customModeSelect.classList.contains('open')) {
                customModeSelect.classList.remove('open');
                modePanel.classList.remove('panel-on-top');
            }
        }
    });

    document.getElementById('time-signature-beats').addEventListener('change', () => {
        if (AppState.currentMode === 'freeCreate') {
            stopRhythmExecution();
            updateActivePatternAndTimeSignature();
            renderRhythm();
        }
    });

    document.getElementById('time-signature-type').addEventListener('change', () => {
        if (AppState.currentMode === 'freeCreate') {
            stopRhythmExecution();
            updateActivePatternAndTimeSignature();
            renderRhythm();
        }
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
            hideEditPopover(); // LINHA ADICIONADA PARA GARANTIA EXTRA
            updateActivePatternAndTimeSignature();
            renderRhythm();
            updateMessage("Padrão limpo.");
        }
    });
    
    document.getElementById('login-button').addEventListener('click', () => showModal(loginModal));
    document.getElementById('logout-button').addEventListener('click', logoutUser);
    document.getElementById('save-rhythm-button').addEventListener('click', () => showModal(saveRhythmModal));
    document.getElementById('load-rhythms-button').addEventListener('click', () => {
        const username = AppState.user.currentUser.username;
        const savedRhythms = JSON.parse(localStorage.getItem('lrc_savedRhythms')) || {};
        const userRhythms = savedRhythms[username];
        populateLoadRhythmModal(userRhythms);
        showModal(loadRhythmModal);
    });

    document.getElementById('export-wav-button').addEventListener('click', exportWavOffline);

    // --- Eventos dos Modais ---
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

    // Adiciona listener para fechar o popover ao clicar em qualquer lugar no display
    document.getElementById('rhythm-display-container').addEventListener('click', () => {
        if (AppState.selectedIndexForEditing !== null) {
            AppState.selectedIndexForEditing = null;
            renderRhythm(); // Re-renderiza para remover a seleção visual
        }
    });

    // ========= EVENTOS DO POPOVER DE EDIÇÃO =========
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
            // Não é preciso chamar updateActivePatternAndTimeSignature aqui pois
            // handlePaletteFigureClick não altera o padrão, apenas o estado da ligadura
            // que será reprocessado na renderização.
            updateActivePatternAndTimeSignature(); // Para re-calcular as sílabas e durações de ligadura
            renderRhythm();
        }
    });
}