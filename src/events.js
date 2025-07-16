// events.js

import { AppState } from './state.js';
import { updateActivePatternAndTimeSignature, handlePaletteFigureClick, handleFigureSelectionForEditing } from './core.js';
import { switchMode, renderRhythm, updateMessage, populateFigureLegend, updateLoginUI } from './ui.js';
import { startCountdownAndPlay, togglePauseResume, stopRhythmExecution, exportWavOffline } from './audio.js';

// --- Elementos do DOM ---
const modeSelect = document.getElementById('mode-select');
const lessonSelect = document.getElementById('lesson-select');
const timeSignatureBeats = document.getElementById('time-signature-beats');
const timeSignatureType = document.getElementById('time-signature-type');
const tempoDisplay = document.getElementById('tempo-display');
const playPauseButton = document.getElementById('play-pause-button');
const resetButton = document.getElementById('reset-button');
const deleteSelectedFigureButton = document.getElementById('delete-selected-figure-button');
const clearCustomRhythmButton = document.getElementById('clear-custom-rhythm');
const tempoIncreaseButton = document.getElementById('tempo-increase');
const tempoDecreaseButton = document.getElementById('tempo-decrease');
const loginButton = document.getElementById('login-button');
const logoutButton = document.getElementById('logout-button');
const saveRhythmButton = document.getElementById('save-rhythm-button');
const loadRhythmsButton = document.getElementById('load-rhythms-button');
const exportPdfButton = document.getElementById('export-pdf-button');
const exportWavButton = document.getElementById('export-wav-button');

// --- Funções de Autenticação e Persistência com localStorage ---

function loginUser() {
    const username = prompt("Digite seu nome de usuário:", "Usuário Padrão");
    if(username) {
        AppState.user.currentUser = { username };
        localStorage.setItem('lrc_currentUser', JSON.stringify(AppState.user.currentUser));
        updateMessage(`Login como ${username}.`);
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
        updateMessage("Faça login para salvar.");
        return;
    }
    const rhythmName = prompt("Dê um nome para o seu ritmo:");
    if (rhythmName) {
        const username = AppState.user.currentUser.username;
        // Carrega os ritmos salvos do localStorage
        const savedRhythms = JSON.parse(localStorage.getItem('lrc_savedRhythms')) || {};
        if (!savedRhythms[username]) {
            savedRhythms[username] = [];
        }
        savedRhythms[username].push({
            name: rhythmName,
            pattern: AppState.customPattern,
            timeSignature: AppState.activeTimeSignature
        });
        // Salva de volta no localStorage
        localStorage.setItem('lrc_savedRhythms', JSON.stringify(savedRhythms));
        updateMessage(`Ritmo "${rhythmName}" salvo.`);
    }
}

function loadSavedRhythm() {
    if (!AppState.user.currentUser) {
        updateMessage("Faça login para carregar.");
        return;
    }
    const username = AppState.user.currentUser.username;
    const savedRhythms = JSON.parse(localStorage.getItem('lrc_savedRhythms')) || {};
    const userRhythms = savedRhythms[username];

    if (!userRhythms || userRhythms.length === 0) {
        updateMessage("Nenhum ritmo salvo.");
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
        updateMessage(`Ritmo "${rhythm.name}" carregado.`);
    } else {
        updateMessage("Seleção inválida.");
    }
}

function exportToPDF() {
    updateMessage("Funcionalidade de exportar para PDF ainda não implementada.");
    console.log("Simulando exportação para PDF...");
}

/**
 * Configura todos os event listeners da aplicação.
 */
export function setupEventListeners() {
    modeSelect.addEventListener('change', (e) => switchMode(e.target.value));

    lessonSelect.addEventListener('change', (e) => {
        AppState.currentLessonIndex = parseInt(e.target.value);
        stopRhythmExecution();
        updateActivePatternAndTimeSignature();
        renderRhythm();
        populateFigureLegend();
    });

    [timeSignatureBeats, timeSignatureType].forEach(el => el.addEventListener('change', () => {
        if (AppState.currentMode === 'freeCreate') {
            stopRhythmExecution();
            updateActivePatternAndTimeSignature();
            renderRhythm();
        }
    }));

    tempoDecreaseButton.addEventListener('click', () => {
        tempoDisplay.textContent = Math.max(30, parseInt(tempoDisplay.textContent) - 5);
        if(AppState.isPlaying) Tone.Transport.bpm.rampTo(parseInt(tempoDisplay.textContent), 0.1);
    });

    tempoIncreaseButton.addEventListener('click', () => {
        tempoDisplay.textContent = Math.min(280, parseInt(tempoDisplay.textContent) + 5);
        if(AppState.isPlaying) Tone.Transport.bpm.rampTo(parseInt(tempoDisplay.textContent), 0.1);
    });

    playPauseButton.addEventListener('click', () => {
        if (AppState.isPlaying || Tone.Transport.state === 'paused') {
            togglePauseResume();
        } else {
            startCountdownAndPlay();
        }
    });

    resetButton.addEventListener('click', () => {
        stopRhythmExecution();
    });

    clearCustomRhythmButton.addEventListener('click', () => {
        AppState.customPattern = [];
        AppState.selectedIndexForEditing = null;
        updateActivePatternAndTimeSignature();
        renderRhythm();
        updateMessage("Padrão limpo.");
    });

    deleteSelectedFigureButton.addEventListener('click', () => {
        if (AppState.selectedIndexForEditing === null) return;
        
        AppState.customPattern.splice(AppState.selectedIndexForEditing, 1);
        
        // CORRIGIDO: Se a nota apagada era a origem de uma ligadura, a próxima nota perde o status de continuação.
        if (AppState.customPattern[AppState.selectedIndexForEditing]?.isTiedContinuation) {
            delete AppState.customPattern[AppState.selectedIndexForEditing].isTiedContinuation;
        }
        // Remove a propriedade `tiedToNext` da nota anterior se a nota apagada era o destino.
        if(AppState.selectedIndexForEditing > 0 && AppState.customPattern[AppState.selectedIndexForEditing - 1].tiedToNext) {
             delete AppState.customPattern[AppState.selectedIndexForEditing - 1].tiedToNext;
        }

        AppState.selectedIndexForEditing = null;
        updateActivePatternAndTimeSignature();
        renderRhythm();
        updateMessage("Figura apagada.");
    });
    
    // --- Event Listeners para Login, Save/Load e Exportação ---
    loginButton.addEventListener('click', loginUser);
    logoutButton.addEventListener('click', logoutUser);
    saveRhythmButton.addEventListener('click', saveCurrentRhythm);
    loadRhythmsButton.addEventListener('click', loadSavedRhythm);
    exportPdfButton.addEventListener('click', exportToPDF);
    exportWavButton.addEventListener('click', exportWavOffline);
}