// --- Configurações e Dados Iniciais ---
const rhythmicFigures = [
    { name: 'Semibreve', symbol: '𝅝', type: 'note', duration: 4},
    { name: 'Pausa de Semibreve', symbol: '𝄻', type: 'rest', duration: 4},
    { name: 'Mínima Pontuada', symbol: '𝅗𝅥.', type: 'note', duration: 3},
    { name: 'Mínima', symbol: '𝅗𝅥', type: 'note', duration: 2},
    { name: 'Pausa de Mínima', symbol: '𝄼', type: 'rest', duration: 2},
     { name: 'Semínima Pontuada', symbol: '♩.', type: 'note', duration: 1.5},
    { name: 'Semínima', symbol: '♩', type: 'note', duration: 1},
    { name: 'Pausa de Semínima', symbol: '𝄽', type: 'rest', duration: 1},
    { name: 'Colcheia', symbol: '𝅘𝅥𝅮', type: 'note', duration: 0.5},
     { name: 'Colcheia Pontuada', symbol: '𝅘𝅥𝅮.', type: 'note', duration: 0.75},
    { name: 'Pausa de Colcheia', symbol: '𝄾', type: 'rest', duration: 0.5},
    { name: 'Semicolcheia', symbol: '𝅘𝅥𝅯', type: 'note', duration: 0.25},
    { name: 'Pausa de Semicolcheia', symbol: '𝄿', type: 'rest', duration: 0.25},
    { name: 'Fusa', symbol: '𝅘𝅥𝅰', type: 'note', duration: 0.125},
    { name: 'Pausa de Fusa', symbol: '𝅀', type: 'rest', duration: 0.125},
    { name: 'Semifusa', symbol: '𝅘𝅥𝅱', type: 'note', duration: 0.0625},
    { name: 'Pausa de Semifusa', symbol: '𝅁', type: 'rest', duration: 0.0625},
    { name: 'Início de Repetição', symbol: '𝄆', type: 'repeat_start', duration: 0, isControl: true},
    { name: 'Fim de Repetição', symbol: '𝄇', type: 'repeat_end', duration: 0, isControl: true},
    { name: 'Barra Final Dupla', symbol: '𝄂', type: 'final_barline', duration: 0, isControl: true}
];

const lessons = [
    {
        name: "Módulo I - Lição 1: Semibreves e Mínimas",
        timeSignature: { beats: 4, beatType: 4 },
        tempo: 60,
        pattern: [
            { type: 'note', duration: 4, symbol: '𝅝' }, { type: 'note', duration: 4, symbol: '𝅝' },
            { type: 'note', duration: 2, symbol: '𝅗𝅥' }, { type: 'note', duration: 2, symbol: '𝅗𝅥' },
            { type: 'note', duration: 4, symbol: '𝅝' },
            { type: 'note', duration: 2, symbol: '𝅗𝅥' }, { type: 'note', duration: 2, symbol: '𝅗𝅥' },
            { type: 'note', duration: 2, symbol: '𝅗𝅥' }, { type: 'note', duration: 2, symbol: '𝅗𝅥' },
            { type: 'note', duration: 4, symbol: '𝅝' }, { type: 'note', duration: 4, symbol: '𝅝' },
            {type: 'final_barline', duration: 0, symbol: '𝄂', isControl: true}
        ]
    },
    {
        name: "Módulo I - Lição 2: Adicionando Pausas Longas",
        timeSignature: { beats: 4, beatType: 4 },
        tempo: 65,
        pattern: [
            { type: 'note', duration: 4, symbol: '𝅝' }, { type: 'rest', duration: 4, symbol: '𝄻' },
            { type: 'note', duration: 2, symbol: '𝅗𝅥' }, { type: 'rest', duration: 2, symbol: '𝄼' },
            { type: 'note', duration: 2, symbol: '𝅗𝅥' }, { type: 'note', duration: 2, symbol: '𝅗𝅥' },
            { type: 'rest', duration: 4, symbol: '𝄻' },
            { type: 'note', duration: 2, symbol: '𝅗𝅥' }, { type: 'rest', duration: 2, symbol: '𝄼' },
            { type: 'rest', duration: 2, symbol: '𝄼' }, { type: 'note', duration: 2, symbol: '𝅗𝅥' },
            { type: 'note', duration: 4, symbol: '𝅝' },
            {type: 'final_barline', duration: 0, symbol: '𝄂', isControl: true}
        ]
    },
    {
        name: "Módulo I - Lição 3: Introdução à Semínima",
        timeSignature: { beats: 4, beatType: 4 },
        tempo: 70,
        pattern: [
            { type: 'note', duration: 1, symbol: '♩' }, { type: 'note', duration: 1, symbol: '♩' }, { type: 'note', duration: 1, symbol: '♩' }, { type: 'note', duration: 1, symbol: '♩' },
            { type: 'note', duration: 2, symbol: '𝅗𝅥' }, { type: 'note', duration: 2, symbol: '𝅗𝅥' },
            { type: 'note', duration: 1, symbol: '♩' }, { type: 'note', duration: 1, symbol: '♩' }, { type: 'note', duration: 2, symbol: '𝅗𝅥' },
            { type: 'note', duration: 2, symbol: '𝅗𝅥' }, { type: 'note', duration: 1, symbol: '♩' }, { type: 'note', duration: 1, symbol: '♩' },
            { type: 'note', duration: 4, symbol: '𝅝' },
            { type: 'note', duration: 1, symbol: '♩' }, { type: 'note', duration: 2, symbol: '𝅗𝅥' }, { type: 'note', duration: 1, symbol: '♩' },
            { type: 'note', duration: 2, symbol: '𝅗𝅥' }, { type: 'note', duration: 2, symbol: '𝅗𝅥' },
            { type: 'note', duration: 4, symbol: '𝅝' },
            {type: 'final_barline', duration: 0, symbol: '𝄂', isControl: true}
        ]
    },
    {
        name: "Módulo I - Lição 4: Pausas de Semínima",
        timeSignature: { beats: 4, beatType: 4 },
        tempo: 75,
        pattern: [
            { type: 'note', duration: 1, symbol: '♩' }, { type: 'rest', duration: 1, symbol: '𝄽' }, { type: 'note', duration: 1, symbol: '♩' }, { type: 'rest', duration: 1, symbol: '𝄽' },
            { type: 'note', duration: 2, symbol: '𝅗𝅥' }, { type: 'rest', duration: 2, symbol: '𝄼' },
            { type: 'note', duration: 1, symbol: '♩' }, { type: 'note', duration: 1, symbol: '♩' }, { type: 'rest', duration: 1, symbol: '𝄽' }, { type: 'note', duration: 1, symbol: '♩' },
            { type: 'rest', duration: 1, symbol: '𝄽' }, { type: 'note', duration: 2, symbol: '𝅗𝅥' }, { type: 'note', duration: 1, symbol: '♩' },
            { type: 'note', duration: 4, symbol: '𝅝' },
            { type: 'note', duration: 1, symbol: '♩' }, { type: 'rest', duration: 1, symbol: '𝄽' }, { type: 'note', duration: 2, symbol: '𝅗𝅥' },
            { type: 'rest', duration: 2, symbol: '𝄼' }, { type: 'note', duration: 1, symbol: '♩' }, { type: 'rest', duration: 1, symbol: '𝄽' },
            { type: 'note', duration: 4, symbol: '𝅝' },
            {type: 'final_barline', duration: 0, symbol: '𝄂', isControl: true}
        ]
    },
    {
        name: "Módulo I - Lição 5: Misturando Tudo",
        timeSignature: { beats: 4, beatType: 4 },
        tempo: 80,
        pattern: [
            { type: 'note', duration: 2, symbol: '𝅗𝅥' }, { type: 'note', duration: 1, symbol: '♩' }, { type: 'rest', duration: 1, symbol: '𝄽' },
            { type: 'note', duration: 1, symbol: '♩' }, { type: 'rest', duration: 1, symbol: '𝄽' }, { type: 'note', duration: 2, symbol: '𝅗𝅥' },
            { type: 'note', duration: 1, symbol: '♩' }, { type: 'note', duration: 1, symbol: '♩' }, { type: 'note', duration: 1, symbol: '♩' }, { type: 'note', duration: 1, symbol: '♩' },
            { type: 'rest', duration: 4, symbol: '𝄻' },
            { type: 'note', duration: 4, symbol: '𝅝' },
            { type: 'note', duration: 2, symbol: '𝅗𝅥' }, { type: 'rest', duration: 1, symbol: '𝄽' }, { type: 'note', duration: 1, symbol: '♩' },
            { type: 'note', duration: 1, symbol: '♩' }, { type: 'note', duration: 2, symbol: '𝅗𝅥' }, { type: 'rest', duration: 1, symbol: '𝄽' },
            { type: 'note', duration: 1, symbol: '♩' }, { type: 'note', duration: 1, symbol: '♩' }, { type: 'rest', duration: 2, symbol: '𝄼' },   
             {type: 'final_barline', duration: 0, symbol: '𝄂', isControl: true}
        ]
    }
];