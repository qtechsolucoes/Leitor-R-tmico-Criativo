// main.js

import { setupEventListeners } from './events.js';
// CORREÇÃO: Removida a importação da função que não existe mais
import { switchMode, updateLoginUI, populateFigurePalette } from './ui.js';
import { initializeSynths } from './audio.js';
import { lessons } from './config.js';

/**
 * Função principal que inicializa toda a aplicação.
 */
function init() {
    // A população do dropdown/modal agora é feita sob demanda, então removemos a chamada daqui.
    
    // Popula a paleta de figuras rítmicas na inicialização.
    populateFigurePalette();
    
    setupEventListeners();
    
    initializeSynths(); 

    updateLoginUI(); 
    
    // Define o modo inicial e carrega a primeira lição por padrão.
    switchMode('lessons');
    
    console.log("Aplicação 'Leitor Rítmico Criativo' (Versão Final) inicializada.");
}

init();