// src/lessons/module8.js

export const module8 = [
    {
        name: "Módulo VIII - Lição 71: Ligaduras Simples em 6/8",
        timeSignature: { beats: 6, beatType: 8 },
        tempo: 70,
        pattern: [
            // Compasso 1-4
            { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮', tiedToNext: true }, { type: 'note', duration: 1, symbol: '♩' }, { type: 'note', duration: 1.5, symbol: '♩.' },
            { type: 'note', duration: 1.5, symbol: '♩.', tiedToNext: true }, { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮' }, { type: 'note', duration: 1, symbol: '♩' },
            { type: 'note', duration: 1, symbol: '♩' }, { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮', tiedToNext: true }, { type: 'note', duration: 1.5, symbol: '♩.' },
            { type: 'note', duration: 3, symbol: '𝅗𝅥.' },
            // Compasso 5-8
            { type: 'note', duration: 1, symbol: '♩', tiedToNext: true }, { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮' }, { type: 'note', duration: 1.5, symbol: '♩.' },
            { type: 'note', duration: 1.5, symbol: '♩.', tiedToNext: true }, { type: 'note', duration: 1.5, symbol: '♩.' },
            { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮' }, { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮' }, { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮', tiedToNext: true }, { type: 'note', duration: 1.5, symbol: '♩.' },
            { type: 'note', duration: 3, symbol: '𝅗𝅥.' },
            // Compasso 9-12
            { type: 'note', duration: 1, symbol: '♩', tiedToNext: true }, { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮' }, { type: 'note', duration: 1.5, symbol: '♩.' },
            { type: 'note', duration: 1.5, symbol: '♩.' }, { type: 'note', duration: 1, symbol: '♩', tiedToNext: true }, { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮' },
            { type: 'note', duration: 3, symbol: '𝅗𝅥.', tiedToNext: true },
            { type: 'note', duration: 3, symbol: '𝅗𝅥.' },
            // Compasso 13-16
            { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮', tiedToNext: true }, { type: 'note', duration: 1, symbol: '♩' }, { type: 'note', duration: 1.5, symbol: '♩.' },
            { type: 'note', duration: 1.5, symbol: '♩.' }, { type: 'note', duration: 1, symbol: '♩' }, { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮' },
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
            // Compasso 1-4
            { type: 'note', duration: 1, symbol: '♩' }, { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮', tiedToNext: true },
            { type: 'note', duration: 1, symbol: '♩' }, { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮' }, { type: 'note', duration: 1.5, symbol: '♩.' },
            { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮', tiedToNext: true }, { type: 'note', duration: 2.5, symbol: '𝅗𝅥' }, 
            { type: 'note', duration: 3, symbol: '𝅗𝅥.' },
            // Compasso 5-8
            { type: 'note', duration: 1, symbol: '♩' }, { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮', tiedToNext: true },
            { type: 'note', duration: 2.5, symbol: '𝅗𝅥' }, { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮' }, { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮' },
            { type: 'note', duration: 1.5, symbol: '♩.', tiedToNext: true },
            { type: 'note', duration: 1.5, symbol: '♩.' }, { type: 'note', duration: 3, symbol: '𝅗𝅥.' },
            // Compasso 9-12
            { type: 'note', duration: 1, symbol: '♩' }, { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮', tiedToNext: true },
            { type: 'note', duration: 1.5, symbol: '♩.' }, { type: 'note', duration: 1.5, symbol: '♩.' },
            { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮', tiedToNext: true }, { type: 'note', duration: 2, symbol: '𝅗𝅥' }, { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮' },
            { type: 'note', duration: 3, symbol: '𝅗𝅥.' },
            // Compasso 13-16
            { type: 'note', duration: 1, symbol: '♩' }, { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮', tiedToNext: true },
            { type: 'note', duration: 1, symbol: '♩' }, { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮' }, { type: 'note', duration: 1.5, symbol: '♩.' },
            { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮', tiedToNext: true }, { type: 'note', duration: 2.5, symbol: '𝅗𝅥' },
            { type: 'note', duration: 3, symbol: '𝅗𝅥.' },
            {type: 'final_barline', duration: 0, symbol: '𝄂', isControl: true}
        ]
    },
    {
        name: "Módulo VIII - Lição 73: Ligaduras em 9/8",
        timeSignature: { beats: 9, beatType: 8 },
        tempo: 80,
        pattern: [
            // Compasso 1-4
            { type: 'note', duration: 1.5, symbol: '♩.', tiedToNext: true }, { type: 'note', duration: 1.5, symbol: '♩.' }, { type: 'note', duration: 1.5, symbol: '♩.' },
            { type: 'note', duration: 3, symbol: '𝅗𝅥.' }, { type: 'note', duration: 1.5, symbol: '♩.', tiedToNext: true },
            { type: 'note', duration: 1.5, symbol: '♩.' }, { type: 'note', duration: 1.5, symbol: '♩.' }, { type: 'note', duration: 1.5, symbol: '♩.' },
            { type: 'note', duration: 4.5, symbol: '𝅗𝅥..', tiedToNext: true },
            // Compasso 5-8
            { type: 'note', duration: 4.5, symbol: '𝅗𝅥..' }, { type: 'note', duration: 3, symbol: '𝅗𝅥.', tiedToNext: true },
            { type: 'note', duration: 1.5, symbol: '♩.' }, { type: 'note', duration: 3, symbol: '𝅗𝅥.' },
            { type: 'note', duration: 1.5, symbol: '♩.', tiedToNext: true }, { type: 'note', duration: 3, symbol: '𝅗𝅥.' },
            { type: 'note', duration: 4.5, symbol: '𝅗𝅥..' },
            // Compasso 9-12
            { type: 'note', duration: 1.5, symbol: '♩.' }, { type: 'note', duration: 1.5, symbol: '♩.', tiedToNext: true }, { type: 'note', duration: 1.5, symbol: '♩.' },
            { type: 'note', duration: 3, symbol: '𝅗𝅥.' }, { type: 'note', duration: 1.5, symbol: '♩.', tiedToNext: true },
            { type: 'note', duration: 4.5, symbol: '𝅗𝅥..' },
            { type: 'note', duration: 1.5, symbol: '♩.', tiedToNext: true }, { type: 'note', duration: 3, symbol: '𝅗𝅥.' },
            // Compasso 13-16
            { type: 'note', duration: 1, symbol: '♩' }, { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮', tiedToNext: true }, { type: 'note', duration: 3, symbol: '𝅗𝅥.' },
            { type: 'note', duration: 4.5, symbol: '𝅗𝅥..', tiedToNext: true },
            { type: 'note', duration: 1.5, symbol: '♩.' }, { type: 'note', duration: 3, symbol: '𝅗𝅥.' },
            { type: 'note', duration: 4.5, symbol: '𝅗𝅥..' },
            {type: 'final_barline', duration: 0, symbol: '𝄂', isControl: true}
        ]
    },
    {
        name: "Módulo VIII - Lição 74: Ligaduras entre Compassos em 9/8",
        timeSignature: { beats: 9, beatType: 8 },
        tempo: 85,
        pattern: [
            // Compasso 1-4
            { type: 'note', duration: 3, symbol: '𝅗𝅥.' }, { type: 'note', duration: 1.5, symbol: '♩.', tiedToNext: true },
            { type: 'note', duration: 3, symbol: '𝅗𝅥.' }, { type: 'note', duration: 1.5, symbol: '♩.' },
            { type: 'note', duration: 1.5, symbol: '♩.' }, { type: 'note', duration: 1.5, symbol: '♩.' }, { type: 'note', duration: 1.5, symbol: '♩.', tiedToNext: true },
            { type: 'note', duration: 4.5, symbol: '𝅗𝅥..' },
            // Compasso 5-8
            { type: 'note', duration: 1.5, symbol: '♩.', tiedToNext: true },
            { type: 'note', duration: 3, symbol: '𝅗𝅥.' }, { type: 'note', duration: 1.5, symbol: '♩.' }, { type: 'note', duration: 1.5, symbol: '♩.' },
            { type: 'note', duration: 1.5, symbol: '♩.', tiedToNext: true },
            { type: 'note', duration: 4.5, symbol: '𝅗𝅥..', tiedToNext: true },
            // Compasso 9-12
            { type: 'note', duration: 3, symbol: '𝅗𝅥.' }, { type: 'note', duration: 1.5, symbol: '♩.' },
            { type: 'note', duration: 1.5, symbol: '♩.', tiedToNext: true },
            { type: 'note', duration: 1.5, symbol: '♩.' }, { type: 'note', duration: 1.5, symbol: '♩.' }, { type: 'note', duration: 1.5, symbol: '♩.' },
            { type: 'note', duration: 4.5, symbol: '𝅗𝅥..', tiedToNext: true },
            // Compasso 13-16
            { type: 'note', duration: 3, symbol: '𝅗𝅥.' }, { type: 'note', duration: 1.5, symbol: '♩.', tiedToNext: true },
            { type: 'note', duration: 1.5, symbol: '♩.' }, { type: 'note', duration: 3, symbol: '𝅗𝅥.' },
            { type: 'note', duration: 4.5, symbol: '𝅗𝅥..', tiedToNext: true },
            { type: 'note', duration: 4.5, symbol: '𝅗𝅥..' },
            {type: 'final_barline', duration: 0, symbol: '𝄂', isControl: true}
        ]
    },
    {
        name: "Módulo VIII - Lição 75: Ligaduras Simples em 12/8",
        timeSignature: { beats: 12, beatType: 8 },
        tempo: 70,
        pattern: [
            // Compasso 1-4
            { type: 'note', duration: 1.5, symbol: '♩.', tiedToNext: true }, { type: 'note', duration: 1.5, symbol: '♩.' }, { type: 'note', duration: 3, symbol: '𝅗𝅥.' },
            { type: 'note', duration: 3, symbol: '𝅗𝅥.' }, { type: 'note', duration: 1.5, symbol: '♩.', tiedToNext: true }, { type: 'note', duration: 1.5, symbol: '♩.' },
            { type: 'note', duration: 6, symbol: '𝅝.' },
            { type: 'note', duration: 3, symbol: '𝅗𝅥.', tiedToNext: true }, { type: 'note', duration: 3, symbol: '𝅗𝅥.' },
            // Compasso 5-8
            { type: 'note', duration: 1.5, symbol: '♩.', tiedToNext: true }, { type: 'note', duration: 4.5, symbol: '𝅗𝅥..' },
            { type: 'note', duration: 6, symbol: '𝅝.' },
            { type: 'note', duration: 3, symbol: '𝅗𝅥.' }, { type: 'note', duration: 3, symbol: '𝅗𝅥.', tiedToNext: true },
            { type: 'note', duration: 6, symbol: '𝅝.' },
            // Compasso 9-12
            { type: 'note', duration: 1.5, symbol: '♩.', tiedToNext: true }, { type: 'note', duration: 1.5, symbol: '♩.' }, { type: 'note', duration: 3, symbol: '𝅗𝅥.' },
            { type: 'note', duration: 3, symbol: '𝅗𝅥.', tiedToNext: true }, { type: 'note', duration: 3, symbol: '𝅗𝅥.' },
            { type: 'note', duration: 6, symbol: '𝅝.', tiedToNext: true },
            { type: 'note', duration: 6, symbol: '𝅝.' },
            // Compasso 13-16
            { type: 'note', duration: 1.5, symbol: '♩.' }, { type: 'note', duration: 4.5, symbol: '𝅗𝅥..' },
            { type: 'note', duration: 3, symbol: '𝅗𝅥.' }, { type: 'note', duration: 3, symbol: '𝅗𝅥.' },
            { type: 'note', duration: 3, symbol: '𝅗𝅥.', tiedToNext: true }, { type: 'note', duration: 3, symbol: '𝅗𝅥.' },
            { type: 'note', duration: 6, symbol: '𝅝.' },
            {type: 'final_barline', duration: 0, symbol: '𝄂', isControl: true}
        ]
    },
    {
        name: "Módulo VIII - Lição 76: Ligaduras com Semicolcheias em 12/8",
        timeSignature: { beats: 12, beatType: 8 },
        tempo: 75,
        pattern: [
            // Compasso 1-4
            { type: 'note', duration: 1, symbol: '♩' }, { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮', tiedToNext: true }, { type: 'note', duration: 1.5, symbol: '♩.' }, { type: 'note', duration: 3, symbol: '𝅗𝅥.' },
            { type: 'note', duration: 0.25, symbol: '𝅘𝅥𝅯' }, { type: 'note', duration: 0.25, symbol: '𝅘𝅥𝅯' }, { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮', tiedToNext: true }, { type: 'note', duration: 2, symbol: '𝅗𝅥' }, { type: 'note', duration: 3, symbol: '𝅗𝅥.' },
            { type: 'note', duration: 1.5, symbol: '♩.', tiedToNext: true }, { type: 'note', duration: 1.5, symbol: '♩.' }, { type: 'note', duration: 3, symbol: '𝅗𝅥.' },
            { type: 'note', duration: 6, symbol: '𝅝.' },
            // Compasso 5-8
            { type: 'note', duration: 3, symbol: '𝅗𝅥.' }, { type: 'note', duration: 1, symbol: '♩' }, { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮', tiedToNext: true }, { type: 'note', duration: 1.5, symbol: '♩.' },
            { type: 'note', duration: 0.25, symbol: '𝅘𝅥𝅯' }, { type: 'note', duration: 0.25, symbol: '𝅘𝅥𝅯' }, { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮', tiedToNext: true }, { type: 'note', duration: 5, symbol: '𝅝' },
            { type: 'note', duration: 6, symbol: '𝅝.' },
            { type: 'note', duration: 3, symbol: '𝅗𝅥.', tiedToNext: true }, { type: 'note', duration: 3, symbol: '𝅗𝅥.' },
            // Compasso 9-12
            { type: 'note', duration: 1.5, symbol: '♩.', tiedToNext: true }, { type: 'note', duration: 4.5, symbol: '𝅗𝅥..' },
            { type: 'note', duration: 1, symbol: '♩' }, { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮' }, { type: 'note', duration: 1.5, symbol: '♩.' }, { type: 'note', duration: 3, symbol: '𝅗𝅥.' },
            { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮', tiedToNext: true }, { type: 'note', duration: 2.5, symbol: '𝅗𝅥' }, { type: 'note', duration: 3, symbol: '𝅗𝅥.' },
            { type: 'note', duration: 6, symbol: '𝅝.' },
            // Compasso 13-16
            { type: 'note', duration: 3, symbol: '𝅗𝅥.', tiedToNext: true }, { type: 'note', duration: 1.5, symbol: '♩.' }, { type: 'note', duration: 1.5, symbol: '♩.' },
            { type: 'note', duration: 0.25, symbol: '𝅘𝅥𝅯' }, { type: 'note', duration: 0.25, symbol: '𝅘𝅥𝅯' }, { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮' }, { type: 'note', duration: 5, symbol: '𝅝' },
            { type: 'note', duration: 3, symbol: '𝅗𝅥.' }, { type: 'note', duration: 3, symbol: '𝅗𝅥.' },
            { type: 'note', duration: 6, symbol: '𝅝.' },
            {type: 'final_barline', duration: 0, symbol: '𝄂', isControl: true}
        ]
    },
    {
        name: "Módulo VIII - Lição 77: Ritmos Sincopados com Ligaduras em 6/8",
        timeSignature: { beats: 6, beatType: 8 },
        tempo: 80,
        pattern: [
            // Compasso 1-4
            { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮' }, { type: 'note', duration: 1, symbol: '♩', tiedToNext: true }, { type: 'note', duration: 1, symbol: '♩' }, { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮' },
            { type: 'rest', duration: 0.5, symbol: '𝄾' }, { type: 'note', duration: 1, symbol: '♩' }, { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮', tiedToNext: true },
            { type: 'note', duration: 1.5, symbol: '♩.' }, { type: 'note', duration: 1.5, symbol: '♩.' },
            { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮' }, { type: 'note', duration: 1, symbol: '♩' }, { type: 'note', duration: 1.5, symbol: '♩.' },
            // Compasso 5-8
            { type: 'note', duration: 1, symbol: '♩' }, { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮', tiedToNext: true }, { type: 'note', duration: 1.5, symbol: '♩.' },
            { type: 'note', duration: 3, symbol: '𝅗𝅥.' },
            { type: 'rest', duration: 0.5, symbol: '𝄾' }, { type: 'note', duration: 1, symbol: '♩' }, { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮', tiedToNext: true }, { type: 'note', duration: 1, symbol: '♩' },
            { type: 'note', duration: 3, symbol: '𝅗𝅥.' },
            // Compasso 9-12
            { type: 'note', duration: 1, symbol: '♩' }, { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮' }, { type: 'note', duration: 1, symbol: '♩' }, { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮' },
            { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮' }, { type: 'note', duration: 1, symbol: '♩', tiedToNext: true }, { type: 'note', duration: 1.5, symbol: '♩.' },
            { type: 'note', duration: 3, symbol: '𝅗𝅥.' },
            { type: 'note', duration: 1.5, symbol: '♩.' }, { type: 'note', duration: 1.5, symbol: '♩.' },
            // Compasso 13-16
            { type: 'note', duration: 1, symbol: '♩' }, { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮' }, { type: 'rest', duration: 1.5, symbol: '𝄽.' },
            { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮' }, { type: 'note', duration: 1, symbol: '♩', tiedToNext: true }, { type: 'note', duration: 1.5, symbol: '♩.' },
            { type: 'note', duration: 3, symbol: '𝅗𝅥.' },
            { type: 'note', duration: 3, symbol: '𝅗𝅥.' },
            {type: 'final_barline', duration: 0, symbol: '𝄂', isControl: true}
        ]
    },
    {
        name: "Módulo VIII - Lição 78: Semicolcheias com Ligaduras em 9/8",
        timeSignature: { beats: 9, beatType: 8 },
        tempo: 110,
        pattern: [
            // Compasso 1-4
            { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮' }, { type: 'note', duration: 0.25, symbol: '𝅘𝅥𝅯', tiedToNext: true }, { type: 'note', duration: 0.25, symbol: '𝅘𝅥𝅯' }, { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮' }, { type: 'note', duration: 3, symbol: '𝅗𝅥.' },
            { type: 'note', duration: 1.5, symbol: '♩.', tiedToNext: true }, { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮' }, { type: 'note', duration: 0.25, symbol: '𝅘𝅥𝅯' }, { type: 'note', duration: 0.25, symbol: '𝅘𝅥𝅯' }, { type: 'note', duration: 1.5, symbol: '♩.' },
            { type: 'note', duration: 1, symbol: '♩' }, { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮', tiedToNext: true }, { type: 'note', duration: 3, symbol: '𝅗𝅥.' },
            { type: 'note', duration: 4.5, symbol: '𝅗𝅥..' },
            // Compasso 5-8
            { type: 'note', duration: 1.5, symbol: '♩.' }, { type: 'note', duration: 1.5, symbol: '♩.' }, { type: 'note', duration: 1.5, symbol: '♩.' },
            { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮' }, { type: 'note', duration: 0.25, symbol: '𝅘𝅥𝅯', tiedToNext: true }, { type: 'note', duration: 0.25, symbol: '𝅘𝅥𝅯' }, { type: 'note', duration: 3.5, symbol: '𝅗𝅥.𝅘𝅥𝅮' },
            { type: 'note', duration: 4.5, symbol: '𝅗𝅥..', tiedToNext: true },
            { type: 'note', duration: 3, symbol: '𝅗𝅥.' }, { type: 'note', duration: 1.5, symbol: '♩.' },
            // Compasso 9-12
            { type: 'note', duration: 1.5, symbol: '♩.' }, { type: 'note', duration: 1, symbol: '♩' }, { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮', tiedToNext: true }, { type: 'note', duration: 1.5, symbol: '♩.' },
            { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮' }, { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮' }, { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮', tiedToNext: true }, { type: 'note', duration: 3, symbol: '𝅗𝅥.' },
            { type: 'note', duration: 4.5, symbol: '𝅗𝅥..' },
            { type: 'note', duration: 1.5, symbol: '♩.', tiedToNext: true }, { type: 'note', duration: 3, symbol: '𝅗𝅥.' },
            // Compasso 13-16
            { type: 'note', duration: 1, symbol: '♩' }, { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮', tiedToNext: true }, { type: 'note', duration: 3, symbol: '𝅗𝅥.' },
            { type: 'note', duration: 1.5, symbol: '♩.' }, { type: 'note', duration: 1.5, symbol: '♩.' }, { type: 'note', duration: 1.5, symbol: '♩.' },
            { type: 'note', duration: 0.25, symbol: '𝅘𝅥𝅯', tiedToNext: true }, { type: 'note', duration: 0.25, symbol: '𝅘𝅥𝅯' }, { type: 'note', duration: 4, symbol: '𝅝' },
            { type: 'note', duration: 4.5, symbol: '𝅗𝅥..' },
            {type: 'final_barline', duration: 0, symbol: '𝄂', isControl: true}
        ]
    },
    {
        name: "Módulo VIII - Lição 79: Desafio de Ligaduras e Pausas em 12/8",
        timeSignature: { beats: 12, beatType: 8 },
        tempo: 100,
        pattern: [
            // Compasso 1-4
            { type: 'note', duration: 1.5, symbol: '♩.', tiedToNext: true }, { type: 'note', duration: 1, symbol: '♩' }, { type: 'rest', duration: 0.5, symbol: '𝄾' }, { type: 'note', duration: 3, symbol: '𝅗𝅥.' },
            { type: 'note', duration: 3, symbol: '𝅗𝅥.' }, { type: 'note', duration: 1.5, symbol: '♩.', tiedToNext: true },
            { type: 'note', duration: 1.5, symbol: '♩.' }, { type: 'rest', duration: 1.5, symbol: '𝄽.' }, { type: 'note', duration: 3, symbol: '𝅗𝅥.' },
            { type: 'note', duration: 6, symbol: '𝅝.', tiedToNext: true },
            // Compasso 5-8
            { type: 'note', duration: 3, symbol: '𝅗𝅥.' }, { type: 'note', duration: 3, symbol: '𝅗𝅥.' },
            { type: 'rest', duration: 1.5, symbol: '𝄽.' }, { type: 'note', duration: 1.5, symbol: '♩.', tiedToNext: true }, { type: 'note', duration: 3, symbol: '𝅗𝅥.' },
            { type: 'note', duration: 6, symbol: '𝅝.' },
            { type: 'note', duration: 1.5, symbol: '♩.' }, { type: 'rest', duration: 1.5, symbol: '𝄽.' }, { type: 'note', duration: 1.5, symbol: '♩.', tiedToNext: true }, { type: 'note', duration: 1.5, symbol: '♩.' },
            // Compasso 9-12
            { type: 'note', duration: 3, symbol: '𝅗𝅥.' }, { type: 'note', duration: 1.5, symbol: '♩.', tiedToNext: true }, { type: 'note', duration: 1.5, symbol: '♩.' },
            { type: 'note', duration: 6, symbol: '𝅝.' },
            { type: 'rest', duration: 3, symbol: '𝄼.' }, { type: 'note', duration: 3, symbol: '𝅗𝅥.', tiedToNext: true },
            { type: 'note', duration: 6, symbol: '𝅝.' },
            // Compasso 13-16
            { type: 'note', duration: 1.5, symbol: '♩.', tiedToNext: true }, { type: 'note', duration: 1, symbol: '♩' }, { type: 'rest', duration: 0.5, symbol: '𝄾' }, { type: 'note', duration: 3, symbol: '𝅗𝅥.' },
            { type: 'note', duration: 1.5, symbol: '♩.' }, { type: 'note', duration: 1.5, symbol: '♩.' }, { type: 'note', duration: 3, symbol: '𝅗𝅥.' },
            { type: 'rest', duration: 1.5, symbol: '𝄽.' }, { type: 'note', duration: 4.5, symbol: '𝅗𝅥..' },
            { type: 'note', duration: 6, symbol: '𝅝.' },
            {type: 'final_barline', duration: 0, symbol: '𝄂', isControl: true}
        ]
    },
    {
        name: "Módulo VIII - Lição 80: Revisão Geral com Ligaduras em Comp. Compostos",
        timeSignature: { beats: 12, beatType: 8 },
        tempo: 90,
        pattern: [
            // Compasso 1-4
            { type: 'note', duration: 3, symbol: '𝅗𝅥.', tiedToNext: true },
            { type: 'note', duration: 1.5, symbol: '♩.' }, { type: 'note', duration: 1.5, symbol: '♩.' }, { type: 'note', duration: 6, symbol: '𝅝.' },
            { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮' }, { type: 'note', duration: 1, symbol: '♩', tiedToNext: true }, { type: 'note', duration: 1, symbol: '♩' }, { type: 'rest', duration: 0.5, symbol: '𝄾' }, { type: 'note', duration: 3, symbol: '𝅗𝅥.' },
            { type: 'note', duration: 0.75, symbol: '𝅘𝅥𝅮.' }, { type: 'note', duration: 0.25, symbol: '𝅘𝅥𝅯' }, { type: 'note', duration: 1.5, symbol: '♩.', tiedToNext: true }, { type: 'note', duration: 3, symbol: '𝅗𝅥.' },
            // Compasso 5-8
            { type: 'note', duration: 1.5, symbol: '♩.' }, { type: 'rest', duration: 1.5, symbol: '𝄽.' }, { type: 'note', duration: 3, symbol: '𝅗𝅥.' },
            { type: 'note', duration: 6, symbol: '𝅝.', tiedToNext: true },
            { type: 'note', duration: 3, symbol: '𝅗𝅥.' }, { type: 'note', duration: 3, symbol: '𝅗𝅥.' },
            { type: 'note', duration: 1, symbol: '♩' }, { type: 'note', duration: 0.5, symbol: '𝅘𝅥𝅮', tiedToNext: true }, { type: 'note', duration: 4.5, symbol: '𝅗𝅥..' },
            // Compasso 9-12
            { type: 'note', duration: 1.5, symbol: '♩.' }, { type: 'note', duration: 1.5, symbol: '♩.' }, { type: 'note', duration: 3, symbol: '𝅗𝅥.', tiedToNext: true },
            { type: 'note', duration: 6, symbol: '𝅝.' },
            { type: 'note', duration: 0.75, symbol: '𝅘𝅥𝅮.' }, { type: 'note', duration: 0.25, symbol: '𝅘𝅥𝅯', tiedToNext: true }, { type: 'note', duration: 2, symbol: '𝅗𝅥' }, { type: 'note', duration: 3, symbol: '𝅗𝅥.' },
            { type: 'note', duration: 6, symbol: '𝅝.' },
            // Compasso 13-16
            { type: 'note', duration: 3, symbol: '𝅗𝅥.' }, { type: 'rest', duration: 1.5, symbol: '𝄽.' }, { type: 'note', duration: 1.5, symbol: '♩.' },
            { type: 'note', duration: 1.5, symbol: '♩.' }, { type: 'note', duration: 1.5, symbol: '♩.' }, { type: 'note', duration: 1.5, symbol: '♩.', tiedToNext: true }, { type: 'note', duration: 1.5, symbol: '♩.' },
            { type: 'note', duration: 6, symbol: '𝅝.' },
            { type: 'note', duration: 6, symbol: '𝅝.' },
            {type: 'final_barline', duration: 0, symbol: '𝄂', isControl: true}
        ]
    }
];