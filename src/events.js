// events.js

import { AppState } from './state.js';
import { updateActivePatternAndTimeSignature, handlePaletteFigureClick, handleFigureSelectionForEditing } from './core.js';
import { switchMode, renderRhythm, updateMessage, populateFigurePalette } from './ui.js';
import { startCountdownAndPlay, pauseRhythmExecution, resumeRhythmExecution, stopRhythmExecution } from './audio.js';

// --- Elementos do DOM (apenas os que precisam de listeners) ---
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
const figurePaletteDiv = document.getElementById('figure-palette');
const rhythmDisplayEl = document.getElementById('rhythm-display');

// Adicionando elementos do DOM para as novas funcionalidades
const loginButton = document.getElementById('login-button');
const logoutButton = document.getElementById('logout-button');
const saveRhythmButton = document.getElementById('save-rhythm-button');
const loadRhythmsButton = document.getElementById('load-rhythms-button');
const exportPdfButton = document.getElementById('export-pdf-button');
const exportWavButton = document.getElementById('export-wav-button');


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
    });

    [timeSignatureBeats, timeSignatureType].forEach(el => el.addEventListener('change', () => {
        updateActivePatternAndTimeSignature();
        renderRhythm();
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
    
    // Listeners para a paleta e display são delegados (configurados em ui.js, mas chamam funções do core)
    // A configuração é feita na função que cria os elementos, como populateFigurePalette
    // e renderRhythm. O importante é que as funções chamadas (handle...) sejam importadas corretamente aqui.
    
    // --- Novos Event Listeners ---
    if(loginButton) loginButton.addEventListener('click', () => {
        // A lógica de login/logout estaria em um módulo de autenticação.
        // Por agora, simulamos:
        console.log("Botão de login clicado");
        updateMessage("Funcionalidade de login a ser implementada.");
    });

    if(logoutButton) logoutButton.addEventListener('click', () => {
        console.log("Botão de logout clicado");
        updateMessage("Funcionalidade de logout a ser implementada.");
    });

    if(saveRhythmButton) saveRhythmButton.addEventListener('click', () => {
        // A lógica de salvar estaria em um módulo de dados/API.
        console.log("Botão de salvar clicado");
        updateMessage("Funcionalidade de salvar a ser implementada.");
    });

    if(loadRhythmsButton) loadRhythmsButton.addEventListener('click', () => {
        console.log("Botão de carregar clicado");
        updateMessage("Funcionalidade de carregar a ser implementada.");
    });

    if(exportPdfButton) exportPdfButton.addEventListener('click', () => {
        // A lógica de exportação estaria em um módulo de utilidades/exportação.
        console.log("Botão de exportar PDF clicado");
        updateMessage("Funcionalidade de exportar PDF a ser implementada.");
    });

    if(exportWavButton) exportWavButton.addEventListener('click', async () => {
        if (!AppState.isPlaying && !AppState.isCountingDown) {
            updateMessage("Iniciando gravação para WAV...");
            await startCountdownAndPlay();
        } else {
            updateMessage("A reprodução já está em andamento. O WAV será gerado no final.");
        }
    });
}