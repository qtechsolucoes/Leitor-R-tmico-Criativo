// audio.js

import { AppState } from './state.js';
import { getBeatValue } from './core.js';
import { highlightActiveVisualElement, updatePlaybackButtons, enableAllControls, disablePlaybackControls, updateMessage, updateCountdownDisplay } from './ui.js';

let recorder;
let audioChunks = [];

/**
 * Inicializa ou reinicializa os sintetizadores de áudio e o gravador.
 * Limpa instâncias antigas para evitar vazamento de memória.
 */
export function initializeSynths() {
    try {
        if (AppState.synths.noteSynth) AppState.synths.noteSynth.dispose();
        if (AppState.synths.metronomeSynth) AppState.synths.metronomeSynth.dispose();
        if (recorder) recorder.dispose();

        AppState.synths.noteSynth = new Tone.PolySynth(Tone.Synth, {
            oscillator: { type: "triangle" },
            envelope: { attack: 0.01, decay: 0.2, sustain: 0.2, release: 0.3 },
            volume: -6
        }).toDestination();

        AppState.synths.metronomeSynth = new Tone.MembraneSynth({
            pitchDecay: 0.01,
            octaves: 5,
            oscillator: { type: "sine" },
            envelope: { attack: 0.001, decay: 0.1, sustain: 0, release: 0.01 },
            volume: -10
        }).toDestination();

        // Inicializa o gravador e conecta à saída principal de áudio
        recorder = new Tone.Recorder();
        Tone.Destination.connect(recorder);

    } catch (e) {
        console.error("ERRO CRÍTICO em initializeSynths:", e);
        updateMessage("Erro ao inicializar componentes de áudio.");
    }
}

/**
 * Inicia a gravação do áudio.
 */
async function startRecording() {
    if (recorder) {
        audioChunks = []; // Limpa gravações anteriores
        try {
            await recorder.start();
            console.log("Gravação iniciada...");
        } catch (e) {
            console.error("Erro ao iniciar gravação:", e);
            updateMessage("Erro ao iniciar gravação.");
        }
    }
}

/**
 * Para a gravação e dispara o download do arquivo WAV.
 */
async function stopAndDownloadRecording() {
    if (recorder && recorder.state === 'recording') {
        try {
            const recording = await recorder.stop();
            const blob = new Blob([recording], { type: 'audio/wav' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            document.body.appendChild(a);
            a.style = 'display: none';
            a.href = url;
            a.download = 'leitor-ritmico.wav';
            a.click();
            window.URL.revokeObjectURL(url);
            a.remove();
            updateMessage("Arquivo WAV exportado!");

        } catch (e) {
            console.error("Erro ao parar a gravação:", e);
            updateMessage("Erro ao parar a gravação.");
        }
    }
}

/**
 * Para completamente a execução do ritmo, cancela todos os eventos e reseta o estado.
 * @param {boolean} fromPause - Flag interna para evitar mostrar mensagem de "parado" ao pausar.
 */
export function stopRhythmExecution(fromPause = false) {
    AppState.isPlaying = false;
    AppState.isCountingDown = false;

    Tone.Transport.stop();
    Tone.Transport.cancel(0);

    AppState.transportEventIds.forEach(id => Tone.Transport.clear(id));
    AppState.transportEventIds = [];

    if (AppState.metronomeEventId) {
        AppState.metronomeEventId.stop(0).dispose();
        AppState.metronomeEventId = null;
    }

    updatePlaybackButtons(false);
    enableAllControls();
    highlightActiveVisualElement(null);
    updateCountdownDisplay("");

    if (!fromPause) {
        updateMessage("Reprodução parada.");
    }
    
    // Para a gravação se ela estava ativa, e baixa o arquivo
    stopAndDownloadRecording();
}

/**
 * Pausa a execução do ritmo.
 */
export function pauseRhythmExecution() {
    if (AppState.isPlaying) {
        Tone.Transport.pause();
        AppState.isPlaying = false;
        updatePlaybackButtons(false);
        enableAllControls(); // Reabilita controles no modo pausa
        // Deixa os botões de play e reset ativos
        document.getElementById('play-pause-button').disabled = false;
        document.getElementById('reset-button').disabled = false;
        updateMessage("Pausado.");
    }
}

/**
 * Retoma a execução do ritmo se estiver pausado.
 */
export function resumeRhythmExecution() {
    if (!AppState.isPlaying && Tone.Transport.state === 'paused') {
        disablePlaybackControls(); // Desabilita os outros controles
        document.getElementById('play-pause-button').disabled = false;
        document.getElementById('reset-button').disabled = false;
        
        AppState.isPlaying = true;
        updatePlaybackButtons(true);
        Tone.Transport.start();
        updateMessage("Tocando...");
    }
}

/**
 * Inicia a contagem regressiva e a subsequente reprodução do ritmo.
 */
export async function startCountdownAndPlay() {
    if (AppState.isPlaying || AppState.isCountingDown) return;

    disablePlaybackControls(); // Desabilita tudo inicialmente

    try {
        if (Tone.context.state !== 'running') await Tone.start();
        initializeSynths();
        
        await startRecording();

        AppState.isCountingDown = true;
        updateMessage("Preparando...");
        stopRhythmExecution(true); // Limpa agendamentos anteriores

        const userInputBpm = parseInt(document.getElementById('tempo-display').textContent);
        const { beats, beatType } = AppState.activeTimeSignature;
        const adjustedBpm = userInputBpm * (4 / beatType);
        Tone.Transport.bpm.value = adjustedBpm;

        const beatUnitDuration = Tone.Time(`${beatType}n`).toSeconds();
        const countdownDuration = beatUnitDuration * beats;

        schedulePlayback(countdownDuration);
        scheduleMetronome();

        // Agenda a contagem regressiva visual
        for (let i = 0; i < beats; i++) {
            const time = i * beatUnitDuration;
            AppState.transportEventIds.push(Tone.Transport.scheduleOnce(t => {
                Tone.Draw.schedule(() => updateCountdownDisplay(beats - i), t);
            }, time));
        }

        // Agenda a transição de "contagem" para "tocando"
        AppState.transportEventIds.push(Tone.Transport.scheduleOnce(t => {
            Tone.Draw.schedule(() => {
                updateCountdownDisplay("");
                AppState.isCountingDown = false;
                AppState.isPlaying = true;
                updatePlaybackButtons(true);
                // Reabilita apenas os botões de pause e reset durante a execução
                document.getElementById('play-pause-button').disabled = false;
                document.getElementById('reset-button').disabled = false;
                updateMessage("Tocando...");
            }, t);
        }, countdownDuration - 0.05));

        Tone.Transport.start(Tone.now());

    } catch (error) {
        console.error("Erro ao iniciar playback:", error);
        updateMessage("Erro: " + error.message);
        stopRhythmExecution();
    }
}

/**
 * Processa o padrão rítmico, resolvendo repetições e ligaduras para criar uma fila de reprodução linear.
 * @param {Array} pattern O padrão original.
 * @returns {Array} Uma fila de eventos prontos para agendamento.
 */
function processPatternForPlayback(pattern) {
    const playbackQueue = [];
    let repeatSection = [];
    let inRepeat = false;

    const patternCopy = JSON.parse(JSON.stringify(pattern));

    // Primeiro, calcula as durações totais das ligaduras
    for (let i = 0; i < patternCopy.length; i++) {
        const item = patternCopy[i];
        if (item.tiedToNext) {
            let totalDuration = item.duration;
            let nextIndex = i + 1;
            while (nextIndex < patternCopy.length && patternCopy[nextIndex].isTiedContinuation) {
                totalDuration += patternCopy[nextIndex].duration;
                nextIndex++;
            }
            item.totalTiedDuration = totalDuration;
        }
    }
    
    // Agora, processa as repetições
    patternCopy.forEach((item, index) => {
        const event = { item, originalIndex: index };

        if (item.type === 'repeat_start') {
            inRepeat = true;
            repeatSection = []; // Começa a gravar a seção de repetição
            return; // Não adiciona o símbolo de início à fila de playback
        }

        if (item.type === 'repeat_end') {
            playbackQueue.push(...repeatSection); // Adiciona a seção gravada à fila
            inRepeat = false;
            repeatSection = [];
            return; // Não adiciona o símbolo de fim à fila
        }
        
        playbackQueue.push(event);
        if (inRepeat) {
            repeatSection.push(event);
        }
    });

    return playbackQueue;
}


/**
 * Agenda todos os eventos de áudio e visuais no Transport do Tone.js.
 * @param {number} offset - O tempo (em segundos) para iniciar o agendamento.
 */
function schedulePlayback(offset = 0) {
    const playbackQueue = processPatternForPlayback(AppState.activePattern);
    let currentTime = offset;
    const tolerance = 0.001;
    const singleBeatDuration = Tone.Time(`${AppState.activeTimeSignature.beatType}n`).toSeconds();

    playbackQueue.forEach(event => {
        const { item, originalIndex } = event;
        const beatValue = getBeatValue(item.duration, AppState.activeTimeSignature);
        const baseDurationSeconds = singleBeatDuration * beatValue;

        if (item.isTiedContinuation) {
            // Para a continuação de uma ligadura, agendamos apenas o destaque visual do elemento.
            // O som já foi iniciado pela nota original da ligadura.
            AppState.transportEventIds.push(Tone.Transport.scheduleOnce(t => {
                Tone.Draw.schedule(() => highlightActiveVisualElement(originalIndex, null), t);
            }, currentTime));
        } else {
            // Para uma nota normal ou o início de uma ligadura

            // Agenda o som da nota
            const soundDurationSeconds = singleBeatDuration * getBeatValue(item.totalTiedDuration || item.duration, AppState.activeTimeSignature);
            if (item.type === 'note') {
                AppState.transportEventIds.push(Tone.Transport.scheduleOnce(t => {
                    AppState.synths.noteSynth.triggerAttackRelease("C4", soundDurationSeconds, t);
                }, currentTime));
            }
            
            // Agenda o destaque para cada tempo individual dentro da nota
            if (beatValue >= 1 && Math.abs(beatValue - Math.round(beatValue)) < tolerance) {
                const numBeats = Math.round(beatValue);
                for (let i = 0; i < numBeats; i++) {
                    const beatTime = currentTime + (i * singleBeatDuration);
                    AppState.transportEventIds.push(Tone.Transport.scheduleOnce(t => {
                        // Passa o índice do padrão e o índice do tempo dentro da figura
                        Tone.Draw.schedule(() => highlightActiveVisualElement(originalIndex, i), t);
                    }, beatTime));
                }
            } else {
                // Para notas com menos de 1 tempo, acende o primeiro (e único) número (índice 0)
                 AppState.transportEventIds.push(Tone.Transport.scheduleOnce(t => {
                    Tone.Draw.schedule(() => highlightActiveVisualElement(originalIndex, 0), t);
                }, currentTime));
            }
        }
        
        // Avança o tempo de agendamento pela duração base da figura atual
        currentTime += baseDurationSeconds;
    });

    // Agenda o fim da execução
    AppState.transportEventIds.push(Tone.Transport.scheduleOnce(() => {
        stopRhythmExecution();
    }, currentTime + 0.2));
}

/**
 * Cria e agenda a parte do metrônomo para tocar em loop.
 */
function scheduleMetronome() {
    if (AppState.metronomeEventId) {
        AppState.metronomeEventId.stop(0).dispose();
    }
    const { beats, beatType } = AppState.activeTimeSignature;
    const isCompound = (beats >= 6 && beats % 3 === 0);
    const events = [];
    const beatDurationNotation = `${beatType}n`;
    
    for (let i = 0; i < beats; i++) {
        const time = Tone.Time(beatDurationNotation).toSeconds() * i;
        let note = "C5"; // Click fraco

        if (isCompound) {
            if (i % 3 === 0) {
                note = "G5"; // Click forte no tempo principal
            } else {
                note = "C4"; // Click de subdivisão
            }
        } else {
            if (i === 0) note = "G5"; // Click forte no tempo 1
        }
        events.push({ time, note });
    }

    AppState.metronomeEventId = new Tone.Part((time, value) => {
        AppState.synths.metronomeSynth.triggerAttackRelease(value.note, "32n", time);
    }, events).start(0);

    AppState.metronomeEventId.loop = true;
    AppState.metronomeEventId.loopEnd = Tone.Time(beatDurationNotation).toSeconds() * beats;
}