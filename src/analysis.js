// src/analysis.js

import { AppState } from './state.js';
import { updateMessage, showErrorModal } from './ui.js';

let audioContext;
let microphoneStream;
let scriptProcessor;

// --- PARÂMETROS FINAIS DE CALIBRAÇÃO ---
const ATTACK_THRESHOLD = 3.0; 
const SUSTAIN_THRESHOLD = 0.02;
const REQUIRED_HIT_PERCENTAGE = 0.6; // 60%

const ANALYSIS_INTERVAL = 50;
let analysisIntervalId = null;
let previousEnergy = 0;

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
            note.checked = true;
            
            if (!note.attacked) {
                note.isCorrect = false;
                updateNoteFeedback(note.patternIndex, false);
                return;
            }

            if (!scriptProcessor || !audioContext) return; 
            
            const bufferDuration = scriptProcessor.bufferSize / audioContext.sampleRate;
            const numberOfFrames = note.duration / bufferDuration;
            const hitPercentage = (note.hits || 0) / numberOfFrames;
            
            note.isCorrect = hitPercentage >= REQUIRED_HIT_PERCENTAGE;
            updateNoteFeedback(note.patternIndex, note.isCorrect);
        }
    });
}

export async function startAudioAnalysis() {
    if (AppState.targetNoteTimes) {
        AppState.targetNoteTimes.forEach(note => {
            note.attacked = false;
            note.hits = 0;
            note.checked = false;
            note.isCorrect = null;
        });
    }

    if (scriptProcessor && scriptProcessor.context.state === 'running') {
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
        scriptProcessor = audioContext.createScriptProcessor(512, 1, 1);
        source.connect(scriptProcessor);
        scriptProcessor.connect(audioContext.destination);

        scriptProcessor.onaudioprocess = (audioProcessingEvent) => {
            const inputBuffer = audioProcessingEvent.inputBuffer.getChannelData(0);
            
            let currentEnergy = 0;
            for (let i = 0; i < inputBuffer.length; i++) {
                currentEnergy += inputBuffer[i] * inputBuffer[i];
            }
            
            const energyRatio = currentEnergy / (previousEnergy + 0.0001);
            previousEnergy = currentEnergy;

            if (volumeMeterBar) {
                const volumePercentage = Math.min(currentEnergy * 5000, 100);
                volumeMeterBar.style.width = `${volumePercentage}%`;
            }

            if (!AppState.isPracticing || !AppState.isPlaying) return;

            const transportTime = Tone.Transport.seconds;
            const activeNote = AppState.targetNoteTimes.find(note => 
                transportTime >= note.startTime && transportTime <= note.endTime && !note.checked
            );

            if (activeNote) {
                const isAttack = energyRatio > ATTACK_THRESHOLD;

                // A lógica agora é muito mais simples e segura:
                // 1. Só procuramos por um ataque se a nota ainda não teve um.
                if (!activeNote.attacked) {
                    if (isAttack) {
                        activeNote.attacked = true; // Trava para não detetar mais ataques
                    }
                }
                
                // 2. Se a nota já teve seu ataque, apenas verificamos a sustentação.
                if (activeNote.attacked && currentEnergy > SUSTAIN_THRESHOLD) {
                    if (!activeNote.hits) activeNote.hits = 0;
                    activeNote.hits++;
                }
            }
        };

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
    if (scriptProcessor) {
        scriptProcessor.disconnect();
        scriptProcessor.onaudioprocess = null;
        scriptProcessor = null;
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