const Tone = require("tone");
require("../assets/styles/styles.scss");

let bassSynth, cymbalSynth;
let loopBeat;
let counter;

document.getElementById('play_stop').onclick = playStop;

function playStop() {
  if (Tone.context.state !== 'running') {
    Tone.context.resume();
  }
  if (loopBeat.state === 'started') {
    loopBeat.stop();
  } else {
    loopBeat.start(0);
  }
}

function setup() {
  counter = 0;
  bassSynth = new Tone.MembraneSynth().toMaster();
  cymbalSynth = new Tone.MetalSynth({
    frequency : 250,
    envelope : {
      attack : 0.001,
      decay : 0.1,
      release : 0.01
    } ,
    harmonicity : 3.1,
    modulationIndex : 16,
    resonance : 8000,
    octaves : 0.5
  }).toMaster();
  loopBeat = new Tone.Loop(song, '16n');

  Tone.Transport.bpm.value = 140;
  Tone.Transport.start();
  loopBeat.start(0);
}

function song(time) {
  if (counter%4 === 0) {
    bassSynth.triggerAttackRelease('A#1', '16n', time);
  }
  if (counter%4 !== 1) {
    if (counter === 3 || counter === 6 || counter === 12) {
      cymbalSynth.envelope.decay = 0.8;
    } else {
      cymbalSynth.envelope.decay = 0.01;
    }
    cymbalSynth.triggerAttackRelease('32n', time, 0.3);
  }
  counter = (counter+1)%16;
}

setup();

function randomTimeGenerator(min, max) {
  return Math.floor(Math.random()*(max-min +1) + min);
}