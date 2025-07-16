// --- Configurações e Dados Iniciais ---
export const rhythmicFigures = [
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

export const lessons = [
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
            { type: 'rest', duration: 2, symbol: '𝄼' }, { type: 'note', duration: 2, symbol: '𝅗𝅥' },
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
            { type: 'note', duration: 2, symbol: '𝅗𝅥' }, { type: 'note', duration: 2, symbol: '𝅗𝅥' },
            { type: 'note', duration: 1, symbol: '♩' }, { type: 'note', duration: 1, symbol: '♩' }, { type: 'note', duration: 2, symbol: '𝅗𝅥' },
            { type: 'note', duration: 2, symbol: '𝅗𝅥' }, { type: 'note', duration: 1, symbol: '♩' }, { type: 'note', duration: 1, symbol: '♩' },
            { type: 'note', duration: 4, symbol: '𝅝' },
            { type: 'note', duration: 1, symbol: '♩' }, { type: 'note', duration: 2, symbol: '𝅗𝅥' }, { type: 'note', duration: 1, symbol: '♩' },
            { type: 'note', duration: 2, symbol: '𝅗𝅥' }, { type: 'note', duration: 2, symbol: '𝅗𝅥' },
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
            { type: 'note', duration: 2, symbol: '𝅗𝅥' }, { type: 'rest', duration: 2, symbol: '𝄼' },
            { type: 'note', duration: 1, symbol: '♩' }, { type: 'note', duration: 1, symbol: '♩' }, { type: 'rest', duration: 1, symbol: '𝄽' }, { type: 'note', duration: 1, symbol: '♩' },
            { type: 'rest', duration: 1, symbol: '𝄽' }, { type: 'note', duration: 2, symbol: '𝅗𝅥' }, { type: 'note', duration: 1, symbol: '♩' },
            { type: 'note', duration: 4, symbol: '𝅝' },
            { type: 'note', duration: 1, symbol: '♩' }, { type: 'rest', duration: 1, symbol: '𝄽' }, { type: 'note', duration: 2, symbol: '𝅗𝅥' },
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
            { type: 'note', duration: 2, symbol: '𝅗𝅥' }, { type: 'note', duration: 1, symbol: '♩' }, { type: 'rest', duration: 1, symbol: '𝄽' },
            { type: 'note', duration: 1, symbol: '♩' }, { type: 'rest', duration: 1, symbol: '𝄽' }, { type: 'note', duration: 2, symbol: '𝅗𝅥' },
            { type: 'note', duration: 1, symbol: '♩' }, { type: 'note', duration: 1, symbol: '♩' }, { type: 'note', duration: 1, symbol: '♩' }, { type: 'note', duration: 1, symbol: '♩' },
            { type: 'rest', duration: 4, symbol: '𝄻' },
            { type: 'note', duration: 4, symbol: '𝅝' },
            { type: 'note', duration: 2, symbol: '𝅗𝅥' }, { type: 'rest', duration: 1, symbol: '𝄽' }, { type: 'note', duration: 1, symbol: '♩' },
            { type: 'note', duration: 1, symbol: '♩' }, { type: 'note', duration: 2, symbol: '𝅗𝅥' }, { type: 'rest', duration: 1, symbol: '𝄽' },
            { type: 'note', duration: 1, symbol: '♩' }, { type: 'note', duration: 1, symbol: '♩' }, { type: 'rest', duration: 2, symbol: '𝄼' },
            {type: 'final_barline', duration: 0, symbol: '𝄂', isControl: true}
        ]
    },

    // Módulo I (continuação) - Lições 6 a 10: Variação de Compassos 2/4, 3/4 e 4/4 com Semibreve, Mínima, Semínima, Colcheia, Semicolcheia e suas pausas.
    {
        name: "Módulo I - Lição 6: Explorando 2/4 com Semínimas e Colcheias",
        timeSignature: { beats: 2, beatType: 4 },
        tempo: 85,
        pattern: [
            { type: 'note', duration: 1, symbol: '♩' }, { type: 'note', duration: 1, symbol: '♩' }, // Compasso 1
            { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮' }, { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮' }, { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮' }, { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮' }, // Compasso 2
            { type: 'rest', duration: 1, symbol: '𝄽' }, { type: 'note', duration: 1, symbol: '♩' }, // Compasso 3
            { type: 'note', duration: 2, symbol: '𝅗𝅥' }, // Compasso 4 (Mínima completa o compasso 2/4)
            { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮' }, { type: 'rest', duration: 0.5, symbol: '𝄾' }, { type: 'note', duration: 1, symbol: '♩' }, // Compasso 5
            { type: 'note', duration: 1, symbol: '♩' }, { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮' }, { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮' }, // Compasso 6
            { type: 'rest', duration: 0.5, symbol: '𝄾' }, { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮' }, { type: 'note', duration: 1, symbol: '♩' }, // Compasso 7
            {type: 'final_barline', duration: 0, symbol: '𝄂', isControl: true}
        ]
    },
    {
        name: "Módulo I - Lição 7: Ritmos em 3/4 com Semínimas e Pausas",
        timeSignature: { beats: 3, beatType: 4 },
        tempo: 90,
        pattern: [
            { type: 'note', duration: 1, symbol: '♩' }, { type: 'note', duration: 1, symbol: '♩' }, { type: 'note', duration: 1, symbol: '♩' }, // Compasso 1
            { type: 'note', duration: 2, symbol: '𝅗𝅥' }, { type: 'note', duration: 1, symbol: '♩' }, // Compasso 2
            { type: 'note', duration: 1, symbol: '♩' }, { type: 'rest', duration: 1, symbol: '𝄽' }, { type: 'note', duration: 1, symbol: '♩' }, // Compasso 3
            { type: 'rest', duration: 3, symbol: '𝄼' }, // Compasso 4 (Mínima com pausa completa o compasso)
            { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮' }, { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮' }, { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮' }, { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮' }, { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮' }, { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮' }, // Compasso 5
            { type: 'note', duration: 1, symbol: '♩' }, { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮' }, { type: 'rest', duration: 0.5, symbol: '𝄾' }, { type: 'note', duration: 1, symbol: '♩' }, // Compasso 6
            { type: 'note', duration: 3, symbol: '𝅗𝅥.' }, // Compasso 7 (Mínima pontuada, se permitido neste módulo, ou 3 semínimas)
            {type: 'final_barline', duration: 0, symbol: '𝄂', isControl: true}
        ]
    },
    {
        name: "Módulo I - Lição 8: Semicolcheias em 4/4",
        timeSignature: { beats: 4, beatType: 4 },
        tempo: 95,
        pattern: [
            { type: 'note', duration: 0.25, symbol: '𝅘𝅥𝅯' }, { type: 'note', duration: 0.25, symbol: '𝅘𝅥𝅯' }, { type: 'note', duration: 0.25, symbol: '𝅘𝅥𝅯' }, { type: 'note', duration: 0.25, symbol: '𝅘𝅥𝅯' }, // 1 tempo
            { type: 'note', duration: 0.25, symbol: '𝅘𝅥𝅯' }, { type: 'note', duration: 0.25, symbol: '𝅘𝅥𝅯' }, { type: 'rest', duration: 0.25, symbol: '𝄿' }, { type: 'note', duration: 0.25, symbol: '𝅘𝅥𝅯' }, // 2 tempo
            { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮' }, { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮' }, { type: 'note', duration: 1, symbol: '♩' }, // 3 e 4 tempos
            { type: 'note', duration: 2, symbol: '𝅗𝅥' }, { type: 'note', duration: 1, symbol: '♩' }, { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮' }, { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮' }, // Compasso 2
            { type: 'rest', duration: 0.25, symbol: '𝄿' }, { type: 'note', duration: 0.25, symbol: '𝅘𝅥𝅯' }, { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮' }, { type: 'rest', duration: 1, symbol: '𝄽' }, { type: 'note', duration: 1, symbol: '♩' }, // Compasso 3
            { type: 'note', duration: 4, symbol: '𝅝' }, // Compasso 4
            {type: 'final_barline', duration: 0, symbol: '𝄂', isControl: true}
        ]
    },
    {
        name: "Módulo I - Lição 9: Combinações Rítmicas Complexas",
        timeSignature: { beats: 4, beatType: 4 },
        tempo: 100,
        pattern: [
            { type: 'note', duration: 1, symbol: '♩' }, { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮' }, { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮' }, { type: 'rest', duration: 1, symbol: '𝄽' }, { type: 'note', duration: 1, symbol: '♩' }, // Compasso 1
            { type: 'note', duration: 0.25, symbol: '𝅘𝅥𝅯' }, { type: 'note', duration: 0.25, symbol: '𝅘𝅥𝅯' }, { type: 'note', duration: 0.25, symbol: '𝅘𝅥𝅯' }, { type: 'note', duration: 0.25, symbol: '𝅘𝅥𝅯' },
            { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮' }, { type: 'rest', duration: 0.5, symbol: '𝄾' }, { type: 'note', duration: 2, symbol: '𝅗𝅥' }, // Compasso 2
            { type: 'note', duration: 2, symbol: '𝅗𝅥' }, { type: 'rest', duration: 0.5, symbol: '𝄾' }, { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮' }, { type: 'note', duration: 1, symbol: '♩' }, // Compasso 3
            { type: 'rest', duration: 4, symbol: '𝄻' }, // Compasso 4
            {type: 'final_barline', duration: 0, symbol: '𝄂', isControl: true}
        ]
    },
    {
        name: "Módulo I - Lição 10: Revisão Geral",
        timeSignature: { beats: 4, beatType: 4 },
        tempo: 105,
        pattern: [
            { type: 'note', duration: 4, symbol: '𝅝' }, // Compasso 1
            { type: 'note', duration: 2, symbol: '𝅗𝅥' }, { type: 'rest', duration: 2, symbol: '𝄼' }, // Compasso 2
            { type: 'note', duration: 1, symbol: '♩' }, { type: 'rest', duration: 1, symbol: '𝄽' }, { type: 'note', duration: 1, symbol: '♩' }, { type: 'rest', duration: 1, symbol: '𝄽' }, // Compasso 3
            { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮' }, { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮' }, { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮' }, { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮' },
            { type: 'note', duration: 0.25, symbol: '𝅘𝅥𝅯' }, { type: 'note', duration: 0.25, symbol: '𝅘𝅥𝅯' }, { type: 'note', duration: 0.25, symbol: '𝅘𝅥𝅯' }, { type: 'note', duration: 0.25, symbol: '𝅘𝅥𝅯' }, // Compasso 4
            { type: 'note', duration: 1, symbol: '♩' }, { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮' }, { type: 'rest', duration: 0.5, symbol: '𝄾' }, { type: 'rest', duration: 1, symbol: '𝄽' }, { type: 'note', duration: 1, symbol: '♩' }, // Compasso 5
            {type: 'final_barline', duration: 0, symbol: '𝄂', isControl: true}
        ]
    },

    // Módulo II - Lições 11 a 20: Variação de Compassos 2/4, 3/4 e 4/4 com Semibreve, Mínima, Semínima, Colcheia, Semicolcheia e suas pausas.
    {
        name: "Módulo II - Lição 11: Padrões de 2/4 Acelerados",
        timeSignature: { beats: 2, beatType: 4 },
        tempo: 110,
        pattern: [
            { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮' }, { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮' }, { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮' }, { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮' }, // Compasso 1
            { type: 'note', duration: 0.25, symbol: '𝅘𝅥𝅯' }, { type: 'note', duration: 0.25, symbol: '𝅘𝅥𝅯' }, { type: 'note', duration: 0.25, symbol: '𝅘𝅥𝅯' }, { type: 'note', duration: 0.25, symbol: '𝅘𝅥𝅯' },
            { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮' }, { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮' }, // Compasso 2
            { type: 'rest', duration: 0.5, symbol: '𝄾' }, { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮' }, { type: 'rest', duration: 1, symbol: '𝄽' }, // Compasso 3
            { type: 'note', duration: 1, symbol: '♩' }, { type: 'rest', duration: 0.5, symbol: '𝄾' }, { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮' }, // Compasso 4
            {type: 'final_barline', duration: 0, symbol: '𝄂', isControl: true}
        ]
    },
    {
        name: "Módulo II - Lição 12: Desafio em 3/4 com Pausas Variadas",
        timeSignature: { beats: 3, beatType: 4 },
        tempo: 115,
        pattern: [
            { type: 'note', duration: 1, symbol: '♩' }, { type: 'rest', duration: 0.5, symbol: '𝄾' }, { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮' }, { type: 'note', duration: 1, symbol: '♩' }, // Compasso 1
            { type: 'rest', duration: 1, symbol: '𝄽' }, { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮' }, { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮' }, { type: 'note', duration: 1, symbol: '♩' }, // Compasso 2
            { type: 'note', duration: 2, symbol: '𝅗𝅥' }, { type: 'rest', duration: 1, symbol: '𝄽' }, // Compasso 3
            { type: 'note', duration: 0.25, symbol: '𝅘𝅥𝅯' }, { type: 'note', duration: 0.25, symbol: '𝅘𝅥𝅯' }, { type: 'note', duration: 0.25, symbol: '𝅘𝅥𝅯' }, { type: 'note', duration: 0.25, symbol: '𝅘𝅥𝅯' },
            { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮' }, { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮' }, { type: 'note', duration: 1, symbol: '♩' }, // Compasso 4
            {type: 'final_barline', duration: 0, symbol: '𝄂', isControl: true}
        ]
    },
    {
        name: "Módulo II - Lição 13: Continuidade em 4/4 com Colcheias e Semicolcheias",
        timeSignature: { beats: 4, beatType: 4 },
        tempo: 120,
        pattern: [
            { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮' }, { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮' }, { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮' }, { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮' },
            { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮' }, { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮' }, { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮' }, { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮' }, // Compasso 1 e 2 (total de 4 tempos)
            { type: 'note', duration: 0.25, symbol: '𝅘𝅥𝅯' }, { type: 'note', duration: 0.25, symbol: '𝅘𝅥𝅯' }, { type: 'note', duration: 0.25, symbol: '𝅘𝅥𝅯' }, { type: 'note', duration: 0.25, symbol: '𝅘𝅥𝅯' },
            { type: 'rest', duration: 0.5, symbol: '𝄾' }, { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮' }, { type: 'note', duration: 1, symbol: '♩' }, { type: 'note', duration: 1, symbol: '♩' }, // Compasso 3 e 4 (total de 4 tempos)
            {type: 'final_barline', duration: 0, symbol: '𝄂', isControl: true}
        ]
    },
    {
        name: "Módulo II - Lição 14: Pausas e Notas em 2/4",
        timeSignature: { beats: 2, beatType: 4 },
        tempo: 125,
        pattern: [
            { type: 'rest', duration: 0.5, symbol: '𝄾' }, { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮' }, { type: 'note', duration: 0.25, symbol: '𝅘𝅥𝅯' }, { type: 'rest', duration: 0.25, symbol: '𝄿' }, { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮' }, // Compasso 1
            { type: 'note', duration: 1, symbol: '♩' }, { type: 'rest', duration: 1, symbol: '𝄽' }, // Compasso 2
            { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮' }, { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮' }, { type: 'note', duration: 0.25, symbol: '𝅘𝅥𝅯' }, { type: 'note', duration: 0.25, symbol: '𝅘𝅥𝅯' }, { type: 'note', duration: 0.25, symbol: '𝅘𝅥𝅯' }, { type: 'note', duration: 0.25, symbol: '𝅘𝅥𝅯' }, // Compasso 3
            { type: 'note', duration: 2, symbol: '𝅗𝅥' }, // Compasso 4
            {type: 'final_barline', duration: 0, symbol: '𝄂', isControl: true}
        ]
    },
    {
        name: "Módulo II - Lição 15: Combinações Rítmicas em 3/4",
        timeSignature: { beats: 3, beatType: 4 },
        tempo: 130,
        pattern: [
            { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮' }, { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮' }, { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮' }, { type: 'rest', duration: 0.5, symbol: '𝄾' }, { type: 'note', duration: 1, symbol: '♩' }, // Compasso 1
            { type: 'note', duration: 0.25, symbol: '𝅘𝅥𝅯' }, { type: 'note', duration: 0.25, symbol: '𝅘𝅥𝅯' }, { type: 'note', duration: 0.25, symbol: '𝅘𝅥𝅯' }, { type: 'rest', duration: 0.25, symbol: '𝄿' },
            { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮' }, { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮' }, { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮' }, // Compasso 2
            { type: 'note', duration: 1, symbol: '♩' }, { type: 'note', duration: 1, symbol: '♩' }, { type: 'note', duration: 1, symbol: '♩' }, // Compasso 3
            {type: 'final_barline', duration: 0, symbol: '𝄂', isControl: true}
        ]
    },
    {
        name: "Módulo II - Lição 16: Padrões de Semicolcheias em 4/4",
        timeSignature: { beats: 4, beatType: 4 },
        tempo: 135,
        pattern: [
            { type: 'note', duration: 0.25, symbol: '𝅘𝅥𝅯' }, { type: 'note', duration: 0.25, symbol: '𝅘𝅥𝅯' }, { type: 'note', duration: 0.25, symbol: '𝅘𝅥𝅯' }, { type: 'note', duration: 0.25, symbol: '𝅘𝅥𝅯' },
            { type: 'note', duration: 0.25, symbol: '𝅘𝅥𝅯' }, { type: 'rest', duration: 0.25, symbol: '𝄿' }, { type: 'note', duration: 0.25, symbol: '𝅘𝅥𝅯' }, { type: 'note', duration: 0.25, symbol: '𝅘𝅥𝅯' },
            { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮' }, { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮' }, { type: 'rest', duration: 1, symbol: '𝄽' }, { type: 'note', duration: 1, symbol: '♩' }, // Compasso 1 e 2
            { type: 'note', duration: 4, symbol: '𝅝' }, // Compasso 3
            {type: 'final_barline', duration: 0, symbol: '𝄂', isControl: true}
        ]
    },
    {
        name: "Módulo II - Lição 17: Ritmos Sincopados em 2/4",
        timeSignature: { beats: 2, beatType: 4 },
        tempo: 140,
        pattern: [
            { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮' }, { type: 'rest', duration: 0.5, symbol: '𝄾' }, { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮' }, { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮' }, // Compasso 1
            { type: 'rest', duration: 0.25, symbol: '𝄿' }, { type: 'note', duration: 0.25, symbol: '𝅘𝅥𝅯' }, { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮' }, { type: 'note', duration: 1, symbol: '♩' }, // Compasso 2
            { type: 'note', duration: 2, symbol: '𝅗𝅥' }, // Compasso 3
            {type: 'final_barline', duration: 0, symbol: '𝄂', isControl: true}
        ]
    },
    {
        name: "Módulo II - Lição 18: Construindo Frases em 3/4",
        timeSignature: { beats: 3, beatType: 4 },
        tempo: 145,
        pattern: [
            { type: 'note', duration: 1, symbol: '♩' }, { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮' }, { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮' }, { type: 'rest', duration: 1, symbol: '𝄽' }, // Compasso 1
            { type: 'note', duration: 0.25, symbol: '𝅘𝅥𝅯' }, { type: 'note', duration: 0.25, symbol: '𝅘𝅥𝅯' }, { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮' }, { type: 'note', duration: 1, symbol: '♩' }, { type: 'note', duration: 1, symbol: '♩' }, // Compasso 2
            { type: 'rest', duration: 0.5, symbol: '𝄾' }, { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮' }, { type: 'rest', duration: 0.25, symbol: '𝄿' }, { type: 'note', duration: 0.25, symbol: '𝅘𝅥𝅯' }, { type: 'note', duration: 1, symbol: '♩' }, // Compasso 3
            {type: 'final_barline', duration: 0, symbol: '𝄂', isControl: true}
        ]
    },
    {
        name: "Módulo II - Lição 19: Exercício de Velocidade em 4/4",
        timeSignature: { beats: 4, beatType: 4 },
        tempo: 150,
        pattern: [
            { type: 'note', duration: 0.25, symbol: '𝅘𝅥𝅯' }, { type: 'note', duration: 0.25, symbol: '𝅘𝅥𝅯' }, { type: 'note', duration: 0.25, symbol: '𝅘𝅥𝅯' }, { type: 'note', duration: 0.25, symbol: '𝅘𝅥𝅯' },
            { type: 'note', duration: 0.25, symbol: '𝅘𝅥𝅯' }, { type: 'note', duration: 0.25, symbol: '𝅘𝅥𝅯' }, { type: 'note', duration: 0.25, symbol: '𝅘𝅥𝅯' }, { type: 'note', duration: 0.25, symbol: '𝅘𝅥𝅯' },
            { type: 'note', duration: 0.25, symbol: '𝅘𝅥𝅯' }, { type: 'note', duration: 0.25, symbol: '𝅘𝅥𝅯' }, { type: 'note', duration: 0.25, symbol: '𝅘𝅥𝅯' }, { type: 'note', duration: 0.25, symbol: '𝅘𝅥𝅯' },
            { type: 'note', duration: 0.25, symbol: '𝅘𝅥𝅯' }, { type: 'note', duration: 0.25, symbol: '𝅘𝅥𝅯' }, { type: 'note', duration: 0.25, symbol: '𝅘𝅥𝅯' }, { type: 'note', duration: 0.25, symbol: '𝅘𝅥𝅯' }, // Quatro tempos de semicolcheias
            { type: 'rest', duration: 4, symbol: '𝄻' }, // Pausa de semibreve
            {type: 'final_barline', duration: 0, symbol: '𝄂', isControl: true}
        ]
    },
    {
        name: "Módulo II - Lição 20: Transição para o Próximo Módulo",
        timeSignature: { beats: 4, beatType: 4 },
        tempo: 155,
        pattern: [
            { type: 'note', duration: 2, symbol: '𝅗𝅥' }, { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮' }, { type: 'rest', duration: 0.5, symbol: '𝄾' }, { type: 'note', duration: 1, symbol: '♩' }, // Compasso 1
            { type: 'note', duration: 0.25, symbol: '𝅘𝅥𝅯' }, { type: 'rest', duration: 0.25, symbol: '𝄿' }, { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮' }, { type: 'note', duration: 1, symbol: '♩' }, { type: 'note', duration: 1, symbol: '♩' }, // Compasso 2
            { type: 'note', duration: 4, symbol: '𝅝' }, // Compasso 3
            {type: 'final_barline', duration: 0, symbol: '𝄂', isControl: true}
        ]
    },

    // Módulo III - Lições 21 a 30: Introdução à Mínima Pontuada e Colcheia Pontuada
    {
        name: "Módulo III - Lição 21: Mínima Pontuada em 3/4",
        timeSignature: { beats: 3, beatType: 4 },
        tempo: 70,
        pattern: [
            { type: 'note', duration: 3, symbol: '𝅗𝅥.' }, // Compasso 1 (Mínima Pontuada)
            { type: 'note', duration: 1, symbol: '♩' }, { type: 'note', duration: 1, symbol: '♩' }, { type: 'note', duration: 1, symbol: '♩' }, // Compasso 2
            { type: 'note', duration: 3, symbol: '𝅗𝅥.' }, // Compasso 3
            { type: 'note', duration: 1.5, symbol: '♩.' }, { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮' }, { type: 'note', duration: 1, symbol: '♩' }, // Compasso 4 (Semínima pontuada e Colcheia)
            {type: 'final_barline', duration: 0, symbol: '𝄂', isControl: true}
        ]
    },
    {
        name: "Módulo III - Lição 22: Colcheia Pontuada em 4/4",
        timeSignature: { beats: 4, beatType: 4 },
        tempo: 75,
        pattern: [
            { type: 'note', duration: 0.75, symbol: '𝅘𝅥𝅮.' }, { type: 'note', duration: 0.25, symbol: '𝅘𝅥𝅯' }, { type: 'note', duration: 1, symbol: '♩' }, { type: 'note', duration: 1, symbol: '♩' }, { type: 'note', duration: 1, symbol: '♩' }, // Compasso 1
            { type: 'note', duration: 0.75, symbol: '𝅘𝅥𝅮.' }, { type: 'rest', duration: 0.25, symbol: '𝄿' }, { type: 'note', duration: 0.75, symbol: '𝅘𝅥𝅮.' }, { type: 'note', duration: 0.25, symbol: '𝅘𝅥𝅯' }, { type: 'note', duration: 2, symbol: '𝅗𝅥' }, // Compasso 2
            { type: 'note', duration: 4, symbol: '𝅝' }, // Compasso 3
            {type: 'final_barline', duration: 0, symbol: '𝄂', isControl: true}
        ]
    },
    {
        name: "Módulo III - Lição 23: Combinando Pontuadas em 2/4",
        timeSignature: { beats: 2, beatType: 4 },
        tempo: 80,
        pattern: [
            { type: 'note', duration: 1.5, symbol: '♩.' }, { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮' }, // Compasso 1
            { type: 'note', duration: 0.75, symbol: '𝅘𝅥𝅮.' }, { type: 'note', duration: 0.25, symbol: '𝅘𝅥𝅯' }, { type: 'rest', duration: 1, symbol: '𝄽' }, // Compasso 2
            { type: 'note', duration: 1.5, symbol: '♩.' }, { type: 'rest', duration: 0.5, symbol: '𝄾' }, // Compasso 3
            { type: 'note', duration: 0.75, symbol: '𝅘𝅥𝅮.' }, { type: 'note', duration: 0.25, symbol: '𝅘𝅥𝅯' }, { type: 'note', duration: 1, symbol: '♩' }, // Compasso 4
            {type: 'final_barline', duration: 0, symbol: '𝄂', isControl: true}
        ]
    },
    {
        name: "Módulo III - Lição 24: Padrões com Pausas Pontuadas em 3/4",
        timeSignature: { beats: 3, beatType: 4 },
        tempo: 85,
        pattern: [
            { type: 'rest', duration: 1.5, symbol: '𝄽.' }, { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮' }, { type: 'note', duration: 1, symbol: '♩' }, // Compasso 1
            { type: 'note', duration: 0.75, symbol: '𝅘𝅥𝅮.' }, { type: 'rest', duration: 0.25, symbol: '𝄿' }, { type: 'note', duration: 1, symbol: '♩' }, { type: 'note', duration: 1, symbol: '♩' }, // Compasso 2
            { type: 'note', duration: 3, symbol: '𝅗𝅥.' }, // Compasso 3
            { type: 'note', duration: 0.75, symbol: '𝅘𝅥𝅮.' }, { type: 'note', duration: 0.25, symbol: '𝅘𝅥𝅯' }, { type: 'rest', duration: 1, symbol: '𝄽' }, { type: 'note', duration: 1, symbol: '♩' }, // Compasso 4
            {type: 'final_barline', duration: 0, symbol: '𝄂', isControl: true}
        ]
    },
    {
        name: "Módulo III - Lição 25: Desafios Rítmicos com Pontuadas em 4/4",
        timeSignature: { beats: 4, beatType: 4 },
        tempo: 90,
        pattern: [
            { type: 'note', duration: 1.5, symbol: '♩.' }, { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮' }, { type: 'note', duration: 0.75, symbol: '𝅘𝅥𝅮.' }, { type: 'note', duration: 0.25, symbol: '𝅘𝅥𝅯' }, { type: 'note', duration: 1, symbol: '♩' }, // Compasso 1
            { type: 'rest', duration: 1.5, symbol: '𝄽.' }, { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮' }, { type: 'rest', duration: 0.75, symbol: '𝄾.' }, { type: 'note', duration: 0.25, symbol: '𝅘𝅥𝅯' }, { type: 'note', duration: 1, symbol: '♩' }, // Compasso 2
            { type: 'note', duration: 3, symbol: '𝅗𝅥.' }, { type: 'note', duration: 1, symbol: '♩' }, // Compasso 3
            { type: 'note', duration: 0.75, symbol: '𝅘𝅥𝅮.' }, { type: 'note', duration: 0.25, symbol: '𝅘𝅥𝅯' }, { type: 'note', duration: 0.75, symbol: '𝅘𝅥𝅮.' }, { type: 'note', duration: 0.25, symbol: '𝅘𝅥𝅯' }, { type: 'note', duration: 1, symbol: '♩' }, { type: 'note', duration: 1, symbol: '♩' }, // Compasso 4
            {type: 'final_barline', duration: 0, symbol: '𝄂', isControl: true}
        ]
    },
    {
        name: "Módulo III - Lição 26: Ritmos Síncopados com Pontuadas",
        timeSignature: { beats: 4, beatType: 4 },
        tempo: 95,
        pattern: [
            { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮' }, { type: 'note', duration: 0.75, symbol: '𝅘𝅥𝅮.' }, { type: 'note', duration: 0.25, symbol: '𝅘𝅥𝅯' }, { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮' }, { type: 'note', duration: 2, symbol: '𝅗𝅥' }, // Compasso 1
            { type: 'rest', duration: 0.75, symbol: '𝄾.' }, { type: 'note', duration: 0.25, symbol: '𝅘𝅥𝅯' }, { type: 'note', duration: 1.5, symbol: '♩.' }, { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮' }, { type: 'note', duration: 1, symbol: '♩' }, // Compasso 2
            {type: 'final_barline', duration: 0, symbol: '𝄂', isControl: true}
        ]
    },
    {
        name: "Módulo III - Lição 27: Melodias Simples com Pontuadas",
        timeSignature: { beats: 3, beatType: 4 },
        tempo: 100,
        pattern: [
            { type: 'note', duration: 1.5, symbol: '♩.' }, { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮' }, { type: 'note', duration: 1, symbol: '♩' }, // Compasso 1
            { type: 'note', duration: 0.75, symbol: '𝅘𝅥𝅮.' }, { type: 'note', duration: 0.25, symbol: '𝅘𝅥𝅯' }, { type: 'note', duration: 1.5, symbol: '♩.' }, { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮' }, // Compasso 2
            { type: 'note', duration: 3, symbol: '𝅗𝅥.' }, // Compasso 3
            {type: 'final_barline', duration: 0, symbol: '𝄂', isControl: true}
        ]
    },
    {
        name: "Módulo III - Lição 28: Prática com Grupos de Colcheias Pontuadas",
        timeSignature: { beats: 4, beatType: 4 },
        tempo: 105,
        pattern: [
            { type: 'note', duration: 0.75, symbol: '𝅘𝅥𝅮.' }, { type: 'note', duration: 0.25, symbol: '𝅘𝅥𝅯' }, { type: 'note', duration: 0.75, symbol: '𝅘𝅥𝅮.' }, { type: 'note', duration: 0.25, symbol: '𝅘𝅥𝅯' },
            { type: 'note', duration: 0.75, symbol: '𝅘𝅥𝅮.' }, { type: 'note', duration: 0.25, symbol: '𝅘𝅥𝅯' }, { type: 'note', duration: 0.75, symbol: '𝅘𝅥𝅮.' }, { type: 'note', duration: 0.25, symbol: '𝅘𝅥𝅯' }, // Quatro tempos de colcheias pontuadas e semicolcheias
            { type: 'note', duration: 2, symbol: '𝅗𝅥' }, { type: 'note', duration: 1.5, symbol: '♩.' }, { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮' }, // Compasso 2
            {type: 'final_barline', duration: 0, symbol: '𝄂', isControl: true}
        ]
    },
    {
        name: "Módulo III - Lição 29: Combinações Avançadas de Pontuadas e Pausas",
        timeSignature: { beats: 4, beatType: 4 },
        tempo: 110,
        pattern: [
            { type: 'note', duration: 1.5, symbol: '♩.' }, { type: 'rest', duration: 0.5, symbol: '𝄾' }, { type: 'note', duration: 0.75, symbol: '𝅘𝅥𝅮.' }, { type: 'note', duration: 0.25, symbol: '𝅘𝅥𝅯' }, { type: 'rest', duration: 1, symbol: '𝄽' }, // Compasso 1
            { type: 'note', duration: 3, symbol: '𝅗𝅥.' }, { type: 'rest', duration: 1, symbol: '𝄽' }, // Compasso 2
            { type: 'note', duration: 0.75, symbol: '𝅘𝅥𝅮.' }, { type: 'note', duration: 0.25, symbol: '𝅘𝅥𝅯' }, { type: 'note', duration: 1.5, symbol: '♩.' }, { type: 'rest', duration: 0.5, symbol: '𝄾' }, { type: 'note', duration: 1, symbol: '♩' }, // Compasso 3
            {type: 'final_barline', duration: 0, symbol: '𝄂', isControl: true}
        ]
    },
    {
        name: "Módulo III - Lição 30: Revisão com Pontuadas",
        timeSignature: { beats: 4, beatType: 4 },
        tempo: 115,
        pattern: [
            { type: 'note', duration: 3, symbol: '𝅗𝅥.' }, { type: 'note', duration: 1, symbol: '♩' }, // Compasso 1
            { type: 'note', duration: 0.75, symbol: '𝅘𝅥𝅮.' }, { type: 'note', duration: 0.25, symbol: '𝅘𝅥𝅯' }, { type: 'note', duration: 1.5, symbol: '♩.' }, { type: 'rest', duration: 1.5, symbol: '𝄽.' }, // Compasso 2
            { type: 'note', duration: 2, symbol: '𝅗𝅥' }, { type: 'note', duration: 0.75, symbol: '𝅘𝅥𝅮.' }, { type: 'note', duration: 0.25, symbol: '𝅘𝅥𝅯' }, { type: 'rest', duration: 1, symbol: '𝄽' }, // Compasso 3
            { type: 'note', duration: 4, symbol: '𝅝' }, // Compasso 4
            {type: 'final_barline', duration: 0, symbol: '𝄂', isControl: true}
        ]
    },

    // Módulo IV - Lições 31 a 40: Variação das Unidades de Tempo (2/2, 3/2, 3/8, 4/8)
    {
        name: "Módulo IV - Lição 31: Introdução ao Compasso 2/2 (Alla Breve)",
        timeSignature: { beats: 2, beatType: 2 }, // Mínima vale um tempo
        tempo: 60,
        pattern: [
            { type: 'note', duration: 2, symbol: '𝅗𝅥' }, { type: 'note', duration: 2, symbol: '𝅗𝅥' }, // Duas mínimas (equivalente a uma semibreve)
            { type: 'note', duration: 4, symbol: '𝅝' }, // Uma semibreve (dois tempos de mínima)
            { type: 'rest', duration: 4, symbol: '𝄻' }, // Pausa de semibreve
            { type: 'note', duration: 2, symbol: '𝅗𝅥' }, { type: 'rest', duration: 2, symbol: '𝄼' }, // Mínima e pausa de mínima
            {type: 'final_barline', duration: 0, symbol: '𝄂', isControl: true}
        ]
    },
    {
        name: "Módulo IV - Lição 32: Explorando o Compasso 3/2",
        timeSignature: { beats: 3, beatType: 2 }, // Mínima vale um tempo
        tempo: 65,
        pattern: [
            { type: 'note', duration: 2, symbol: '𝅗𝅥' }, { type: 'note', duration: 2, symbol: '𝅗𝅥' }, { type: 'note', duration: 2, symbol: '𝅗𝅥' }, // Três mínimas
            { type: 'note', duration: 4, symbol: '𝅝' }, { type: 'note', duration: 2, symbol: '𝅗𝅥' }, // Uma semibreve e uma mínima
            { type: 'rest', duration: 2, symbol: '𝄼' }, { type: 'note', duration: 4, symbol: '𝅝' }, // Pausa de mínima e semibreve
            { type: 'note', duration: 3, symbol: '𝅗𝅥.' }, { type: 'note', duration: 3, symbol: '𝅗𝅥.' }, // Duas mínimas pontuadas (se permitido, mas para 3/2, 3 mínimas ou uma semibreve e uma mínima)
            {type: 'final_barline', duration: 0, symbol: '𝄂', isControl: true}
        ]
    },
    {
        name: "Módulo IV - Lição 33: Ritmos em 3/8",
        timeSignature: { beats: 3, beatType: 8 }, // Colcheia vale um tempo
        tempo: 120, // A batida principal é a colcheia
        pattern: [
            { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮' }, { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮' }, { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮' }, // Três colcheias
            { type: 'note', duration: 1, symbol: '♩' }, { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮' }, // Semínima e colcheia
            { type: 'rest', duration: 0.5, symbol: '𝄾' }, { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮' }, { type: 'rest', duration: 0.5, symbol: '𝄾' }, // Três pausas de colcheia
            { type: 'note', duration: 1.5, symbol: '♩.' }, // Semínima pontuada
            {type: 'final_barline', duration: 0, symbol: '𝄂', isControl: true}
        ]
    },
    {
        name: "Módulo IV - Lição 34: Padrões em 4/8",
        timeSignature: { beats: 4, beatType: 8 }, // Colcheia vale um tempo
        tempo: 130,
        pattern: [
            { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮' }, { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮' }, { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮' }, { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮' }, // Quatro colcheias
            { type: 'note', duration: 1, symbol: '♩' }, { type: 'note', duration: 1, symbol: '♩' }, // Duas semínimas
            { type: 'rest', duration: 0.5, symbol: '𝄾' }, { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮' }, { type: 'rest', duration: 1, symbol: '𝄽' }, // Pausa de colcheia, colcheia, pausa de semínima
            { type: 'note', duration: 0.75, symbol: '𝅘𝅥𝅮.' }, { type: 'note', duration: 0.25, symbol: '𝅘𝅥𝅯' }, { type: 'note', duration: 1, symbol: '♩' }, // Colcheia pontuada, semicolcheia, semínima
            {type: 'final_barline', duration: 0, symbol: '𝄂', isControl: true}
        ]
    },
    {
        name: "Módulo IV - Lição 35: Transição entre 2/2 e 4/4",
        timeSignature: { beats: 4, beatType: 4 }, // Revertendo para 4/4 para comparação
        tempo: 70,
        pattern: [
            { type: 'note', duration: 4, symbol: '𝅝' }, // Uma semibreve em 4/4
            { type: 'note', duration: 2, symbol: '𝅗𝅥' }, { type: 'note', duration: 2, symbol: '𝅗𝅥' }, // Duas mínimas em 4/4
            { type: 'note', duration: 1, symbol: '♩' }, { type: 'note', duration: 1, symbol: '♩' }, { type: 'note', duration: 1, symbol: '♩' }, { type: 'note', duration: 1, symbol: '♩' }, // Quatro semínimas em 4/4
            // Agora, como se estivesse em 2/2
            { type: 'note', duration: 2, symbol: '𝅗𝅥' }, { type: 'rest', duration: 2, symbol: '𝄼' }, // Uma mínima e uma pausa de mínima (equivale a um compasso de 2/2)
            { type: 'note', duration: 4, symbol: '𝅝' }, // Uma semibreve (equivale a um compasso de 2/2)
            {type: 'final_barline', duration: 0, symbol: '𝄂', isControl: true}
        ]
    },
    {
        name: "Módulo IV - Lição 36: Ritmos Combinados em 3/2",
        timeSignature: { beats: 3, beatType: 2 },
        tempo: 75,
        pattern: [
            { type: 'note', duration: 2, symbol: '𝅗𝅥' }, { type: 'note', duration: 1, symbol: '♩' }, { type: 'note', duration: 1, symbol: '♩' }, { type: 'note', duration: 2, symbol: '𝅗𝅥' }, // Mínima, duas semínimas, mínima
            { type: 'rest', duration: 4, symbol: '𝄻' }, { type: 'note', duration: 2, symbol: '𝅗𝅥' }, // Pausa de semibreve, mínima
            { type: 'note', duration: 2, symbol: '𝅗𝅥' }, { type: 'rest', duration: 2, symbol: '𝄼' }, { type: 'note', duration: 2, symbol: '𝅗𝅥' }, // Mínima, pausa de mínima, mínima
            {type: 'final_barline', duration: 0, symbol: '𝄂', isControl: true}
        ]
    },
    {
        name: "Módulo IV - Lição 37: Desafio com Semicolcheias em 3/8",
        timeSignature: { beats: 3, beatType: 8 },
        tempo: 140,
        pattern: [
            { type: 'note', duration: 0.25, symbol: '𝅘𝅥𝅯' }, { type: 'note', duration: 0.25, symbol: '𝅘𝅥𝅯' }, { type: 'note', duration: 0.25, symbol: '𝅘𝅥𝅯' }, { type: 'note', duration: 0.25, symbol: '𝅘𝅥𝅯' }, { type: 'note', duration: 0.25, symbol: '𝅘𝅥𝅯' }, { type: 'note', duration: 0.25, symbol: '𝅘𝅥𝅯' }, // Seis semicolcheias (equivalente a 1.5 tempos de colcheia)
            { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮' }, { type: 'rest', duration: 0.5, symbol: '𝄾' }, { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮' }, // Colcheia, pausa de colcheia, colcheia
            { type: 'note', duration: 1.5, symbol: '♩.' }, // Semínima pontuada
            {type: 'final_barline', duration: 0, symbol: '𝄂', isControl: true}
        ]
    },
    {
        name: "Módulo IV - Lição 38: Prática de Agilidade em 4/8",
        timeSignature: { beats: 4, beatType: 8 },
        tempo: 150,
        pattern: [
            { type: 'note', duration: 0.25, symbol: '𝅘𝅥𝅯' }, { type: 'note', duration: 0.25, symbol: '𝅘𝅥𝅯' }, { type: 'note', duration: 0.25, symbol: '𝅘𝅥𝅯' }, { type: 'note', duration: 0.25, symbol: '𝅘𝅥𝅯' },
            { type: 'note', duration: 0.25, symbol: '𝅘𝅥𝅯' }, { type: 'note', duration: 0.25, symbol: '𝅘𝅥𝅯' }, { type: 'note', duration: 0.25, symbol: '𝅘𝅥𝅯' }, { type: 'note', duration: 0.25, symbol: '𝅘𝅥𝅯' }, // Duas semínimas (total de 8 semicolcheias)
            { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮' }, { type: 'rest', duration: 0.5, symbol: '𝄾' }, { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮' }, { type: 'rest', duration: 0.5, symbol: '𝄾' }, // Duas colcheias com pausas
            { type: 'note', duration: 1.5, symbol: '♩.' }, { type: 'rest', duration: 0.5, symbol: '𝄾' }, // Semínima pontuada, pausa de colcheia
            {type: 'final_barline', duration: 0, symbol: '𝄂', isControl: true}
        ]
    },
    {
        name: "Módulo IV - Lição 39: Fusão de Compassos e Figuras (Revisão)",
        timeSignature: { beats: 4, beatType: 4 }, // Voltando para 4/4 para revisão geral
        tempo: 80,
        pattern: [
            { type: 'note', duration: 4, symbol: '𝅝' }, // Semibreve
            { type: 'note', duration: 3, symbol: '𝅗𝅥.' }, { type: 'note', duration: 1, symbol: '♩' }, // Mínima pontuada e semínima
            { type: 'note', duration: 0.75, symbol: '𝅘𝅥𝅮.' }, { type: 'note', duration: 0.25, symbol: '𝅘𝅥𝅯' }, { type: 'rest', duration: 1, symbol: '𝄽' }, { type: 'note', duration: 2, symbol: '𝅗𝅥' }, // Colcheia pontuada, semicolcheia, pausa de semínima, mínima
            { type: 'note', duration: 2, symbol: '𝅗𝅥' }, { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮' }, { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮' }, { type: 'note', duration: 1, symbol: '♩' }, // Mínima, duas colcheias, semínima
            {type: 'final_barline', duration: 0, symbol: '𝄂', isControl: true}
        ]
    },
    {
        name: "Módulo IV - Lição 40: Desafio Final de Unidades de Tempo",
        timeSignature: { beats: 3, beatType: 2 }, // Desafio final em 3/2
        tempo: 90,
        pattern: [
            { type: 'note', duration: 4, symbol: '𝅝' }, { type: 'note', duration: 2, symbol: '𝅗𝅥' }, // Semibreve e mínima
            { type: 'rest', duration: 2, symbol: '𝄼' }, { type: 'note', duration: 2, symbol: '𝅗𝅥' }, { type: 'note', duration: 2, symbol: '𝅗𝅥' }, // Pausa de mínima, duas mínimas
            { type: 'note', duration: 1, symbol: '♩' }, { type: 'note', duration: 1, symbol: '♩' }, { type: 'note', duration: 1, symbol: '♩' }, { type: 'note', duration: 1, symbol: '♩' }, { type: 'note', duration: 1, symbol: '♩' }, { type: 'note', duration: 1, symbol: '♩' }, // Seis semínimas (equivale a 3 mínimas)
            { type: 'note', duration: 3, symbol: '𝅗𝅥.' }, { type: 'note', duration: 3, symbol: '𝅗𝅥.' }, // Duas mínimas pontuadas
            {type: 'final_barline', duration: 0, symbol: '𝄂', isControl: true}
        ]
    },

    // Módulo V - Lições 41 a 50: Ligaduras de Prolongamento
    // Adicionar um atributo `tiedToNext: true` para indicar que a nota está ligada à próxima
    // O próximo elemento na sequência será a nota ligada, mas sua duração não será contada no compasso
    {
        name: "Módulo V - Lição 41: Ligadura Simples no Mesmo Compasso (4/4)",
        timeSignature: { beats: 4, beatType: 4 },
        tempo: 70,
        pattern: [
            { type: 'note', duration: 2, symbol: '𝅗𝅥', tiedToNext: true }, { type: 'note', duration: 1, symbol: '♩' }, // Mínima ligada a semínima
            { type: 'note', duration: 1, symbol: '♩' }, // Semínima (complementa o compasso)
            { type: 'note', duration: 1, symbol: '♩' }, { type: 'note', duration: 1, symbol: '♩', tiedToNext: true }, { type: 'note', duration: 2, symbol: '𝅗𝅥' }, // Semínima, semínima ligada a mínima
            { type: 'note', duration: 4, symbol: '𝅝' }, // Semibreve
            {type: 'final_barline', duration: 0, symbol: '𝄂', isControl: true}
        ]
    },
    {
        name: "Módulo V - Lição 42: Ligadura Atravessando o Compasso (4/4)",
        timeSignature: { beats: 4, beatType: 4 },
        tempo: 75,
        pattern: [
            { type: 'note', duration: 3, symbol: '𝅗𝅥.', tiedToNext: true }, // Mínima pontuada (continua no próximo compasso)
            { type: 'note', duration: 1, symbol: '♩' }, // Semínima (complementa a ligadura do compasso anterior)
            { type: 'note', duration: 2, symbol: '𝅗𝅥' }, { type: 'note', duration: 2, symbol: '𝅗𝅥' }, // Duas mínimas
            { type: 'note', duration: 4, symbol: '𝅝' }, // Semibreve
            {type: 'final_barline', duration: 0, symbol: '𝄂', isControl: true}
        ]
    },
    {
        name: "Módulo V - Lição 43: Ligaduras com Colcheias (3/4)",
        timeSignature: { beats: 3, beatType: 4 },
        tempo: 80,
        pattern: [
            { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮', tiedToNext: true }, { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮' }, { type: 'note', duration: 1, symbol: '♩' }, { type: 'note', duration: 1, symbol: '♩' }, // Colcheia ligada, semínima, semínima
            { type: 'note', duration: 1, symbol: '♩', tiedToNext: true }, { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮' }, { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮' }, { type: 'note', duration: 1, symbol: '♩' }, // Semínima ligada, duas colcheias, semínima
            { type: 'note', duration: 3, symbol: '𝅗𝅥.' }, // Mínima pontuada
            {type: 'final_barline', duration: 0, symbol: '𝄂', isControl: true}
        ]
    },
    {
        name: "Módulo V - Lição 44: Múltiplas Ligaduras no Mesmo Compasso (4/4)",
        timeSignature: { beats: 4, beatType: 4 },
        tempo: 85,
        pattern: [
            { type: 'note', duration: 1, symbol: '♩', tiedToNext: true }, { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮' }, { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮', tiedToNext: true }, { type: 'note', duration: 2, symbol: '𝅗𝅥' }, // Semínima ligada a colcheia, colcheia ligada a mínima
            { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮', tiedToNext: true }, { type: 'note', duration: 0.25, symbol: '𝅘𝅥𝅯' }, { type: 'note', duration: 0.25, symbol: '𝅘𝅥𝅯' }, { type: 'note', duration: 1, symbol: '♩', tiedToNext: true }, { type: 'note', duration: 2, symbol: '𝅗𝅥' }, // Colcheia ligada a semicolcheia, semicolcheia, semínima ligada a mínima
            {type: 'final_barline', duration: 0, symbol: '𝄂', isControl: true}
        ]
    },
    {
        name: "Módulo V - Lição 45: Ligaduras com Pausas (4/4) - Conceitual",
        timeSignature: { beats: 4, beatType: 4 },
        tempo: 90,
        pattern: [
            // NOTA: Pausas não são ligadas no sentido tradicional.
            // Para simular "ligar" uma nota a uma pausa, a nota simplesmente para no início da pausa.
            // Para simular "ligar" uma pausa a uma nota, a nota começaria após a pausa.
            // Este exercício foca em combinação de notas e pausas onde a duração é estendida,
            // mas não através de uma "ligadura" literal para a pausa.
            { type: 'note', duration: 2, symbol: '𝅗𝅥' }, { type: 'rest', duration: 2, symbol: '𝄼' }, // Mínima, pausa de mínima
            { type: 'note', duration: 1, symbol: '♩' }, { type: 'rest', duration: 1, symbol: '𝄽' }, { type: 'note', duration: 2, symbol: '𝅗𝅥' }, // Semínima, pausa de semínima, mínima
            { type: 'note', duration: 4, symbol: '𝅝' }, // Semibreve
            {type: 'final_barline', duration: 0, symbol: '𝄂', isControl: true}
        ]
    },
    {
        name: "Módulo V - Lição 46: Ligadura de Colcheia Pontuada (3/4)",
        timeSignature: { beats: 3, beatType: 4 },
        tempo: 95,
        pattern: [
            { type: 'note', duration: 0.75, symbol: '𝅘𝅥𝅮.', tiedToNext: true }, { type: 'note', duration: 0.25, symbol: '𝅘𝅥𝅯' }, { type: 'note', duration: 1, symbol: '♩' }, { type: 'note', duration: 1, symbol: '♩' }, // Colcheia pontuada ligada a semicolcheia, duas semínimas
            { type: 'note', duration: 1.5, symbol: '♩.', tiedToNext: true }, { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮' }, { type: 'note', duration: 1, symbol: '♩' }, // Semínima pontuada ligada a colcheia, semínima
            { type: 'note', duration: 3, symbol: '𝅗𝅥.' }, // Mínima pontuada
            {type: 'final_barline', duration: 0, symbol: '𝄂', isControl: true}
        ]
    },
    {
        name: "Módulo V - Lição 47: Frases com Ligaduras e Sincopados (4/4)",
        timeSignature: { beats: 4, beatType: 4 },
        tempo: 100,
        pattern: [
            { type: 'note', duration: 1, symbol: '♩' }, { type: 'note', duration: 1, symbol: '♩', tiedToNext: true }, { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮' }, { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮' }, { type: 'note', duration: 1, symbol: '♩' }, // Semínima, semínima ligada a colcheia, colcheia, semínima
            { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮', tiedToNext: true }, { type: 'note', duration: 1.5, symbol: '♩.' }, { type: 'rest', duration: 1, symbol: '𝄽' }, { type: 'note', duration: 1, symbol: '♩' }, // Colcheia ligada a semínima pontuada, pausa de semínima, semínima
            { type: 'note', duration: 4, symbol: '𝅝' }, // Semibreve
            {type: 'final_barline', duration: 0, symbol: '𝄂', isControl: true}
        ]
    },
    {
        name: "Módulo V - Lição 48: Ligaduras Múltiplas e Contratempo (2/4)",
        timeSignature: { beats: 2, beatType: 4 },
        tempo: 105,
        pattern: [
            { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮', tiedToNext: true }, { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮' }, // Colcheia ligada a colcheia
            { type: 'rest', duration: 0.5, symbol: '𝄾' }, { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮', tiedToNext: true }, { type: 'note', duration: 1, symbol: '♩' }, // Pausa, colcheia ligada a semínima
            { type: 'note', duration: 2, symbol: '𝅗𝅥', tiedToNext: true }, // Mínima ligada (continua no próximo compasso)
            { type: 'note', duration: 1, symbol: '♩' }, { type: 'note', duration: 1, symbol: '♩' }, // Semínima (complementa a ligadura), semínima
            {type: 'final_barline', duration: 0, symbol: '𝄂', isControl: true}
        ]
    },
    {
        name: "Módulo V - Lição 49: Desafio de Leitura com Ligaduras (3/4)",
        timeSignature: { beats: 3, beatType: 4 },
        tempo: 110,
        pattern: [
            { type: 'note', duration: 1, symbol: '♩', tiedToNext: true }, { type: 'note', duration: 1.5, symbol: '♩.' }, { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮' }, // Semínima ligada a semínima pontuada, colcheia
            { type: 'note', duration: 0.75, symbol: '𝅘𝅥𝅮.', tiedToNext: true }, { type: 'note', duration: 0.25, symbol: '𝅘𝅥𝅯' }, { type: 'rest', duration: 1, symbol: '𝄽' }, { type: 'note', duration: 1, symbol: '♩' }, // Colcheia pontuada ligada a semicolcheia, pausa de semínima, semínima
            { type: 'note', duration: 3, symbol: '𝅗𝅥.', tiedToNext: true }, // Mínima pontuada ligada
            { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮' }, { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮' }, { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮' }, { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮' }, { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮' }, { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮' }, // Três colcheias (complementam a ligadura e preenchem o compasso)
            {type: 'final_barline', duration: 0, symbol: '𝄂', isControl: true}
        ]
    },
    {
        name: "Módulo V - Lição 50: Ligaduras Cruzando Compasso e Múltiplas Figuras (4/4)",
        timeSignature: { beats: 4, beatType: 4 },
        tempo: 115,
        pattern: [
            { type: 'note', duration: 2, symbol: '𝅗𝅥', tiedToNext: true }, // Mínima ligada
            { type: 'note', duration: 1, symbol: '♩' }, { type: 'note', duration: 1, symbol: '♩' }, // Semínima e semínima (complementam e preenchem)
            { type: 'note', duration: 1, symbol: '♩', tiedToNext: true }, { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮' }, { type: 'rest', duration: 0.5, symbol: '𝄾' }, { type: 'note', duration: 1, symbol: '♩' }, { type: 'note', duration: 1, symbol: '♩' }, // Semínima ligada a colcheia, pausa de colcheia, duas semínimas
            { type: 'note', duration: 0.75, symbol: '𝅘𝅥𝅮.', tiedToNext: true }, // Colcheia pontuada ligada
            { type: 'note', duration: 0.25, symbol: '𝅘𝅥𝅯' }, { type: 'note', duration: 4, symbol: '𝅝' }, // Semicolcheia (complementa) e semibreve
            {type: 'final_barline', duration: 0, symbol: '𝄂', isControl: true}
        ]
    },

    // Módulo VI - Lições 51 a 60: Compassos Compostos (6/8)
    {
        name: "Módulo VI - Lição 51: Introdução ao Compasso 6/8 (Colcheias)",
        timeSignature: { beats: 6, beatType: 8 }, // 6 colcheias por compasso, divididas em dois grupos de 3
        tempo: 60, // A batida principal é a semínima pontuada, mas o tempo é para a colcheia
        pattern: [
            { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮' }, { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮' }, { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮' }, // Primeiro grupo de 3 colcheias
            { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮' }, { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮' }, { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮' }, // Segundo grupo de 3 colcheias
            { type: 'note', duration: 1.5, symbol: '♩.' }, { type: 'note', duration: 1.5, symbol: '♩.' }, // Duas semínimas pontuadas
            { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮' }, { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮' }, { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮' },
            { type: 'note', duration: 1.5, symbol: '♩.' }, // Três colcheias e uma semínima pontuada
            {type: 'final_barline', duration: 0, symbol: '𝄂', isControl: true}
        ]
    },
    {
        name: "Módulo VI - Lição 52: Semínimas e Colcheias em 6/8",
        timeSignature: { beats: 6, beatType: 8 },
        tempo: 65,
        pattern: [
            { type: 'note', duration: 1, symbol: '♩' }, { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮' }, { type: 'note', duration: 1, symbol: '♩' }, { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮' }, // Semínima, colcheia, semínima, colcheia
            { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮' }, { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮' }, { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮' },
            { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮' }, { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮' }, { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮' }, // Seis colcheias
            { type: 'note', duration: 1.5, symbol: '♩.' }, { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮' }, { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮' }, { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮' }, // Semínima pontuada, três colcheias
            {type: 'final_barline', duration: 0, symbol: '𝄂', isControl: true}
        ]
    },
    {
        name: "Módulo VI - Lição 53: Adicionando Mínimas Pontuadas (6/8)",
        timeSignature: { beats: 6, beatType: 8 },
        tempo: 70,
        pattern: [
            { type: 'note', duration: 3, symbol: '𝅗𝅥.' }, { type: 'note', duration: 1.5, symbol: '♩.' }, { type: 'note', duration: 1.5, symbol: '♩.' }, // Mínima pontuada, duas semínimas pontuadas
            { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮' }, { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮' }, { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮' },
            { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮' }, { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮' }, { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮' }, // Seis colcheias
            {type: 'final_barline', duration: 0, symbol: '𝄂', isControl: true}
        ]
    },
    {
        name: "Módulo VI - Lição 54: Pausas em 6/8 (Colcheia e Semínima)",
        timeSignature: { beats: 6, beatType: 8 },
        tempo: 75,
        pattern: [
            { type: 'rest', duration: 0.5, symbol: '𝄾' }, { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮' }, { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮' }, // Pausa, duas colcheias
            { type: 'rest', duration: 1.5, symbol: '♩.' }, { type: 'note', duration: 1.5, symbol: '♩.' }, // Pausa de semínima pontuada, semínima pontuada
            { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮' }, { type: 'rest', duration: 0.5, symbol: '𝄾' }, { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮' },
            { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮' }, { type: 'rest', duration: 0.5, symbol: '𝄾' }, { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮' }, // Colcheia, pausa, colcheia, colcheia, pausa, colcheia
            {type: 'final_barline', duration: 0, symbol: '𝄂', isControl: true}
        ]
    },
    {
        name: "Módulo VI - Lição 55: Colcheias, Semínimas e Pausas Combinadas (6/8)",
        timeSignature: { beats: 6, beatType: 8 },
        tempo: 80,
        pattern: [
            { type: 'note', duration: 1.5, symbol: '♩.' }, { type: 'rest', duration: 0.5, symbol: '𝄾' }, { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮' }, { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮' }, { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮' }, { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮' }, // Semínima pontuada, pausa, quatro colcheias
            { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮' }, { type: 'note', duration: 1, symbol: '♩' }, { type: 'rest', duration: 0.5, symbol: '𝄾' }, { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮' }, { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮' }, { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮' }, // Colcheia, semínima, pausa, três colcheias
            {type: 'final_barline', duration: 0, symbol: '𝄂', isControl: true}
        ]
    },
    {
        name: "Módulo VI - Lição 56: Pausa de Mínima em 6/8",
        timeSignature: { beats: 6, beatType: 8 },
        tempo: 85,
        pattern: [
            { type: 'rest', duration: 3, symbol: '𝄼.' }, { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮' }, { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮' }, { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮' }, // Pausa de mínima pontuada, três colcheias
            { type: 'note', duration: 1.5, symbol: '♩.' }, { type: 'rest', duration: 1.5, symbol: '♩.' }, // Semínima pontuada, pausa de semínima pontuada
            { type: 'note', duration: 3, symbol: '𝅗𝅥.' }, // Mínima pontuada
            {type: 'final_barline', duration: 0, symbol: '𝄂', isControl: true}
        ]
    },
    {
        name: "Módulo VI - Lição 57: Ritmos Sincopados em 6/8",
        timeSignature: { beats: 6, beatType: 8 },
        tempo: 90,
        pattern: [
            { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮' }, { type: 'note', duration: 1, symbol: '♩' }, { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮' }, { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮' }, { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮' }, { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮' }, // Colcheia, semínima, colcheia, três colcheias
            { type: 'rest', duration: 0.5, symbol: '𝄾' }, { type: 'note', duration: 1.5, symbol: '♩.' }, { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮' }, { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮' }, { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮' }, // Pausa de colcheia, semínima pontuada, três colcheias
            {type: 'final_barline', duration: 0, symbol: '𝄂', isControl: true}
        ]
    },
    {
        name: "Módulo VI - Lição 58: Semicolcheias em 6/8",
        timeSignature: { beats: 6, beatType: 8 },
        tempo: 100,
        pattern: [
            { type: 'note', duration: 0.25, symbol: '𝅘𝅥𝅯' }, { type: 'note', duration: 0.25, symbol: '𝅘𝅥𝅯' }, { type: 'note', duration: 0.25, symbol: '𝅘𝅥𝅯' }, { type: 'note', duration: 0.25, symbol: '𝅘𝅥𝅯' }, // Quatro semicolcheias (equivalente a uma semínima)
            { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮' }, { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮' }, { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮' }, // Três colcheias
            { type: 'note', duration: 1.5, symbol: '♩.' }, { type: 'note', duration: 0.25, symbol: '𝅘𝅥𝅯' }, { type: 'note', duration: 0.25, symbol: '𝅘𝅥𝅯' }, { type: 'note', duration: 0.25, symbol: '𝅘𝅥𝅯' }, { type: 'note', duration: 0.25, symbol: '𝅘𝅥𝅯' }, // Semínima pontuada, quatro semicolcheias
            {type: 'final_barline', duration: 0, symbol: '𝄂', isControl: true}
        ]
    },
    {
        name: "Módulo VI - Lição 59: Pausa de Semicolcheia em 6/8",
        timeSignature: { beats: 6, beatType: 8 },
        tempo: 105,
        pattern: [
            { type: 'note', duration: 0.25, symbol: '𝅘𝅥𝅯' }, { type: 'rest', duration: 0.25, symbol: '𝄿' }, { type: 'note', duration: 0.25, symbol: '𝅘𝅥𝅯' }, { type: 'note', duration: 0.25, symbol: '𝅘𝅥𝅯' },
            { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮' }, { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮' }, { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮' }, // Semicolcheia, pausa, duas semicolcheias, três colcheias
            { type: 'rest', duration: 0.25, symbol: '𝄿' }, { type: 'note', duration: 0.25, symbol: '𝅘𝅥𝅯' }, { type: 'rest', duration: 0.5, symbol: '𝄾' }, { type: 'note', duration: 1.5, symbol: '♩.' }, // Pausa, semicolcheia, pausa de colcheia, semínima pontuada
            {type: 'final_barline', duration: 0, symbol: '𝄂', isControl: true}
        ]
    },
    {
        name: "Módulo VI - Lição 60: Revisão Geral em 6/8",
        timeSignature: { beats: 6, beatType: 8 },
        tempo: 95,
        pattern: [
            { type: 'note', duration: 3, symbol: '𝅗𝅥.' }, { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮' }, { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮' }, { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮' }, // Mínima pontuada, três colcheias
            { type: 'rest', duration: 1.5, symbol: '♩.' }, { type: 'note', duration: 0.25, symbol: '𝅘𝅥𝅯' }, { type: 'note', duration: 0.25, symbol: '𝅘𝅥𝅯' }, { type: 'note', duration: 0.25, symbol: '𝅘𝅥𝅯' }, { type: 'note', duration: 0.25, symbol: '𝅘𝅥𝅯' }, // Pausa de semínima pontuada, quatro semicolcheias
            { type: 'note', duration: 1, symbol: '♩' }, { type: 'rest', duration: 0.5, symbol: '𝄾' }, { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮' }, { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮' }, { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮' }, // Semínima, pausa de colcheia, três colcheias
            {type: 'final_barline', duration: 0, symbol: '𝄂', isControl: true}
        ]
    },

    // Módulo VII - Lições 61 a 70: Compassos Compostos (9/8 e 12/8)
    {
        name: "Módulo VII - Lição 61: Introdução ao Compasso 9/8 (Colcheias)",
        timeSignature: { beats: 9, beatType: 8 }, // 9 colcheias por compasso, divididas em três grupos de 3
        tempo: 60,
        pattern: [
            { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮' }, { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮' }, { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮' }, // Grupo 1
            { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮' }, { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮' }, { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮' }, // Grupo 2
            { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮' }, { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮' }, { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮' }, // Grupo 3
            { type: 'note', duration: 1.5, symbol: '♩.' }, { type: 'note', duration: 1.5, symbol: '♩.' }, { type: 'note', duration: 1.5, symbol: '♩.' }, // Três semínimas pontuadas
            {type: 'final_barline', duration: 0, symbol: '𝄂', isControl: true}
        ]
    },
    {
        name: "Módulo VII - Lição 62: Semínimas e Mínimas Pontuadas em 9/8",
        timeSignature: { beats: 9, beatType: 8 },
        tempo: 65,
        pattern: [
            { type: 'note', duration: 1.5, symbol: '♩.' }, { type: 'note', duration: 1.5, symbol: '♩.' }, { type: 'note', duration: 1.5, symbol: '♩.' }, // Três semínimas pontuadas
            { type: 'note', duration: 3, symbol: '𝅗𝅥.' }, { type: 'note', duration: 1.5, symbol: '♩.' }, { type: 'note', duration: 1.5, symbol: '♩.' }, // Mínima pontuada, duas semínimas pontuadas
            {type: 'final_barline', duration: 0, symbol: '𝄂', isControl: true}
        ]
    },
    {
        name: "Módulo VII - Lição 63: Pausas Variadas em 9/8",
        timeSignature: { beats: 9, beatType: 8 },
        tempo: 70,
        pattern: [
            { type: 'rest', duration: 1.5, symbol: '♩.' }, { type: 'note', duration: 1.5, symbol: '♩.' }, { type: 'rest', duration: 1.5, symbol: '♩.' }, // Pausa, semínima pontuada, pausa
            { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮' }, { type: 'rest', duration: 0.5, symbol: '𝄾' }, { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮' },
            { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮' }, { type: 'rest', duration: 0.5, symbol: '𝄾' }, { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮' }, // Colcheia, pausa, colcheia, colcheia, pausa, colcheia
            {type: 'final_barline', duration: 0, symbol: '𝄂', isControl: true}
        ]
    },
    {
        name: "Módulo VII - Lição 64: Introdução ao Compasso 12/8 (Colcheias)",
        timeSignature: { beats: 12, beatType: 8 }, // 12 colcheias por compasso, divididas em quatro grupos de 3
        tempo: 60,
        pattern: [
            { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮' }, { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮' }, { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮' }, // Grupo 1
            { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮' }, { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮' }, { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮' }, // Grupo 2
            { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮' }, { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮' }, { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮' }, // Grupo 3
            { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮' }, { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮' }, { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮' }, // Grupo 4
            { type: 'note', duration: 1.5, symbol: '♩.' }, { type: 'note', duration: 1.5, symbol: '♩.' }, { type: 'note', duration: 1.5, symbol: '♩.' }, { type: 'note', duration: 1.5, symbol: '♩.' }, // Quatro semínimas pontuadas
            {type: 'final_barline', duration: 0, symbol: '𝄂', isControl: true}
        ]
    },
    {
        name: "Módulo VII - Lição 65: Semínimas Pontuadas e Mínimas Pontuadas em 12/8",
        timeSignature: { beats: 12, beatType: 8 },
        tempo: 65,
        pattern: [
            { type: 'note', duration: 1.5, symbol: '♩.' }, { type: 'note', duration: 1.5, symbol: '♩.' }, { type: 'note', duration: 1.5, symbol: '♩.' }, { type: 'note', duration: 1.5, symbol: '♩.' }, // Quatro semínimas pontuadas
            { type: 'note', duration: 3, symbol: '𝅗𝅥.' }, { type: 'note', duration: 3, symbol: '𝅗𝅥.' }, // Duas mínimas pontuadas
            { type: 'note', duration: 1.5, symbol: '♩.' }, { type: 'note', duration: 1.5, symbol: '♩.' }, { type: 'note', duration: 3, symbol: '𝅗𝅥.' }, // Duas semínimas pontuadas, uma mínima pontuada
            {type: 'final_barline', duration: 0, symbol: '𝄂', isControl: true}
        ]
    },
    {
        name: "Módulo VII - Lição 66: Pausas Complexas em 12/8",
        timeSignature: { beats: 12, beatType: 8 },
        tempo: 70,
        pattern: [
            { type: 'rest', duration: 3, symbol: '𝄼.' }, { type: 'note', duration: 1.5, symbol: '♩.' }, { type: 'rest', duration: 1.5, symbol: '♩.' }, { type: 'note', duration: 1.5, symbol: '♩.' }, { type: 'rest', duration: 1.5, symbol: '♩.' }, // Pausa de mínima pontuada, semínima pontuada, pausa, semínima, pausa
            { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮' }, { type: 'rest', duration: 0.5, symbol: '𝄾' }, { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮' },
            { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮' }, { type: 'rest', duration: 0.5, symbol: '𝄾' }, { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮' },
            { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮' }, { type: 'rest', duration: 0.5, symbol: '𝄾' }, { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮' }, // Grupos de colcheias e pausas
            {type: 'final_barline', duration: 0, symbol: '𝄂', isControl: true}
        ]
    },
    {
        name: "Módulo VII - Lição 67: Semicolcheias em 9/8",
        timeSignature: { beats: 9, beatType: 8 },
        tempo: 120,
        pattern: [
            { type: 'note', duration: 0.25, symbol: '𝅘𝅥𝅯' }, { type: 'note', duration: 0.25, symbol: '𝅘𝅥𝅯' }, { type: 'note', duration: 0.25, symbol: '𝅘𝅥𝅯' }, { type: 'note', duration: 0.25, symbol: '𝅘𝅥𝅯' }, // 1 tempo de semínima
            { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮' }, { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮' }, { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮' }, // 3 colcheias
            { type: 'note', duration: 1.5, symbol: '♩.' }, { type: 'note', duration: 0.25, symbol: '𝅘𝅥𝅯' }, { type: 'note', duration: 0.25, symbol: '𝅘𝅥𝅯' }, { type: 'note', duration: 0.25, symbol: '𝅘𝅥𝅯' }, { type: 'note', duration: 0.25, symbol: '𝅘𝅥𝅯' }, // Semínima pontuada, 4 semicolcheias
            {type: 'final_barline', duration: 0, symbol: '𝄂', isControl: true}
        ]
    },
    {
        name: "Módulo VII - Lição 68: Combinações Rítmicas em 12/8",
        timeSignature: { beats: 12, beatType: 8 },
        tempo: 100,
        pattern: [
            { type: 'note', duration: 1.5, symbol: '♩.' }, { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮' }, { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮' }, { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮' }, // Semínima pontuada, 3 colcheias
            { type: 'rest', duration: 1.5, symbol: '♩.' }, { type: 'note', duration: 1.5, symbol: '♩.' }, // Pausa de semínima pontuada, semínima pontuada
            { type: 'note', duration: 3, symbol: '𝅗𝅥.' }, { type: 'note', duration: 1.5, symbol: '♩.' }, { type: 'note', duration: 1.5, symbol: '♩.' }, // Mínima pontuada, duas semínimas pontuadas
            {type: 'final_barline', duration: 0, symbol: '𝄂', isControl: true}
        ]
    },
    {
        name: "Módulo VII - Lição 69: Exercício de Sincopado em 9/8",
        timeSignature: { beats: 9, beatType: 8 },
        tempo: 110,
        pattern: [
            { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮' }, { type: 'note', duration: 1, symbol: '♩' }, { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮' }, // Colcheia, semínima, colcheia
            { type: 'rest', duration: 0.5, symbol: '𝄾' }, { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮' }, { type: 'note', duration: 1.5, symbol: '♩.' }, // Pausa, colcheia, semínima pontuada
            { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮' }, { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮' }, { type: 'rest', duration: 0.5, symbol: '𝄾' }, { type: 'note', duration: 1.5, symbol: '♩.' }, // Três colcheias, pausa, semínima pontuada
            {type: 'final_barline', duration: 0, symbol: '𝄂', isControl: true}
        ]
    },
    {
        name: "Módulo VII - Lição 70: Revisão dos Compassos Compostos (9/8 e 12/8)",
        timeSignature: { beats: 12, beatType: 8 },
        tempo: 95,
        pattern: [
            { type: 'note', duration: 3, symbol: '𝅗𝅥.' }, { type: 'note', duration: 3, symbol: '𝅗𝅥.' }, // Duas mínimas pontuadas
            { type: 'note', duration: 1.5, symbol: '♩.' }, { type: 'rest', duration: 1.5, symbol: '♩.' }, { type: 'note', duration: 1.5, symbol: '♩.' }, { type: 'note', duration: 1.5, symbol: '♩.' }, // Semínima pontuada, pausa, duas semínimas pontuadas
            { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮' }, { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮' }, { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮' },
            { type: 'rest', duration: 0.5, symbol: '𝄾' }, { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮' }, { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮' }, // Três colcheias, pausa, duas colcheias
            { type: 'note', duration: 0.25, symbol: '𝅘𝅥𝅯' }, { type: 'note', duration: 0.25, symbol: '𝅘𝅥𝅯' }, { type: 'note', duration: 0.25, symbol: '𝅘𝅥𝅯' }, { type: 'note', duration: 0.25, symbol: '𝅘𝅥𝅯' },
            { type: 'note', duration: 0.25, symbol: '𝅘𝅥𝅯' }, { type: 'rest', duration: 0.25, symbol: '𝄿' }, { type: 'note', duration: 0.25, symbol: '𝅘𝅥𝅯' }, { type: 'note', duration: 0.25, symbol: '𝅘𝅥𝅯' }, // Oito semicolcheias
            {type: 'final_barline', duration: 0, symbol: '𝄂', isControl: true}
        ]
    },

    // Módulo VIII - Lições 71 a 80: Ligaduras de Prolongamento em Compassos Compostos
    {
        name: "Módulo VIII - Lição 71: Ligaduras Simples em 6/8",
        timeSignature: { beats: 6, beatType: 8 },
        tempo: 70,
        pattern: [
            { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮', tiedToNext: true }, { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮' }, { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮' }, // Colcheia ligada a colcheia, colcheia
            { type: 'note', duration: 1.5, symbol: '♩.', tiedToNext: true }, { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮' }, { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮' }, { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮' }, // Semínima pontuada ligada a colcheia, duas colcheias
            {type: 'final_barline', duration: 0, symbol: '𝄂', isControl: true}
        ]
    },
    {
        name: "Módulo VIII - Lição 72: Ligaduras Cruzando Grupos em 6/8",
        timeSignature: { beats: 6, beatType: 8 },
        tempo: 75,
        pattern: [
            { type: 'note', duration: 1, symbol: '♩', tiedToNext: true }, { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮' }, // Semínima ligada a colcheia (atravessa o grupo)
            { type: 'note', duration: 1.5, symbol: '♩.' }, { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮' }, { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮' }, // Semínima pontuada, duas colcheias
            { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮', tiedToNext: true }, { type: 'note', duration: 1, symbol: '♩' }, { type: 'note', duration: 1.5, symbol: '♩.' }, // Colcheia ligada a semínima, semínima pontuada
            {type: 'final_barline', duration: 0, symbol: '𝄂', isControl: true}
        ]
    },
    {
        name: "Módulo VIII - Lição 73: Ligaduras em 9/8",
        timeSignature: { beats: 9, beatType: 8 },
        tempo: 80,
        pattern: [
            { type: 'note', duration: 1.5, symbol: '♩.', tiedToNext: true }, { type: 'note', duration: 1.5, symbol: '♩.' }, { type: 'note', duration: 1.5, symbol: '♩.' }, // Semínima pontuada ligada, duas semínimas pontuadas
            { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮', tiedToNext: true }, { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮' }, { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮' },
            { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮', tiedToNext: true }, { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮' }, { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮' }, // Colcheia ligada, duas colcheias, colcheia ligada, duas colcheias
            {type: 'final_barline', duration: 0, symbol: '𝄂', isControl: true}
        ]
    },
    {
        name: "Módulo VIII - Lição 74: Ligaduras entre Compassos em 9/8",
        timeSignature: { beats: 9, beatType: 8 },
        tempo: 85,
        pattern: [
            { type: 'note', duration: 3, symbol: '𝅗𝅥.', tiedToNext: true }, // Mínima pontuada ligada (continua no próximo compasso)
            { type: 'note', duration: 1.5, symbol: '♩.' }, { type: 'note', duration: 1.5, symbol: '♩.' }, { type: 'note', duration: 1.5, symbol: '♩.' }, { type: 'note', duration: 1.5, symbol: '♩.' }, // Semínima pontuada (complementa ligadura), 3 semínimas pontuadas
            { type: 'note', duration: 1.5, symbol: '♩.' }, { type: 'note', duration: 1.5, symbol: '♩.' }, { type: 'note', duration: 1.5, symbol: '♩.' }, // Três semínimas pontuadas
            {type: 'final_barline', duration: 0, symbol: '𝄂', isControl: true}
        ]
    },
    {
        name: "Módulo VIII - Lição 75: Ligaduras Simples em 12/8",
        timeSignature: { beats: 12, beatType: 8 },
        tempo: 70,
        pattern: [
            { type: 'note', duration: 1.5, symbol: '♩.', tiedToNext: true }, { type: 'note', duration: 1.5, symbol: '♩.' }, { type: 'note', duration: 1.5, symbol: '♩.' }, { type: 'note', duration: 1.5, symbol: '♩.' }, // Semínima pontuada ligada, 3 semínimas pontuadas
            { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮', tiedToNext: true }, { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮' }, { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮' },
            { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮', tiedToNext: true }, { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮' }, { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮' },
            { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮', tiedToNext: true }, { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮' }, { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮' }, // Colcheias ligadas
            {type: 'final_barline', duration: 0, symbol: '𝄂', isControl: true}
        ]
    },
    {
        name: "Módulo VIII - Lição 76: Ligaduras com Pausas em 12/8",
        timeSignature: { beats: 12, beatType: 8 },
        tempo: 75,
        pattern: [
            { type: 'note', duration: 3, symbol: '𝅗𝅥.', tiedToNext: true }, { type: 'rest', duration: 3, symbol: '𝄼.' }, // Mínima pontuada ligada a pausa de mínima pontuada
            { type: 'note', duration: 1.5, symbol: '♩.', tiedToNext: true }, { type: 'rest', duration: 1.5, symbol: '♩.' }, { type: 'note', duration: 1.5, symbol: '♩.' }, { type: 'rest', duration: 1.5, symbol: '♩.' }, // Semínima pontuada ligada a pausa, semínima pontuada ligada a pausa
            { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮', tiedToNext: true }, { type: 'rest', duration: 0.5, symbol: '𝄾' }, { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮' }, // Colcheia ligada a pausa, colcheia
            { type: 'note', duration: 1.5, symbol: '♩.' }, { type: 'note', duration: 1.5, symbol: '♩.' }, // Duas semínimas pontuadas
            {type: 'final_barline', duration: 0, symbol: '𝄂', isControl: true}
        ]
    },
    {
        name: "Módulo VIII - Lição 77: Ritmos Síncopados com Ligaduras em 6/8",
        timeSignature: { beats: 6, beatType: 8 },
        tempo: 80,
        pattern: [
            { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮' }, { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮', tiedToNext: true }, { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮' }, // Colcheia, colcheia ligada a colcheia
            { type: 'rest', duration: 0.5, symbol: '𝄾' }, { type: 'note', duration: 1.5, symbol: '♩.', tiedToNext: true }, { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮' }, { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮' }, { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮' }, // Pausa, semínima pontuada ligada a colcheia, duas colcheias
            { type: 'note', duration: 1.5, symbol: '♩.' }, { type: 'note', duration: 1.5, symbol: '♩.' }, // Duas semínimas pontuadas
            {type: 'final_barline', duration: 0, symbol: '𝄂', isControl: true}
        ]
    },
    {
        name: "Módulo VIII - Lição 78: Semicolcheias com Ligaduras em 9/8",
        timeSignature: { beats: 9, beatType: 8 },
        tempo: 110,
        pattern: [
            { type: 'note', duration: 0.25, symbol: '𝅘𝅥𝅯' }, { type: 'note', duration: 0.25, symbol: '𝅘𝅥𝅯' }, { type: 'note', duration: 0.25, symbol: '𝅘𝅥𝅯' }, { type: 'note', duration: 0.25, symbol: '𝅘𝅥𝅯', tiedToNext: true }, // Grupo de semicolcheias, última ligada
            { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮' }, { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮' }, { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮' }, // Colcheia (complementa ligadura), duas colcheias
            { type: 'note', duration: 1.5, symbol: '♩.', tiedToNext: true }, { type: 'note', duration: 0.25, symbol: '𝅘𝅥𝅯' }, { type: 'note', duration: 0.25, symbol: '𝅘𝅥𝅯' }, { type: 'note', duration: 0.25, symbol: '𝅘𝅥𝅯' }, { type: 'note', duration: 0.25, symbol: '𝅘𝅥𝅯' }, // Semínima pontuada ligada a semicolcheia, 3 semicolcheias
            {type: 'final_barline', duration: 0, symbol: '𝄂', isControl: true}
        ]
    },
    {
        name: "Módulo VIII - Lição 79: Desafio de Ligaduras e Pausas em 12/8",
        timeSignature: { beats: 12, beatType: 8 },
        tempo: 100,
        pattern: [
            { type: 'note', duration: 1.5, symbol: '♩.', tiedToNext: true }, { type: 'rest', duration: 0.5, symbol: '𝄾' }, { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮' }, { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮' }, // Semínima pontuada ligada a pausa, duas colcheias
            { type: 'note', duration: 3, symbol: '𝅗𝅥.', tiedToNext: true }, { type: 'note', duration: 1.5, symbol: '♩.' }, { type: 'note', duration: 1.5, symbol: '♩.' }, // Mínima pontuada ligada, duas semínimas pontuadas
            { type: 'rest', duration: 0.5, symbol: '𝄾' }, { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮' }, { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮' },
            { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮', tiedToNext: true }, { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮' }, { type: 'rest', duration: 0.5, symbol: '𝄾' }, // Pausa, colcheia, colcheia, colcheia ligada a colcheia, pausa
            { type: 'note', duration: 1.5, symbol: '♩.' }, { type: 'note', duration: 1.5, symbol: '♩.' }, // Duas semínimas pontuadas
            {type: 'final_barline', duration: 0, symbol: '𝄂', isControl: true}
        ]
    },
    {
        name: "Módulo VIII - Lição 80: Revisão Geral com Ligaduras em Comp. Compostos",
        timeSignature: { beats: 12, beatType: 8 },
        tempo: 90,
        pattern: [
            { type: 'note', duration: 3, symbol: '𝅗𝅥.', tiedToNext: true }, // Mínima pontuada ligada
            { type: 'note', duration: 1.5, symbol: '♩.' }, { type: 'note', duration: 1.5, symbol: '♩.' }, { type: 'note', duration: 1.5, symbol: '♩.' }, // Semínima pontuada (complementa), duas semínimas pontuadas
            { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮' }, { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮' }, { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮', tiedToNext: true }, // Três colcheias, última ligada
            { type: 'note', duration: 0.25, symbol: '𝅘𝅥𝅯' }, { type: 'note', duration: 0.25, symbol: '𝅘𝅥𝅯' }, { type: 'note', duration: 0.25, symbol: '𝅘𝅥𝅯' }, { type: 'note', duration: 0.25, symbol: '𝅘𝅥𝅯' }, // Semicolcheia (complementa), 3 semicolcheias
            { type: 'rest', duration: 1.5, symbol: '♩.' }, { type: 'note', duration: 1.5, symbol: '♩.' }, { type: 'note', duration: 3, symbol: '𝅗𝅥.' }, // Pausa de semínima pontuada, semínima pontuada, mínima pontuada
            {type: 'final_barline', duration: 0, symbol: '𝄂', isControl: true}
        ]
    }
];