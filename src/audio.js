// audio.js

import { AppState } from './state.js';
import { getBeatValue } from './core.js';
import { highlightActiveVisualElement, updatePlaybackButtons, enableAllControls, disablePlaybackControls, updateMessage, updateCountdownDisplay, showErrorModal } from './ui.js';

let offlineContext;

/**
 * Inicializa ou reinicializa os sintetizadores de áudio.
 */
export function initializeSynths() {
    try {
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
        showErrorModal("Não foi possível inicializar os componentes de áudio. Por favor, atualize a página e tente novamente.");
    }
}

/**
 * Para completamente a execução do ritmo.
 */
export function stopRhythmExecution() {
    AppState.isPlaying = false;
    AppState.isCountingDown = false;

    Tone.Transport.stop();
    Tone.Transport.cancel(0);

    AppState.transportEventIds.forEach(id => Tone.Transport.clear(id));
    AppState.transportEventIds = [];
    
    if (AppState.metronomeEventId) {
        AppState.metronomeEventId.dispose();
        AppState.metronomeEventId = null;
    }

    updatePlaybackButtons(false);
    enableAllControls();
    highlightActiveVisualElement(null);
    updateCountdownDisplay("");
    if(Tone.Transport.state !== 'stopped') {
        updateMessage("Reprodução parada.");
    }
}

/**
 * Pausa ou retoma a execução.
 */
export function togglePauseResume() {
    if (Tone.Transport.state === 'paused') {
        AppState.isPlaying = true;
        Tone.Transport.start();
        updatePlaybackButtons(true);
        disablePlaybackControls(true);
        updateMessage("A tocar...");
    } else if (AppState.isPlaying) {
        AppState.isPlaying = false;
        Tone.Transport.pause();
        updatePlaybackButtons(false);
        enableAllControls();
        updateMessage("Pausado.");
    }
}

/**
 * Verifica se um compasso é composto.
 */
function isCompound(beats, beatType) {
    return beatType >= 8 && beats % 3 === 0 && beats > 3;
}

/**
 * Inicia a contagem e a reprodução.
 */
export async function startCountdownAndPlay() {
    if (AppState.isPlaying || AppState.isCountingDown || !AppState.activePattern || AppState.activePattern.length === 0) return;
    
    disablePlaybackControls();

    try {
        if (Tone.context.state !== 'running') await Tone.start();
        
        initializeSynths();
        
        stopRhythmExecution(); 
        AppState.isCountingDown = true;
        updateMessage("A preparar...");

        const userInputBpm = parseInt(document.getElementById('tempo-display').textContent);
        const { beats, beatType } = AppState.activeTimeSignature;
        
        Tone.Transport.bpm.value = userInputBpm;
        const singleBeatDuration = Tone.Time(`${beatType}n`).toSeconds();

        const countdownDuration = singleBeatDuration * beats;
        schedulePlayback(countdownDuration);
        scheduleMetronome();

        for (let i = 0; i < beats; i++) {
            const time = i * singleBeatDuration;
            AppState.transportEventIds.push(Tone.Transport.scheduleOnce(t => {
                Tone.Draw.schedule(() => updateCountdownDisplay(beats - i), t);
            }, time));
        }

        AppState.transportEventIds.push(Tone.Transport.scheduleOnce(t => {
            Tone.Draw.schedule(() => {
                updateCountdownDisplay("");
                AppState.isCountingDown = false;
                AppState.isPlaying = true;
                updatePlaybackButtons(true);
                disablePlaybackControls(true);
                updateMessage("A tocar...");
            }, t);
        }, countdownDuration - 0.05));

        Tone.Transport.start(Tone.now());

    } catch (error) {
        console.error("Erro ao iniciar playback:", error);
        showErrorModal(`Ocorreu um erro ao tentar iniciar a reprodução: ${error.message}`);
        stopRhythmExecution();
    }
}

/**
 * Agenda a reprodução de áudio e os destaques visuais para cada tempo.
 */
function schedulePlayback(offset = 0) {
    let currentTime = offset;
    const timeSig = AppState.activeTimeSignature;
    const beatTypeDurationSeconds = Tone.Time(`${timeSig.beatType}n`).toSeconds();
    const tolerance = 0.001;

    AppState.activePattern.forEach((item, originalIndex) => {
        if (item.isControl || item.isTiedContinuation) return;
        
        const noteDurationInBeats = getBeatValue(item.duration, timeSig);
        const noteDurationInSeconds = noteDurationInBeats * beatTypeDurationSeconds;
        const soundDurationSeconds = getBeatValue(item.totalTiedDuration || item.duration, timeSig) * beatTypeDurationSeconds;

        if (item.type === 'note') {
            AppState.transportEventIds.push(Tone.Transport.scheduleOnce(t => {
                AppState.synths.noteSynth.triggerAttackRelease("C4", soundDurationSeconds, t);
            }, currentTime));
        }
        
        const roundedBeatValue = Math.round(noteDurationInBeats);
        if (noteDurationInBeats >= 1 && Math.abs(noteDurationInBeats - roundedBeatValue) < tolerance) {
            for (let i = 0; i < roundedBeatValue; i++) {
                const beatHighlightTime = currentTime + (i * beatTypeDurationSeconds);
                AppState.transportEventIds.push(Tone.Transport.scheduleOnce(t => {
                    Tone.Draw.schedule(() => highlightActiveVisualElement(originalIndex, i), t);
                }, beatHighlightTime));
            }
        } else {
             AppState.transportEventIds.push(Tone.Transport.scheduleOnce(t => {
                Tone.Draw.schedule(() => highlightActiveVisualElement(originalIndex, 0), t);
            }, currentTime));
        }
        
        currentTime += noteDurationInSeconds;
    });

    AppState.transportEventIds.push(Tone.Transport.scheduleOnce(() => {
        stopRhythmExecution();
        updateMessage("Lição concluída!", "success");
    }, currentTime + 0.5));
}

/**
 * Cria e agenda a parte do metrônomo para tocar continuamente.
 */
function scheduleMetronome() {
    if (AppState.metronomeEventId) {
        AppState.metronomeEventId.dispose();
    }
    const { beats, beatType } = AppState.activeTimeSignature;
    const isComp = isCompound(beats, beatType);
    const subdivision = isComp ? 3 : beats;
    const events = [];

    for (let i = 0; i < beats; i++) {
        const time = `${i}*${beatType}n`;
        const note = (i % subdivision === 0) ? "G5" : "C5";
        events.push({ time, note });
    }

    AppState.metronomeEventId = new Tone.Part((time, value) => {
        AppState.synths.metronomeSynth.triggerAttackRelease(value.note, "32n", time);
    }, events).start(0);

    AppState.metronomeEventId.loop = true;
    AppState.metronomeEventId.loopEnd = `${beats}*${beatType}n`;
}


/**
 * Exporta o ritmo atual para um ficheiro WAV.
 */
export async function exportWavOffline() {
    updateMessage("A exportar para WAV... Por favor, aguarde.");

    if (AppState.activePattern.length === 0) {
        updateMessage("Não há ritmo para exportar.", "error");
        return;
    }

    const bpm = parseInt(document.getElementById('tempo-display').textContent);
    const timeSig = AppState.activeTimeSignature;
    const singleBeatDuration = 60 / bpm * (4 / timeSig.beatType);
    
    let totalDurationSeconds = AppState.activePattern
        .filter(item => !item.isControl && !item.isTiedContinuation)
        .reduce((sum, item) => sum + getBeatValue(item.duration, timeSig) * singleBeatDuration, 0);
    
    totalDurationSeconds += 1.0;

    offlineContext = new Tone.OfflineContext(2, totalDurationSeconds, Tone.context.sampleRate);
    const offlineNoteSynth = new Tone.PolySynth(Tone.Synth, { context: offlineContext }).toDestination();
    
    let currentTime = 0;
    AppState.activePattern.forEach(item => {
        if (item.type === 'note' && !item.isTiedContinuation) {
            const soundDuration = getBeatValue(item.totalTiedDuration || item.duration, timeSig) * singleBeatDuration;
            offlineNoteSynth.triggerAttackRelease("C4", soundDuration, currentTime);
        }
        if (!item.isControl && !item.isTiedContinuation) {
            currentTime += getBeatValue(item.duration, timeSig) * singleBeatDuration;
        }
    });

    try {
        const buffer = await offlineContext.render();
        const wav = bufferToWave(buffer);
        const blob = new Blob([wav], { type: "audio/wav" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "leitor-ritmico.wav";
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        updateMessage("Ficheiro WAV exportado com sucesso!", "success");
    } catch (e) {
        console.error("Erro ao exportar WAV:", e);
        showErrorModal("Ocorreu um erro inesperado durante a exportação para WAV.");
    }
}

// Função auxiliar para converter AudioBuffer para formato WAV
function bufferToWave(abuffer) {
    let numOfChan = abuffer.numberOfChannels,
        length = abuffer.length * numOfChan * 2 + 44,
        buffer = new ArrayBuffer(length),
        view = new DataView(buffer),
        channels = [], i, sample, offset = 0, pos = 0;
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