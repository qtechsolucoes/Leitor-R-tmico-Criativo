// main.js

import { setupEventListeners } from './events.js';
import { switchMode, updateLoginUI, populateFigurePalette } from './ui.js';
import { initializeSynths } from './audio.js';
import { lessons } from './config.js';

/**
 * Função assíncrona para buscar o usuário logado no backend.
 */
async function fetchCurrentUser() {
    try {
        const res = await fetch('http://localhost:5000/api/current_user', {
            credentials: 'include'
        });
        
        if (res.ok && res.headers.get("Content-Length") > "0") {
            const user = await res.json();
            updateLoginUI(user);
        } else {
            updateLoginUI(null);
        }
    } catch (error) {
        console.error('Erro ao buscar usuário: O backend pode estar offline.', error);
        updateLoginUI(null);
    }
}

/**
 * Função principal que inicializa toda a aplicação.
 */
async function init() {
    populateFigurePalette();
    setupEventListeners();
    initializeSynths(); 
    
    // Busca o usuário atual do backend ANTES de carregar a interface principal
    await fetchCurrentUser(); 
    
    // NOVO: Recuperar rascunho salvo automaticamente
    const savedDraft = JSON.parse(localStorage.getItem('lrc_autoDraft'));
    if (savedDraft) {
        if (confirm('Deseja restaurar seu rascunho não salvo?')) {
            AppState.customPattern = savedDraft.pattern;
            AppState.activeTimeSignature = savedDraft.timeSignature;
            // Atualiza a UI
            updateActivePatternAndTimeSignature();
            renderRhythm();
        }
    }

    // Define o modo inicial e carrega a primeira lição por padrão
    switchMode('lessons');
    
    console.log("Aplicação 'Leitor Rítmico Criativo' (Versão Final) inicializada.");
}

// Inicia a aplicação
init();