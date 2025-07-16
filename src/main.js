// main.js

import { setupEventListeners } from './events.js';
import { populateCustomLessonDropdown, switchMode, updateLoginUI, updateCustomDropdownTrigger } from './ui.js';
import { initializeSynths } from './audio.js';
import { lessons } from './config.js';

/**
 * Função principal que inicializa toda a aplicação.
 */
function init() {
    // Popula o dropdown personalizado em vez do nativo
    populateCustomLessonDropdown();
    
    // Configura todos os event listeners para a interação do utilizador.
    setupEventListeners();
    
    // Inicializa os componentes de áudio.
    initializeSynths(); 

    // Define o estado inicial da UI para o modo de login.
    updateLoginUI(); 
    
    // Define o modo inicial da aplicação como 'lessons'.
    switchMode('lessons');

    // Define a primeira lição como padrão no dropdown personalizado
    if (lessons.length > 0) {
        updateCustomDropdownTrigger(lessons[0].name);
        // Adiciona a classe 'selected' à primeira opção
        const firstOption = document.querySelector('.custom-option[data-value="0"]');
        if (firstOption) {
            firstOption.classList.add('selected');
        }
    }
    
    console.log("Aplicação 'Leitor Rítmico Criativo' (Versão Final) inicializada.");
}

// Inicia a aplicação quando o script for carregado
init();