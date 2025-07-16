// state.js

/**
 * Contém todo o estado dinâmico da aplicação.
 * Qualquer variável que precise ser compartilhada e modificada
 * entre os diferentes módulos deve residir aqui.
 */
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

    // Estado de autenticação e dados do usuário (para funcionalidades futuras)
    user: {
        currentUser: null, // Ex: { username: 'nome_do_usuario' }
        savedRhythms: {}    // Ex: { 'nome_do_usuario': [{ name: 'Meu Ritmo', pattern: [...] }] }
    }
};