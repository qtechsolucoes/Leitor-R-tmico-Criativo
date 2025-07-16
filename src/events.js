// events.js

import { AppState } from './state.js';
import { updateActivePatternAndTimeSignature, handlePaletteFigureClick, handleFigureSelectionForEditing } from './core.js';
import { switchMode, renderRhythm, updateMessage, populateFigurePalette, updateLoginUI } from './ui.js';
import { startCountdownAndPlay, pauseRhythmExecution, resumeRhythmExecution, stopRhythmExecution } from './audio.js';

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

// Adicionando elementos do DOM para as novas funcionalidades
const loginButton = document.getElementById('login-button');
const logoutButton = document.getElementById('logout-button');
const saveRhythmButton = document.getElementById('save-rhythm-button');
const loadRhythmsButton = document.getElementById('load-rhythms-button');
const exportPdfButton = document.getElementById('export-pdf-button');
const exportWavButton = document.getElementById('export-wav-button');

// --- Funções de Mock (Simulação) ---
function loginUser(username = "Usuário Padrão") {
    AppState.user.currentUser = { username };
    updateMessage(`Login como ${username}.`);
    updateLoginUI();
}

function logoutUser() {
    AppState.user.currentUser = null;
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
        if (!AppState.user.savedRhythms[username]) {
            AppState.user.savedRhythms[username] = [];
        }
        AppState.user.savedRhythms[username].push({
            name: rhythmName,
            pattern: AppState.customPattern,
            timeSignature: AppState.activeTimeSignature
        });
        updateMessage(`Ritmo "${rhythmName}" salvo.`);
    }
}

function loadSavedRhythm() {
    if (!AppState.user.currentUser) {
        updateMessage("Faça login para carregar.");
        return;
    }
    const username = AppState.user.currentUser.username;
    const userRhythms = AppState.user.savedRhythms[username];

    if (!userRhythms || userRhythms.length === 0) {
        updateMessage("Nenhum ritmo salvo.");
        return;
    }

    const rhythmNames = userRhythms.map((r, i) => `${i + 1}. ${r.name}`).join('\n');
    const choice = prompt(`Escolha um ritmo:\n${rhythmNames}\nDigite o número:`);
    const index = parseInt(choice) - 1;

    if (!isNaN(index) && index >= 0 && index < userRhythms.length) {
        const rhythm = userRhythms[index];
        AppState.customPattern = JSON.parse(JSON.stringify(rhythm.pattern));
        document.getElementById('time-signature-beats').value = rhythm.timeSignature.beats;
        document.getElementById('time-signature-type').value = rhythm.timeSignature.beatType;
        switchMode('freeCreate'); // Garante que estamos no modo correto
        updateActivePatternAndTimeSignature();
        renderRhythm();
        updateMessage(`Ritmo "${rhythm.name}" carregado.`);
    } else {
        updateMessage("Seleção inválida.");
    }
}

function exportToPDF() {
    updateMessage("Funcionalidade de exportar para PDF ainda não implementada com bibliotecas externas.");
    // A implementação real com jsPDF e html2canvas seria complexa e está além do escopo de um único arquivo.
    console.log("Simulando exportação para PDF...");
}


/**
 * Configura todos os event listeners da aplicação.
 */
export function setupEventListeners() {
    modeSelect.addEventListener('change', (e) => {
        switchMode(e.target.value);
    });

    lessonSelect.addEventListener('change', (e) => {
        AppState.currentLessonIndex = parseInt(e.target.value);
        updateActivePatternAndTimeSignature();
        renderRhythm();
        populateFigureLegend(); // Atualiza a legenda ao trocar de lição
    });

    [timeSignatureBeats, timeSignatureType].forEach(el => el.addEventListener('change', () => {
        if(AppState.currentMode === 'freeCreate') {
            updateActivePatternAndTimeSignature();
            renderRhythm();
        }
    }));

    tempoDecreaseButton.addEventListener('click', () => {
        tempoDisplay.textContent = Math.max(30, parseInt(tempoDisplay.textContent) - 5);
    });

    tempoIncreaseButton.addEventListener('click', () => {
        tempoDisplay.textContent = Math.min(280, parseInt(tempoDisplay.textContent) + 5);
    });

    playPauseButton.addEventListener('click', () => {
        if (AppState.isPlaying) {
            pauseRhythmExecution();
        } else if (Tone.Transport.state === 'paused') {
            resumeRhythmExecution();
        } else {
            startCountdownAndPlay();
        }
    });

    resetButton.addEventListener('click', () => {
        stopRhythmExecution();
        updateMessage("Ritmo resetado.");
    });

    clearCustomRhythmButton.addEventListener('click', () => {
        AppState.customPattern = [];
        AppState.selectedIndexForEditing = null;
        updateActivePatternAndTimeSignature();
        renderRhythm();
        updateMessage("Ritmo limpo.");
    });

    deleteSelectedFigureButton.addEventListener('click', () => {
        if (AppState.selectedIndexForEditing === null) return;
        
        const deletedItem = AppState.customPattern[AppState.selectedIndexForEditing];
        // Se a figura apagada estava ligada, a próxima perde o status de continuação
        if (deletedItem.tiedToNext && (AppState.selectedIndexForEditing + 1) < AppState.customPattern.length) {
            AppState.customPattern[AppState.selectedIndexForEditing + 1].isTiedContinuation = false;
        }

        AppState.customPattern.splice(AppState.selectedIndexForEditing, 1);
        AppState.selectedIndexForEditing = null;
        updateActivePatternAndTimeSignature();
        renderRhythm();
        updateMessage("Figura apagada.");
    });
    
    // --- Novos Event Listeners ---
    if(loginButton) loginButton.addEventListener('click', loginUser);
    if(logoutButton) logoutButton.addEventListener('click', logoutUser);
    if(saveRhythmButton) saveRhythmButton.addEventListener('click', saveCurrentRhythm);
    if(loadRhythmsButton) loadRhythmsButton.addEventListener('click', loadSavedRhythm);
    if(exportPdfButton) exportPdfButton.addEventListener('click', exportToPDF);

    if(exportWavButton) exportWavButton.addEventListener('click', async () => {
        if (!AppState.isPlaying && !AppState.isCountingDown) {
            updateMessage("Iniciando gravação para WAV...");
            await startCountdownAndPlay();
        } else {
            updateMessage("A reprodução já está em andamento. O WAV será gerado no final.");
        }
    });
}