// state.js

export const AppState = {
    // Estado do modo e conteúdo
    currentMode: 'lessons', // 'lessons' ou 'freeCreate'
    currentLessonIndex: 0,
    activeTimeSignature: { beats: 4, beatType: 4 },
    customPattern: [],
    activePattern: [],
    selectedIndexForEditing: null,

    // Estado do playback de áudio
    isPlaying: false,
    isCountingDown: false,
    isPracticing: false, // <-- NOVO: Indica se o modo "Exercitar" está ativo
    transportEventIds: [],
    metronomeEventId: null,
    continuousMetronome: false, 
    
    // NOVO: Guarda as configurações de prática
    practiceSettings: {
        metronome: true,
        beatCounters: true,
        syllables: true
    },
    
    // NOVO: Guarda os tempos exatos (início e fim) de cada nota da lição
    targetNoteTimes: [],

    // Contêiner para os sintetizadores do Tone.js
    synths: {
        noteSynth: null,
        metronomeSynth: null,
        attackSynth: null
    },

    // Estado de autenticação e dados do utilizador
    user: {
        currentUser: null,
        savedRhythms: {}
    },
    
    // Salvamento automático
    autoSaveInterval: null,
    lastSavedDraft: null,
    
    // Progresso no jogo
    currentGameLevel: 1
};