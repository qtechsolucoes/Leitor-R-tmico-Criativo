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

export const lessons = [
    {
        name: "Módulo I - Lição 1: Semibreves e Mínimas",
        timeSignature: { beats: 4, beatType: 4 },
        tempo: 60,
        pattern: [
            { type: 'note', duration: 2, symbol: '𝅗𝅥' }, { type: 'note', duration: 2, symbol: '𝅗𝅥' },
            { type: 'note', duration: 4, symbol: '𝅝' },
            { type: 'note', duration: 2, symbol: '𝅗𝅥' }, { type: 'note', duration: 2, symbol: '𝅗𝅥' },
            { type: 'note', duration: 2, symbol: '𝅗𝅥' }, { type: 'note', duration: 2, symbol: '𝅗𝅥' },
            { type: 'note', duration: 4, symbol: '𝅝' },
            { type: 'note', duration: 2, symbol: '𝅗𝅥' }, { type: 'note', duration: 2, symbol: '𝅗𝅥' },
            { type: 'note', duration: 4, symbol: '𝅝' },
            { type: 'note', duration: 4, symbol: '𝅝' },
            {type: 'final_barline', duration: 0, symbol: '𝄂', isControl: true}
        ]
    },
    {
        name: "Módulo I - Lição 2: Adicionando Pausas Longas",
        timeSignature: { beats: 4, beatType: 4 },
        tempo: 65,
        pattern: [
            { type: 'note', duration: 4, symbol: '𝅝' }, 
            { type: 'rest', duration: 4, symbol: '𝄻' },
            { type: 'note', duration: 2, symbol: '𝅗𝅥' }, { type: 'rest', duration: 2, symbol: '𝄼' },
            { type: 'rest', duration: 2, symbol: '𝄼' }, { type: 'note', duration: 2, symbol: '𝅗𝅥' },
            { type: 'note', duration: 2, symbol: '𝅗𝅥' }, { type: 'note', duration: 2, symbol: '𝅗𝅥' },
            { type: 'rest', duration: 4, symbol: '𝄻' },
            { type: 'note', duration: 4, symbol: '𝅝' },
            { type: 'rest', duration: 2, symbol: '𝄼' }, { type: 'note', duration: 2, symbol: '𝅗𝅥' },
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
            { type: 'note', duration: 1, symbol: '♩' }, { type: 'note', duration: 1, symbol: '♩' }, { type: 'note', duration: 2, symbol: '𝅗𝅥' },
            { type: 'note', duration: 2, symbol: '𝅗𝅥' }, { type: 'note', duration: 1, symbol: '♩' }, { type: 'note', duration: 1, symbol: '♩' },
            { type: 'note', duration: 4, symbol: '𝅝' },
            { type: 'note', duration: 1, symbol: '♩' }, { type: 'note', duration: 2, symbol: '𝅗𝅥' }, { type: 'note', duration: 1, symbol: '♩' },
            { type: 'note', duration: 1, symbol: '♩' }, { type: 'note', duration: 1, symbol: '♩' }, { type: 'note', duration: 1, symbol: '♩' }, { type: 'note', duration: 1, symbol: '♩' },
            { type: 'note', duration: 2, symbol: '𝅗𝅥' }, { type: 'note', duration: 2, symbol: '𝅗𝅥' },
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
            { type: 'rest', duration: 1, symbol: '𝄽' }, { type: 'note', duration: 2, symbol: '𝅗𝅥' }, { type: 'rest', duration: 1, symbol: '𝄽' },
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
    },
    {
        name: "Módulo I - Lição 6: Explorando 2/4 com Colcheias",
        timeSignature: { beats: 2, beatType: 4 },
        tempo: 85,
        pattern: [
            { type: 'note', duration: 1, symbol: '♩' }, { type: 'note', duration: 1, symbol: '♩' }, 
            { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮' }, { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮' }, { type: 'note', duration: 1, symbol: '♩' },
            { type: 'note', duration: 1, symbol: '♩' }, { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮' }, { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮' },
            { type: 'note', duration: 2, symbol: '𝅗𝅥' },
            { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮' }, { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮' }, { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮' }, { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮' },
            { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮' }, { type: 'rest', duration: 0.5, symbol: '𝄾' }, { type: 'note', duration: 1, symbol: '♩' },
            { type: 'rest', duration: 1, symbol: '𝄽' }, { type: 'note', duration: 1, symbol: '♩' },
            { type: 'note', duration: 2, symbol: '𝅗𝅥' },
            {type: 'final_barline', duration: 0, symbol: '𝄂', isControl: true}
        ]
    },
    {
        name: "Módulo I - Lição 7: Ritmos em 3/4",
        timeSignature: { beats: 3, beatType: 4 },
        tempo: 90,
        pattern: [
            { type: 'note', duration: 1, symbol: '♩' }, { type: 'note', duration: 1, symbol: '♩' }, { type: 'note', duration: 1, symbol: '♩' },
            { type: 'note', duration: 2, symbol: '𝅗𝅥' }, { type: 'note', duration: 1, symbol: '♩' },
            { type: 'note', duration: 1, symbol: '♩' }, { type: 'note', duration: 2, symbol: '𝅗𝅥' },
            { type: 'note', duration: 3, symbol: '𝅗𝅥.' },
            { type: 'note', duration: 1, symbol: '♩' }, { type: 'rest', duration: 1, symbol: '𝄽' }, { type: 'note', duration: 1, symbol: '♩' },
            { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮' }, { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮' }, { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮' }, { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮' }, { type: 'note', duration: 1, symbol: '♩' },
            { type: 'note', duration: 2, symbol: '𝅗𝅥' }, { type: 'rest', duration: 1, symbol: '𝄽' },
            { type: 'note', duration: 3, symbol: '𝅗𝅥.' },
            {type: 'final_barline', duration: 0, symbol: '𝄂', isControl: true}
        ]
    },
    {
        name: "Módulo I - Lição 8: Semicolcheias em 4/4",
        timeSignature: { beats: 4, beatType: 4 },
        tempo: 95,
        pattern: [
            { type: 'note', duration: 1, symbol: '♩' }, { type: 'note', duration: 1, symbol: '♩' }, { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮' }, { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮' }, { type: 'note', duration: 1, symbol: '♩' },
            { type: 'note', duration: 0.25, symbol: '𝅘𝅥𝅯' }, { type: 'note', duration: 0.25, symbol: '𝅘𝅥𝅯' }, { type: 'note', duration: 0.25, symbol: '𝅘𝅥𝅯' }, { type: 'note', duration: 0.25, symbol: '𝅘𝅥𝅯' }, { type: 'note', duration: 1, symbol: '♩' }, { type: 'note', duration: 2, symbol: '𝅗𝅥' },
            { type: 'note', duration: 1, symbol: '♩' }, { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮' }, { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮' }, { type: 'note', duration: 0.25, symbol: '𝅘𝅥𝅯' }, { type: 'note', duration: 0.25, symbol: '𝅘𝅥𝅯' }, { type: 'note', duration: 0.25, symbol: '𝅘𝅥𝅯' }, { type: 'note', duration: 0.25, symbol: '𝅘𝅥𝅯' }, { type: 'note', duration: 1, symbol: '♩' },
            { type: 'rest', duration: 0.5, symbol: '𝄾' }, { type: 'note', duration: 0.25, symbol: '𝅘𝅥𝅯' }, { type: 'note', duration: 0.25, symbol: '𝅘𝅥𝅯' }, { type: 'note', duration: 2, symbol: '𝅗𝅥' }, { type: 'rest', duration: 1, symbol: '𝄽' },
            { type: 'note', duration: 4, symbol: '𝅝' },
            {type: 'final_barline', duration: 0, symbol: '𝄂', isControl: true}
        ]
    },
    {
        name: "Módulo I - Lição 9: Combinações Rítmicas Complexas",
        timeSignature: { beats: 4, beatType: 4 },
        tempo: 100,
        pattern: [
            { type: 'note', duration: 1, symbol: '♩' }, { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮' }, { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮' }, { type: 'rest', duration: 1, symbol: '𝄽' }, { type: 'note', duration: 1, symbol: '♩' },
            { type: 'note', duration: 0.25, symbol: '𝅘𝅥𝅯' }, { type: 'note', duration: 0.25, symbol: '𝅘𝅥𝅯' }, { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮' }, { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮' }, { type: 'rest', duration: 0.5, symbol: '𝄾' }, { type: 'note', duration: 2, symbol: '𝅗𝅥' },
            { type: 'note', duration: 2, symbol: '𝅗𝅥' }, { type: 'rest', duration: 0.5, symbol: '𝄾' }, { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮' }, { type: 'note', duration: 1, symbol: '♩' },
            { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮' }, { type: 'note', duration: 0.25, symbol: '𝅘𝅥𝅯' }, { type: 'note', duration: 0.25, symbol: '𝅘𝅥𝅯' }, { type: 'note', duration: 1, symbol: '♩' }, { type: 'rest', duration: 1, symbol: '𝄽' }, { type: 'note', duration: 1, symbol: '♩' },
            { type: 'rest', duration: 4, symbol: '𝄻' },
            {type: 'final_barline', duration: 0, symbol: '𝄂', isControl: true}
        ]
    },
    {
        name: "Módulo I - Lição 10: Revisão Geral",
        timeSignature: { beats: 4, beatType: 4 },
        tempo: 105,
        pattern: [
            { type: 'note', duration: 4, symbol: '𝅝' }, 
            { type: 'note', duration: 2, symbol: '𝅗𝅥' }, { type: 'rest', duration: 2, symbol: '𝄼' }, 
            { type: 'note', duration: 1, symbol: '♩' }, { type: 'rest', duration: 1, symbol: '𝄽' }, { type: 'note', duration: 1, symbol: '♩' }, { type: 'rest', duration: 1, symbol: '𝄽' },
            { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮' }, { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮' }, { type: 'note', duration: 1, symbol: '♩' }, { type: 'note', duration: 2, symbol: '𝅗𝅥' },
            { type: 'note', duration: 0.25, symbol: '𝅘𝅥𝅯' }, { type: 'note', duration: 0.25, symbol: '𝅘𝅥𝅯' }, { type: 'note', duration: 0.25, symbol: '𝅘𝅥𝅯' }, { type: 'note', duration: 0.25, symbol: '𝅘𝅥𝅯' }, { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮' }, { type: 'rest', duration: 0.5, symbol: '𝄾' }, { type: 'note', duration: 2, symbol: '𝅗𝅥' },
            { type: 'note', duration: 1, symbol: '♩' }, { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮' }, { type: 'note', duration: 0.25, symbol: '𝅘𝅥𝅯' }, { type: 'note', duration: 0.25, symbol: '𝅘𝅥𝅯' }, { type: 'rest', duration: 1, symbol: '𝄽' }, { type: 'note', duration: 1, symbol: '♩' },
            {type: 'final_barline', duration: 0, symbol: '𝄂', isControl: true}
        ]
    },

    // Módulo II - Lições 11 a 20: Variação de Compassos 2/4, 3/4 e 4/4 com Semibreve, Mínima, Semínima, Colcheia, Semicolcheia e suas pausas.
       {
        name: "Módulo II - Lição 11: Padrões de 2/4 Acelerados",
        timeSignature: { beats: 2, beatType: 4 },
        tempo: 110,
        pattern: [
            { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮' }, { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮' }, { type: 'note', duration: 1, symbol: '♩' },
            { type: 'note', duration: 0.25, symbol: '𝅘𝅥𝅯' }, { type: 'note', duration: 0.25, symbol: '𝅘𝅥𝅯' }, { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮' }, { type: 'note', duration: 1, symbol: '♩' },
            { type: 'note', duration: 1, symbol: '♩' }, { type: 'rest', duration: 0.5, symbol: '𝄾' }, { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮' },
            { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮' }, { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮' }, { type: 'rest', duration: 1, symbol: '𝄽' },
            { type: 'note', duration: 2, symbol: '𝅗𝅥' },
            {type: 'final_barline', duration: 0, symbol: '𝄂', isControl: true}
        ]
    },
    {
        name: "Módulo II - Lição 12: Desafio em 3/4 com Pausas Variadas",
        timeSignature: { beats: 3, beatType: 4 },
        tempo: 115,
        pattern: [
            { type: 'note', duration: 1, symbol: '♩' }, { type: 'rest', duration: 0.5, symbol: '𝄾' }, { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮' }, { type: 'note', duration: 1, symbol: '♩' },
            { type: 'rest', duration: 1, symbol: '𝄽' }, { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮' }, { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮' }, { type: 'note', duration: 1, symbol: '♩' },
            { type: 'note', duration: 2, symbol: '𝅗𝅥' }, { type: 'rest', duration: 1, symbol: '𝄽' },
            { type: 'note', duration: 0.25, symbol: '𝅘𝅥𝅯' }, { type: 'note', duration: 0.25, symbol: '𝅘𝅥𝅯' }, { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮' }, { type: 'note', duration: 2, symbol: '𝅗𝅥' },
            { type: 'note', duration: 3, symbol: '𝅗𝅥.' },
            {type: 'final_barline', duration: 0, symbol: '𝄂', isControl: true}
        ]
    },
    {
        name: "Módulo II - Lição 13: Continuidade em 4/4",
        timeSignature: { beats: 4, beatType: 4 },
        tempo: 120,
        pattern: [
            { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮' }, { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮' }, { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮' }, { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮' }, { type: 'note', duration: 2, symbol: '𝅗𝅥' },
            { type: 'note', duration: 1, symbol: '♩' }, { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮' }, { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮' }, { type: 'note', duration: 1, symbol: '♩' }, { type: 'note', duration: 1, symbol: '♩' },
            { type: 'note', duration: 0.25, symbol: '𝅘𝅥𝅯' }, { type: 'note', duration: 0.25, symbol: '𝅘𝅥𝅯' }, { type: 'note', duration: 0.25, symbol: '𝅘𝅥𝅯' }, { type: 'note', duration: 0.25, symbol: '𝅘𝅥𝅯' }, { type: 'rest', duration: 0.5, symbol: '𝄾' }, { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮' }, { type: 'note', duration: 2, symbol: '𝅗𝅥' },
            { type: 'note', duration: 4, symbol: '𝅝' },
            {type: 'final_barline', duration: 0, symbol: '𝄂', isControl: true}
        ]
    },
    {
        name: "Módulo II - Lição 14: Pausas e Notas em 2/4",
        timeSignature: { beats: 2, beatType: 4 },
        tempo: 125,
        pattern: [
            { type: 'rest', duration: 0.5, symbol: '𝄾' }, { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮' }, { type: 'note', duration: 1, symbol: '♩' },
            { type: 'note', duration: 0.25, symbol: '𝅘𝅥𝅯' }, { type: 'rest', duration: 0.25, symbol: '𝄿' }, { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮' }, { type: 'note', duration: 1, symbol: '♩' },
            { type: 'note', duration: 1, symbol: '♩' }, { type: 'rest', duration: 1, symbol: '𝄽' },
            { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮' }, { type: 'note', duration: 0.25, symbol: '𝅘𝅥𝅯' }, { type: 'note', duration: 0.25, symbol: '𝅘𝅥𝅯' }, { type: 'note', duration: 1, symbol: '♩' },
            { type: 'note', duration: 2, symbol: '𝅗𝅥' },
            {type: 'final_barline', duration: 0, symbol: '𝄂', isControl: true}
        ]
    },
    {
        name: "Módulo II - Lição 15: Combinações Rítmicas em 3/4",
        timeSignature: { beats: 3, beatType: 4 },
        tempo: 130,
        pattern: [
            { type: 'note', duration: 1, symbol: '♩' }, { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮' }, { type: 'rest', duration: 0.5, symbol: '𝄾' }, { type: 'note', duration: 1, symbol: '♩' },
            { type: 'note', duration: 0.25, symbol: '𝅘𝅥𝅯' }, { type: 'note', duration: 0.25, symbol: '𝅘𝅥𝅯' }, { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮' }, { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮' }, { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮' }, { type: 'note', duration: 1, symbol: '♩' },
            { type: 'note', duration: 2, symbol: '𝅗𝅥' }, { type: 'note', duration: 1, symbol: '♩' },
            { type: 'note', duration: 1, symbol: '♩' }, { type: 'note', duration: 1, symbol: '♩' }, { type: 'note', duration: 1, symbol: '♩' },
            {type: 'final_barline', duration: 0, symbol: '𝄂', isControl: true}
        ]
    },
    {
        name: "Módulo II - Lição 16: Padrões de Semicolcheias em 4/4",
        timeSignature: { beats: 4, beatType: 4 },
        tempo: 135,
        pattern: [
            { type: 'note', duration: 0.25, symbol: '𝅘𝅥𝅯' }, { type: 'note', duration: 0.25, symbol: '𝅘𝅥𝅯' }, { type: 'note', duration: 0.25, symbol: '𝅘𝅥𝅯' }, { type: 'note', duration: 0.25, symbol: '𝅘𝅥𝅯' }, { type: 'note', duration: 1, symbol: '♩' }, { type: 'note', duration: 2, symbol: '𝅗𝅥' },
            { type: 'note', duration: 1, symbol: '♩' }, { type: 'note', duration: 0.25, symbol: '𝅘𝅥𝅯' }, { type: 'rest', duration: 0.25, symbol: '𝄿' }, { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮' }, { type: 'note', duration: 2, symbol: '𝅗𝅥' },
            { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮' }, { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮' }, { type: 'rest', duration: 1, symbol: '𝄽' }, { type: 'note', duration: 1, symbol: '♩' }, { type: 'note', duration: 1, symbol: '♩' },
            { type: 'note', duration: 4, symbol: '𝅝' },
            {type: 'final_barline', duration: 0, symbol: '𝄂', isControl: true}
        ]
    },
    {
        name: "Módulo II - Lição 17: Ritmos Sincopados em 2/4",
        timeSignature: { beats: 2, beatType: 4 },
        tempo: 140,
        pattern: [
            { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮' }, { type: 'note', duration: 1, symbol: '♩' }, { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮' },
            { type: 'rest', duration: 0.25, symbol: '𝄿' }, { type: 'note', duration: 0.25, symbol: '𝅘𝅥𝅯' }, { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮' }, { type: 'note', duration: 1, symbol: '♩' },
            { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮' }, { type: 'rest', duration: 0.5, symbol: '𝄾' }, { type: 'note', duration: 1, symbol: '♩' },
            { type: 'note', duration: 2, symbol: '𝅗𝅥' },
            { type: 'note', duration: 1, symbol: '♩' }, { type: 'note', duration: 1, symbol: '♩' },
            {type: 'final_barline', duration: 0, symbol: '𝄂', isControl: true}
        ]
    },
    {
        name: "Módulo II - Lição 18: Construindo Frases em 3/4",
        timeSignature: { beats: 3, beatType: 4 },
        tempo: 145,
        pattern: [
            { type: 'note', duration: 1, symbol: '♩' }, { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮' }, { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮' }, { type: 'rest', duration: 1, symbol: '𝄽' },
            { type: 'note', duration: 0.25, symbol: '𝅘𝅥𝅯' }, { type: 'note', duration: 0.25, symbol: '𝅘𝅥𝅯' }, { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮' }, { type: 'note', duration: 2, symbol: '𝅗𝅥' },
            { type: 'rest', duration: 0.5, symbol: '𝄾' }, { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮' }, { type: 'rest', duration: 0.25, symbol: '𝄿' }, { type: 'note', duration: 0.25, symbol: '𝅘𝅥𝅯' }, { type: 'note', duration: 1, symbol: '♩' }, { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮' },
            { type: 'note', duration: 3, symbol: '𝅗𝅥.' },
            {type: 'final_barline', duration: 0, symbol: '𝄂', isControl: true}
        ]
    },
    {
        name: "Módulo II - Lição 19: Exercício de Velocidade em 4/4",
        timeSignature: { beats: 4, beatType: 4 },
        tempo: 150,
        pattern: [
            { type: 'note', duration: 0.25, symbol: '𝅘𝅥𝅯' }, { type: 'note', duration: 0.25, symbol: '𝅘𝅥𝅯' }, { type: 'note', duration: 0.25, symbol: '𝅘𝅥𝅯' }, { type: 'note', duration: 0.25, symbol: '𝅘𝅥𝅯' }, { type: 'note', duration: 0.25, symbol: '𝅘𝅥𝅯' }, { type: 'note', duration: 0.25, symbol: '𝅘𝅥𝅯' }, { type: 'note', duration: 0.25, symbol: '𝅘𝅥𝅯' }, { type: 'note', duration: 0.25, symbol: '𝅘𝅥𝅯' }, { type: 'note', duration: 2, symbol: '𝅗𝅥' },
            { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮' }, { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮' }, { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮' }, { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮' }, { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮' }, { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮' }, { type: 'note', duration: 1, symbol: '♩' },
            { type: 'note', duration: 1, symbol: '♩' }, { type: 'note', duration: 1, symbol: '♩' }, { type: 'note', duration: 1, symbol: '♩' }, { type: 'note', duration: 1, symbol: '♩' },
            { type: 'rest', duration: 4, symbol: '𝄻' },
            {type: 'final_barline', duration: 0, symbol: '𝄂', isControl: true}
        ]
    },
    {
        name: "Módulo II - Lição 20: Transição para o Próximo Módulo",
        timeSignature: { beats: 4, beatType: 4 },
        tempo: 155,
        pattern: [
            { type: 'note', duration: 2, symbol: '𝅗𝅥' }, { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮' }, { type: 'rest', duration: 0.5, symbol: '𝄾' }, { type: 'note', duration: 1, symbol: '♩' },
            { type: 'note', duration: 0.25, symbol: '𝅘𝅥𝅯' }, { type: 'rest', duration: 0.25, symbol: '𝄿' }, { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮' }, { type: 'note', duration: 1, symbol: '♩' }, { type: 'note', duration: 2, symbol: '𝅗𝅥' },
            { type: 'note', duration: 1.5, symbol: '♩.' }, { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮' }, { type: 'note', duration: 2, symbol: '𝅗𝅥' },
            { type: 'note', duration: 4, symbol: '𝅝' },
            {type: 'final_barline', duration: 0, symbol: '𝄂', isControl: true}
        ]
    },

    // Módulo III - Lições 21 a 30: Introdução à Mínima Pontuada e Colcheia Pontuada
        {
        name: "Módulo III - Lição 21: Mínima Pontuada em 3/4",
        timeSignature: { beats: 3, beatType: 4 },
        tempo: 70,
        pattern: [
            { type: 'note', duration: 3, symbol: '𝅗𝅥.' },
            { type: 'note', duration: 1, symbol: '♩' }, { type: 'note', duration: 1, symbol: '♩' }, { type: 'note', duration: 1, symbol: '♩' },
            { type: 'note', duration: 3, symbol: '𝅗𝅥.' },
            { type: 'note', duration: 2, symbol: '𝅗𝅥' }, { type: 'note', duration: 1, symbol: '♩' },
            { type: 'note', duration: 1, symbol: '♩' }, { type: 'note', duration: 2, symbol: '𝅗𝅥' },
            { type: 'note', duration: 3, symbol: '𝅗𝅥.' },
            {type: 'final_barline', duration: 0, symbol: '𝄂', isControl: true}
        ]
    },
    {
        name: "Módulo III - Lição 22: Colcheia Pontuada em 4/4",
        timeSignature: { beats: 4, beatType: 4 },
        tempo: 75,
        pattern: [
            { type: 'note', duration: 0.75, symbol: '𝅘𝅥𝅮.' }, { type: 'note', duration: 0.25, symbol: '𝅘𝅥𝅯' }, { type: 'note', duration: 1, symbol: '♩' }, { type: 'note', duration: 2, symbol: '𝅗𝅥' },
            { type: 'note', duration: 1, symbol: '♩' }, { type: 'note', duration: 0.75, symbol: '𝅘𝅥𝅮.' }, { type: 'note', duration: 0.25, symbol: '𝅘𝅥𝅯' }, { type: 'note', duration: 1, symbol: '♩' }, { type: 'note', duration: 1, symbol: '♩' },
            { type: 'note', duration: 2, symbol: '𝅗𝅥' }, { type: 'note', duration: 0.75, symbol: '𝅘𝅥𝅮.' }, { type: 'note', duration: 0.25, symbol: '𝅘𝅥𝅯' }, { type: 'note', duration: 1, symbol: '♩' },
            { type: 'note', duration: 0.75, symbol: '𝅘𝅥𝅮.' }, { type: 'note', duration: 0.25, symbol: '𝅘𝅥𝅯' }, { type: 'note', duration: 0.75, symbol: '𝅘𝅥𝅮.' }, { type: 'note', duration: 0.25, symbol: '𝅘𝅥𝅯' }, { type: 'note', duration: 0.75, symbol: '𝅘𝅥𝅮.' }, { type: 'note', duration: 0.25, symbol: '𝅘𝅥𝅯' }, { type: 'note', duration: 1, symbol: '♩' },
            { type: 'note', duration: 4, symbol: '𝅝' },
            {type: 'final_barline', duration: 0, symbol: '𝄂', isControl: true}
        ]
    },
    {
        name: "Módulo III - Lição 23: Combinando Pontuadas em 2/4",
        timeSignature: { beats: 2, beatType: 4 },
        tempo: 80,
        pattern: [
            { type: 'note', duration: 1.5, symbol: '♩.' }, { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮' },
            { type: 'note', duration: 0.75, symbol: '𝅘𝅥𝅮.' }, { type: 'note', duration: 0.25, symbol: '𝅘𝅥𝅯' }, { type: 'note', duration: 1, symbol: '♩' },
            { type: 'note', duration: 1.5, symbol: '♩.' }, { type: 'rest', duration: 0.5, symbol: '𝄾' },
            { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮' }, { type: 'note', duration: 1.5, symbol: '♩.' },
            { type: 'note', duration: 2, symbol: '𝅗𝅥' },
            {type: 'final_barline', duration: 0, symbol: '𝄂', isControl: true}
        ]
    },
    {
        name: "Módulo III - Lição 24: Padrões com Pausas Pontuadas",
        timeSignature: { beats: 3, beatType: 4 },
        tempo: 85,
        pattern: [
            { type: 'note', duration: 1.5, symbol: '♩.' }, { type: 'rest', duration: 0.5, symbol: '𝄾' }, { type: 'note', duration: 1, symbol: '♩' },
            { type: 'note', duration: 0.75, symbol: '𝅘𝅥𝅮.' }, { type: 'rest', duration: 0.25, symbol: '𝄿' }, { type: 'note', duration: 2, symbol: '𝅗𝅥' },
            { type: 'note', duration: 1, symbol: '♩' }, { type: 'rest', duration: 1.5, symbol: '𝄽.' }, { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮' },
            { type: 'note', duration: 3, symbol: '𝅗𝅥.' },
            {type: 'final_barline', duration: 0, symbol: '𝄂', isControl: true}
        ]
    },
    {
        name: "Módulo III - Lição 25: Desafios Rítmicos com Pontuadas",
        timeSignature: { beats: 4, beatType: 4 },
        tempo: 90,
        pattern: [
            { type: 'note', duration: 1.5, symbol: '♩.' }, { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮' }, { type: 'note', duration: 0.75, symbol: '𝅘𝅥𝅮.' }, { type: 'note', duration: 0.25, symbol: '𝅘𝅥𝅯' }, { type: 'note', duration: 1, symbol: '♩' },
            { type: 'rest', duration: 1.5, symbol: '𝄽.' }, { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮' }, { type: 'rest', duration: 0.75, symbol: '𝄾.' }, { type: 'note', duration: 0.25, symbol: '𝅘𝅥𝅯' }, { type: 'note', duration: 1, symbol: '♩' },
            { type: 'note', duration: 3, symbol: '𝅗𝅥.' }, { type: 'note', duration: 1, symbol: '♩' },
            { type: 'note', duration: 0.75, symbol: '𝅘𝅥𝅮.' }, { type: 'note', duration: 0.25, symbol: '𝅘𝅥𝅯' }, { type: 'note', duration: 1.5, symbol: '♩.' }, { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮' }, { type: 'note', duration: 1, symbol: '♩' },
            {type: 'final_barline', duration: 0, symbol: '𝄂', isControl: true}
        ]
    },
    {
        name: "Módulo III - Lição 26: Ritmos Síncopados com Pontuadas",
        timeSignature: { beats: 4, beatType: 4 },
        tempo: 95,
        pattern: [
            { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮' }, { type: 'note', duration: 1.5, symbol: '♩.' }, { type: 'note', duration: 2, symbol: '𝅗𝅥' },
            { type: 'note', duration: 0.75, symbol: '𝅘𝅥𝅮.' }, { type: 'note', duration: 0.25, symbol: '𝅘𝅥𝅯' }, { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮' }, { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮' }, { type: 'note', duration: 2, symbol: '𝅗𝅥' },
            { type: 'rest', duration: 0.75, symbol: '𝄾.' }, { type: 'note', duration: 0.25, symbol: '𝅘𝅥𝅯' }, { type: 'note', duration: 1.5, symbol: '♩.' }, { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮' }, { type: 'note', duration: 1, symbol: '♩' },
            {type: 'final_barline', duration: 0, symbol: '𝄂', isControl: true}
        ]
    },
    {
        name: "Módulo III - Lição 27: Melodias Rítmicas com Pontuadas",
        timeSignature: { beats: 3, beatType: 4 },
        tempo: 100,
        pattern: [
            { type: 'note', duration: 1.5, symbol: '♩.' }, { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮' }, { type: 'note', duration: 1, symbol: '♩' },
            { type: 'note', duration: 0.75, symbol: '𝅘𝅥𝅮.' }, { type: 'note', duration: 0.25, symbol: '𝅘𝅥𝅯' }, { type: 'note', duration: 2, symbol: '𝅗𝅥' },
            { type: 'note', duration: 1, symbol: '♩' }, { type: 'note', duration: 1.5, symbol: '♩.' }, { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮' },
            { type: 'note', duration: 3, symbol: '𝅗𝅥.' },
            {type: 'final_barline', duration: 0, symbol: '𝄂', isControl: true}
        ]
    },
    {
        name: "Módulo III - Lição 28: Prática com Grupos de Pontuadas",
        timeSignature: { beats: 4, beatType: 4 },
        tempo: 105,
        pattern: [
            { type: 'note', duration: 0.75, symbol: '𝅘𝅥𝅮.' }, { type: 'note', duration: 0.25, symbol: '𝅘𝅥𝅯' }, { type: 'note', duration: 0.75, symbol: '𝅘𝅥𝅮.' }, { type: 'note', duration: 0.25, symbol: '𝅘𝅥𝅯' }, { type: 'note', duration: 2, symbol: '𝅗𝅥' },
            { type: 'note', duration: 1.5, symbol: '♩.' }, { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮' }, { type: 'note', duration: 1.5, symbol: '♩.' }, { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮' },
            { type: 'note', duration: 0.75, symbol: '𝅘𝅥𝅮.' }, { type: 'note', duration: 0.25, symbol: '𝅘𝅥𝅯' }, { type: 'note', duration: 1, symbol: '♩' }, { type: 'note', duration: 1, symbol: '♩' }, { type: 'note', duration: 1, symbol: '♩' },
            {type: 'final_barline', duration: 0, symbol: '𝄂', isControl: true}
        ]
    },
    {
        name: "Módulo III - Lição 29: Combinações Avançadas e Pausas",
        timeSignature: { beats: 4, beatType: 4 },
        tempo: 110,
        pattern: [
            { type: 'note', duration: 1.5, symbol: '♩.' }, { type: 'rest', duration: 0.5, symbol: '𝄾' }, { type: 'note', duration: 0.75, symbol: '𝅘𝅥𝅮.' }, { type: 'note', duration: 0.25, symbol: '𝅘𝅥𝅯' }, { type: 'rest', duration: 1, symbol: '𝄽' },
            { type: 'note', duration: 3, symbol: '𝅗𝅥.' }, { type: 'rest', duration: 1, symbol: '𝄽' },
            { type: 'note', duration: 0.75, symbol: '𝅘𝅥𝅮.' }, { type: 'note', duration: 0.25, symbol: '𝅘𝅥𝅯' }, { type: 'note', duration: 1.5, symbol: '♩.' }, { type: 'rest', duration: 0.5, symbol: '𝄾' }, { type: 'note', duration: 1, symbol: '♩' },
            { type: 'note', duration: 2, symbol: '𝅗𝅥' }, { type: 'note', duration: 2, symbol: '𝅗𝅥' },
            {type: 'final_barline', duration: 0, symbol: '𝄂', isControl: true}
        ]
    },
    {
        name: "Módulo III - Lição 30: Revisão com Pontuadas",
        timeSignature: { beats: 4, beatType: 4 },
        tempo: 115,
        pattern: [
            { type: 'note', duration: 3, symbol: '𝅗𝅥.' }, { type: 'note', duration: 1, symbol: '♩' },
            { type: 'note', duration: 0.75, symbol: '𝅘𝅥𝅮.' }, { type: 'note', duration: 0.25, symbol: '𝅘𝅥𝅯' }, { type: 'note', duration: 1.5, symbol: '♩.' }, { type: 'rest', duration: 1.5, symbol: '𝄽.' },
            { type: 'note', duration: 2, symbol: '𝅗𝅥' }, { type: 'note', duration: 0.75, symbol: '𝅘𝅥𝅮.' }, { type: 'note', duration: 0.25, symbol: '𝅘𝅥𝅯' }, { type: 'rest', duration: 1, symbol: '𝄽' },
            { type: 'note', duration: 1.5, symbol: '♩.' }, { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮' }, { type: 'note', duration: 1, symbol: '♩' }, { type: 'rest', duration: 1, symbol: '𝄽' },
            { type: 'note', duration: 4, symbol: '𝅝' },
            {type: 'final_barline', duration: 0, symbol: '𝄂', isControl: true}
        ]
    },
    // Módulo IV - Lições 31 a 40: Variação das Unidades de Tempo (2/2, 3/2, 3/8, 4/8)
      {
        name: "Módulo IV - Lição 31: Introdução ao Compasso 2/2 (Alla Breve)",
        timeSignature: { beats: 2, beatType: 2 }, // Mínima vale um tempo
        tempo: 80, // O tempo é sentido em 2, mas o BPM pode ser mais rápido
        pattern: [
            { type: 'note', duration: 2, symbol: '𝅗𝅥' }, { type: 'note', duration: 2, symbol: '𝅗𝅥' },
            { type: 'note', duration: 4, symbol: '𝅝' },
            { type: 'note', duration: 1, symbol: '♩' }, { type: 'note', duration: 1, symbol: '♩' }, { type: 'note', duration: 2, symbol: '𝅗𝅥' },
            { type: 'note', duration: 2, symbol: '𝅗𝅥' }, { type: 'rest', duration: 2, symbol: '𝄼' },
            { type: 'note', duration: 4, symbol: '𝅝' },
            {type: 'final_barline', duration: 0, symbol: '𝄂', isControl: true}
        ]
    },
    {
        name: "Módulo IV - Lição 32: Explorando o Compasso 3/2",
        timeSignature: { beats: 3, beatType: 2 }, // Mínima vale um tempo
        tempo: 70,
        pattern: [
            { type: 'note', duration: 2, symbol: '𝅗𝅥' }, { type: 'note', duration: 2, symbol: '𝅗𝅥' }, { type: 'note', duration: 2, symbol: '𝅗𝅥' },
            { type: 'note', duration: 4, symbol: '𝅝' }, { type: 'note', duration: 2, symbol: '𝅗𝅥' },
            { type: 'note', duration: 2, symbol: '𝅗𝅥' }, { type: 'note', duration: 4, symbol: '𝅝' },
            { type: 'rest', duration: 2, symbol: '𝄼' }, { type: 'note', duration: 4, symbol: '𝅝' },
            { type: 'note', duration: 3, symbol: '𝅗𝅥.' }, { type: 'note', duration: 3, symbol: '𝅗𝅥.' },
            { type: 'note', duration: 6, symbol: '𝅝.' }, // Semibreve pontuada
            {type: 'final_barline', duration: 0, symbol: '𝄂', isControl: true}
        ]
    },
    {
        name: "Módulo IV - Lição 33: Ritmos em 3/8",
        timeSignature: { beats: 3, beatType: 8 }, // Colcheia vale um tempo
        tempo: 120,
        pattern: [
            { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮' }, { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮' }, { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮' },
            { type: 'note', duration: 1, symbol: '♩' }, { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮' },
            { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮' }, { type: 'note', duration: 1, symbol: '♩' },
            { type: 'note', duration: 1.5, symbol: '♩.' },
            { type: 'rest', duration: 0.5, symbol: '𝄾' }, { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮' }, { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮' },
            { type: 'note', duration: 1.5, symbol: '♩.' },
            {type: 'final_barline', duration: 0, symbol: '𝄂', isControl: true}
        ]
    },
    {
        name: "Módulo IV - Lição 34: Padrões em 6/8 (Comparativo)",
        timeSignature: { beats: 6, beatType: 8 }, // 6 colcheias por compasso
        tempo: 130,
        pattern: [
            { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮' }, { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮' }, { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮' }, { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮' }, { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮' }, { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮' },
            { type: 'note', duration: 1.5, symbol: '♩.' }, { type: 'note', duration: 1.5, symbol: '♩.' },
            { type: 'note', duration: 1, symbol: '♩' }, { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮' }, { type: 'note', duration: 1, symbol: '♩' }, { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮' },
            { type: 'note', duration: 0.75, symbol: '𝅘𝅥𝅮.' }, { type: 'note', duration: 0.25, symbol: '𝅘𝅥𝅯' }, { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮' }, { type: 'note', duration: 1, symbol: '♩' },
            { type: 'note', duration: 3, symbol: '𝅗𝅥.' },
            {type: 'final_barline', duration: 0, symbol: '𝄂', isControl: true}
        ]
    },
    {
        name: "Módulo IV - Lição 35: Transição entre 2/2 e 4/4",
        timeSignature: { beats: 4, beatType: 4 }, // Revertendo para 4/4 para comparação
        tempo: 70,
        pattern: [
            { type: 'note', duration: 1, symbol: '♩' }, { type: 'note', duration: 1, symbol: '♩' }, { type: 'note', duration: 1, symbol: '♩' }, { type: 'note', duration: 1, symbol: '♩' },
            { type: 'note', duration: 2, symbol: '𝅗𝅥' }, { type: 'note', duration: 2, symbol: '𝅗𝅥' },
            { type: 'note', duration: 4, symbol: '𝅝' },
            // Agora, como se estivesse em 2/2
            { type: 'note', duration: 2, symbol: '𝅗𝅥' }, { type: 'rest', duration: 2, symbol: '𝄼' }, // Duas mínimas em 4/4, sentido como 2/2
            { type: 'note', duration: 4, symbol: '𝅝' }, // Uma semibreve em 4/4, sentida como 2/2
            {type: 'final_barline', duration: 0, symbol: '𝄂', isControl: true}
        ]
    },
    {
        name: "Módulo IV - Lição 36: Ritmos Combinados em 3/2",
        timeSignature: { beats: 3, beatType: 2 },
        tempo: 75,
        pattern: [
            { type: 'note', duration: 2, symbol: '𝅗𝅥' }, { type: 'note', duration: 1, symbol: '♩' }, { type: 'note', duration: 1, symbol: '♩' }, { type: 'note', duration: 2, symbol: '𝅗𝅥' },
            { type: 'note', duration: 4, symbol: '𝅝' }, { type: 'rest', duration: 2, symbol: '𝄼' },
            { type: 'note', duration: 2, symbol: '𝅗𝅥' }, { type: 'rest', duration: 2, symbol: '𝄼' }, { type: 'note', duration: 2, symbol: '𝅗𝅥' },
            { type: 'note', duration: 6, symbol: '𝅝.' },
            {type: 'final_barline', duration: 0, symbol: '𝄂', isControl: true}
        ]
    },
    {
        name: "Módulo IV - Lição 37: Desafio com Semicolcheias em 3/8",
        timeSignature: { beats: 3, beatType: 8 },
        tempo: 140,
        pattern: [
            { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮' }, { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮' }, { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮' },
            { type: 'note', duration: 0.25, symbol: '𝅘𝅥𝅯' }, { type: 'note', duration: 0.25, symbol: '𝅘𝅥𝅯' }, { type: 'note', duration: 0.25, symbol: '𝅘𝅥𝅯' }, { type: 'note', duration: 0.25, symbol: '𝅘𝅥𝅯' }, { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮' },
            { type: 'note', duration: 1, symbol: '♩' }, { type: 'rest', duration: 0.5, symbol: '𝄾' },
            { type: 'note', duration: 1.5, symbol: '♩.' },
            {type: 'final_barline', duration: 0, symbol: '𝄂', isControl: true}
        ]
    },
    {
        name: "Módulo IV - Lição 38: Prática de Agilidade em 6/8",
        timeSignature: { beats: 6, beatType: 8 },
        tempo: 150,
        pattern: [
            { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮' }, { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮' }, { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮' }, { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮' }, { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮' }, { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮' },
            { type: 'note', duration: 0.25, symbol: '𝅘𝅥𝅯' }, { type: 'note', duration: 0.25, symbol: '𝅘𝅥𝅯' }, { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮' }, { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮' }, { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮' }, { type: 'note', duration: 1, symbol: '♩' },
            { type: 'note', duration: 1.5, symbol: '♩.' }, { type: 'rest', duration: 1.5, symbol: '𝄽.' },
            { type: 'note', duration: 3, symbol: '𝅗𝅥.' },
            {type: 'final_barline', duration: 0, symbol: '𝄂', isControl: true}
        ]
    },
    {
        name: "Módulo IV - Lição 39: Fusão de Compassos e Figuras",
        timeSignature: { beats: 4, beatType: 4 }, // Voltando para 4/4 para revisão geral
        tempo: 80,
        pattern: [
            { type: 'note', duration: 2, symbol: '𝅗𝅥' }, { type: 'note', duration: 2, symbol: '𝅗𝅥' },
            { type: 'note', duration: 3, symbol: '𝅗𝅥.' }, { type: 'note', duration: 1, symbol: '♩' },
            { type: 'note', duration: 0.75, symbol: '𝅘𝅥𝅮.' }, { type: 'note', duration: 0.25, symbol: '𝅘𝅥𝅯' }, { type: 'rest', duration: 1, symbol: '𝄽' }, { type: 'note', duration: 2, symbol: '𝅗𝅥' },
            { type: 'note', duration: 2, symbol: '𝅗𝅥' }, { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮' }, { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮' }, { type: 'note', duration: 1, symbol: '♩' },
            { type: 'note', duration: 4, symbol: '𝅝' },
            {type: 'final_barline', duration: 0, symbol: '𝄂', isControl: true}
        ]
    },
    {
        name: "Módulo IV - Lição 40: Desafio Final de Unidades de Tempo",
        timeSignature: { beats: 3, beatType: 2 }, // Desafio final em 3/2
        tempo: 90,
        pattern: [
            { type: 'note', duration: 4, symbol: '𝅝' }, { type: 'note', duration: 2, symbol: '𝅗𝅥' },
            { type: 'rest', duration: 2, symbol: '𝄼' }, { type: 'note', duration: 2, symbol: '𝅗𝅥' }, { type: 'note', duration: 2, symbol: '𝅗𝅥' },
            { type: 'note', duration: 1, symbol: '♩' }, { type: 'note', duration: 1, symbol: '♩' }, { type: 'note', duration: 1, symbol: '♩' }, { type: 'note', duration: 1, symbol: '♩' }, { type: 'note', duration: 1, symbol: '♩' }, { type: 'note', duration: 1, symbol: '♩' },
            { type: 'note', duration: 3, symbol: '𝅗𝅥.' }, { type: 'note', duration: 3, symbol: '𝅗𝅥.' },
            { type: 'note', duration: 6, symbol: '𝅝.' },
            {type: 'final_barline', duration: 0, symbol: '𝄂', isControl: true}
        ]
    },
  
    // Módulo V - Lições 41 a 50: Ligaduras de Prolongamento
    // Adicionar um atributo `tiedToNext: true` para indicar que a nota está ligada à próxima
    // O próximo elemento na sequência será a nota ligada, mas sua duração não será contada no compasso
   {
        name: "Módulo V - Lição 41: Ligadura Simples no Mesmo Compasso",
        timeSignature: { beats: 4, beatType: 4 },
        tempo: 70,
        pattern: [
            { type: 'note', duration: 2, symbol: '𝅗𝅥', tiedToNext: true }, { type: 'note', duration: 1, symbol: '♩' }, { type: 'note', duration: 1, symbol: '♩' },
            { type: 'note', duration: 1, symbol: '♩' }, { type: 'note', duration: 1, symbol: '♩', tiedToNext: true }, { type: 'note', duration: 2, symbol: '𝅗𝅥' },
            { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮' }, { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮', tiedToNext: true }, { type: 'note', duration: 1, symbol: '♩' }, { type: 'note', duration: 2, symbol: '𝅗𝅥' },
            { type: 'note', duration: 1, symbol: '♩', tiedToNext: true }, { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮' }, { type: 'note', duration: 1.5, symbol: '♩.' }, { type: 'note', duration: 1, symbol: '♩' },
            {type: 'final_barline', duration: 0, symbol: '𝄂', isControl: true}
        ]
    },
    {
        name: "Módulo V - Lição 42: Ligadura Atravessando o Compasso",
        timeSignature: { beats: 4, beatType: 4 },
        tempo: 75,
        pattern: [
            { type: 'note', duration: 2, symbol: '𝅗𝅥' }, { type: 'note', duration: 2, symbol: '𝅗𝅥', tiedToNext: true },
            { type: 'note', duration: 2, symbol: '𝅗𝅥' }, { type: 'note', duration: 2, symbol: '𝅗𝅥' },
            { type: 'note', duration: 1, symbol: '♩' }, { type: 'note', duration: 3, symbol: '𝅗𝅥.', tiedToNext: true },
            { type: 'note', duration: 4, symbol: '𝅝' },
            { type: 'note', duration: 3, symbol: '𝅗𝅥.' }, { type: 'note', duration: 1, symbol: '♩', tiedToNext: true },
            { type: 'note', duration: 1, symbol: '♩' }, { type: 'note', duration: 3, symbol: '𝅗𝅥.' },
            {type: 'final_barline', duration: 0, symbol: '𝄂', isControl: true}
        ]
    },
    {
        name: "Módulo V - Lição 43: Ligaduras com Colcheias em 3/4",
        timeSignature: { beats: 3, beatType: 4 },
        tempo: 80,
        pattern: [
            { type: 'note', duration: 1, symbol: '♩' }, { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮', tiedToNext: true }, { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮' }, { type: 'note', duration: 1, symbol: '♩' },
            { type: 'note', duration: 1, symbol: '♩', tiedToNext: true }, { type: 'note', duration: 1, symbol: '♩' }, { type: 'note', duration: 1, symbol: '♩' },
            { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮' }, { type: 'note', duration: 1, symbol: '♩', tiedToNext: true }, { type: 'note', duration: 1, symbol: '♩' }, { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮' },
            { type: 'note', duration: 3, symbol: '𝅗𝅥.' },
            {type: 'final_barline', duration: 0, symbol: '𝄂', isControl: true}
        ]
    },
    {
        name: "Módulo V - Lição 44: Múltiplas Ligaduras e Semicolcheias",
        timeSignature: { beats: 4, beatType: 4 },
        tempo: 85,
        pattern: [
            { type: 'note', duration: 1, symbol: '♩', tiedToNext: true }, { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮' }, { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮', tiedToNext: true }, { type: 'note', duration: 2, symbol: '𝅗𝅥' },
            { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮', tiedToNext: true }, { type: 'note', duration: 0.25, symbol: '𝅘𝅥𝅯' }, { type: 'note', duration: 0.25, symbol: '𝅘𝅥𝅯' }, { type: 'note', duration: 1, symbol: '♩', tiedToNext: true }, { type: 'note', duration: 2, symbol: '𝅗𝅥' },
            { type: 'note', duration: 1, symbol: '♩', tiedToNext: true }, { type: 'note', duration: 1, symbol: '♩', tiedToNext: true }, { type: 'note', duration: 1, symbol: '♩', tiedToNext: true }, { type: 'note', duration: 1, symbol: '♩' },
            {type: 'final_barline', duration: 0, symbol: '𝄂', isControl: true}
        ]
    },
    {
        name: "Módulo V - Lição 45: Ligaduras e Pausas (Síncope)",
        timeSignature: { beats: 4, beatType: 4 },
        tempo: 90,
        pattern: [
            { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮' }, { type: 'note', duration: 1, symbol: '♩', tiedToNext: true }, { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮' }, { type: 'note', duration: 2, symbol: '𝅗𝅥' },
            { type: 'rest', duration: 1, symbol: '𝄽' }, { type: 'note', duration: 1, symbol: '♩' }, { type: 'note', duration: 1, symbol: '♩', tiedToNext: true }, { type: 'note', duration: 1, symbol: '♩' },
            { type: 'note', duration: 1.5, symbol: '♩.' }, { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮', tiedToNext: true }, { type: 'note', duration: 1, symbol: '♩' }, { type: 'rest', duration: 1, symbol: '𝄽' },
            { type: 'note', duration: 4, symbol: '𝅝' },
            {type: 'final_barline', duration: 0, symbol: '𝄂', isControl: true}
        ]
    },
    {
        name: "Módulo V - Lição 46: Ligadura de Colcheia Pontuada",
        timeSignature: { beats: 3, beatType: 4 },
        tempo: 95,
        pattern: [
            { type: 'note', duration: 0.75, symbol: '𝅘𝅥𝅮.' }, { type: 'note', duration: 0.25, symbol: '𝅘𝅥𝅯', tiedToNext: true }, { type: 'note', duration: 1, symbol: '♩' }, { type: 'note', duration: 1, symbol: '♩' },
            { type: 'note', duration: 1.5, symbol: '♩.', tiedToNext: true }, { type: 'note', duration: 1, symbol: '♩' }, { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮' },
            { type: 'note', duration: 1, symbol: '♩' }, { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮', tiedToNext: true }, { type: 'note', duration: 1.5, symbol: '♩.' },
            {type: 'final_barline', duration: 0, symbol: '𝄂', isControl: true}
        ]
    },
    {
        name: "Módulo V - Lição 47: Frases com Ligaduras e Síncopes",
        timeSignature: { beats: 4, beatType: 4 },
        tempo: 100,
        pattern: [
            { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮' }, { type: 'note', duration: 1, symbol: '♩', tiedToNext: true }, { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮' }, { type: 'note', duration: 1, symbol: '♩' }, { type: 'note', duration: 1, symbol: '♩' },
            { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮', tiedToNext: true }, { type: 'note', duration: 1.5, symbol: '♩.' }, { type: 'rest', duration: 1, symbol: '𝄽' }, { type: 'note', duration: 1, symbol: '♩' },
            { type: 'note', duration: 2, symbol: '𝅗𝅥', tiedToNext: true }, { type: 'note', duration: 1, symbol: '♩' }, { type: 'rest', duration: 1, symbol: '𝄽' },
            { type: 'note', duration: 4, symbol: '𝅝' },
            {type: 'final_barline', duration: 0, symbol: '𝄂', isControl: true}
        ]
    },
    {
        name: "Módulo V - Lição 48: Ligaduras Múltiplas e Contratempo",
        timeSignature: { beats: 2, beatType: 4 },
        tempo: 105,
        pattern: [
            { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮', tiedToNext: true }, { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮' },
            { type: 'rest', duration: 0.5, symbol: '𝄾' }, { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮', tiedToNext: true },
            { type: 'note', duration: 1, symbol: '♩' },
            { type: 'note', duration: 2, symbol: '𝅗𝅥', tiedToNext: true },
            { type: 'note', duration: 1, symbol: '♩' }, { type: 'note', duration: 1, symbol: '♩' },
            {type: 'final_barline', duration: 0, symbol: '𝄂', isControl: true}
        ]
    },
    {
        name: "Módulo V - Lição 49: Desafio de Leitura com Ligaduras",
        timeSignature: { beats: 3, beatType: 4 },
        tempo: 110,
        pattern: [
            { type: 'note', duration: 1, symbol: '♩', tiedToNext: true }, { type: 'note', duration: 1.5, symbol: '♩.' }, { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮' },
            { type: 'note', duration: 0.75, symbol: '𝅘𝅥𝅮.' }, { type: 'note', duration: 0.25, symbol: '𝅘𝅥𝅯', tiedToNext: true }, { type: 'note', duration: 1, symbol: '♩' }, { type: 'rest', duration: 1, symbol: '𝄽' },
            { type: 'note', duration: 3, symbol: '𝅗𝅥.', tiedToNext: true },
            { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮' }, { type: 'note', duration: 1, symbol: '♩' }, { type: 'note', duration: 1.5, symbol: '♩.' },
            {type: 'final_barline', duration: 0, symbol: '𝄂', isControl: true}
        ]
    },
    {
        name: "Módulo V - Lição 50: Ligaduras Cruzando Compasso e Múltiplas Figuras",
        timeSignature: { beats: 4, beatType: 4 },
        tempo: 115,
        pattern: [
            { type: 'note', duration: 2, symbol: '𝅗𝅥', tiedToNext: true }, 
            { type: 'note', duration: 1, symbol: '♩' }, { type: 'note', duration: 3, symbol: '𝅗𝅥.' },
            { type: 'note', duration: 1, symbol: '♩', tiedToNext: true }, { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮' }, { type: 'rest', duration: 0.5, symbol: '𝄾' }, { type: 'note', duration: 2, symbol: '𝅗𝅥' },
            { type: 'note', duration: 0.75, symbol: '𝅘𝅥𝅮.', tiedToNext: true },
            { type: 'note', duration: 0.25, symbol: '𝅘𝅥𝅯' }, { type: 'note', duration: 2, symbol: '𝅗𝅥' }, { type: 'note', duration: 1, symbol: '♩' },
            {type: 'final_barline', duration: 0, symbol: '𝄂', isControl: true}
        ]
    },

    // Módulo VI - Lições 51 a 60: Compassos Compostos (6/8)
        {
        name: "Módulo VI - Lição 51: Introdução ao Compasso 6/8",
        timeSignature: { beats: 6, beatType: 8 },
        tempo: 100, // O pulso é a colcheia
        pattern: [
            { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮' }, { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮' }, { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮' }, { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮' }, { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮' }, { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮' },
            { type: 'note', duration: 1.5, symbol: '♩.' }, { type: 'note', duration: 1.5, symbol: '♩.' },
            { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮' }, { type: 'note', duration: 1, symbol: '♩' }, { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮' }, { type: 'note', duration: 1, symbol: '♩' },
            { type: 'note', duration: 3, symbol: '𝅗𝅥.' },
            {type: 'final_barline', duration: 0, symbol: '𝄂', isControl: true}
        ]
    },
    {
        name: "Módulo VI - Lição 52: Semínimas e Colcheias em 6/8",
        timeSignature: { beats: 6, beatType: 8 },
        tempo: 110,
        pattern: [
            { type: 'note', duration: 1, symbol: '♩' }, { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮' }, { type: 'note', duration: 1.5, symbol: '♩.' },
            { type: 'note', duration: 1.5, symbol: '♩.' }, { type: 'note', duration: 1, symbol: '♩' }, { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮' },
            { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮' }, { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮' }, { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮' }, { type: 'note', duration: 1.5, symbol: '♩.' },
            { type: 'note', duration: 3, symbol: '𝅗𝅥.' },
            {type: 'final_barline', duration: 0, symbol: '𝄂', isControl: true}
        ]
    },
    {
        name: "Módulo VI - Lição 53: Mínima Pontuada em 6/8",
        timeSignature: { beats: 6, beatType: 8 },
        tempo: 115,
        pattern: [
            { type: 'note', duration: 3, symbol: '𝅗𝅥.' },
            { type: 'note', duration: 1.5, symbol: '♩.' }, { type: 'note', duration: 1.5, symbol: '♩.' },
            { type: 'note', duration: 3, symbol: '𝅗𝅥.' },
            { type: 'note', duration: 1.5, symbol: '♩.' }, { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮' }, { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮' }, { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮' },
            { type: 'note', duration: 3, symbol: '𝅗𝅥.' },
            {type: 'final_barline', duration: 0, symbol: '𝄂', isControl: true}
        ]
    },
    {
        name: "Módulo VI - Lição 54: Pausas em 6/8",
        timeSignature: { beats: 6, beatType: 8 },
        tempo: 100,
        pattern: [
            { type: 'rest', duration: 0.5, symbol: '𝄾' }, { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮' }, { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮' }, { type: 'note', duration: 1.5, symbol: '♩.' },
            { type: 'note', duration: 1.5, symbol: '♩.' }, { type: 'rest', duration: 1.5, symbol: '𝄽.' },
            { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮' }, { type: 'rest', duration: 0.5, symbol: '𝄾' }, { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮' }, { type: 'rest', duration: 0.5, symbol: '𝄾' }, { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮' }, { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮' },
            { type: 'rest', duration: 3, symbol: '𝄼.' },
            {type: 'final_barline', duration: 0, symbol: '𝄂', isControl: true}
        ]
    },
    {
        name: "Módulo VI - Lição 55: Pausas e Síncopes em 6/8",
        timeSignature: { beats: 6, beatType: 8 },
        tempo: 110,
        pattern: [
            { type: 'note', duration: 1, symbol: '♩' }, { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮' }, { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮' }, { type: 'note', duration: 1, symbol: '♩' },
            { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮' }, { type: 'rest', duration: 1, symbol: '𝄽' }, { type: 'note', duration: 1.5, symbol: '♩.' },
            { type: 'note', duration: 1.5, symbol: '♩.' }, { type: 'rest', duration: 0.5, symbol: '𝄾' }, { type: 'note', duration: 1, symbol: '♩' },
            { type: 'note', duration: 3, symbol: '𝅗𝅥.' },
            {type: 'final_barline', duration: 0, symbol: '𝄂', isControl: true}
        ]
    },
    {
        name: "Módulo VI - Lição 56: Semicolcheias em 6/8",
        timeSignature: { beats: 6, beatType: 8 },
        tempo: 120,
        pattern: [
            { type: 'note', duration: 0.25, symbol: '𝅘𝅥𝅯' }, { type: 'note', duration: 0.25, symbol: '𝅘𝅥𝅯' }, { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮' }, { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮' }, { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮' }, { type: 'note', duration: 1, symbol: '♩' },
            { type: 'note', duration: 1.5, symbol: '♩.' }, { type: 'note', duration: 0.25, symbol: '𝅘𝅥𝅯' }, { type: 'note', duration: 0.25, symbol: '𝅘𝅥𝅯' }, { type: 'note', duration: 0.25, symbol: '𝅘𝅥𝅯' }, { type: 'note', duration: 0.25, symbol: '𝅘𝅥𝅯' }, { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮' },
            { type: 'note', duration: 1, symbol: '♩' }, { type: 'note', duration: 0.25, symbol: '𝅘𝅥𝅯' }, { type: 'note', duration: 0.25, symbol: '𝅘𝅥𝅯' }, { type: 'note', duration: 1.5, symbol: '♩.' },
            { type: 'note', duration: 3, symbol: '𝅗𝅥.' },
            {type: 'final_barline', duration: 0, symbol: '𝄂', isControl: true}
        ]
    },
    {
        name: "Módulo VI - Lição 57: Padrões Rítmicos Complexos em 6/8",
        timeSignature: { beats: 6, beatType: 8 },
        tempo: 125,
        pattern: [
            { type: 'note', duration: 0.75, symbol: '𝅘𝅥𝅮.' }, { type: 'note', duration: 0.25, symbol: '𝅘𝅥𝅯' }, { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮' }, { type: 'note', duration: 1.5, symbol: '♩.' },
            { type: 'note', duration: 1, symbol: '♩' }, { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮' }, { type: 'note', duration: 0.75, symbol: '𝅘𝅥𝅮.' }, { type: 'note', duration: 0.25, symbol: '𝅘𝅥𝅯' }, { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮' },
            { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮' }, { type: 'rest', duration: 0.25, symbol: '𝄿' }, { type: 'note', duration: 0.25, symbol: '𝅘𝅥𝅯' }, { type: 'note', duration: 1, symbol: '♩' }, { type: 'note', duration: 1, symbol: '♩' },
            { type: 'note', duration: 3, symbol: '𝅗𝅥.' },
            {type: 'final_barline', duration: 0, symbol: '𝄂', isControl: true}
        ]
    },
    {
        name: "Módulo VI - Lição 58: Pausa de Semicolcheia em 6/8",
        timeSignature: { beats: 6, beatType: 8 },
        tempo: 130,
        pattern: [
            { type: 'note', duration: 0.25, symbol: '𝅘𝅥𝅯' }, { type: 'rest', duration: 0.25, symbol: '𝄿' }, { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮' }, { type: 'note', duration: 1, symbol: '♩' }, { type: 'note', duration: 1, symbol: '♩' },
            { type: 'rest', duration: 0.25, symbol: '𝄿' }, { type: 'note', duration: 0.25, symbol: '𝅘𝅥𝅯' }, { type: 'rest', duration: 0.5, symbol: '𝄾' }, { type: 'note', duration: 1.5, symbol: '♩.' }, { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮' },
            { type: 'note', duration: 1.5, symbol: '♩.' }, { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮' }, { type: 'rest', duration: 0.5, symbol: '𝄾' }, { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮' },
            { type: 'note', duration: 3, symbol: '𝅗𝅥.' },
            {type: 'final_barline', duration: 0, symbol: '𝄂', isControl: true}
        ]
    },
    {
        name: "Módulo VI - Lição 59: Exercício de Leitura em 6/8",
        timeSignature: { beats: 6, beatType: 8 },
        tempo: 120,
        pattern: [
            { type: 'note', duration: 1.5, symbol: '♩.' }, { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮' }, { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮' }, { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮' },
            { type: 'note', duration: 1, symbol: '♩' }, { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮' }, { type: 'note', duration: 1, symbol: '♩' }, { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮' },
            { type: 'note', duration: 0.75, symbol: '𝅘𝅥𝅮.' }, { type: 'note', duration: 0.25, symbol: '𝅘𝅥𝅯' }, { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮' }, { type: 'note', duration: 1, symbol: '♩' }, { rest: 0.5, symbol: '𝄾' },
            { type: 'note', duration: 3, symbol: '𝅗𝅥.' },
            {type: 'final_barline', duration: 0, symbol: '𝄂', isControl: true}
        ]
    },
    {
        name: "Módulo VI - Lição 60: Revisão Geral em 6/8",
        timeSignature: { beats: 6, beatType: 8 },
        tempo: 110,
        pattern: [
            { type: 'note', duration: 3, symbol: '𝅗𝅥.' },
            { type: 'note', duration: 1.5, symbol: '♩.' }, { type: 'note', duration: 1.5, symbol: '♩.' },
            { type: 'note', duration: 1, symbol: '♩' }, { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮' }, { type: 'rest', duration: 1.5, symbol: '𝄽.' },
            { type: 'note', duration: 0.75, symbol: '𝅘𝅥𝅮.' }, { type: 'note', duration: 0.25, symbol: '𝅘𝅥𝅯' }, { type: 'note', duration: 1, symbol: '♩' }, { note: 1, symbol: '♩' },
            { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮' }, { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮' }, { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮' }, { type: 'note', duration: 1.5, symbol: '♩.' },
            {type: 'final_barline', duration: 0, symbol: '𝄂', isControl: true}
        ]
    },
    // Módulo VII - Lições 61 a 70: Compassos Compostos (9/8 e 12/8)
        {
        name: "Módulo VII - Lição 61: Introdução ao Compasso 9/8",
        timeSignature: { beats: 9, beatType: 8 },
        tempo: 90,
        pattern: [
            { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮' }, { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮' }, { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮' }, { type: 'note', duration: 1.5, symbol: '♩.' }, { type: 'note', duration: 1.5, symbol: '♩.' },
            { type: 'note', duration: 1.5, symbol: '♩.' }, { type: 'note', duration: 1.5, symbol: '♩.' }, { type: 'note', duration: 1.5, symbol: '♩.' },
            { type: 'note', duration: 1, symbol: '♩' }, { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮' }, { type: 'note', duration: 1, symbol: '♩' }, { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮' }, { type: 'note', duration: 1.5, symbol: '♩.' },
            { type: 'note', duration: 4.5, symbol: '𝅗𝅥..' }, // Mínima duplamente pontuada
            {type: 'final_barline', duration: 0, symbol: '𝄂', isControl: true}
        ]
    },
    {
        name: "Módulo VII - Lição 62: Mínima Pontuada em 9/8",
        timeSignature: { beats: 9, beatType: 8 },
        tempo: 95,
        pattern: [
            { type: 'note', duration: 3, symbol: '𝅗𝅥.' }, { type: 'note', duration: 1.5, symbol: '♩.' },
            { type: 'note', duration: 1.5, symbol: '♩.' }, { type: 'note', duration: 3, symbol: '𝅗𝅥.' },
            { type: 'note', duration: 1.5, symbol: '♩.' }, { type: 'note', duration: 1.5, symbol: '♩.' }, { type: 'note', duration: 1.5, symbol: '♩.' },
            { type: 'note', duration: 3, symbol: '𝅗𝅥.' }, { type: 'note', duration: 1, symbol: '♩' }, { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮' },
            {type: 'final_barline', duration: 0, symbol: '𝄂', isControl: true}
        ]
    },
    {
        name: "Módulo VII - Lição 63: Pausas Variadas em 9/8",
        timeSignature: { beats: 9, beatType: 8 },
        tempo: 100,
        pattern: [
            { type: 'rest', duration: 1.5, symbol: '𝄽.' }, { type: 'note', duration: 1.5, symbol: '♩.' }, { type: 'note', duration: 1.5, symbol: '♩.' },
            { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮' }, { type: 'rest', duration: 0.5, symbol: '𝄾' }, { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮' }, { type: 'note', duration: 3, symbol: '𝅗𝅥.' },
            { type: 'note', duration: 1.5, symbol: '♩.' }, { type: 'rest', duration: 3, symbol: '𝄼.' },
            { type: 'note', duration: 4.5, symbol: '𝅗𝅥..' },
            {type: 'final_barline', duration: 0, symbol: '𝄂', isControl: true}
        ]
    },
    {
        name: "Módulo VII - Lição 64: Introdução ao Compasso 12/8",
        timeSignature: { beats: 12, beatType: 8 },
        tempo: 100,
        pattern: [
            { type: 'note', duration: 1.5, symbol: '♩.' }, { type: 'note', duration: 1.5, symbol: '♩.' }, { type: 'note', duration: 1.5, symbol: '♩.' }, { type: 'note', duration: 1.5, symbol: '♩.' },
            { type: 'note', duration: 3, symbol: '𝅗𝅥.' }, { type: 'note', duration: 3, symbol: '𝅗𝅥.' },
            { type: 'note', duration: 1, symbol: '♩' }, { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮' }, { type: 'note', duration: 1, symbol: '♩' }, { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮' }, { type: 'note', duration: 1, symbol: '♩' }, { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮' }, { type: 'note', duration: 1.5, symbol: '♩.' },
            { type: 'note', duration: 6, symbol: '𝅝.' },
            {type: 'final_barline', duration: 0, symbol: '𝄂', isControl: true}
        ]
    },
    {
        name: "Módulo VII - Lição 65: Mínimas Pontuadas em 12/8",
        timeSignature: { beats: 12, beatType: 8 },
        tempo: 105,
        pattern: [
            { type: 'note', duration: 3, symbol: '𝅗𝅥.' }, { type: 'note', duration: 1.5, symbol: '♩.' }, { type: 'note', duration: 1.5, symbol: '♩.' },
            { type: 'note', duration: 1.5, symbol: '♩.' }, { type: 'note', duration: 1.5, symbol: '♩.' }, { type: 'note', duration: 3, symbol: '𝅗𝅥.' },
            { type: 'note', duration: 6, symbol: '𝅝.' },
            { type: 'note', duration: 3, symbol: '𝅗𝅥.' }, { type: 'note', duration: 3, symbol: '𝅗𝅥.' },
            {type: 'final_barline', duration: 0, symbol: '𝄂', isControl: true}
        ]
    },
    {
        name: "Módulo VII - Lição 66: Pausas Complexas em 12/8",
        timeSignature: { beats: 12, beatType: 8 },
        tempo: 95,
        pattern: [
            { type: 'rest', duration: 3, symbol: '𝄼.' }, { type: 'note', duration: 1.5, symbol: '♩.' }, { type: 'note', duration: 1.5, symbol: '♩.' },
            { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮' }, { type: 'rest', duration: 0.5, symbol: '𝄾' }, { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮' }, { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮' }, { type: 'rest', duration: 0.5, symbol: '𝄾' }, { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮' }, { type: 'note', duration: 3, symbol: '𝅗𝅥.' },
            { type: 'rest', duration: 6, symbol: '𝄻.' }, // Pausa de semibreve pontuada
            {type: 'final_barline', duration: 0, symbol: '𝄂', isControl: true}
        ]
    },
    {
        name: "Módulo VII - Lição 67: Semicolcheias em 9/8",
        timeSignature: { beats: 9, beatType: 8 },
        tempo: 120,
        pattern: [
            { type: 'note', duration: 0.25, symbol: '𝅘𝅥𝅯' }, { type: 'note', duration: 0.25, symbol: '𝅘𝅥𝅯' }, { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮' }, { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮' }, { type: 'note', duration: 1, symbol: '♩' }, { type: 'note', duration: 1.5, symbol: '♩.' },
            { type: 'note', duration: 1.5, symbol: '♩.' }, { type: 'note', duration: 0.25, symbol: '𝅘𝅥𝅯' }, { type: 'note', duration: 0.25, symbol: '𝅘𝅥𝅯' }, { type: 'note', duration: 0.25, symbol: '𝅘𝅥𝅯' }, { type: 'note', duration: 0.25, symbol: '𝅘𝅥𝅯' }, { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮' },
            { type: 'note', duration: 3, symbol: '𝅗𝅥.' }, { type: 'note', duration: 1.5, symbol: '♩.' },
            {type: 'final_barline', duration: 0, symbol: '𝄂', isControl: true}
        ]
    },
    {
        name: "Módulo VII - Lição 68: Combinações Rítmicas em 12/8",
        timeSignature: { beats: 12, beatType: 8 },
        tempo: 100,
        pattern: [
            { type: 'note', duration: 1.5, symbol: '♩.' }, { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮' }, { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮' }, { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮' }, { type: 'note', duration: 3, symbol: '𝅗𝅥.' },
            { type: 'rest', duration: 1.5, symbol: '𝄽.' }, { type: 'note', duration: 1.5, symbol: '♩.' }, { type: 'note', duration: 3, symbol: '𝅗𝅥.' },
            { type: 'note', duration: 0.25, symbol: '𝅘𝅥𝅯' }, { type: 'note', duration: 0.25, symbol: '𝅘𝅥𝅯' }, { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮' }, { type: 'note', duration: 1, symbol: '♩' }, { type: 'note', duration: 1, symbol: '♩' }, { type: 'note', duration: 3, symbol: '𝅗𝅥.' },
            {type: 'final_barline', duration: 0, symbol: '𝄂', isControl: true}
        ]
    },
    {
        name: "Módulo VII - Lição 69: Exercício de Síncope em 9/8",
        timeSignature: { beats: 9, beatType: 8 },
        tempo: 110,
        pattern: [
            { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮' }, { type: 'note', duration: 1, symbol: '♩' }, { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮' }, { type: 'note', duration: 1.5, symbol: '♩.' }, { type: 'note', duration: 1.5, symbol: '♩.' },
            { type: 'rest', duration: 0.5, symbol: '𝄾' }, { type: 'note', duration: 1, symbol: '♩' }, { type: 'note', duration: 1.5, symbol: '♩.' }, { type: 'note', duration: 1.5, symbol: '♩.' },
            { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮' }, { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮' }, { type: 'rest', duration: 0.5, symbol: '𝄾' }, { type: 'note', duration: 3, symbol: '𝅗𝅥.' },
            {type: 'final_barline', duration: 0, symbol: '𝄂', isControl: true}
        ]
    },
    {
        name: "Módulo VII - Lição 70: Revisão dos Compassos Compostos",
        timeSignature: { beats: 12, beatType: 8 },
        tempo: 95,
        pattern: [
            { type: 'note', duration: 3, symbol: '𝅗𝅥.' }, { type: 'note', duration: 3, symbol: '𝅗𝅥.' },
            { type: 'note', duration: 1.5, symbol: '♩.' }, { type: 'rest', duration: 1.5, symbol: '𝄽.' }, { type: 'note', duration: 1.5, symbol: '♩.' }, { type: 'note', duration: 1.5, symbol: '♩.' },
            { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮' }, { type: 'note', duration: 1, symbol: '♩' }, { type: 'note', duration: 1.5, symbol: '♩.' }, { type: 'note', duration: 3, symbol: '𝅗𝅥.' },
            { type: 'note', duration: 0.25, symbol: '𝅘𝅥𝅯' }, { type: 'note', duration: 0.25, symbol: '𝅘𝅥𝅯' }, { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮' }, { type: 'rest', duration: 1, symbol: '𝄽' }, { type: 'note', duration: 1, symbol: '♩' }, { type: 'note', duration: 3, symbol: '𝅗𝅥.' },
            {type: 'final_barline', duration: 0, symbol: '𝄂', isControl: true}
        ]
    },

    // Módulo VIII - Lições 71 a 80: Ligaduras de Prolongamento em Compassos Compostos
      {
        name: "Módulo VIII - Lição 71: Ligaduras Simples em 6/8",
        timeSignature: { beats: 6, beatType: 8 },
        tempo: 70,
        pattern: [
            { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮', tiedToNext: true }, { type: 'note', duration: 1, symbol: '♩' }, { type: 'note', duration: 1.5, symbol: '♩.' },
            { type: 'note', duration: 1.5, symbol: '♩.', tiedToNext: true }, { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮' }, { type: 'note', duration: 1, symbol: '♩' },
            { type: 'note', duration: 1, symbol: '♩' }, { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮', tiedToNext: true }, { type: 'note', duration: 1.5, symbol: '♩.' },
            { type: 'note', duration: 3, symbol: '𝅗𝅥.' },
            {type: 'final_barline', duration: 0, symbol: '𝄂', isControl: true}
        ]
    },
    {
        name: "Módulo VIII - Lição 72: Ligaduras Cruzando Pulsos em 6/8",
        timeSignature: { beats: 6, beatType: 8 },
        tempo: 75,
        pattern: [
            { type: 'note', duration: 1, symbol: '♩' }, { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮', tiedToNext: true },
            { type: 'note', duration: 1, symbol: '♩' }, { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮' }, { type: 'note', duration: 1.5, symbol: '♩.' },
            { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮', tiedToNext: true }, { type: 'note', duration: 2.5, symbol: '♩.' }, // Duração irregular para cruzar pulso
            { type: 'note', duration: 3, symbol: '𝅗𝅥.' },
            {type: 'final_barline', duration: 0, symbol: '𝄂', isControl: true}
        ]
    },
    {
        name: "Módulo VIII - Lição 73: Ligaduras em 9/8",
        timeSignature: { beats: 9, beatType: 8 },
        tempo: 80,
        pattern: [
            { type: 'note', duration: 1.5, symbol: '♩.', tiedToNext: true }, { type: 'note', duration: 1.5, symbol: '♩.' }, { type: 'note', duration: 1.5, symbol: '♩.' },
            { type: 'note', duration: 3, symbol: '𝅗𝅥.' }, { type: 'note', duration: 1.5, symbol: '♩.', tiedToNext: true },
            { type: 'note', duration: 1.5, symbol: '♩.' }, { type: 'note', duration: 1.5, symbol: '♩.' }, { type: 'note', duration: 1.5, symbol: '♩.' },
            { type: 'note', duration: 4.5, symbol: '𝅗𝅥..', tiedToNext: true },
            { type: 'note', duration: 4.5, symbol: '𝅗𝅥..' },
            {type: 'final_barline', duration: 0, symbol: '𝄂', isControl: true}
        ]
    },
    {
        name: "Módulo VIII - Lição 74: Ligaduras entre Compassos em 9/8",
        timeSignature: { beats: 9, beatType: 8 },
        tempo: 85,
        pattern: [
            { type: 'note', duration: 3, symbol: '𝅗𝅥.' }, { type: 'note', duration: 1.5, symbol: '♩.', tiedToNext: true },
            { type: 'note', duration: 3, symbol: '𝅗𝅥.' }, { type: 'note', duration: 1.5, symbol: '♩.' },
            { type: 'note', duration: 1.5, symbol: '♩.' }, { type: 'note', duration: 1.5, symbol: '♩.' }, { type: 'note', duration: 1.5, symbol: '♩.', tiedToNext: true },
            { type: 'note', duration: 4.5, symbol: '𝅗𝅥..' },
            {type: 'final_barline', duration: 0, symbol: '𝄂', isControl: true}
        ]
    },
    {
        name: "Módulo VIII - Lição 75: Ligaduras Simples em 12/8",
        timeSignature: { beats: 12, beatType: 8 },
        tempo: 70,
        pattern: [
            { type: 'note', duration: 1.5, symbol: '♩.', tiedToNext: true }, { type: 'note', duration: 1.5, symbol: '♩.' }, { type: 'note', duration: 3, symbol: '𝅗𝅥.' },
            { type: 'note', duration: 3, symbol: '𝅗𝅥.' }, { type: 'note', duration: 1.5, symbol: '♩.', tiedToNext: true }, { type: 'note', duration: 1.5, symbol: '♩.' },
            { type: 'note', duration: 6, symbol: '𝅝.' },
            {type: 'final_barline', duration: 0, symbol: '𝄂', isControl: true}
        ]
    },
    {
        name: "Módulo VIII - Lição 76: Ligaduras com Semicolcheias em 12/8",
        timeSignature: { beats: 12, beatType: 8 },
        tempo: 75,
        pattern: [
            { type: 'note', duration: 1, symbol: '♩' }, { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮', tiedToNext: true }, { type: 'note', duration: 1.5, symbol: '♩.' }, { type: 'note', duration: 3, symbol: '𝅗𝅥.' },
            { type: 'note', duration: 0.25, symbol: '𝅘𝅥𝅯' }, { type: 'note', duration: 0.25, symbol: '𝅘𝅥𝅯' }, { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮', tiedToNext: true }, { type: 'note', duration: 2, symbol: '𝅗𝅥' }, { type: 'note', duration: 3, symbol: '𝅗𝅥.' },
            { type: 'note', duration: 6, symbol: '𝅝.' },
            {type: 'final_barline', duration: 0, symbol: '𝄂', isControl: true}
        ]
    },
    {
        name: "Módulo VIII - Lição 77: Ritmos Sincopados com Ligaduras em 6/8",
        timeSignature: { beats: 6, beatType: 8 },
        tempo: 80,
        pattern: [
            { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮' }, { type: 'note', duration: 1, symbol: '♩', tiedToNext: true }, { type: 'note', duration: 1, symbol: '♩' }, { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮' },
            { type: 'rest', duration: 0.5, symbol: '𝄾' }, { type: 'note', duration: 1, symbol: '♩' }, { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮', tiedToNext: true },
            { type: 'note', duration: 1.5, symbol: '♩.' }, { type: 'note', duration: 1.5, symbol: '♩.' },
            {type: 'final_barline', duration: 0, symbol: '𝄂', isControl: true}
        ]
    },
    {
        name: "Módulo VIII - Lição 78: Semicolcheias com Ligaduras em 9/8",
        timeSignature: { beats: 9, beatType: 8 },
        tempo: 110,
        pattern: [
            { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮' }, { type: 'note', duration: 0.25, symbol: '𝅘𝅥𝅯', tiedToNext: true }, { type: 'note', duration: 0.25, symbol: '𝅘𝅥𝅯' }, { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮' }, { type: 'note', duration: 3, symbol: '𝅗𝅥.' },
            { type: 'note', duration: 1.5, symbol: '♩.', tiedToNext: true }, { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮' }, { type: 'note', duration: 0.25, symbol: '𝅘𝅥𝅯' }, { type: 'note', duration: 0.25, symbol: '𝅘𝅥𝅯' }, { type: 'note', duration: 1.5, symbol: '♩.' },
            {type: 'final_barline', duration: 0, symbol: '𝄂', isControl: true}
        ]
    },
    {
        name: "Módulo VIII - Lição 79: Desafio de Ligaduras e Pausas em 12/8",
        timeSignature: { beats: 12, beatType: 8 },
        tempo: 100,
        pattern: [
            { type: 'note', duration: 1.5, symbol: '♩.', tiedToNext: true }, { type: 'note', duration: 1, symbol: '♩' }, { type: 'rest', duration: 0.5, symbol: '𝄾' }, { type: 'note', duration: 3, symbol: '𝅗𝅥.' },
            { type: 'note', duration: 3, symbol: '𝅗𝅥.' }, { type: 'note', duration: 1.5, symbol: '♩.', tiedToNext: true },
            { type: 'note', duration: 1.5, symbol: '♩.' }, { type: 'rest', duration: 1.5, symbol: '𝄽.' }, { type: 'note', duration: 3, symbol: '𝅗𝅥.' },
            {type: 'final_barline', duration: 0, symbol: '𝄂', isControl: true}
        ]
    },
    {
        name: "Módulo VIII - Lição 80: Revisão Geral com Ligaduras em Comp. Compostos",
        timeSignature: { beats: 12, beatType: 8 },
        tempo: 90,
        pattern: [
            { type: 'note', duration: 3, symbol: '𝅗𝅥.', tiedToNext: true },
            { type: 'note', duration: 1.5, symbol: '♩.' }, { type: 'note', duration: 1.5, symbol: '♩.' }, { type: 'note', duration: 6, symbol: '𝅝.' },
            { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮' }, { type: 'note', duration: 1, symbol: '♩', tiedToNext: true }, { type: 'note', duration: 1, symbol: '♩' }, { type: 'rest', duration: 0.5, symbol: '𝄾' }, { type: 'note', duration: 3, symbol: '𝅗𝅥.' },
            { type: 'note', duration: 0.75, symbol: '𝅘𝅥𝅮.' }, { type: 'note', duration: 0.25, symbol: '𝅘𝅥𝅯' }, { type: 'note', duration: 1.5, symbol: '♩.', tiedToNext: true }, { type: 'note', duration: 3, symbol: '𝅗𝅥.' },
            {type: 'final_barline', duration: 0, symbol: '𝄂', isControl: true}
        ]
    }
];