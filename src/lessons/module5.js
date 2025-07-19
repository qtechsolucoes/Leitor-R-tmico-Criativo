// src/lessons/module5.js

export const module5 = [
    {
        name: "Módulo V - Lição 41: Ligadura Simples no Mesmo Compasso",
        timeSignature: { beats: 4, beatType: 4 },
        tempo: 70,
        pattern: [
            // Compasso 1-4
            { type: 'note', duration: 2, symbol: '𝅗𝅥', tiedToNext: true }, { type: 'note', duration: 1, symbol: '♩' }, { type: 'note', duration: 1, symbol: '♩' },
            { type: 'note', duration: 1, symbol: '♩' }, { type: 'note', duration: 1, symbol: '♩', tiedToNext: true }, { type: 'note', duration: 2, symbol: '𝅗𝅥' },
            { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮' }, { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮', tiedToNext: true }, { type: 'note', duration: 1, symbol: '♩' }, { type: 'note', duration: 2, symbol: '𝅗𝅥' },
            { type: 'note', duration: 1, symbol: '♩', tiedToNext: true }, { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮' }, { type: 'note', duration: 1.5, symbol: '♩.' }, { type: 'note', duration: 1, symbol: '♩' },
            // Compasso 5-8
            { type: 'note', duration: 1, symbol: '♩' }, { type: 'note', duration: 2, symbol: '𝅗𝅥', tiedToNext: true }, { type: 'note', duration: 1, symbol: '♩' },
            { type: 'note', duration: 4, symbol: '𝅝' },
            { type: 'note', duration: 1, symbol: '♩' }, { type: 'note', duration: 1, symbol: '♩' }, { type: 'note', duration: 2, symbol: '𝅗𝅥', tiedToNext: true },
            { type: 'note', duration: 2, symbol: '𝅗𝅥' }, { type: 'note', duration: 2, symbol: '𝅗𝅥' },
            // Compasso 9-12
            { type: 'note', duration: 1, symbol: '♩', tiedToNext: true }, { type: 'note', duration: 1, symbol: '♩' }, { type: 'note', duration: 2, symbol: '𝅗𝅥' },
            { type: 'note', duration: 2, symbol: '𝅗𝅥', tiedToNext: true }, { type: 'note', duration: 2, symbol: '𝅗𝅥' },
            { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮' }, { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮', tiedToNext: true }, { type: 'note', duration: 3, symbol: '𝅗𝅥.' },
            { type: 'note', duration: 4, symbol: '𝅝' },
            // Compasso 13-16
            { type: 'note', duration: 1, symbol: '♩', tiedToNext: true }, { type: 'note', duration: 1, symbol: '♩' }, { type: 'note', duration: 1, symbol: '♩', tiedToNext: true }, { type: 'note', duration: 1, symbol: '♩' },
            { type: 'note', duration: 2, symbol: '𝅗𝅥', tiedToNext: true }, { type: 'note', duration: 2, symbol: '𝅗𝅥' },
            { type: 'note', duration: 1, symbol: '♩' }, { type: 'note', duration: 2, symbol: '𝅗𝅥' }, { type: 'note', duration: 1, symbol: '♩' },
            { type: 'note', duration: 4, symbol: '𝅝' },
            {type: 'final_barline', duration: 0, symbol: '𝄂', isControl: true}
        ]
    },
    {
        name: "Módulo V - Lição 42: Ligadura Atravessando o Compasso",
        timeSignature: { beats: 4, beatType: 4 },
        tempo: 75,
        pattern: [
            // Compasso 1-4
            { type: 'note', duration: 2, symbol: '𝅗𝅥' }, { type: 'note', duration: 2, symbol: '𝅗𝅥', tiedToNext: true },
            { type: 'note', duration: 2, symbol: '𝅗𝅥' }, { type: 'note', duration: 2, symbol: '𝅗𝅥' },
            { type: 'note', duration: 1, symbol: '♩' }, { type: 'note', duration: 3, symbol: '𝅗𝅥.', tiedToNext: true },
            { type: 'note', duration: 4, symbol: '𝅝' },
            // Compasso 5-8
            { type: 'note', duration: 3, symbol: '𝅗𝅥.' }, { type: 'note', duration: 1, symbol: '♩', tiedToNext: true },
            { type: 'note', duration: 1, symbol: '♩' }, { type: 'note', duration: 3, symbol: '𝅗𝅥.' },
            { type: 'note', duration: 2, symbol: '𝅗𝅥' }, { type: 'note', duration: 2, symbol: '𝅗𝅥', tiedToNext: true },
            { type: 'note', duration: 4, symbol: '𝅝' },
            // Compasso 9-12
            { type: 'note', duration: 1, symbol: '♩' }, { type: 'note', duration: 1, symbol: '♩' }, { type: 'note', duration: 2, symbol: '𝅗𝅥', tiedToNext: true },
            { type: 'note', duration: 3, symbol: '𝅗𝅥.' }, { type: 'note', duration: 1, symbol: '♩' },
            { type: 'note', duration: 1, symbol: '♩' }, { type: 'note', duration: 2, symbol: '𝅗𝅥' }, { type: 'note', duration: 1, symbol: '♩', tiedToNext: true },
            { type: 'note', duration: 4, symbol: '𝅝' },
            // Compasso 13-16
            { type: 'note', duration: 2, symbol: '𝅗𝅥', tiedToNext: true },
            { type: 'note', duration: 2, symbol: '𝅗𝅥', tiedToNext: true },
            { type: 'note', duration: 3, symbol: '𝅗𝅥.' }, { type: 'note', duration: 1, symbol: '♩' },
            { type: 'note', duration: 4, symbol: '𝅝' },
            {type: 'final_barline', duration: 0, symbol: '𝄂', isControl: true}
        ]
    },
    {
        name: "Módulo V - Lição 43: Ligaduras com Colcheias em 3/4",
        timeSignature: { beats: 3, beatType: 4 },
        tempo: 80,
        pattern: [
            // Compasso 1-4
            { type: 'note', duration: 1, symbol: '♩' }, { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮', tiedToNext: true }, { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮' }, { type: 'note', duration: 1, symbol: '♩' },
            { type: 'note', duration: 1, symbol: '♩', tiedToNext: true }, { type: 'note', duration: 1, symbol: '♩' }, { type: 'note', duration: 1, symbol: '♩' },
            { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮' }, { type: 'note', duration: 1, symbol: '♩', tiedToNext: true }, { type: 'note', duration: 1, symbol: '♩' }, { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮' },
            { type: 'note', duration: 3, symbol: '𝅗𝅥.' },
            // Compasso 5-8
            { type: 'note', duration: 1, symbol: '♩' }, { type: 'note', duration: 2, symbol: '𝅗𝅥', tiedToNext: true },
            { type: 'note', duration: 1, symbol: '♩' }, { type: 'note', duration: 2, symbol: '𝅗𝅥' },
            { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮' }, { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮' }, { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮', tiedToNext: true }, { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮' }, { type: 'note', duration: 1, symbol: '♩' },
            { type: 'note', duration: 3, symbol: '𝅗𝅥.' },
            // Compasso 9-12
            { type: 'note', duration: 1, symbol: '♩' }, { type: 'note', duration: 1, symbol: '♩', tiedToNext: true }, { type: 'note', duration: 1, symbol: '♩' },
            { type: 'note', duration: 2, symbol: '𝅗𝅥', tiedToNext: true }, { type: 'note', duration: 1, symbol: '♩' },
            { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮' }, { type: 'note', duration: 1, symbol: '♩' }, { type: 'note', duration: 1.5, symbol: '♩.' },
            { type: 'note', duration: 3, symbol: '𝅗𝅥.' },
            // Compasso 13-16
            { type: 'note', duration: 1, symbol: '♩' },{ type: 'note', duration: 1, symbol: '♩' },
            { type: 'note', duration: 1, symbol: '♩' }, { type: 'note', duration: 2.5, symbol: '𝅗𝅥.' },
            { type: 'note', duration: 1, symbol: '♩' }, { type: 'note', duration: 1, symbol: '♩' }, { type: 'note', duration: 1, symbol: '♩', tiedToNext: true},
            { type: 'note', duration: 3, symbol: '𝅗𝅥.' },
            {type: 'final_barline', duration: 0, symbol: '𝄂', isControl: true}
        ]
    },
    {
        name: "Módulo V - Lição 44: Múltiplas Ligaduras e Semicolcheias",
        timeSignature: { beats: 4, beatType: 4 },
        tempo: 85,
        pattern: [
            // Compasso 1-4
            { type: 'note', duration: 1, symbol: '♩', tiedToNext: true }, { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮' }, { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮', tiedToNext: true }, { type: 'note', duration: 2, symbol: '𝅗𝅥' },
            { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮', tiedToNext: true }, { type: 'note', duration: 0.25, symbol: '𝅘𝅥𝅯' }, { type: 'note', duration: 0.25, symbol: '𝅘𝅥𝅯' }, { type: 'note', duration: 1, symbol: '♩', tiedToNext: true }, { type: 'note', duration: 2, symbol: '𝅗𝅥' },
            { type: 'note', duration: 1, symbol: '♩', tiedToNext: true }, { type: 'note', duration: 1, symbol: '♩', tiedToNext: true }, { type: 'note', duration: 1, symbol: '♩', tiedToNext: true }, { type: 'note', duration: 1, symbol: '♩' },
            { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮' }, { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮' }, { type: 'note', duration: 1, symbol: '♩', tiedToNext: true }, { type: 'note', duration: 2, symbol: '𝅗𝅥' },
            // Compasso 5-8
            { type: 'note', duration: 2, symbol: '𝅗𝅥', tiedToNext: true }, { type: 'note', duration: 1, symbol: '♩' }, { type: 'note', duration: 1, symbol: '♩' },
            { type: 'note', duration: 1, symbol: '♩', tiedToNext: true }, { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮', tiedToNext: true }, { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮' }, { type: 'note', duration: 2, symbol: '𝅗𝅥' },
            { type: 'note', duration: 4, symbol: '𝅝' },
            { type: 'note', duration: 1, symbol: '♩' }, { type: 'note', duration: 1, symbol: '♩' }, { type: 'note', duration: 2, symbol: '𝅗𝅥' },
            // Compasso 9-12
            { type: 'note', duration: 0.25, symbol: '𝅘𝅥𝅯' }, { type: 'note', duration: 0.25, symbol: '𝅘𝅥𝅯' }, { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮', tiedToNext: true }, { type: 'note', duration: 1, symbol: '♩' }, { type: 'note', duration: 2, symbol: '𝅗𝅥' },
            { type: 'note', duration: 1, symbol: '♩', tiedToNext: true }, { type: 'note', duration: 2, symbol: '𝅗𝅥' }, { type: 'note', duration: 1, symbol: '♩' },
            { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮', tiedToNext: true }, { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮', tiedToNext: true }, { type: 'note', duration: 1, symbol: '♩' }, { type: 'note', duration: 2, symbol: '𝅗𝅥' },
            { type: 'note', duration: 4, symbol: '𝅝' },
            // Compasso 13-16
            { type: 'note', duration: 1, symbol: '♩' }, { type: 'note', duration: 1, symbol: '♩', tiedToNext: true }, { type: 'note', duration: 1, symbol: '♩' }, { type: 'note', duration: 1, symbol: '♩' },
            { type: 'note', duration: 2, symbol: '𝅗𝅥' }, { type: 'note', duration: 2, symbol: '𝅗𝅥', tiedToNext: true },
            { type: 'note', duration: 1, symbol: '♩' }, { type: 'note', duration: 3, symbol: '𝅗𝅥.' },
            { type: 'note', duration: 4, symbol: '𝅝' },
            {type: 'final_barline', duration: 0, symbol: '𝄂', isControl: true}
        ]
    },
    {
        name: "Módulo V - Lição 45: Ligaduras e Pausas (Síncope)",
        timeSignature: { beats: 4, beatType: 4 },
        tempo: 90,
        pattern: [
            // Compasso 1-4
            { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮' }, { type: 'note', duration: 1, symbol: '♩', tiedToNext: true }, { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮' }, { type: 'note', duration: 2, symbol: '𝅗𝅥' },
            { type: 'rest', duration: 1, symbol: '𝄽' }, { type: 'note', duration: 1, symbol: '♩' }, { type: 'note', duration: 1, symbol: '♩', tiedToNext: true }, { type: 'note', duration: 1, symbol: '♩' },
            { type: 'note', duration: 1.5, symbol: '♩.' }, { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮', tiedToNext: true }, { type: 'note', duration: 1, symbol: '♩' }, { type: 'rest', duration: 1, symbol: '𝄽' },
            { type: 'note', duration: 4, symbol: '𝅝' },
            // Compasso 5-8
            { type: 'note', duration: 1, symbol: '♩' }, { type: 'note', duration: 2, symbol: '𝅗𝅥', tiedToNext: true }, { type: 'note', duration: 1, symbol: '♩' },
            { type: 'rest', duration: 2, symbol: '𝄼' }, { type: 'note', duration: 2, symbol: '𝅗𝅥' },
            { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮' }, { type: 'note', duration: 1, symbol: '♩', tiedToNext: true }, { type: 'note', duration: 2, symbol: '𝅗𝅥' }, { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮' },
            { type: 'rest', duration: 4, symbol: '𝄻' },
            // Compasso 9-12
            { type: 'note', duration: 1, symbol: '♩' }, { type: 'rest', duration: 1, symbol: '𝄽' }, { type: 'note', duration: 1, symbol: '♩', tiedToNext: true }, { type: 'note', duration: 1, symbol: '♩' },
            { type: 'note', duration: 2, symbol: '𝅗𝅥' }, { type: 'note', duration: 1, symbol: '♩', tiedToNext: true }, { type: 'note', duration: 1, symbol: '♩' },
            { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮' }, { type: 'note', duration: 1.5, symbol: '♩.' }, { type: 'note', duration: 2, symbol: '𝅗𝅥' },
            { type: 'note', duration: 4, symbol: '𝅝' },
            // Compasso 13-16
            { type: 'note', duration: 1.5, symbol: '♩.' }, { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮', tiedToNext: true }, { type: 'note', duration: 2, symbol: '𝅗𝅥' },
            { type: 'rest', duration: 1, symbol: '𝄽' }, { type: 'note', duration: 3, symbol: '𝅗𝅥.' },
            { type: 'note', duration: 1, symbol: '♩' }, { type: 'note', duration: 2, symbol: '𝅗𝅥' }, { type: 'rest', duration: 1, symbol: '𝄽' },
            { type: 'note', duration: 4, symbol: '𝅝' },
            {type: 'final_barline', duration: 0, symbol: '𝄂', isControl: true}
        ]
    },
    {
        name: "Módulo V - Lição 46: Ligadura de Colcheia Pontuada",
        timeSignature: { beats: 3, beatType: 4 },
        tempo: 95,
        pattern: [
            // Compasso 1-4
            { type: 'note', duration: 0.75, symbol: '𝅘𝅥𝅮.' }, { type: 'note', duration: 0.25, symbol: '𝅘𝅥𝅯', tiedToNext: true }, { type: 'note', duration: 1, symbol: '♩' }, { type: 'note', duration: 1, symbol: '♩' },
            { type: 'note', duration: 1.5, symbol: '♩.', tiedToNext: true }, { type: 'note', duration: 1, symbol: '♩' }, { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮' },
            { type: 'note', duration: 1, symbol: '♩' }, { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮', tiedToNext: true }, { type: 'note', duration: 1.5, symbol: '♩.' },
            { type: 'note', duration: 3, symbol: '𝅗𝅥.' },
            // Compasso 5-8
            { type: 'note', duration: 1, symbol: '♩' }, { type: 'note', duration: 1, symbol: '♩' }, { type: 'note', duration: 1, symbol: '♩' },
            { type: 'note', duration: 0.75, symbol: '𝅘𝅥𝅮.' }, { type: 'note', duration: 0.25, symbol: '𝅘𝅥𝅯', tiedToNext: true }, { type: 'note', duration: 2, symbol: '𝅗𝅥' },
            { type: 'note', duration: 1.5, symbol: '♩.' }, { type: 'note', duration: 1, symbol: '♩' }, { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮' },
            { type: 'note', duration: 3, symbol: '𝅗𝅥.' },
            // Compasso 9-12
            { type: 'note', duration: 1, symbol: '♩' }, { type: 'note', duration: 0.75, symbol: '𝅘𝅥𝅮.' }, { type: 'note', duration: 0.25, symbol: '𝅘𝅥𝅯', tiedToNext: true }, { type: 'note', duration: 1, symbol: '♩' },
            { type: 'note', duration: 2, symbol: '𝅗𝅥' }, { type: 'note', duration: 1, symbol: '♩' },
            { type: 'note', duration: 1, symbol: '♩', tiedToNext: true }, { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮' }, { type: 'note', duration: 1.5, symbol: '♩.' },
            { type: 'note', duration: 3, symbol: '𝅗𝅥.' },
            // Compasso 13-16
            { type: 'note', duration: 1, symbol: '♩' }, { type: 'note', duration: 2, symbol: '𝅗𝅥', tiedToNext: true },
            { type: 'note', duration: 1, symbol: '♩' }, { type: 'note', duration: 2, symbol: '𝅗𝅥' },
            { type: 'note', duration: 0.75, symbol: '𝅘𝅥𝅮.' }, { type: 'note', duration: 0.25, symbol: '𝅘𝅥𝅯', tiedToNext: true }, { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮' }, { type: 'note', duration: 1.5, symbol: '♩.' },
            { type: 'note', duration: 3, symbol: '𝅗𝅥.' },
            {type: 'final_barline', duration: 0, symbol: '𝄂', isControl: true}
        ]
    },
    {
        name: "Módulo V - Lição 47: Frases com Ligaduras e Síncopes",
        timeSignature: { beats: 4, beatType: 4 },
        tempo: 100,
        pattern: [
            // Compasso 1-4
            { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮' }, { type: 'note', duration: 1, symbol: '♩', tiedToNext: true }, { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮' }, { type: 'note', duration: 1, symbol: '♩' }, { type: 'note', duration: 1, symbol: '♩' },
            { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮', tiedToNext: true }, { type: 'note', duration: 1.5, symbol: '♩.' }, { type: 'rest', duration: 1, symbol: '𝄽' }, { type: 'note', duration: 1, symbol: '♩' },
            { type: 'note', duration: 2, symbol: '𝅗𝅥', tiedToNext: true }, { type: 'note', duration: 1, symbol: '♩' }, { type: 'rest', duration: 1, symbol: '𝄽' },
            { type: 'note', duration: 4, symbol: '𝅝' },
            // Compasso 5-8
            { type: 'rest', duration: 1, symbol: '𝄽' }, { type: 'note', duration: 1, symbol: '♩' }, { type: 'note', duration: 2, symbol: '𝅗𝅥', tiedToNext: true },
            { type: 'note', duration: 1, symbol: '♩' }, { type: 'note', duration: 3, symbol: '𝅗𝅥.' },
            { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮' }, { type: 'note', duration: 1, symbol: '♩', tiedToNext: true }, { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮' }, { type: 'note', duration: 2, symbol: '𝅗𝅥' },
            { type: 'note', duration: 4, symbol: '𝅝' },
            // Compasso 9-12
            { type: 'note', duration: 1, symbol: '♩', tiedToNext: true }, { type: 'note', duration: 1, symbol: '♩' }, { type: 'note', duration: 2, symbol: '𝅗𝅥' },
            { type: 'note', duration: 2, symbol: '𝅗𝅥' }, { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮', tiedToNext: true }, { type: 'note', duration: 1.5, symbol: '♩.' },
            { type: 'note', duration: 1, symbol: '♩' }, { type: 'rest', duration: 1, symbol: '𝄽' }, { type: 'note', duration: 1, symbol: '♩', tiedToNext: true }, { type: 'note', duration: 1, symbol: '♩' },
            { type: 'note', duration: 4, symbol: '𝅝' },
            // Compasso 13-16
            { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮' }, { type: 'note', duration: 1.5, symbol: '♩.' }, { type: 'note', duration: 2, symbol: '𝅗𝅥' },
            { type: 'note', duration: 2, symbol: '𝅗𝅥', tiedToNext: true }, { type: 'note', duration: 2, symbol: '𝅗𝅥' },
            { type: 'note', duration: 1, symbol: '♩' }, { type: 'note', duration: 1, symbol: '♩' }, { type: 'note', duration: 2, symbol: '𝅗𝅥' },
            { type: 'note', duration: 4, symbol: '𝅝' },
            {type: 'final_barline', duration: 0, symbol: '𝄂', isControl: true}
        ]
    },
    {
        name: "Módulo V - Lição 48: Ligaduras Múltiplas e Contratempo",
        timeSignature: { beats: 2, beatType: 4 },
        tempo: 105,
        pattern: [
            // Compasso 1-4
            { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮', tiedToNext: true }, { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮' },
            { type: 'rest', duration: 0.5, symbol: '𝄾' }, { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮', tiedToNext: true },
            { type: 'note', duration: 1, symbol: '♩' }, { type: 'note', duration: 1, symbol: '♩' },
            { type: 'note', duration: 1, symbol: '♩', tiedToNext: true }, { type: 'note', duration: 1, symbol: '♩' },
            // Compasso 5-8
            { type: 'note', duration: 2, symbol: '𝅗𝅥', tiedToNext: true },
            { type: 'note', duration: 1, symbol: '♩' }, { type: 'rest', duration: 1, symbol: '𝄽' },
            { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮', tiedToNext: true }, { type: 'note', duration: 1, symbol: '♩' }, { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮' },
            { type: 'note', duration: 2, symbol: '𝅗𝅥' },
            // Compasso 9-12
            { type: 'note', duration: 1, symbol: '♩' }, { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮', tiedToNext: true }, { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮' },
            { type: 'note', duration: 1, symbol: '♩' }, { type: 'rest', duration: 1, symbol: '𝄽' },
            { type: 'note', duration: 2, symbol: '𝅗𝅥' },
            { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮' }, { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮', tiedToNext: true }, { type: 'note', duration: 1, symbol: '♩' },
            // Compasso 13-16
            { type: 'note', duration: 1, symbol: '♩', tiedToNext: true }, { type: 'note', duration: 1, symbol: '♩' },
            { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮' }, { type: 'note', duration: 1, symbol: '♩' }, { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮' },
            { type: 'rest', duration: 1, symbol: '𝄽' }, { type: 'note', duration: 1, symbol: '♩' },
            { type: 'note', duration: 2, symbol: '𝅗𝅥' },
            {type: 'final_barline', duration: 0, symbol: '𝄂', isControl: true}
        ]
    },
    {
        name: "Módulo V - Lição 49: Desafio de Leitura com Ligaduras",
        timeSignature: { beats: 3, beatType: 4 },
        tempo: 110,
        pattern: [
            // Compasso 1-4
            { type: 'note', duration: 1, symbol: '♩', tiedToNext: true }, { type: 'note', duration: 1.5, symbol: '♩.' }, { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮' },
            { type: 'note', duration: 0.75, symbol: '𝅘𝅥𝅮.' }, { type: 'note', duration: 0.25, symbol: '𝅘𝅥𝅯', tiedToNext: true }, { type: 'note', duration: 1, symbol: '♩' }, { type: 'rest', duration: 1, symbol: '𝄽' },
            { type: 'note', duration: 3, symbol: '𝅗𝅥.', tiedToNext: true },
            { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮' }, { type: 'note', duration: 1, symbol: '♩' }, { type: 'note', duration: 1.5, symbol: '♩.' },
            // Compasso 5-8
            { type: 'note', duration: 1, symbol: '♩', tiedToNext: true }, { type: 'note', duration: 2, symbol: '𝅗𝅥' },
            { type: 'note', duration: 1.5, symbol: '♩.' }, { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮' }, { type: 'note', duration: 1, symbol: '♩' },
            { type: 'note', duration: 3, symbol: '𝅗𝅥.' },
            { type: 'note', duration: 0.75, symbol: '𝅘𝅥𝅮.' }, { type: 'note', duration: 0.25, symbol: '𝅘𝅥𝅯' }, { type: 'note', duration: 1, symbol: '♩', tiedToNext: true }, { type: 'note', duration: 1, symbol: '♩' },
            // Compasso 9-12
            { type: 'note', duration: 2, symbol: '𝅗𝅥' }, { type: 'note', duration: 1, symbol: '♩' },
            { type: 'note', duration: 1, symbol: '♩' }, { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮', tiedToNext: true }, { type: 'note', duration: 1.5, symbol: '♩.' },
            { type: 'note', duration: 3, symbol: '𝅗𝅥.', tiedToNext: true },
            { type: 'note', duration: 3, symbol: '𝅗𝅥.' },
            // Compasso 13-16
            { type: 'note', duration: 1, symbol: '♩', tiedToNext: true }, { type: 'note', duration: 2, symbol: '𝅗𝅥' },
            { type: 'note', duration: 1.5, symbol: '♩.' }, { type: 'note', duration: 1.5, symbol: '♩.' },
            { type: 'note', duration: 0.75, symbol: '𝅘𝅥𝅮.' }, { type: 'note', duration: 0.25, symbol: '𝅘𝅥𝅯', tiedToNext: true }, { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮' }, { type: 'note', duration: 1.5, symbol: '♩.' },
            { type: 'note', duration: 3, symbol: '𝅗𝅥.' },
            {type: 'final_barline', duration: 0, symbol: '𝄂', isControl: true}
        ]
    },
    {
        name: "Módulo V - Lição 50: Ligaduras Cruzando Compasso e Múltiplas Figuras",
        timeSignature: { beats: 4, beatType: 4 },
        tempo: 115,
        pattern: [
            // Compasso 1-4
            { type: 'note', duration: 2, symbol: '𝅗𝅥', tiedToNext: true }, 
            { type: 'note', duration: 1, symbol: '♩' }, { type: 'note', duration: 3, symbol: '𝅗𝅥.' },
            { type: 'note', duration: 1, symbol: '♩', tiedToNext: true }, { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮' }, { type: 'rest', duration: 0.5, symbol: '𝄾' }, { type: 'note', duration: 2, symbol: '𝅗𝅥' },
            { type: 'note', duration: 0.75, symbol: '𝅘𝅥𝅮.', tiedToNext: true },
            // Compasso 5-8
            { type: 'note', duration: 0.25, symbol: '𝅘𝅥𝅯' }, { type: 'note', duration: 2, symbol: '𝅗𝅥' }, { type: 'note', duration: 1, symbol: '♩' },
            { type: 'note', duration: 1, symbol: '♩' }, { type: 'note', duration: 1, symbol: '♩' }, { type: 'note', duration: 2, symbol: '𝅗𝅥', tiedToNext: true },
            { type: 'note', duration: 4, symbol: '𝅝' },
            { type: 'note', duration: 2, symbol: '𝅗𝅥' }, { type: 'note', duration: 2, symbol: '𝅗𝅥' },
            // Compasso 9-12
            { type: 'note', duration: 1, symbol: '♩', tiedToNext: true }, { type: 'note', duration: 3, symbol: '𝅗𝅥.' },
            { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮' }, { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮', tiedToNext: true }, { type: 'note', duration: 3, symbol: '𝅗𝅥.' },
            { type: 'note', duration: 4, symbol: '𝅝' },
            { type: 'note', duration: 1, symbol: '♩' }, { type: 'note', duration: 1, symbol: '♩', tiedToNext: true }, { type: 'note', duration: 2, symbol: '𝅗𝅥' },
            // Compasso 13-16
            { type: 'note', duration: 2, symbol: '𝅗𝅥', tiedToNext: true }, { type: 'note', duration: 2, symbol: '𝅗𝅥' },
            { type: 'note', duration: 0.75, symbol: '𝅘𝅥𝅮.' }, { type: 'note', duration: 0.25, symbol: '𝅘𝅥𝅯' }, { type: 'note', duration: 3, symbol: '𝅗𝅥.' },
            { type: 'note', duration: 1, symbol: '♩' }, { type: 'rest', duration: 1, symbol: '𝄽' }, { type: 'note', duration: 2, symbol: '𝅗𝅥' },
            { type: 'note', duration: 4, symbol: '𝅝' },
            {type: 'final_barline', duration: 0, symbol: '𝄂', isControl: true}
        ]
    }
];