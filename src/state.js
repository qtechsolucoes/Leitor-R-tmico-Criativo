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
    metronomeOnlyMode: false, // Flag para o modo metrônomo
    transportEventIds: [],
    metronomeEventId: null,

    // Contêiner para os sintetizadores do Tone.js
    synths: {
        noteSynth: null,
        metronomeSynth: null
    },

    // Estado relacionado à gravação de áudio
    recording: {
        recorder: null,
        audioChunks: []
    },

    // Estado de autenticação e dados do utilizador
    user: {
        currentUser: null,
        savedRhythms: {}
    }
};