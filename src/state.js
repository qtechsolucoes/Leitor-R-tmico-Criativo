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
    transportEventIds: [],
    metronomeEventId: null,
    continuousMetronome: false, // NOVO ESTADO

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