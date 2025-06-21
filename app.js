// --- DOM Elements ---
const modeSelect = document.getElementById('mode-select');
const lessonSelect = document.getElementById('lesson-select');
const timeSignatureBeats = document.getElementById('time-signature-beats');
const timeSignatureType = document.getElementById('time-signature-type');
const timeSignatureDisplay = document.getElementById('time-signature-display');
const tempoDisplay = document.getElementById('tempo-display');
const playPauseButton = document.getElementById('play-pause-button');
const rhythmDisplayEl = document.getElementById('rhythm-display');
const customRhythmCreatorDiv = document.getElementById('custom-rhythm-creator');
const lessonSelectorContainer = document.getElementById('lesson-selector-container');
const figurePaletteDiv = document.getElementById('figure-palette');
const deleteSelectedFigureButton = document.getElementById('delete-selected-figure-button');
const messageArea = document.getElementById('message-area');

// --- App State ---
let currentMode = 'lessons';
let currentLessonIndex = 0;
let activeTimeSignature = { beats: 4, beatType: 4 };
let customPattern = [];
let activePattern = [];
let isPlaying = false;
let isCountingDown = false;
let selectedIndexForEditing = null;
let transportEventIds = [];
let metronomeEventId = null;

// --- Audio ---
let noteSynth = null;
let metronomeSynth = null;

// --- HELPER FUNCTIONS ---
function reEnableButtonsAfterErrorOrStop() {
    playPauseButton.disabled = false;
    const elements = [
        document.getElementById('tempo-decrease'),
        document.getElementById('tempo-increase'),
        document.getElementById('reset-button'),
        document.getElementById('clear-custom-rhythm'),
        document.getElementById('delete-selected-figure-button'),
        document.getElementById('ai-suggest-button'),
        lessonSelect,
        modeSelect,
        timeSignatureBeats,
        timeSignatureType
    ];
    elements.forEach(el => {
        if(el) el.disabled = false;
    });
}

function disableButtonsForPlayback(){
    playPauseButton.disabled = true;
    const elements = [
        document.getElementById('tempo-decrease'),
        document.getElementById('tempo-increase'),
        document.getElementById('reset-button'),
        document.getElementById('clear-custom-rhythm'),
        document.getElementById('delete-selected-figure-button'),
        document.getElementById('ai-suggest-button'),
        lessonSelect,
        modeSelect,
        timeSignatureBeats,
        timeSignatureType
    ];
    elements.forEach(el => {
        if(el) el.disabled = true;
    });
}

function highlightActiveVisualElement(patternIndex) {
    document.querySelectorAll('.figure-container[data-pattern-index]').forEach(el => el.classList.remove('highlight'));
    if (patternIndex !== null) {
        const currentFigureContainer = document.querySelector(`.figure-container[data-pattern-index="${patternIndex}"]`);
        if (currentFigureContainer) {
            currentFigureContainer.classList.add('highlight');
            currentFigureContainer.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
        }
    }
}

function initializeSynths() {
    try {
        if (noteSynth) noteSynth.dispose();
        if (metronomeSynth) metronomeSynth.dispose();
        noteSynth = new Tone.PolySynth(Tone.Synth, { oscillator: { type: "triangle" }, envelope: { attack: 0.01, decay: 0.2, sustain: 0.2, release: 0.3 }, volume: -6 }).toDestination();
        metronomeSynth = new Tone.MembraneSynth({ pitchDecay: 0.01, octaves: 5, oscillator: { type: "sine" }, envelope: { attack: 0.001, decay: 0.1, sustain: 0, release: 0.01}, volume: -10 }).toDestination();
    } catch (e) {
        console.error("ERRO CRÍTICO em initializeSynths:", e); 
        messageArea.textContent = "Erro ao inicializar componentes de áudio.";
    }
}

// --- CORE LOGIC FUNCTIONS ---
function getBeatValue(figureDuration, timeSig) {
    const beatUnitValue = 4 / timeSig.beatType;
    return figureDuration / beatUnitValue;
}

function getDurationText(beatValue) {
    if (beatValue < 1) return `${beatValue} tempo`;
    return `${beatValue} ${beatValue > 1 ? 'tempos' : 'tempo'}`;
}

function assignSyllablesToPattern(pattern) {
    const newPattern = JSON.parse(JSON.stringify(pattern)); 
    let i = 0;
    while (i < newPattern.length) {
        const currentFig = newPattern[i];
        if (currentFig.type !== 'note' || currentFig.isControl) {
            i++;
            continue;
        }
        
        let j = i;
        let group = [];
        while(j < newPattern.length && newPattern[j].type === 'note' && newPattern[j].duration === currentFig.duration && [0.5, 0.25, 0.125].includes(currentFig.duration)) {
            group.push(newPattern[j]);
            j++;
        }

        if (group.length > 1) {
            if(currentFig.duration === 0.5) {
                const syllables = (group.length === 3) ? ['ta', 'ca', 'ta'] : ['ta', 'ca'];
                for(let k = 0; k < group.length; k++) {
                    group[k].syllable = syllables[k % syllables.length];
                }
            } else if (currentFig.duration === 0.25) {
                const syllables = ['ti', 'ri', 'ti', 'ri'];
                for(let k = 0; k < group.length; k++) {
                    group[k].syllable = syllables[k % 4];
                }
            } else if (currentFig.duration === 0.125) {
                const syllables = ['ti', 'ri', 'ti', 'ri'];
                for(let k = 0; k < group.length; k++) {
                    group[k].syllable = syllables[k % 4];
                }
            }
            i = j;
        } else {
            currentFig.syllable = 'Tá';
            i++;
        }
    }
    return newPattern;
}

function updateActivePatternAndTimeSignature() {
    stopRhythmExecution();
    if (currentMode === 'lessons') {
        const lesson = lessons[currentLessonIndex];
        activePattern = assignSyllablesToPattern(lesson.pattern);
        activeTimeSignature = lesson.timeSignature;
    } else { 
        activePattern = assignSyllablesToPattern(customPattern);
        activeTimeSignature = {
            beats: parseInt(timeSignatureBeats.value),
            beatType: parseInt(timeSignatureType.value)
        };
    }
    
    timeSignatureDisplay.textContent = `${activeTimeSignature.beats}/${activeTimeSignature.beatType}`;
    
    renderRhythm();
    if(currentMode === 'lessons') populateFigureLegend();
}

// --- UI & RENDER FUNCTIONS ---
function switchMode(mode) {
    currentMode = mode;
    stopRhythmExecution(); 
    selectedIndexForEditing = null;
    const isLessonMode = mode === 'lessons';
    
    lessonSelectorContainer.classList.toggle('hidden', !isLessonMode);
    customRhythmCreatorDiv.classList.toggle('hidden', isLessonMode);
    
    document.getElementById('figure-legend-container').classList.toggle('hidden', !isLessonMode);
    
    messageArea.textContent = isLessonMode ? "Modo de Lições. Escolha uma lição." : "Modo de Criação Livre.";
    rhythmDisplayEl.classList.toggle('edit-mode', !isLessonMode);
    updateActivePatternAndTimeSignature();
}

function populateLessonSelect() {
    lessonSelect.innerHTML = ''; 
    lessons.forEach((lesson, index) => {
        const option = document.createElement('option');
        option.value = index;
        option.textContent = lesson.name;
        lessonSelect.appendChild(option);
    });
}

function populateFigureLegend() {
    const content = document.getElementById('figure-legend-content');
    content.innerHTML = '';
    const uniqueFigures = [...new Map(activePattern.filter(item => !item.isControl).map(item => [JSON.stringify([item.symbol, item.duration]), item])).values()];
    uniqueFigures.forEach(fig => {
        const figureDef = rhythmicFigures.find(rf => rf.symbol === fig.symbol && rf.duration === fig.duration);
        if(!figureDef) return;
        const beatValue = getBeatValue(fig.duration, activeTimeSignature);
        content.innerHTML += `<div class="legend-item"><span class="legend-symbol">${fig.symbol}</span><span class="legend-name">${figureDef.name} - Dura ${getDurationText(beatValue)}</span></div>`;
    });
}

function populateFigurePalette() {
    figurePaletteDiv.innerHTML = ''; 
    rhythmicFigures.forEach(fig => {
        const button = document.createElement('button');
        button.className = 'figure-button p-2.5 sm:p-3 rounded-lg shadow text-2xl sm:text-3xl transition-all duration-150 ease-in-out';
        if(fig.isControl) button.classList.add('figure-button-control');
        button.textContent = fig.symbol;
        button.title = fig.name;
        button.addEventListener('click', () => handlePaletteFigureClick({...fig}));
        figurePaletteDiv.appendChild(button);
    });
}

function renderRhythm() {
    rhythmDisplayEl.className = 'flex items-end flex-wrap';
    rhythmDisplayEl.innerHTML = '';
    
    const tsContainer = document.createElement('div');
    tsContainer.className = 'figure-container';
    tsContainer.innerHTML = `<div class="beat-counter-text">&nbsp;</div><div class="time-signature-item p-2 sm:p-3 text-3xl sm:text-4xl font-bold text-slate-700 flex flex-col justify-center items-center"><span>${activeTimeSignature.beats}</span><span>${activeTimeSignature.beatType}</span></div><div>&nbsp;</div>`;
    rhythmDisplayEl.appendChild(tsContainer);

    if (activePattern.length === 0) {
        rhythmDisplayEl.className = 'flex justify-center items-center h-full min-h-[150px]';
        rhythmDisplayEl.innerHTML = `<p class="text-slate-500 text-lg">Selecione uma lição ou comece a criar.</p>`;
        deleteSelectedFigureButton.classList.add('hidden');
        return;
    }

    let currentBeatsInMeasure = 0;
    const tolerance = 0.001;

    activePattern.forEach((item, index) => {
        const beatValue = getBeatValue(item.duration, activeTimeSignature);
        const figureContainer = document.createElement('div');
        figureContainer.className = 'figure-container';
        figureContainer.dataset.patternIndex = index;
        if (item.isControl) figureContainer.dataset.isControl = "true";
        if (selectedIndexForEditing === index) figureContainer.classList.add('selected-for-edit');
        if (currentMode === 'freeCreate') {
            figureContainer.addEventListener('click', () => handleFigureSelectionForEditing(index));
        }

        const beatCounterElement = document.createElement('div');
        beatCounterElement.className = 'beat-counter-text';
        if (!item.isControl) {
            const startBeat = currentBeatsInMeasure + 1;
            if (beatValue >= 1 && Math.abs(beatValue - Math.round(beatValue)) < tolerance) {
                const beatsArray = Array.from({length: beatValue}, (_, i) => Math.floor(startBeat) + i);
                beatCounterElement.textContent = beatsArray.join(' ');
            } else {
                const beatNumber = Math.floor(currentBeatsInMeasure) + 1;
                const subBeatPosition = currentBeatsInMeasure - Math.floor(currentBeatsInMeasure);
                if (subBeatPosition < tolerance) beatCounterElement.textContent = beatNumber;
                else if (Math.abs(subBeatPosition - 0.25) < tolerance) beatCounterElement.textContent = 'e';
                else if (Math.abs(subBeatPosition - 0.5) < tolerance) beatCounterElement.textContent = '+';
                else if (Math.abs(subBeatPosition - 0.75) < tolerance) beatCounterElement.textContent = 'a';
            }
        }

        const noteItemElement = document.createElement('div');
        noteItemElement.className = `note-item p-3 sm:p-4 rounded-lg shadow min-w-[45px] sm:min-w-[55px] ${item.type === 'note' ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-700'}`;
        noteItemElement.textContent = item.symbol;

        const syllableElement = document.createElement('div');
        syllableElement.className = 'syllable-text';
        syllableElement.innerHTML = item.syllable || '&nbsp;';

        figureContainer.appendChild(beatCounterElement);
        figureContainer.appendChild(noteItemElement);
        figureContainer.appendChild(syllableElement);
        
        rhythmDisplayEl.appendChild(figureContainer);

        if (!item.isControl) currentBeatsInMeasure += beatValue;

        if (Math.abs(currentBeatsInMeasure - activeTimeSignature.beats) < tolerance) {
             if (index < activePattern.length - 1 && !activePattern[index + 1]?.isControl) {
                 rhythmDisplayEl.innerHTML += `<div class="barline-container"><div class="barline-item"></div></div>`;
             }
             currentBeatsInMeasure = 0; 
        } else if(currentBeatsInMeasure > activeTimeSignature.beats){
             currentBeatsInMeasure %= activeTimeSignature.beats;
        }
    });
    deleteSelectedFigureButton.classList.toggle('hidden', selectedIndexForEditing === null);
}

// --- USER INTERACTION ---
function handlePaletteFigureClick(figure) {
    if (currentMode !== 'freeCreate' || isPlaying || isCountingDown) return;
    
    const newFigure = figure;
    const totalMeasureBeats = parseFloat(activeTimeSignature.beats);
    const tolerance = 0.001;

    // Create a temporary pattern to validate against
    let tempPattern = [...customPattern];

    if (selectedIndexForEditing !== null) {
        // If replacing, put the new figure in the temporary pattern for validation
        tempPattern[selectedIndexForEditing] = newFigure;
    } else {
        // If adding, push the new figure to the end for validation
        tempPattern.push(newFigure);
    }
    
    // Validate the entire temporary pattern for any measure overflows
    let currentBeatsInMeasure = 0;
    for (const item of tempPattern) {
        if (item.isControl) {
            // Treat repeat signs as barlines for validation purposes
            if (item.type === 'repeat_start' || item.type === 'repeat_end') {
                if (currentBeatsInMeasure > tolerance) { // If the measure isn't empty, it's an error
                     messageArea.textContent = `Ação inválida. Ritornello deve ser colocado em uma barra de compasso.`;
                     return;
                }
            }
            continue;
        };

        const beatValue = getBeatValue(item.duration, activeTimeSignature);
        currentBeatsInMeasure += beatValue;

        // Check for overflow
        if (currentBeatsInMeasure > totalMeasureBeats + tolerance) {
            messageArea.textContent = `Ação inválida. O compasso excederia o limite de ${totalMeasureBeats} tempos.`;
            // Optional: Add a visual flash effect for the error message
            messageArea.classList.add('text-red-500', 'font-bold');
            setTimeout(() => messageArea.classList.remove('text-red-500', 'font-bold'), 2000);
            return;
        }

        // If a measure is filled exactly, reset the counter for the next one
        if (Math.abs(currentBeatsInMeasure - totalMeasureBeats) < tolerance) {
            currentBeatsInMeasure = 0;
        }
    }

    // If the loop completes, the proposed change is valid. Apply it permanently.
    const newFigureBeatValue = getBeatValue(newFigure.duration, activeTimeSignature);
    const durationText = getDurationText(newFigureBeatValue);
    
    if (selectedIndexForEditing !== null) {
        customPattern.splice(selectedIndexForEditing, 1, newFigure);
        messageArea.textContent = `${newFigure.name} inserido. Vale ${durationText}.`;
        selectedIndexForEditing = null; 
    } else {
        customPattern.push(newFigure);
        messageArea.textContent = `${newFigure.name} adicionado. Vale ${durationText}.`;
    }
    
    updateActivePatternAndTimeSignature();
}


function handleFigureSelectionForEditing(index) {
    if (currentMode !== 'freeCreate' || isPlaying || isCountingDown) return;
    if (selectedIndexForEditing === index) {
        selectedIndexForEditing = null; messageArea.textContent = "Seleção removida.";
    } else {
        selectedIndexForEditing = index;
        const item = activePattern[index];
        const figureDef = rhythmicFigures.find(rf => rf.symbol === item.symbol && rf.duration === item.duration);
        const beatValue = getBeatValue(item.duration, activeTimeSignature);
        messageArea.textContent = `Item ${index + 1} (${figureDef.name}) selecionado. Vale ${getDurationText(beatValue)}.`;
    }
    renderRhythm(); 
}

// --- PLAYBACK LOGIC ---
function stopRhythmExecution(fromPause = false) {
    isPlaying = false; isCountingDown = false;
    Tone.Transport.stop();
    Tone.Transport.cancel(0);
    transportEventIds.forEach(id => Tone.Transport.clear(id));
    transportEventIds = [];
    if(metronomeEventId) {
        metronomeEventId.stop(0).dispose();
        metronomeEventId = null;
    }
    playPauseButton.textContent = 'Tocar';
    playPauseButton.classList.replace('btn-pause', 'btn-play');
    reEnableButtonsAfterErrorOrStop();
    highlightActiveVisualElement(null);
    document.getElementById('countdown-display').textContent = "";
    if (!fromPause) messageArea.textContent = "Reprodução parada.";
}

async function startCountdownAndPlay() {
    if (isPlaying || isCountingDown) return;
    disableButtonsForPlayback(); playPauseButton.disabled = true;

    try {
        if (Tone.context.state !== 'running') await Tone.start();
        initializeSynths();
        if (!noteSynth || !metronomeSynth) throw new Error("Sintetizadores não iniciados.");
        
        isCountingDown = true; messageArea.textContent = "Preparando...";
        
        stopRhythmExecution(true);

        const userInputBpm = parseInt(document.getElementById('tempo-display').textContent);
        const { beats, beatType } = activeTimeSignature;
        
        const adjustedBpm = userInputBpm * (4 / beatType);
        Tone.Transport.bpm.value = adjustedBpm;
        
        const beatUnitDuration = Tone.Time(`${beatType}n`).toSeconds();
        const countdownDuration = beatUnitDuration * beats;

        schedulePlayback(countdownDuration);
        scheduleMetronome();
        
        for(let i=0; i < beats; i++) {
            transportEventIds.push(Tone.Transport.scheduleOnce(t => { Tone.Draw.schedule(() => { document.getElementById('countdown-display').textContent = beats - i; }, t); }, i * beatUnitDuration));
        }

        transportEventIds.push(Tone.Transport.scheduleOnce(t => {
            Tone.Draw.schedule(() => {
                document.getElementById('countdown-display').textContent = "";
                isCountingDown = false; isPlaying = true;
                playPauseButton.textContent = "Pausar"; playPauseButton.classList.replace('btn-play', 'btn-pause');
                playPauseButton.disabled = false; document.getElementById('reset-button').disabled = false;
                messageArea.textContent = "Tocando...";
            }, t);
        }, countdownDuration - 0.05));

        Tone.Transport.start(Tone.now());

    } catch (error) {
        console.error("Erro ao iniciar playback:", error);
        messageArea.textContent = "Erro: " + error.message;
        stopRhythmExecution();
    }
}

function pauseRhythmExecution() {
     if (isPlaying) {
         Tone.Transport.pause();
         isPlaying = false;
         playPauseButton.textContent = 'Tocar';
         playPauseButton.classList.replace('btn-pause', 'btn-play');
         messageArea.textContent = "Pausado.";
         reEnableButtonsAfterErrorOrStop();
         playPauseButton.disabled = false;
         document.getElementById('reset-button').disabled = false;
    }
}

function resumeRhythmExecution() {
      if (!isPlaying && Tone.Transport.state === 'paused') {
          isPlaying = true;
          playPauseButton.textContent = 'Pausar';
          playPauseButton.classList.replace('btn-play', 'btn-pause');
          disableButtonsForPlayback();
          playPauseButton.disabled = false;
          document.getElementById('reset-button').disabled = false;
          Tone.Transport.start();
          messageArea.textContent = "Tocando...";
     }
}

/**
 * Processa o padrão com repetições e cria uma fila de reprodução plana.
 * @param {Array} pattern O padrão rítmico com sinais de repetição.
 * @returns {Array} Uma lista plana de objetos { item, originalIndex } prontos para serem agendados.
 */
function processPatternForPlayback(pattern) {
    const playbackQueue = [];
    let repeatSection = [];
    let inRepeat = false;

    pattern.forEach((item, index) => {
        const event = { 
            item: item, 
            originalIndex: index 
        };

        if (item.type === 'repeat_start') {
            inRepeat = true;
            repeatSection = []; 
            playbackQueue.push(event); 
            return;
        }

        if (item.type === 'repeat_end') {
            playbackQueue.push(event); 
            
            if (inRepeat) {
                // Comportamento padrão: repete a seção marcada
                playbackQueue.push(...repeatSection);
            } else {
                // NOVO Comportamento: não há sinal de início, então repete do começo
                const allPreviousEvents = playbackQueue.slice(0, playbackQueue.length - 1); 
                playbackQueue.push(...allPreviousEvents);
            }
            
            inRepeat = false;
            repeatSection = [];
            return;
        }
        
        playbackQueue.push(event);
        
        if (inRepeat) {
            repeatSection.push(event);
        }
    });

    return playbackQueue;
}


/**
 * Agenda a reprodução da fila de eventos processada.
 * @param {number} offset - O tempo de início do playback.
 */
function schedulePlayback(offset = 0) {
    const playbackQueue = processPatternForPlayback(activePattern);
    
    let time = offset;

    playbackQueue.forEach(event => {
        const { item, originalIndex } = event;
        
        const beatValue = getBeatValue(item.duration, activeTimeSignature);
        const toneDuration = Tone.Time(`${activeTimeSignature.beatType}n`).toSeconds() * beatValue;

        transportEventIds.push(Tone.Transport.scheduleOnce(t => {
            Tone.Draw.schedule(() => highlightActiveVisualElement(originalIndex), t);
        }, time));

        if (item.type === 'note') {
            transportEventIds.push(Tone.Transport.scheduleOnce(t => {
                noteSynth.triggerAttackRelease("C4", toneDuration, t);
            }, time));
        }
        
        time += toneDuration;
    });

    transportEventIds.push(Tone.Transport.scheduleOnce(() => {
        stopRhythmExecution();
        messageArea.textContent = "Fim do exercício!";
    }, time + 0.2));
}


function scheduleMetronome() {
    if (metronomeEventId) {
        metronomeEventId.stop(0).dispose();
    }
    const { beats, beatType } = activeTimeSignature;
    const isCompound = (beats >= 6 && beats % 3 === 0);
    const events = [];
    
    const beatDurationNotation = `${beatType}n`;
    
    for (let i = 0; i < beats; i++) {
        const time = Tone.Time(beatDurationNotation).toSeconds() * i;
        let note = "C5"; // Weak beat
        if (isCompound) {
            if (i % 3 === 0) note = "G5"; 
        } else {
            if (i === 0) note = "G5";
        }
        events.push({ time, note });
    }

    metronomeEventId = new Tone.Part((time, value) => {
        metronomeSynth.triggerAttackRelease(value.note, "32n", time);
    }, events).start(0);
    metronomeEventId.loop = true;
    metronomeEventId.loopEnd = Tone.Time(beatDurationNotation).toSeconds() * beats;
}

// --- Event Listeners Setup ---
function setupEventListeners() {
    modeSelect.addEventListener('change', (e) => switchMode(e.target.value));
    
    lessonSelect.addEventListener('change', (e) => {
        currentLessonIndex = parseInt(e.target.value);
        updateActivePatternAndTimeSignature();
    });

    [timeSignatureBeats, timeSignatureType].forEach(el => el.addEventListener('change', updateActivePatternAndTimeSignature));
    
    document.getElementById('tempo-decrease').addEventListener('click', () => {
        const tempoEl = document.getElementById('tempo-display');
        tempoEl.textContent = Math.max(30, parseInt(tempoEl.textContent) - 5);
    });

    document.getElementById('tempo-increase').addEventListener('click', () => {
        const tempoEl = document.getElementById('tempo-display');
        tempoEl.textContent = Math.min(280, parseInt(tempoEl.textContent) + 5);
    });

    playPauseButton.addEventListener('click', () => {
        if (isPlaying) { pauseRhythmExecution(); } 
        else if (Tone.Transport.state === 'paused') { resumeRhythmExecution(); }
        else { startCountdownAndPlay(); }
    });

    document.getElementById('reset-button').addEventListener('click', () => {
        stopRhythmExecution();
        messageArea.textContent = "Ritmo resetado.";
    });

    document.getElementById('clear-custom-rhythm').addEventListener('click', () => {
         customPattern = [];
         updateActivePatternAndTimeSignature();
         messageArea.textContent = "Ritmo limpo.";
    });
    
    deleteSelectedFigureButton.addEventListener('click', () => {
         if(selectedIndexForEditing === null) return;
         customPattern.splice(selectedIndexForEditing, 1);
         selectedIndexForEditing = null;
         updateActivePatternAndTimeSignature();
         messageArea.textContent = "Figura apagada.";
    });
}

// --- Init ---
function init() {
    populateLessonSelect();
    populateFigurePalette();
    setupEventListeners();
    switchMode('lessons');
    console.log("Aplicação inicializada.");
}

// Inicia a aplicação quando o script for carregado
init();
