// audio.js

import { AppState } from './state.js';
import { getBeatValue } from './core.js';
import { highlightActiveVisualElement, updatePlaybackButtons, enableAllControls, disablePlaybackControls, updateMessage, updateCountdownDisplay } from './ui.js';

let offlineContext;

/**
 * Inicializa ou reinicializa os sintetizadores de áudio.
 */
export function initializeSynths() {
    try {
        // Limpa instâncias antigas para evitar vazamento de memória
        if (AppState.synths.noteSynth) AppState.synths.noteSynth.dispose();
        if (AppState.synths.metronomeSynth) AppState.synths.metronomeSynth.dispose();

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
        
    } catch (e) {
        console.error("ERRO CRÍTICO em initializeSynths:", e);
        updateMessage("Erro ao inicializar componentes de áudio.");
    }
}

/**
 * Para completamente a execução do ritmo, cancela todos os eventos e reseta o estado.
 */
export function stopRhythmExecution() {
    AppState.isPlaying = false;
    AppState.isCountingDown = false;

    Tone.Transport.stop();
    Tone.Transport.cancel(0);

    // Limpa todos os eventos agendados
    AppState.transportEventIds.forEach(id => Tone.Transport.clear(id));
    AppState.transportEventIds = [];
    
    // Para e limpa o metrônomo se ele estiver a tocar
    if (AppState.metronomeEventId) {
        AppState.metronomeEventId.stop(0).dispose();
        AppState.metronomeEventId = null;
    }

    updatePlaybackButtons(false);
    enableAllControls();
    highlightActiveVisualElement(null);
    updateCountdownDisplay("");
    updateMessage("Reprodução parada.");
}

/**
 * Pausa ou retoma a execução do ritmo.
 */
export function togglePauseResume() {
    if (!AppState.isPlaying && Tone.Transport.state === 'paused') {
        // Retomar
        disablePlaybackControls(true); // Desabilita controlos, mas mantém pause/reset
        AppState.isPlaying = true;
        updatePlaybackButtons(true);
        Tone.Transport.start();
        updateMessage("A tocar...");
    } else if (AppState.isPlaying) {
        // Pausar
        Tone.Transport.pause();
        AppState.isPlaying = false;
        updatePlaybackButtons(false);
        enableAllControls();
        updateMessage("Pausado.");
    }
}

/**
 * Inicia a contagem regressiva e a subsequente reprodução do ritmo.
 */
export async function startCountdownAndPlay() {
    if (AppState.isPlaying || AppState.isCountingDown) return;
    
    disablePlaybackControls();

    try {
        // Inicia o contexto de áudio se ainda não estiver a rodar
        if (Tone.context.state !== 'running') await Tone.start();
        
        initializeSynths();
        
        AppState.isCountingDown = true;
        updateMessage("A preparar...");
        stopRhythmExecution(); // Limpa agendamentos anteriores para um início limpo

        const userInputBpm = parseInt(document.getElementById('tempo-display').textContent);
        const { beats, beatType } = AppState.activeTimeSignature;
        // Ajusta o BPM com base na unidade de tempo. Ex: 6/8 tem a semínima pontuada como pulso.
        const beatUnitRatio = 4 / beatType;
        const adjustedBpm = userInputBpm * (isCompound(beats, beatType) ? beatUnitRatio / 1.5 : beatUnitRatio);
        Tone.Transport.bpm.value = adjustedBpm;

        const singleBeatDuration = Tone.Time(`${beatType}n`).toSeconds();
        const countdownDuration = singleBeatDuration * beats;

        // Agenda a reprodução do ritmo e do metrônomo
        schedulePlayback(countdownDuration);
        scheduleMetronome();

        // Agenda a contagem regressiva visual
        for (let i = 0; i < beats; i++) {
            const time = i * singleBeatDuration;
            AppState.transportEventIds.push(Tone.Transport.scheduleOnce(t => {
                Tone.Draw.schedule(() => updateCountdownDisplay(beats - i), t);
            }, time));
        }

        // Agenda a transição do estado de contagem para "a tocar"
        AppState.transportEventIds.push(Tone.Transport.scheduleOnce(t => {
            Tone.Draw.schedule(() => {
                updateCountdownDisplay("");
                AppState.isCountingDown = false;
                AppState.isPlaying = true;
                updatePlaybackButtons(true);
                disablePlaybackControls(true); // Mantém apenas pause e reset habilitados
                updateMessage("A tocar...");
            }, t);
        }, countdownDuration - 0.05)); // Um pouco antes do fim da contagem

        Tone.Transport.start(Tone.now());

    } catch (error) {
        console.error("Erro ao iniciar playback:", error);
        updateMessage("Erro: " + error.message);
        stopRhythmExecution();
    }
}

/**
 * CORRIGIDO: Agenda o destaque para cada pulso *dentro* da figura rítmica,
 * tornando o feedback pedagógico muito mais preciso.
 * @param {number} offset - O tempo (em segundos) para iniciar o agendamento.
 */
function schedulePlayback(offset = 0) {
    const playbackQueue = AppState.activePattern;
    let currentTime = offset;
    const timeSig = AppState.activeTimeSignature;
    const singleBeatDuration = Tone.Time(`${timeSig.beatType}n`).toSeconds();
    const tolerance = 0.001;

    playbackQueue.forEach((item, originalIndex) => {
        if (item.isControl || item.isTiedContinuation) return;
        
        const durationSeconds = singleBeatDuration * getBeatValue(item.duration, timeSig);
        // A duração do som considera a ligadura. Se não houver, usa a duração normal.
        const soundDurationSeconds = singleBeatDuration * getBeatValue(item.totalTiedDuration || item.duration, timeSig);

        if (item.type === 'note') {
            AppState.transportEventIds.push(Tone.Transport.scheduleOnce(t => {
                AppState.synths.noteSynth.triggerAttackRelease("C4", soundDurationSeconds, t);
            }, currentTime));
        }
        
        // NOVO: Agenda o destaque para cada tempo individual dentro da nota
        const totalBeatValue = getBeatValue(item.totalTiedDuration || item.duration, timeSig);
        if (totalBeatValue >= 1 && Math.abs(totalBeatValue - Math.round(totalBeatValue)) < tolerance) {
            const numBeats = Math.round(totalBeatValue);
            for (let i = 0; i < numBeats; i++) {
                const beatTime = currentTime + (i * singleBeatDuration);
                AppState.transportEventIds.push(Tone.Transport.scheduleOnce(t => {
                    // Passa o índice do padrão e o índice do pulso dentro da figura
                    Tone.Draw.schedule(() => highlightActiveVisualElement(originalIndex, i), t);
                }, beatTime));
            }
        } else {
            // Para notas com menos de 1 tempo, acende o primeiro (e único) número (índice 0)
             AppState.transportEventIds.push(Tone.Transport.scheduleOnce(t => {
                Tone.Draw.schedule(() => highlightActiveVisualElement(originalIndex, 0), t);
            }, currentTime));
        }
        
        currentTime += durationSeconds;
    });

    // Agenda o fim da execução
    AppState.transportEventIds.push(Tone.Transport.scheduleOnce(() => {
        stopRhythmExecution();
    }, currentTime + 0.5));
}

/**
 * Verifica se o compasso é composto.
 * @param {number} beats 
 * @param {number} beatType 
 * @returns {boolean}
 */
function isCompound(beats, beatType) {
    return beatType === 8 && beats % 3 === 0;
}

/**
 * CORRIGIDO: Cria e agenda a parte do metrônomo.
 * Adiciona lógica para diferenciar compassos simples e compostos.
 */
function scheduleMetronome() {
    if (AppState.metronomeEventId) {
        AppState.metronomeEventId.stop(0).dispose();
    }
    const { beats, beatType } = AppState.activeTimeSignature;
    const isComp = isCompound(beats, beatType);
    const events = [];
    const beatDurationNotation = `${beatType}n`;
    const subdivision = isComp ? 3 : 1;

    for (let i = 0; i < beats; i++) {
        const time = Tone.Time(beatDurationNotation).toSeconds() * i;
        const note = (i % subdivision === 0) ? "G5" : "C5"; // Click forte no tempo principal, fraco na subdivisão
        events.push({ time, note });
    }

    AppState.metronomeEventId = new Tone.Part((time, value) => {
        AppState.synths.metronomeSynth.triggerAttackRelease(value.note, "32n", time);
    }, events).start(0);

    AppState.metronomeEventId.loop = true;
    AppState.metronomeEventId.loopEnd = Tone.Time(beatDurationNotation).toSeconds() * beats;
}

/**
 * NOVO: Renderiza o áudio do ritmo atual para um buffer e baixa-o como ficheiro WAV.
 * Usa OfflineAudioContext para garantir uma exportação perfeita.
 */
export async function exportWavOffline() {
    updateMessage("A exportar para WAV... Por favor, aguarde.");

    const activePattern = AppState.activePattern;
    if (activePattern.length === 0) {
        updateMessage("Não há ritmo para exportar.");
        return;
    }

    // Calcula a duração total do áudio
    let totalDurationSeconds = 0;
    const timeSig = AppState.activeTimeSignature;
    const singleBeatDuration = 60 / parseInt(document.getElementById('tempo-display').textContent) * (4 / timeSig.beatType);
    
    activePattern.forEach(item => {
        if (!item.isTiedContinuation && !item.isControl) {
            totalDurationSeconds += getBeatValue(item.duration, timeSig) * singleBeatDuration;
        }
    });

    // Adiciona um pequeno silêncio no final
    totalDurationSeconds += 1.0; 

    // Cria o contexto offline
    offlineContext = new Tone.OfflineContext(2, totalDurationSeconds, Tone.context.sampleRate);
    
    // Configura os sintetizadores no contexto offline
    const offlineNoteSynth = new Tone.PolySynth(Tone.Synth).toDestination();
    
    // Agenda as notas no contexto offline
    let currentTime = 0;
    activePattern.forEach(item => {
        if (item.type === 'note' && !item.isTiedContinuation) {
            const soundDuration = getBeatValue(item.totalTiedDuration || item.duration, timeSig) * singleBeatDuration;
            offlineNoteSynth.triggerAttackRelease("C4", soundDuration, currentTime);
        }
        if (!item.isTiedContinuation && !item.isControl) {
            currentTime += getBeatValue(item.duration, timeSig) * singleBeatDuration;
        }
    });

    try {
        // Renderiza o áudio
        const buffer = await offlineContext.render();
        // Converte o buffer para WAV e descarrega
        const wav = bufferToWave(buffer);
        const blob = new Blob([wav], { type: "audio/wav" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "leitor-ritmico.wav";
        a.click();
        URL.revokeObjectURL(url);
        updateMessage("Ficheiro WAV exportado com sucesso!");
    } catch (e) {
        console.error("Erro ao exportar WAV:", e);
        updateMessage("Erro ao exportar ficheiro WAV.");
    }
}

// Função auxiliar para converter AudioBuffer para formato WAV
function bufferToWave(abuffer) {
    let numOfChan = abuffer.numberOfChannels,
        length = abuffer.length * numOfChan * 2 + 44,
        buffer = new ArrayBuffer(length),
        view = new DataView(buffer),
        channels = [],
        i,
        sample,
        offset = 0,
        pos = 0;

    setUint32(0x46464952); // "RIFF"
    setUint32(length - 8); // file length - 8
    setUint32(0x45564157); // "WAVE"

    setUint32(0x20746d66); // "fmt " chunk
    setUint32(16); // length = 16
    setUint16(1); // PCM (uncompressed)
    setUint16(numOfChan);
    setUint32(abuffer.sampleRate);
    setUint32(abuffer.sampleRate * 2 * numOfChan); // avg. bytes/sec
    setUint16(numOfChan * 2); // block-align
    setUint16(16); // 16-bit

    setUint32(0x61746164); // "data" - chunk
    setUint32(length - pos - 4); // chunk length

    for (i = 0; i < abuffer.numberOfChannels; i++)
        channels.push(abuffer.getChannelData(i));

    while (pos < length) {
        for (i = 0; i < numOfChan; i++) {
            sample = Math.max(-1, Math.min(1, channels[i][offset]));
            sample = (0.5 + sample < 0 ? sample * 32768 : sample * 32767) | 0;
            view.setInt16(pos, sample, true);
            pos += 2;
        }
        offset++;
    }

    return buffer;

    function setUint16(data) {
        view.setUint16(pos, data, true);
        pos += 2;
    }

    function setUint32(data) {
        view.setUint32(pos, data, true);
        pos += 4;
    }
}