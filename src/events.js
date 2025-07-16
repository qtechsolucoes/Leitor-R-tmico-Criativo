// events.js

import { AppState } from './state.js';
import { updateActivePatternAndTimeSignature, handlePaletteFigureClick, handleFigureSelectionForEditing } from './core.js';
import { switchMode, renderRhythm, updateMessage, populateFigurePalette, updateLoginUI } from './ui.js';
import { startCountdownAndPlay, togglePauseResume, stopRhythmExecution, exportWavOffline } from './audio.js';

// --- Elementos do DOM ---
const modeSelect = document.getElementById('mode-select');
const customLessonSelect = document.getElementById('custom-lesson-select');

// --- Funções de Persistência ---

function loginUser() {
    const username = prompt("Digite o seu nome de utilizador:", "músico");
    if(username) {
        AppState.user.currentUser = { username };
        localStorage.setItem('lrc_currentUser', JSON.stringify(AppState.user.currentUser));
        updateMessage(`Login como ${username}.`, "success");
        updateLoginUI();
    }
}

function logoutUser() {
    AppState.user.currentUser = null;
    localStorage.removeItem('lrc_currentUser');
    updateMessage("Logout efetuado.");
    updateLoginUI();
}

function saveCurrentRhythm() {
    if (!AppState.user.currentUser) {
        updateMessage("Faça login para salvar.", "error");
        return;
    }
    if(!AppState.customPattern || AppState.customPattern.length === 0) {
        updateMessage("Não há ritmo para salvar.", "error");
        return;
    }
    const rhythmName = prompt("Dê um nome para o seu ritmo:");
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
    }
}

function loadSavedRhythm() {
    if (!AppState.user.currentUser) {
        updateMessage("Faça login para carregar.", "error");
        return;
    }
    const username = AppState.user.currentUser.username;
    const savedRhythms = JSON.parse(localStorage.getItem('lrc_savedRhythms')) || {};
    const userRhythms = savedRhythms[username];

    if (!userRhythms || userRhythms.length === 0) {
        updateMessage("Nenhum ritmo salvo.", "error");
        return;
    }

    const rhythmNames = userRhythms.map((r, i) => `${i + 1}. ${r.name}`).join('\n');
    const choice = prompt(`Escolha um ritmo para carregar:\n${rhythmNames}\n\nDigite o número:`);
    const index = parseInt(choice) - 1;

    if (!isNaN(index) && index >= 0 && index < userRhythms.length) {
        const rhythm = userRhythms[index];
        AppState.customPattern = JSON.parse(JSON.stringify(rhythm.pattern));
        document.getElementById('time-signature-beats').value = rhythm.timeSignature.beats;
        document.getElementById('time-signature-type').value = rhythm.timeSignature.beatType;
        
        switchMode('freeCreate'); 
        updateActivePatternAndTimeSignature();
        renderRhythm();
        updateMessage(`Ritmo "${rhythm.name}" carregado.`, "success");

    } else if (choice) {
        updateMessage("Seleção inválida.", "error");
    }
}


/**
 * Configura todos os event listeners da aplicação.
 */
export function setupEventListeners() {
    modeSelect.addEventListener('change', (e) => switchMode(e.target.value));

    // LÓGICA CORRIGIDA PARA O DROPDOWN DE LIÇÕES
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
            updateActivePatternAndTimeSignature();
            renderRhythm();
            updateMessage("Padrão limpo.");
        }
    });

    document.getElementById('delete-selected-figure-button').addEventListener('click', () => {
        if (AppState.selectedIndexForEditing === null) return;
        
        const indexToDelete = AppState.selectedIndexForEditing;
        AppState.customPattern.splice(indexToDelete, 1);

        if(indexToDelete > 0 && AppState.customPattern[indexToDelete - 1]?.tiedToNext) {
             delete AppState.customPattern[indexToDelete - 1].tiedToNext;
        }
        
        AppState.selectedIndexForEditing = null;
        updateActivePatternAndTimeSignature();
        renderRhythm();
        updateMessage("Figura apagada.");
    });
    
    document.getElementById('login-button').addEventListener('click', loginUser);
    document.getElementById('logout-button').addEventListener('click', logoutUser);
    document.getElementById('save-rhythm-button').addEventListener('click', saveCurrentRhythm);
    document.getElementById('load-rhythms-button').addEventListener('click', loadSavedRhythm);
    document.getElementById('export-wav-button').addEventListener('click', exportWavOffline);
}