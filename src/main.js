// main.js

import { setupEventListeners } from './events.js';
import { populateCustomLessonDropdown, switchMode, updateLoginUI, updateCustomDropdownTrigger, populateFigurePalette } from './ui.js';
import { initializeSynths } from './audio.js';
import { lessons } from './config.js';

/**
 * Função principal que inicializa toda a aplicação.
 */
function init() {
    populateCustomLessonDropdown();
    
    // Popula a paleta de figuras rítmicas na inicialização.
    populateFigurePalette();
    
    setupEventListeners();
    
    initializeSynths(); 

    updateLoginUI(); 
    
    switchMode('lessons');

    if (lessons.length > 0) {
        updateCustomDropdownTrigger(lessons[0].name);
        const firstOption = document.querySelector('.custom-option[data-value="0"]');
        if (firstOption) {
            firstOption.classList.add('selected');
        }
    }
    
    console.log("Aplicação 'Leitor Rítmico Criativo' (Versão Final) inicializada.");
}

init();