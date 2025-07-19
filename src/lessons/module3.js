// src/lessons/module3.js

export const module3 = [
    {
        name: "Módulo III - Lição 21: Mínima Pontuada em 3/4",
        timeSignature: { beats: 3, beatType: 4 },
        tempo: 70,
        pattern: [
            // Compasso 1-4
            { type: 'note', duration: 3, symbol: '𝅗𝅥.' },
            { type: 'note', duration: 1, symbol: '♩' }, { type: 'note', duration: 1, symbol: '♩' }, { type: 'note', duration: 1, symbol: '♩' },
            { type: 'note', duration: 3, symbol: '𝅗𝅥.' },
            { type: 'note', duration: 2, symbol: '𝅗𝅥' }, { type: 'note', duration: 1, symbol: '♩' },
            // Compasso 5-8
            { type: 'note', duration: 1, symbol: '♩' }, { type: 'note', duration: 2, symbol: '𝅗𝅥' },
            { type: 'note', duration: 3, symbol: '𝅗𝅥.' },
            { type: 'note', duration: 1, symbol: '♩' }, { type: 'note', duration: 1, symbol: '♩' }, { type: 'note', duration: 1, symbol: '♩' },
            { type: 'note', duration: 2, symbol: '𝅗𝅥' }, { type: 'rest', duration: 1, symbol: '𝄽' },
            // Compasso 9-12
            { type: 'note', duration: 3, symbol: '𝅗𝅥.' },
            { type: 'note', duration: 1, symbol: '♩' }, { type: 'note', duration: 2, symbol: '𝅗𝅥' },
            { type: 'note', duration: 2, symbol: '𝅗𝅥' }, { type: 'note', duration: 1, symbol: '♩' },
            { type: 'note', duration: 3, symbol: '𝅗𝅥.' },
            // Compasso 13-16
            { type: 'note', duration: 1, symbol: '♩' }, { type: 'rest', duration: 1, symbol: '𝄽' }, { type: 'note', duration: 1, symbol: '♩' },
            { type: 'note', duration: 2, symbol: '𝅗𝅥' }, { type: 'note', duration: 1, symbol: '♩' },
            { type: 'note', duration: 1, symbol: '♩' }, { type: 'note', duration: 1, symbol: '♩' }, { type: 'note', duration: 1, symbol: '♩' },
            { type: 'note', duration: 3, symbol: '𝅗𝅥.' },
            {type: 'final_barline', duration: 0, symbol: '𝄂', isControl: true}
        ]
    },
    {
        name: "Módulo III - Lição 22: Colcheia Pontuada em 4/4",
        timeSignature: { beats: 4, beatType: 4 },
        tempo: 75,
        pattern: [
            // Compasso 1-4
            { type: 'note', duration: 0.75, symbol: '𝅘𝅥𝅮.' }, { type: 'note', duration: 0.25, symbol: '𝅘𝅥𝅯' }, { type: 'note', duration: 1, symbol: '♩' }, { type: 'note', duration: 2, symbol: '𝅗𝅥' },
            { type: 'note', duration: 1, symbol: '♩' }, { type: 'note', duration: 0.75, symbol: '𝅘𝅥𝅮.' }, { type: 'note', duration: 0.25, symbol: '𝅘𝅥𝅯' }, { type: 'note', duration: 1, symbol: '♩' }, { type: 'note', duration: 1, symbol: '♩' },
            { type: 'note', duration: 2, symbol: '𝅗𝅥' }, { type: 'note', duration: 0.75, symbol: '𝅘𝅥𝅮.' }, { type: 'note', duration: 0.25, symbol: '𝅘𝅥𝅯' }, { type: 'note', duration: 1, symbol: '♩' },
            { type: 'note', duration: 0.75, symbol: '𝅘𝅥𝅮.' }, { type: 'note', duration: 0.25, symbol: '𝅘𝅥𝅯' }, { type: 'note', duration: 0.75, symbol: '𝅘𝅥𝅮.' }, { type: 'note', duration: 0.25, symbol: '𝅘𝅥𝅯' }, { type: 'note', duration: 0.75, symbol: '𝅘𝅥𝅮.' }, { type: 'note', duration: 0.25, symbol: '𝅘𝅥𝅯' }, { type: 'note', duration: 1, symbol: '♩' },
            // Compasso 5-8
            { type: 'note', duration: 1, symbol: '♩' }, { type: 'note', duration: 1, symbol: '♩' }, { type: 'note', duration: 0.75, symbol: '𝅘𝅥𝅮.' }, { type: 'note', duration: 0.25, symbol: '𝅘𝅥𝅯' }, { type: 'note', duration: 1, symbol: '♩' },
            { type: 'note', duration: 2, symbol: '𝅗𝅥' }, { type: 'note', duration: 2, symbol: '𝅗𝅥' },
            { type: 'note', duration: 0.75, symbol: '𝅘𝅥𝅮.' }, { type: 'note', duration: 0.25, symbol: '𝅘𝅥𝅯' }, { type: 'note', duration: 3, symbol: '𝅗𝅥.' },
            { type: 'note', duration: 4, symbol: '𝅝' },
            // Compasso 9-12
            { type: 'note', duration: 1, symbol: '♩' }, { type: 'note', duration: 0.75, symbol: '𝅘𝅥𝅮.' }, { type: 'note', duration: 0.25, symbol: '𝅘𝅥𝅯' }, { type: 'note', duration: 2, symbol: '𝅗𝅥' },
            { type: 'note', duration: 2, symbol: '𝅗𝅥' }, { type: 'note', duration: 0.75, symbol: '𝅘𝅥𝅮.' }, { type: 'note', duration: 0.25, symbol: '𝅘𝅥𝅯' }, { type: 'note', duration: 1, symbol: '♩' },
            { type: 'note', duration: 0.75, symbol: '𝅘𝅥𝅮.' }, { type: 'note', duration: 0.25, symbol: '𝅘𝅥𝅯' }, { type: 'note', duration: 1, symbol: '♩' }, { type: 'note', duration: 1, symbol: '♩' }, { type: 'note', duration: 1, symbol: '♩' },
            { type: 'note', duration: 4, symbol: '𝅝' },
            // Compasso 13-16
            { type: 'note', duration: 0.75, symbol: '𝅘𝅥𝅮.' }, { type: 'note', duration: 0.25, symbol: '𝅘𝅥𝅯' }, { type: 'note', duration: 0.75, symbol: '𝅘𝅥𝅮.' }, { type: 'note', duration: 0.25, symbol: '𝅘𝅥𝅯' }, { type: 'note', duration: 2, symbol: '𝅗𝅥' },
            { type: 'note', duration: 1, symbol: '♩' }, { type: 'note', duration: 1, symbol: '♩' }, { type: 'note', duration: 2, symbol: '𝅗𝅥' },
            { type: 'note', duration: 2, symbol: '𝅗𝅥' }, { type: 'note', duration: 0.75, symbol: '𝅘𝅥𝅮.' }, { type: 'note', duration: 0.25, symbol: '𝅘𝅥𝅯' }, { type: 'note', duration: 1, symbol: '♩' },
            { type: 'note', duration: 4, symbol: '𝅝' },
            {type: 'final_barline', duration: 0, symbol: '𝄂', isControl: true}
        ]
    },
    {
        name: "Módulo III - Lição 23: Combinando Pontuadas em 2/4",
        timeSignature: { beats: 2, beatType: 4 },
        tempo: 80,
        pattern: [
            // Compasso 1-4
            { type: 'note', duration: 1.5, symbol: '♩.' }, { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮' },
            { type: 'note', duration: 0.75, symbol: '𝅘𝅥𝅮.' }, { type: 'note', duration: 0.25, symbol: '𝅘𝅥𝅯' }, { type: 'note', duration: 1, symbol: '♩' },
            { type: 'note', duration: 1.5, symbol: '♩.' }, { type: 'rest', duration: 0.5, symbol: '𝄾' },
            { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮' }, { type: 'note', duration: 1.5, symbol: '♩.' },
            // Compasso 5-8
            { type: 'note', duration: 2, symbol: '𝅗𝅥' },
            { type: 'note', duration: 1, symbol: '♩' }, { type: 'note', duration: 1, symbol: '♩' },
            { type: 'note', duration: 1.5, symbol: '♩.' }, { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮' },
            { type: 'note', duration: 0.75, symbol: '𝅘𝅥𝅮.' }, { type: 'note', duration: 0.25, symbol: '𝅘𝅥𝅯' }, { type: 'rest', duration: 1, symbol: '𝄽' },
            // Compasso 9-12
            { type: 'note', duration: 1, symbol: '♩' }, { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮' }, { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮' },
            { type: 'note', duration: 2, symbol: '𝅗𝅥' },
            { type: 'note', duration: 1.5, symbol: '♩.' }, { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮' },
            { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮' }, { type: 'note', duration: 1.5, symbol: '♩.' },
            // Compasso 13-16
            { type: 'note', duration: 0.75, symbol: '𝅘𝅥𝅮.' }, { type: 'note', duration: 0.25, symbol: '𝅘𝅥𝅯' }, { type: 'note', duration: 1, symbol: '♩' },
            { type: 'note', duration: 1, symbol: '♩' }, { type: 'rest', duration: 1, symbol: '𝄽' },
            { type: 'note', duration: 1.5, symbol: '♩.' }, { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮' },
            { type: 'note', duration: 2, symbol: '𝅗𝅥' },
            {type: 'final_barline', duration: 0, symbol: '𝄂', isControl: true}
        ]
    },
    {
        name: "Módulo III - Lição 24: Padrões com Pausas Pontuadas",
        timeSignature: { beats: 3, beatType: 4 },
        tempo: 85,
        pattern: [
            // Compasso 1-4
            { type: 'note', duration: 1.5, symbol: '♩.' }, { type: 'rest', duration: 0.5, symbol: '𝄾' }, { type: 'note', duration: 1, symbol: '♩' },
            { type: 'note', duration: 0.75, symbol: '𝅘𝅥𝅮.' }, { type: 'rest', duration: 0.25, symbol: '𝄿' }, { type: 'note', duration: 2, symbol: '𝅗𝅥' },
            { type: 'note', duration: 1, symbol: '♩' }, { type: 'rest', duration: 1.5, symbol: '𝄽.' }, { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮' },
            { type: 'note', duration: 3, symbol: '𝅗𝅥.' },
            // Compasso 5-8
            { type: 'rest', duration: 1.5, symbol: '𝄽.' }, { type: 'note', duration: 1.5, symbol: '♩.' },
            { type: 'note', duration: 2, symbol: '𝅗𝅥' }, { type: 'rest', duration: 1, symbol: '𝄽' },
            { type: 'note', duration: 1, symbol: '♩' }, { type: 'note', duration: 1.5, symbol: '♩.' }, { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮' },
            { type: 'note', duration: 3, symbol: '𝅗𝅥.' },
            // Compasso 9-12
            { type: 'note', duration: 1, symbol: '♩' }, { type: 'rest', duration: 0.5, symbol: '𝄾' }, { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮' }, { type: 'rest', duration: 1, symbol: '𝄽' },
            { type: 'note', duration: 0.75, symbol: '𝅘𝅥𝅮.' }, { type: 'note', duration: 0.25, symbol: '𝅘𝅥𝅯' }, { type: 'note', duration: 2, symbol: '𝅗𝅥' },
            { type: 'rest', duration: 1.5, symbol: '𝄽.' }, { type: 'note', duration: 0.75, symbol: '𝅘𝅥𝅮.' }, { type: 'note', duration: 0.25, symbol: '𝅘𝅥𝅯' }, { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮' },
            { type: 'note', duration: 3, symbol: '𝅗𝅥.' },
            // Compasso 13-16
            { type: 'note', duration: 2, symbol: '𝅗𝅥' }, { type: 'rest', duration: 1, symbol: '𝄽' },
            { type: 'note', duration: 1, symbol: '♩' }, { type: 'note', duration: 1, symbol: '♩' }, { type: 'note', duration: 1, symbol: '♩' },
            { type: 'note', duration: 1.5, symbol: '♩.' }, { type: 'rest', duration: 1.5, symbol: '𝄽.' },
            { type: 'note', duration: 3, symbol: '𝅗𝅥.' },
            {type: 'final_barline', duration: 0, symbol: '𝄂', isControl: true}
        ]
    },
    {
        name: "Módulo III - Lição 25: Desafios Rítmicos com Pontuadas",
        timeSignature: { beats: 4, beatType: 4 },
        tempo: 90,
        pattern: [
            // Compasso 1-4
            { type: 'note', duration: 1.5, symbol: '♩.' }, { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮' }, { type: 'note', duration: 0.75, symbol: '𝅘𝅥𝅮.' }, { type: 'note', duration: 0.25, symbol: '𝅘𝅥𝅯' }, { type: 'note', duration: 1, symbol: '♩' },
            { type: 'rest', duration: 1.5, symbol: '𝄽.' }, { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮' }, { type: 'rest', duration: 0.75, symbol: '𝄾.' }, { type: 'note', duration: 0.25, symbol: '𝅘𝅥𝅯' }, { type: 'note', duration: 1, symbol: '♩' },
            { type: 'note', duration: 3, symbol: '𝅗𝅥.' }, { type: 'note', duration: 1, symbol: '♩' },
            { type: 'note', duration: 0.75, symbol: '𝅘𝅥𝅮.' }, { type: 'note', duration: 0.25, symbol: '𝅘𝅥𝅯' }, { type: 'note', duration: 1.5, symbol: '♩.' }, { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮' }, { type: 'note', duration: 1, symbol: '♩' },
            // Compasso 5-8
            { type: 'note', duration: 1, symbol: '♩' }, { type: 'note', duration: 1.5, symbol: '♩.' }, { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮' }, { type: 'note', duration: 1, symbol: '♩' },
            { type: 'note', duration: 2, symbol: '𝅗𝅥' }, { type: 'rest', duration: 2, symbol: '𝄼' },
            { type: 'note', duration: 0.75, symbol: '𝅘𝅥𝅮.' }, { type: 'note', duration: 0.25, symbol: '𝅘𝅥𝅯' }, { type: 'rest', duration: 1, symbol: '𝄽' }, { type: 'note', duration: 2, symbol: '𝅗𝅥' },
            { type: 'note', duration: 4, symbol: '𝅝' },
            // Compasso 9-12
            { type: 'note', duration: 1.5, symbol: '♩.' }, { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮' }, { type: 'note', duration: 2, symbol: '𝅗𝅥' },
            { type: 'note', duration: 2, symbol: '𝅗𝅥' }, { type: 'note', duration: 1.5, symbol: '♩.' }, { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮' },
            { type: 'note', duration: 1, symbol: '♩' }, { type: 'rest', duration: 0.75, symbol: '𝄾.' }, { type: 'note', duration: 0.25, symbol: '𝅘𝅥𝅯' }, { type: 'note', duration: 2, symbol: '𝅗𝅥' },
            { type: 'note', duration: 4, symbol: '𝅝' },
            // Compasso 13-16
            { type: 'rest', duration: 1, symbol: '𝄽' }, { type: 'note', duration: 3, symbol: '𝅗𝅥.' },
            { type: 'note', duration: 2, symbol: '𝅗𝅥' }, { type: 'note', duration: 1.5, symbol: '♩.' }, { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮' },
            { type: 'note', duration: 0.75, symbol: '𝅘𝅥𝅮.' }, { type: 'note', duration: 0.25, symbol: '𝅘𝅥𝅯' }, { type: 'note', duration: 0.75, symbol: '𝅘𝅥𝅮.' }, { type: 'note', duration: 0.25, symbol: '𝅘𝅥𝅯' }, { type: 'note', duration: 2, symbol: '𝅗𝅥' },
            { type: 'note', duration: 4, symbol: '𝅝' },
            {type: 'final_barline', duration: 0, symbol: '𝄂', isControl: true}
        ]
    },
    {
        name: "Módulo III - Lição 26: Ritmos Síncopados com Pontuadas",
        timeSignature: { beats: 4, beatType: 4 },
        tempo: 95,
        pattern: [
             // Compasso 1-4
            { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮' }, { type: 'note', duration: 1.5, symbol: '♩.' }, { type: 'note', duration: 2, symbol: '𝅗𝅥' },
            { type: 'note', duration: 0.75, symbol: '𝅘𝅥𝅮.' }, { type: 'note', duration: 0.25, symbol: '𝅘𝅥𝅯' }, { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮' }, { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮' }, { type: 'note', duration: 2, symbol: '𝅗𝅥' },
            { type: 'rest', duration: 0.75, symbol: '𝄾.' }, { type: 'note', duration: 0.25, symbol: '𝅘𝅥𝅯' }, { type: 'note', duration: 1.5, symbol: '♩.' }, { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮' }, { type: 'note', duration: 1, symbol: '♩' },
            { type: 'note', duration: 1, symbol: '♩' }, { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮' }, { type: 'note', duration: 1.5, symbol: '♩.' }, { type: 'note', duration: 1, symbol: '♩' },
             // Compasso 5-8
            { type: 'note', duration: 2, symbol: '𝅗𝅥' }, { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮' }, { type: 'note', duration: 1.5, symbol: '♩.' },
            { type: 'note', duration: 4, symbol: '𝅝' },
            { type: 'note', duration: 0.75, symbol: '𝅘𝅥𝅮.' }, { type: 'note', duration: 0.25, symbol: '𝅘𝅥𝅯' }, { type: 'note', duration: 1, symbol: '♩' }, { type: 'note', duration: 2, symbol: '𝅗𝅥' },
            { type: 'note', duration: 1.5, symbol: '♩.' }, { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮' }, { type: 'rest', duration: 2, symbol: '𝄼' },
             // Compasso 9-12
            { type: 'note', duration: 1, symbol: '♩' }, { type: 'note', duration: 1, symbol: '♩' }, { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮' }, { type: 'note', duration: 1.5, symbol: '♩.' },
            { type: 'note', duration: 0.75, symbol: '𝅘𝅥𝅮.' }, { type: 'note', duration: 0.25, symbol: '𝅘𝅥𝅯' }, { type: 'note', duration: 2, symbol: '𝅗𝅥' }, { type: 'rest', duration: 1, symbol: '𝄽' },
            { type: 'note', duration: 4, symbol: '𝅝' },
            { type: 'note', duration: 2, symbol: '𝅗𝅥' }, { type: 'note', duration: 2, symbol: '𝅗𝅥' },
             // Compasso 13-16
            { type: 'note', duration: 1, symbol: '♩' }, { type: 'rest', duration: 0.5, symbol: '𝄾' }, { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮' }, { type: 'note', duration: 2, symbol: '𝅗𝅥' },
            { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮' }, { type: 'note', duration: 1.5, symbol: '♩.' }, { type: 'note', duration: 2, symbol: '𝅗𝅥' },
            { type: 'note', duration: 1, symbol: '♩' }, { type: 'note', duration: 1, symbol: '♩' }, { type: 'note', duration: 1, symbol: '♩' }, { type: 'note', duration: 1, symbol: '♩' },
            { type: 'note', duration: 4, symbol: '𝅝' },
            {type: 'final_barline', duration: 0, symbol: '𝄂', isControl: true}
        ]
    },
    {
        name: "Módulo III - Lição 27: Melodias Rítmicas com Pontuadas",
        timeSignature: { beats: 3, beatType: 4 },
        tempo: 100,
        pattern: [
            // Compasso 1-4
            { type: 'note', duration: 1.5, symbol: '♩.' }, { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮' }, { type: 'note', duration: 1, symbol: '♩' },
            { type: 'note', duration: 0.75, symbol: '𝅘𝅥𝅮.' }, { type: 'note', duration: 0.25, symbol: '𝅘𝅥𝅯' }, { type: 'note', duration: 2, symbol: '𝅗𝅥' },
            { type: 'note', duration: 1, symbol: '♩' }, { type: 'note', duration: 1.5, symbol: '♩.' }, { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮' },
            { type: 'note', duration: 3, symbol: '𝅗𝅥.' },
            // Compasso 5-8
            { type: 'note', duration: 1, symbol: '♩' }, { type: 'note', duration: 2, symbol: '𝅗𝅥' },
            { type: 'note', duration: 1.5, symbol: '♩.' }, { type: 'rest', duration: 0.5, symbol: '𝄾' }, { type: 'note', duration: 1, symbol: '♩' },
            { type: 'note', duration: 3, symbol: '𝅗𝅥.' },
            { type: 'note', duration: 0.75, symbol: '𝅘𝅥𝅮.' }, { type: 'note', duration: 0.25, symbol: '𝅘𝅥𝅯' }, { type: 'note', duration: 1, symbol: '♩' }, { type: 'note', duration: 1, symbol: '♩' },
            // Compasso 9-12
            { type: 'note', duration: 2, symbol: '𝅗𝅥' }, { type: 'note', duration: 1, symbol: '♩' },
            { type: 'note', duration: 1, symbol: '♩' }, { type: 'note', duration: 1.5, symbol: '♩.' }, { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮' },
            { type: 'note', duration: 3, symbol: '𝅗𝅥.' },
            { type: 'note', duration: 1, symbol: '♩' }, { type: 'note', duration: 2, symbol: '𝅗𝅥' },
            // Compasso 13-16
            { type: 'note', duration: 1.5, symbol: '♩.' }, { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮' }, { type: 'note', duration: 1, symbol: '♩' },
            { type: 'note', duration: 2, symbol: '𝅗𝅥' }, { type: 'rest', duration: 1, symbol: '𝄽' },
            { type: 'note', duration: 1, symbol: '♩' }, { type: 'note', duration: 1, symbol: '♩' }, { type: 'note', duration: 1, symbol: '♩' },
            { type: 'note', duration: 3, symbol: '𝅗𝅥.' },
            {type: 'final_barline', duration: 0, symbol: '𝄂', isControl: true}
        ]
    },
    {
        name: "Módulo III - Lição 28: Prática com Grupos de Pontuadas",
        timeSignature: { beats: 4, beatType: 4 },
        tempo: 105,
        pattern: [
            // Compasso 1-4
            { type: 'note', duration: 0.75, symbol: '𝅘𝅥𝅮.' }, { type: 'note', duration: 0.25, symbol: '𝅘𝅥𝅯' }, { type: 'note', duration: 0.75, symbol: '𝅘𝅥𝅮.' }, { type: 'note', duration: 0.25, symbol: '𝅘𝅥𝅯' }, { type: 'note', duration: 2, symbol: '𝅗𝅥' },
            { type: 'note', duration: 1.5, symbol: '♩.' }, { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮' }, { type: 'note', duration: 1.5, symbol: '♩.' }, { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮' },
            { type: 'note', duration: 0.75, symbol: '𝅘𝅥𝅮.' }, { type: 'note', duration: 0.25, symbol: '𝅘𝅥𝅯' }, { type: 'note', duration: 1, symbol: '♩' }, { type: 'note', duration: 1, symbol: '♩' }, { type: 'note', duration: 1, symbol: '♩' },
            { type: 'note', duration: 2, symbol: '𝅗𝅥' }, { type: 'note', duration: 1.5, symbol: '♩.' }, { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮' },
            // Compasso 5-8
            { type: 'note', duration: 4, symbol: '𝅝' },
            { type: 'note', duration: 1, symbol: '♩' }, { type: 'note', duration: 0.75, symbol: '𝅘𝅥𝅮.' }, { type: 'note', duration: 0.25, symbol: '𝅘𝅥𝅯' }, { type: 'note', duration: 2, symbol: '𝅗𝅥' },
            { type: 'note', duration: 1.5, symbol: '♩.' }, { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮' }, { type: 'note', duration: 1.5, symbol: '♩.' }, { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮' },
            { type: 'note', duration: 4, symbol: '𝅝' },
            // Compasso 9-12
            { type: 'note', duration: 0.75, symbol: '𝅘𝅥𝅮.' }, { type: 'note', duration: 0.25, symbol: '𝅘𝅥𝅯' }, { type: 'note', duration: 3, symbol: '𝅗𝅥.' },
            { type: 'note', duration: 2, symbol: '𝅗𝅥' }, { type: 'note', duration: 2, symbol: '𝅗𝅥' },
            { type: 'note', duration: 1.5, symbol: '♩.' }, { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮' }, { type: 'note', duration: 1, symbol: '♩' }, { type: 'note', duration: 1, symbol: '♩' },
            { type: 'note', duration: 4, symbol: '𝅝' },
            // Compasso 13-16
            { type: 'note', duration: 1, symbol: '♩' }, { type: 'note', duration: 2, symbol: '𝅗𝅥' }, { type: 'note', duration: 1, symbol: '♩' },
            { type: 'note', duration: 0.75, symbol: '𝅘𝅥𝅮.' }, { type: 'note', duration: 0.25, symbol: '𝅘𝅥𝅯' }, { type: 'note', duration: 0.75, symbol: '𝅘𝅥𝅮.' }, { type: 'note', duration: 0.25, symbol: '𝅘𝅥𝅯' }, { type: 'note', duration: 2, symbol: '𝅗𝅥' },
            { type: 'note', duration: 1.5, symbol: '♩.' }, { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮' }, { type: 'note', duration: 2, symbol: '𝅗𝅥' },
            { type: 'note', duration: 4, symbol: '𝅝' },
            {type: 'final_barline', duration: 0, symbol: '𝄂', isControl: true}
        ]
    },
    {
        name: "Módulo III - Lição 29: Combinações Avançadas e Pausas",
        timeSignature: { beats: 4, beatType: 4 },
        tempo: 110,
        pattern: [
            // Compasso 1-4
            { type: 'note', duration: 1.5, symbol: '♩.' }, { type: 'rest', duration: 0.5, symbol: '𝄾' }, { type: 'note', duration: 0.75, symbol: '𝅘𝅥𝅮.' }, { type: 'note', duration: 0.25, symbol: '𝅘𝅥𝅯' }, { type: 'rest', duration: 1, symbol: '𝄽' },
            { type: 'note', duration: 3, symbol: '𝅗𝅥.' }, { type: 'rest', duration: 1, symbol: '𝄽' },
            { type: 'note', duration: 0.75, symbol: '𝅘𝅥𝅮.' }, { type: 'note', duration: 0.25, symbol: '𝅘𝅥𝅯' }, { type: 'note', duration: 1.5, symbol: '♩.' }, { type: 'rest', duration: 0.5, symbol: '𝄾' }, { type: 'note', duration: 1, symbol: '♩' },
            { type: 'note', duration: 2, symbol: '𝅗𝅥' }, { type: 'note', duration: 2, symbol: '𝅗𝅥' },
            // Compasso 5-8
            { type: 'note', duration: 1, symbol: '♩' }, { type: 'rest', duration: 0.5, symbol: '𝄾' }, { type: 'note', duration: 2.5, symbol: '𝅗𝅥.' },
            { type: 'note', duration: 1.5, symbol: '♩.' }, { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮' }, { type: 'note', duration: 1, symbol: '♩' }, { type: 'rest', duration: 1, symbol: '𝄽' },
            { type: 'note', duration: 4, symbol: '𝅝' },
            { type: 'rest', duration: 2, symbol: '𝄼' }, { type: 'note', duration: 1.5, symbol: '♩.' }, { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮' },
            // Compasso 9-12
            { type: 'note', duration: 0.75, symbol: '𝅘𝅥𝅮.' }, { type: 'note', duration: 0.25, symbol: '𝅘𝅥𝅯' }, { type: 'rest', duration: 1, symbol: '𝄽' }, { type: 'note', duration: 1, symbol: '♩' }, { type: 'rest', duration: 1, symbol: '𝄽' },
            { type: 'note', duration: 1, symbol: '♩' }, { type: 'note', duration: 2, symbol: '𝅗𝅥' }, { type: 'rest', duration: 1, symbol: '𝄽' },
            { type: 'note', duration: 1.5, symbol: '♩.' }, { type: 'rest', duration: 0.5, symbol: '𝄾' }, { type: 'note', duration: 1.5, symbol: '♩.' }, { type: 'rest', duration: 0.5, symbol: '𝄾' },
            { type: 'note', duration: 4, symbol: '𝅝' },
            // Compasso 13-16
            { type: 'note', duration: 2, symbol: '𝅗𝅥' }, { type: 'note', duration: 1, symbol: '♩' }, { type: 'rest', duration: 1, symbol: '𝄽' },
            { type: 'rest', duration: 1, symbol: '𝄽' }, { type: 'note', duration: 1.5, symbol: '♩.' }, { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮' }, { type: 'rest', duration: 1, symbol: '𝄽' },
            { type: 'note', duration: 1, symbol: '♩' }, { type: 'note', duration: 1, symbol: '♩' }, { type: 'note', duration: 2, symbol: '𝅗𝅥' },
            { type: 'note', duration: 4, symbol: '𝅝' },
            {type: 'final_barline', duration: 0, symbol: '𝄂', isControl: true}
        ]
    },
    {
        name: "Módulo III - Lição 30: Revisão com Pontuadas",
        timeSignature: { beats: 4, beatType: 4 },
        tempo: 115,
        pattern: [
            // Compasso 1-4
            { type: 'note', duration: 3, symbol: '𝅗𝅥.' }, { type: 'note', duration: 1, symbol: '♩' },
            { type: 'note', duration: 0.75, symbol: '𝅘𝅥𝅮.' }, { type: 'note', duration: 0.25, symbol: '𝅘𝅥𝅯' }, { type: 'note', duration: 1.5, symbol: '♩.' }, { type: 'rest', duration: 1.5, symbol: '𝄽.' },
            { type: 'note', duration: 2, symbol: '𝅗𝅥' }, { type: 'note', duration: 0.75, symbol: '𝅘𝅥𝅮.' }, { type: 'note', duration: 0.25, symbol: '𝅘𝅥𝅯' }, { type: 'rest', duration: 1, symbol: '𝄽' },
            { type: 'note', duration: 1.5, symbol: '♩.' }, { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮' }, { type: 'note', duration: 1, symbol: '♩' }, { type: 'rest', duration: 1, symbol: '𝄽' },
            // Compasso 5-8
            { type: 'note', duration: 4, symbol: '𝅝' },
            { type: 'note', duration: 1, symbol: '♩' }, { type: 'note', duration: 1.5, symbol: '♩.' }, { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮' }, { type: 'rest', duration: 1, symbol: '𝄽' },
            { type: 'note', duration: 2, symbol: '𝅗𝅥' }, { type: 'note', duration: 2, symbol: '𝅗𝅥' },
            { type: 'note', duration: 3, symbol: '𝅗𝅥.' }, { type: 'rest', duration: 1, symbol: '𝄽' },
            // Compasso 9-12
            { type: 'note', duration: 0.75, symbol: '𝅘𝅥𝅮.' }, { type: 'note', duration: 0.25, symbol: '𝅘𝅥𝅯' }, { type: 'note', duration: 1, symbol: '♩' }, { type: 'note', duration: 2, symbol: '𝅗𝅥' },
            { type: 'note', duration: 1, symbol: '♩' }, { type: 'note', duration: 1, symbol: '♩' }, { type: 'note', duration: 1.5, symbol: '♩.' }, { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮' },
            { type: 'note', duration: 4, symbol: '𝅝' },
            { type: 'rest', duration: 1.5, symbol: '𝄽.' }, { type: 'note', duration: 2.5, symbol: '𝅗𝅥.' },
            // Compasso 13-16
            { type: 'note', duration: 1, symbol: '♩' }, { type: 'note', duration: 1, symbol: '♩' }, { type: 'note', duration: 2, symbol: '𝅗𝅥' },
            { type: 'note', duration: 2, symbol: '𝅗𝅥' }, { type: 'note', duration: 2, symbol: '𝅗𝅥' },
            { type: 'note', duration: 0.75, symbol: '𝅘𝅥𝅮.' }, { type: 'note', duration: 0.25, symbol: '𝅘𝅥𝅯' }, { type: 'note', duration: 0.75, symbol: '𝅘𝅥𝅮.' }, { type: 'note', duration: 0.25, symbol: '𝅘𝅥𝅯' }, { type: 'note', duration: 2, symbol: '𝅗𝅥' },
            { type: 'note', duration: 4, symbol: '𝅝' },
            {type: 'final_barline', duration: 0, symbol: '𝄂', isControl: true}
        ]
    }
];