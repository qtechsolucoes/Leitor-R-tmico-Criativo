// main.js
import { setupEventListeners } from './events.js';
import { switchMode, updateLoginUI, populateFigurePalette, renderRhythm } from './ui.js';
import { initializeSynths } from './audio.js';
import { AppState } from './state.js';
import { updateActivePatternAndTimeSignature } from './core.js';
import { getCurrentUser } from './api.js';

async function fetchCurrentUser() {
    try {
        const user = await getCurrentUser();
        updateLoginUI(user);
    } catch (error) {
        console.error('Erro ao buscar utilizador: O backend pode estar offline.', error);
        updateLoginUI(null);
    }
}

async function init() {
    populateFigurePalette();
    setupEventListeners();
    initializeSynths(); 
    
    await fetchCurrentUser(); 
    
    const savedDraft = JSON.parse(localStorage.getItem('lrc_autoDraft'));
    if (savedDraft) {
        if (confirm('Deseja restaurar seu rascunho não salvo?')) {
            AppState.customPattern = savedDraft.pattern;
            AppState.activeTimeSignature = savedDraft.timeSignature;
            
            switchMode('freeCreate');
            updateActivePatternAndTimeSignature();
            renderRhythm();
            // Limpa o rascunho após restaurar
            localStorage.removeItem('lrc_autoDraft');
        }
    } else {
        // Define o modo inicial e carrega a primeira lição por padrão
        switchMode('lessons');
    }
    
    console.log("Aplicação 'Leitor Rítmico Criativo' (Versão Melhorada) inicializada.");
}

init();