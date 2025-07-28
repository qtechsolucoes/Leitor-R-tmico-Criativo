// src/audio.js

import { AppState } from './state.js';
import { getBeatValue } from './core.js';
import { highlightActiveVisualElement, updatePlaybackButtons, enableAllControls, disablePlaybackControls, updateMessage, updateCountdownDisplay, showErrorModal, updateLoginUI, showPracticeResults } from './ui.js';
import { completeLesson } from './api.js';

let offlineContext;

export function initializeSynths() {
    try {
        if (AppState.synths.noteSynth) AppState.synths.noteSynth.dispose();
        if (AppState.synths.attackSynth) AppState.synths.attackSynth.dispose();
        if (AppState.synths.metronomeSynth) AppState.synths.metronomeSynth.dispose();

        AppState.synths.noteSynth = new Tone.PolySynth(Tone.Synth, {
            oscillator: { type: "sine" },
            envelope: { attack: 0.005, decay: 0.0, sustain: 1.0, release: 0.1 },
            volume: -8
        }).toDestination();

        AppState.synths.attackSynth = new Tone.MembraneSynth({
            pitchDecay: 0.01,
            octaves: 4.,
            envelope: { attack: 0.001, decay: 0.2, sustain: 0 },
            volume: 0
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

export function playFigurePreview(figure) {
    if (!figure || figure.isControl) return;
    
    try {
        const context = Tone.context;
        const oscillator = context.createOscillator();
        const gainNode = context.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(context.destination);
        
        oscillator.type = 'triangle';
        oscillator.frequency.value = figure.type === 'note' ? 440 : 220;
        gainNode.gain.value = 0.3;
        
        oscillator.start();
        oscillator.stop(context.currentTime + 0.3);
    } catch (error) {
        console.error("Erro ao tocar preview:", error);
    }
}

export function stopRhythmExecution(forceStopMetronome = false) {
    const wasPlaying = AppState.isPlaying;
    AppState.isPlaying = false;
    AppState.isCountingDown = false;
    AppState.isPracticing = false;

    Tone.Transport.stop();
    Tone.Transport.cancel(0);

    AppState.transportEventIds.forEach(id => Tone.Transport.clear(id));
    AppState.transportEventIds = [];
    
    if (forceStopMetronome || !AppState.continuousMetronome) {
        if (AppState.metronomeEventId) {
            AppState.metronomeEventId.stop(0).dispose();
            AppState.metronomeEventId = null;
        }
    } else {
        if(AppState.metronomeEventId) {
            AppState.metronomeEventId.loop = true;
            AppState.metronomeEventId.loopEnd = "1m";
        }
    }

    enableAllControls();
    highlightActiveVisualElement(null);
    updateCountdownDisplay("");
    if(wasPlaying) {
        updateMessage("Reprodução parada.");
    }
}

function isCompound(timeSig) {
    if (!timeSig) return false;
    const { beats, beatType } = timeSig;
    return beatType >= 8 && beats > 3 && beats % 3 === 0;
}

function scheduleCountdown(timeSig, onComplete) {
    const { beats } = timeSig;
    const singleBeatDuration = Tone.Time("4n").toSeconds() * (4 / timeSig.beatType);
    const countdownDuration = singleBeatDuration * beats;

    for (let i = 0; i < beats; i++) {
        const time = i * singleBeatDuration;
        AppState.transportEventIds.push(Tone.Transport.scheduleOnce(t => {
            Tone.Draw.schedule(() => updateCountdownDisplay(beats - i), t);
        }, time));
    }

    AppState.transportEventIds.push(Tone.Transport.scheduleOnce(t => {
        Tone.Draw.schedule(() => {
            updateCountdownDisplay("");
            if (onComplete) {
                onComplete();
            }
        }, t);
    }, countdownDuration - 0.05));

    return countdownDuration;
}

export async function startListeningMode() {
    if (AppState.isPlaying || AppState.isCountingDown || AppState.isPracticing) return;
    await setupAndPlay(false);
}

export async function startPracticeMode() {
    if (AppState.isPlaying || AppState.isCountingDown || AppState.isPracticing) return;
    await setupAndPlay(true);
}

async function setupAndPlay(isPracticeMode) {
    if (!AppState.activePattern || AppState.activePattern.length === 0) {
        updateMessage("Nenhuma lição ou ritmo para tocar.", "error");
        return;
    }
    disablePlaybackControls();
    try {
        if (Tone.context.state !== 'running') await Tone.start();
        
        initializeSynths();
        stopRhythmExecution(true); 

        AppState.isCountingDown = true;
        AppState.isPracticing = isPracticeMode;
        AppState.targetNoteTimes = [];

        updateMessage("A preparar...");
        const userInputBpm = parseInt(document.getElementById('tempo-display').textContent);
        Tone.Transport.bpm.value = userInputBpm;
        
        scheduleMetronome();
        
        const countdownDuration = scheduleCountdown(AppState.activeTimeSignature, () => {
            AppState.isCountingDown = false;
            AppState.isPlaying = true;
            updateMessage(isPracticeMode ? "Exercite agora!" : "A ouvir...");
            if(isPracticeMode) {
                 document.getElementById('practice-settings-panel').classList.remove('hidden');
            }
        });

        schedulePlayback(countdownDuration, !isPracticeMode);

        Tone.Transport.start(Tone.now());

    } catch (error) {
        console.error("Erro ao iniciar:", error);
        showErrorModal(`Ocorreu um erro: ${error.message}`);
        stopRhythmExecution(true);
    }
}

function schedulePlayback(offset = 0, playSound) {
    let currentTime = offset;
    const timeSig = AppState.activeTimeSignature;
    const beatTypeDurationSeconds = Tone.Time(`${timeSig.beatType}n`).toSeconds();
    const tolerance = 0.001;

    const notesToPractice = AppState.isPracticing ? AppState.activePattern.filter(item => item.type === 'note' && !item.isTiedContinuation) : [];
    let correctNotesCount = 0;

    AppState.activePattern.forEach((item, originalIndex) => {
        const noteDurationInSeconds = getBeatValue(item.duration, timeSig) * beatTypeDurationSeconds;
        
        if (item.type === 'note' && !item.isTiedContinuation) {
            const soundDurationSeconds = getBeatValue(item.totalTiedDuration || item.duration, timeSig) * beatTypeDurationSeconds;
            
            AppState.targetNoteTimes.push({
                startTime: currentTime,
                endTime: currentTime + soundDurationSeconds,
                duration: soundDurationSeconds,
                patternIndex: originalIndex,
                checked: false,
                isCorrect: null
            });

            if (playSound) {
                AppState.transportEventIds.push(Tone.Transport.scheduleOnce(t => {
                    AppState.synths.noteSynth.triggerAttackRelease("C5", soundDurationSeconds, t);
                    AppState.synths.attackSynth.triggerAttackRelease("C6", "16n", t);
                }, currentTime));
            }
        }
        
        const noteDurationInBeats = getBeatValue(item.duration, timeSig);
        
        if (noteDurationInBeats >= 1 && Math.abs(noteDurationInBeats - Math.round(noteDurationInBeats)) < tolerance) {
            for (let i = 0; i < Math.round(noteDurationInBeats); i++) {
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

    AppState.transportEventIds.push(Tone.Transport.scheduleOnce(async () => {
        if (AppState.isPracticing) {
            correctNotesCount = AppState.targetNoteTimes.filter(note => note.isCorrect).length;
            const score = notesToPractice.length > 0 ? (correctNotesCount / notesToPractice.length) * 100 : 100;
            
            showPracticeResults(score);
            
            if (score >= 90 && AppState.currentMode === 'lessons' && AppState.user.currentUser) {
                try {
                    const updatedUser = await completeLesson(AppState.currentLessonIndex);
                    if (updatedUser) {
                        AppState.user.currentUser = updatedUser;
                        updateLoginUI(updatedUser);
                    }
                } catch (error) { console.error("Erro ao salvar progresso:", error); }
            }
        } else {
             updateMessage("Lição concluída!", "success");
        }
        stopRhythmExecution(false);
        document.getElementById('practice-settings-panel').classList.add('hidden');

    }, currentTime + 1.0));
}

function scheduleMetronome() {
    if (AppState.metronomeEventId) {
        AppState.metronomeEventId.dispose();
    }
    if(AppState.isPracticing && !AppState.practiceSettings.metronome) {
        return;
    }

    const timeSig = AppState.activeTimeSignature;
    const userInputBpm = parseInt(document.getElementById('tempo-display').textContent);
    const accent = "G5";
    const secondaryAccent = "E5";
    const normal = "C5";
    
    Tone.Transport.timeSignature = [timeSig.beats, timeSig.beatType];
    Tone.Transport.bpm.value = userInputBpm;

    const isComp = isCompound(timeSig);
    const mainBeats = isComp ? timeSig.beats / 3 : timeSig.beats;
    const loopInterval = isComp ? "4n." : `${timeSig.beatType}n`;

    let beatCounter = 0;

    AppState.metronomeEventId = new Tone.Loop(time => {
        const beatInMeasure = beatCounter % mainBeats;
        
        let note = normal;
        if (beatInMeasure === 0) {
            note = accent;
        } else if (!isComp && timeSig.beats === 4 && beatInMeasure === 2) {
            note = secondaryAccent;
        }
        
        AppState.synths.metronomeSynth.triggerAttackRelease(note, "32n", time);
        beatCounter++;
    }, loopInterval).start(0);
}

export async function playDictationPatternWithCountdown(pattern) {
    if (AppState.isPlaying || AppState.isCountingDown || !pattern || pattern.length === 0) return;
    
    disablePlaybackControls();

    try {
        if (Tone.context.state !== 'running') await Tone.start();

        initializeSynths();
        stopRhythmExecution(true);
        AppState.isCountingDown = true;
        updateMessage("Prepare-se para ouvir...");

        const userInputBpm = parseInt(document.getElementById('tempo-display').textContent);
        Tone.Transport.bpm.value = userInputBpm;
        
        const timeSig = { beats: 4, beatType: 4 };
        const tempState = AppState.activeTimeSignature;
        AppState.activeTimeSignature = timeSig;
        scheduleMetronome();
        AppState.activeTimeSignature = tempState;
        
        const countdownDuration = scheduleCountdown(timeSig, () => {
             AppState.isCountingDown = false;
             AppState.isPlaying = true;
             updateMessage("A ouvir...");
        });
        
        let currentTime = countdownDuration;
        const beatTypeDurationSeconds = Tone.Time(`${timeSig.beatType}n`).toSeconds();

        pattern.forEach((item) => {
            if (item.type === 'note') {
                const soundDurationSeconds = getBeatValue(item.duration, timeSig) * beatTypeDurationSeconds;
                AppState.transportEventIds.push(Tone.Transport.scheduleOnce(t => {
                    AppState.synths.noteSynth.triggerAttackRelease("C5", soundDurationSeconds, t);
                    AppState.synths.attackSynth.triggerAttackRelease("C6", "16n", t);
                }, currentTime));
            }
            const noteDurationInSeconds = getBeatValue(item.duration, timeSig) * beatTypeDurationSeconds;
            currentTime += noteDurationInSeconds;
        });

        AppState.transportEventIds.push(Tone.Transport.scheduleOnce(() => {
            stopRhythmExecution(false);
            updateMessage("Agora é a sua vez! Recrie o ritmo.");
        }, currentTime + 0.5));

        Tone.Transport.start();

    } catch(error) {
        console.error("Erro ao tocar ditado:", error);
        showErrorModal(`Ocorreu um erro ao tocar o ditado: ${error.message}`);
        stopRhythmExecution(true);
    }
}


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
        .filter(item => !item.isControl)
        .reduce((sum, item) => sum + getBeatValue(item.duration, timeSig) * singleBeatDuration, 0);
    
    totalDurationSeconds += 1.0;

    offlineContext = new Tone.OfflineContext(2, totalDurationSeconds, Tone.context.sampleRate);
    
    const offlineSustainSynth = new Tone.PolySynth(Tone.Synth, {
        oscillator: { type: "sine" },
        envelope: { attack: 0.005, decay: 0.0, sustain: 1.0, release: 0.1 },
        volume: -8,
        context: offlineContext
    }).toDestination();

    const offlineAttackSynth = new Tone.MembraneSynth({
        pitchDecay: 0.01,
        octaves: 2,
        envelope: { attack: 0.001, decay: 0.2, sustain: 0 },
        volume: -5,
        context: offlineContext
    }).toDestination();
    
    let currentTime = 0;
    AppState.activePattern.forEach(item => {
        if (item.type === 'note' && !item.isTiedContinuation) {
            const soundDuration = getBeatValue(item.totalTiedDuration || item.duration, timeSig) * singleBeatDuration;
            offlineSustainSynth.triggerAttackRelease("C4", soundDuration, currentTime);
            offlineAttackSynth.triggerAttackRelease("C2", "16n", currentTime);
        }
        if (!item.isControl) {
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

function bufferToWave(abuffer) {
    let numOfChan = abuffer.numberOfChannels,
        length = abuffer.length * numOfChan * 2 + 44,
        buffer = new ArrayBuffer(length),
        view = new DataView(buffer),
        channels = [], i, sample, offset = 0, pos = 0;
    setUint32(0x46464952);
    setUint32(length - 8);
    setUint32(0x45564157);
    setUint32(0x20746d66);
    setUint32(16);
    setUint16(1);
    setUint16(numOfChan);
    setUint32(abuffer.sampleRate);
    setUint32(abuffer.sampleRate * 2 * numOfChan);
    setUint16(numOfChan * 2);
    setUint16(16);
    setUint32(0x61746164);
    setUint32(length - pos - 4);
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