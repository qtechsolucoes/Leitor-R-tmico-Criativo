// src/analysis.js

import { AppState } from './state.js';
import { updateMessage, showErrorModal } from './ui.js';

let audioContext;
let microphoneStream;
let scriptProcessor;

// --- NOVOS PARÂMETROS DE CALIBRAÇÃO (ATAQUE E SUSTENTAÇÃO) ---
// Limiar para o "ataque" inicial da nota. Deve ser um valor alto.
const ATTACK_THRESHOLD = 5.0; 
// Limiar para a "sustentação". Deve ser um valor baixo, apenas acima do ruído de fundo.
const SUSTAIN_THRESHOLD = 0.1;
// Percentagem de duração da nota que precisa de ter som para ser considerada correta.
const REQUIRED_HIT_PERCENTAGE = 0.7; // 70%

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
            
            const numberOfFrames = note.duration / (scriptProcessor.bufferSize / audioContext.sampleRate);
            const hitPercentage = (note.hits || 0) / numberOfFrames;
            
            note.isCorrect = hitPercentage >= REQUIRED_HIT_PERCENTAGE;
            updateNoteFeedback(note.patternIndex, note.isCorrect);
        }
    });
}

export async function startAudioAnalysis() {
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

            // Debug:
            console.log(`Energia: ${currentEnergy.toFixed(4)}, Rácio: ${energyRatio.toFixed(2)}`);
            
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
                // Lógica de Deteção de Início e Sustentação
                const isAttack = energyRatio > ATTACK_THRESHOLD && !activeNote.attacked;
                const isSustaining = currentEnergy > SUSTAIN_THRESHOLD;

                if (isAttack) {
                    activeNote.attacked = true; // Marca que o ataque já foi detetado
                }

                // A nota precisa de ter tido um ataque E estar a ser sustentada
                if (activeNote.attacked && isSustaining) {
                    if (!activeNote.hits) activeNote.hits = 0;
                    activeNote.hits++;
                    
                    // Feedback visual em tempo real
                    const numberOfFrames = activeNote.duration / (scriptProcessor.bufferSize / audioContext.sampleRate);
                    const hitPercentage = activeNote.hits / numberOfFrames;
                    if(hitPercentage >= REQUIRED_HIT_PERCENTAGE && !activeNote.isCorrect){
                       activeNote.isCorrect = true;
                       updateNoteFeedback(activeNote.patternIndex, true);
                    }
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