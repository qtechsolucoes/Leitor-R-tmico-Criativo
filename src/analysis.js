// src/analysis.js

import Meyda from 'https://cdn.skypack.dev/meyda';
import { AppState } from './state.js';
import { updateMessage, showErrorModal } from './ui.js';

let audioContext;
let meydaAnalyzer;
let microphoneStream;

// --- AJUSTE FINAL DE CALIBRAÇÃO ---
// Baixamos drasticamente o valor para o tornar muito mais sensível.
const RMS_THRESHOLD = 0.004; 
const ANALYSIS_INTERVAL = 50;
let analysisIntervalId = null;

// Elementos do Medidor de Volume
const volumeMeterContainer = document.getElementById('volume-meter-container');
const volumeMeterBar = document.getElementById('volume-meter-bar');


function updateNoteFeedback(patternIndex, isCorrect) {
    const noteElement = document.querySelector(`.figure-container[data-pattern-index="${patternIndex}"] .note-item`);
    if (noteElement) {
        noteElement.classList.remove('feedback-realtime-correct', 'feedback-realtime-incorrect');
        const feedbackClass = isCorrect ? 'feedback-realtime-correct' : 'feedback-realtime-incorrect';
        noteElement.classList.add(feedbackClass);
    }
}

function checkPerformance() {
    if (!AppState.isPracticing || !AppState.isPlaying) return;
    const transportTime = Tone.Transport.seconds;
    AppState.targetNoteTimes.forEach(note => {
        if (transportTime > note.endTime && !note.checked) {
            if (note.isCorrect === null) { 
                note.isCorrect = false;
                updateNoteFeedback(note.patternIndex, false);
            }
            note.checked = true;
        }
    });
}

function setupMeyda(source) {
    meydaAnalyzer = Meyda.createMeydaAnalyzer({
        audioContext: audioContext,
        source: source,
        bufferSize: 512,
        featureExtractors: ['rms'],
        callback: (features) => {
            const currentVolume = features.rms;

            // FERRAMENTA DE DEBUG: Mostra o volume no console.
            console.log('Volume Atual:', currentVolume.toFixed(4));

            // LÓGICA DO MEDIDOR DE VOLUME
            if (volumeMeterBar) {
                const volumePercentage = Math.min(currentVolume * 3000, 100);
                volumeMeterBar.style.width = `${volumePercentage}%`;
            }

            if (!AppState.isPracticing || !AppState.isPlaying) return;
            const transportTime = Tone.Transport.seconds;
            const activeNote = AppState.targetNoteTimes.find(note => 
                transportTime >= note.startTime && transportTime <= note.endTime && !note.checked
            );
            
            if (activeNote) {
                if (currentVolume > RMS_THRESHOLD) {
                    if (activeNote.isCorrect === null) {
                        activeNote.isCorrect = true;
                        updateNoteFeedback(activeNote.patternIndex, true);
                    }
                } else {
                    if (activeNote.isCorrect === true) {
                        activeNote.isCorrect = false;
                        updateNoteFeedback(activeNote.patternIndex, false);
                    }
                }
            }
        },
    });
    meydaAnalyzer.start();
}

export async function startAudioAnalysis() {
    if (meydaAnalyzer) {
        return true;
    }
    try {
        if (Tone.context.state !== 'running') {
            await Tone.start();
        }
        
        audioContext = new (window.AudioContext || window.webkitAudioContext)();
        
        if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
            throw new Error('O seu navegador não suporta a captura de áudio.');
        }

        microphoneStream = await navigator.mediaDevices.getUserMedia({ 
            audio: {
                echoCancellation: true,
                noiseSuppression: true,
                autoGainControl: true
            }, 
            video: false 
        });

        const source = audioContext.createMediaStreamSource(microphoneStream);
        setupMeyda(source);

        if (analysisIntervalId) clearInterval(analysisIntervalId);
        analysisIntervalId = setInterval(checkPerformance, ANALYSIS_INTERVAL);
        
        if (volumeMeterContainer) {
            volumeMeterContainer.classList.remove('hidden');
            volumeMeterContainer.classList.add('visible');
        }

        updateMessage('Microfone ativado. Pode começar!', 'success');
        return true;

    } catch (err) {
        console.error('Erro ao aceder ao microfone:', err);
        showErrorModal(err.message || 'Ocorreu um erro desconhecido ao iniciar o microfone.');
        stopAudioAnalysis();
        return false;
    }
}

export function stopAudioAnalysis() {
    if (meydaAnalyzer) {
        meydaAnalyzer.stop();
        meydaAnalyzer = null;
    }
    if (microphoneStream) {
        microphoneStream.getTracks().forEach(track => track.stop());
        microphoneStream = null;
    }
    if(analysisIntervalId) {
        clearInterval(analysisIntervalId);
        analysisIntervalId = null;
    }
    if (audioContext && audioContext.state !== 'closed') {
        audioContext.close().catch(console.error);
        audioContext = null;
    }
    
    if (volumeMeterContainer) {
        volumeMeterContainer.classList.add('hidden');
        volumeMeterContainer.classList.remove('visible');
    }

    if(AppState.isPracticing) {
      updateMessage('Prática interativa desativada.');
    }
}