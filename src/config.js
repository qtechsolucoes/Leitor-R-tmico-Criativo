// src/config.js

import { lessons } from './lessons/index.js';

export const rhythmicFigures = [
    { name: 'Semibreve', symbol: '𝅝', type: 'note', duration: 4},
    { name: 'Pausa de Semibreve', symbol: '𝄻', type: 'rest', duration: 4},
    { name: 'Mínima Pontuada', symbol: '𝅗𝅥.', type: 'note', duration: 3},
    { name: 'Mínima', symbol: '𝅗𝅥', type: 'note', duration: 2},
    { name: 'Pausa de Mínima', symbol: '𝄼', type: 'rest', duration: 2},
    { name: 'Semínima Pontuada', symbol: '♩.', type: 'note', duration: 1.5},
    { name: 'Semínima', symbol: '♩', type: 'note', duration: 1},
    { name: 'Pausa de Semínima', symbol: '𝄽', type: 'rest', duration: 1},
    { name: 'Colcheia Pontuada', symbol: '𝅘𝅥𝅮.', type: 'note', duration: 0.75},
    { name: 'Colcheia', symbol: '𝅘𝅥𝅮', type: 'note', duration: 0.5},
    { name: 'Pausa de Colcheia', symbol: '𝄾', type: 'rest', duration: 0.5},
    { name: 'Colcheia de Tercina', symbol: '<span class="tuplet-symbol">3</span>𝅘𝅥𝅮', baseSymbol: '𝅘𝅥𝅮', type: 'note', duration: 1/3, isTupletChild: true, tupletN: 3 },
    { name: 'Pausa de Colcheia de Tercina', symbol: '<span class="tuplet-symbol">3</span>𝄾', baseSymbol: '𝄾', type: 'rest', duration: 1/3, isTupletChild: true, tupletN: 3 },
    { name: 'Semicolcheia', symbol: '𝅘𝅥𝅯', type: 'note', duration: 0.25},
    { name: 'Pausa de Semicolcheia', symbol: '𝄿', type: 'rest', duration: 0.25},
    { name: 'Fusa', symbol: '𝅘𝅥𝅰', type: 'note', duration: 0.125},
    { name: 'Pausa de Fusa', symbol: '𝅀', type: 'rest', duration: 0.125},
    { name: 'Semifusa', symbol: '𝅘𝅥𝅱', type: 'note', duration: 0.0625},
    { name: 'Pausa de Semifusa', symbol: '𝅁', type: 'rest', duration: 0.0625},
    { name: 'Barra Final Dupla', symbol: '𝄂', type: 'final_barline', duration: 0, isControl: true}
];

export { lessons };

// NOVO: Níveis de dificuldade
export const difficultyLevels = [
    {
        id: 1,
        name: "Iniciante",
        figures: [
            { symbol: '♩', duration: 1, type: 'note' },
            { symbol: '𝄽', duration: 1, type: 'rest' }
        ],
        measures: 1,
        tempo: 80
    },
    {
        id: 2,
        name: "Intermediário",
        figures: [
            { symbol: '♩', duration: 1, type: 'note' },
            { symbol: '𝅘𝅥𝅮', duration: 0.5, type: 'note' },
            { symbol: '𝄾', duration: 0.5, type: 'rest' }
        ],
        measures: 2,
        tempo: 100
    },
    {
        id: 3,
        name: "Avançado",
        figures: [
            { symbol: '♩', duration: 1, type: 'note' },
            { symbol: '𝅘𝅥𝅮', duration: 0.5, type: 'note' },
            { symbol: '𝄾', duration: 0.5, type: 'rest' },
            { symbol: '𝅘𝅥𝅯', duration: 0.25, type: 'note' }
        ],
        measures: 2,
        tempo: 120
    }
];