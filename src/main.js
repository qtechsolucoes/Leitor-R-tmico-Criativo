// main.js

import { setupEventListeners } from './events.js';
import { populateLessonSelect, populateFigurePalette, renderRhythm, switchMode, updateLoginUI } from './ui.js';
import { updateActivePatternAndTimeSignature } from './core.js';

/**
 * Função principal que inicializa toda a aplicação.
 */
function init() {
    // 1. Preenche os elementos da UI com dados iniciais (lições, figuras).
    populateLessonSelect();
    populateFigurePalette();

    // 2. Configura todos os event listeners para a interação do usuário.
    setupEventListeners();

    // 3. Define o estado inicial da UI para o modo de login.
    updateLoginUI(); // Garante que botões de login/logout estejam no estado correto.
    
    // 4. Define o modo inicial da aplicação como 'lessons'.
    switchMode('lessons');

    // 5. Exibe a mensagem inicial de boas-vindas.
    document.getElementById('message-area').textContent = "Bem-vindo! Selecione uma lição ou mude o modo para criar.";
    
    console.log("Aplicação modularizada inicializada.");
}

// Inicia a aplicação quando o script for carregado
init();