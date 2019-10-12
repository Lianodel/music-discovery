const Tone = require("tone");

class BasicSynth {
  bassSynth;
  cymbalSynth;
  loopBeat;
  amSynth;
  fmSynth;
  pluckSynth;
  counter;

  constructor() {}

  setup() {
    this.counter = 0;
    this.pluckSynth = new Tone.PluckSynth().toMaster();
    this.amSynth = new Tone.AMSynth({
      harmonicity: 1,
      detune: 0,
      oscillator: {
        type: 'sine' // carrier signal
      },
      envelope: {
        attack: 0.001,
        decay: 0.1,
        sustain: 2,
        release: 2
      },
      modulation: {
        type: 'square' // modulation signal
      },
      modulationEnvelope: {
        attack: 0.005,
        decay: 0,
        sustain: 1,
        release: 0.5
      }
    }).toMaster();

    this.fmSynth = new Tone.FMSynth({
      harmonicity: 1,
      modulationIndex: 10,
      detune: 0,
      oscillator: {
        type: 'sine'
      },
      envelope: {
        attack: 0.001,
        decay: 0.01,
        sustain: 1,
        release: 0.5
      },
      modulation: {
        type: 'square'
      },
      modulationEnvelope: {
        attack: 0.5,
        decay: 0,
        sustain: 1,
        release: 0.5
      }
    }).toMaster();
    this.bassSynth = new Tone.MembraneSynth().toMaster();
    this.cymbalSynth = new Tone.MetalSynth({
      frequency: 250,
      envelope: {
        attack: 0.001,
        decay: 0.1,
        release: 0.01
      },
      harmonicity: 3.1,
      modulationIndex: 16,
      resonance: 8000,
      octaves: 0.5
    }).toMaster();

    this.loopBeat = new Tone.Loop(this.song.bind(this), '16n').start(0);
    Tone.Transport.start().bpm.value = 140;
  }

  song(time) {
    if (this.counter % 4 === 0) {
      this.bassSynth.triggerAttackRelease('F#1', '16n', time);
    }
    if (this.counter % 4 !== 1) {
      if (this.counter === 3 || this.counter === 6 || this.counter === 12) {
        this.cymbalSynth.envelope.decay = 0.8;
      } else {
        this.cymbalSynth.envelope.decay = 0.08;
      }
      this.cymbalSynth.triggerAttackRelease('32n', time, 0.3);
    }

    if (this.counter === 0) {
      this.amSynth.triggerAttackRelease('a1', '16n', time, 0.8);
      this.fmSynth.triggerAttackRelease('a2', '16n', time, 0.8);
    }

    if (this.counter === 10) {
      this.amSynth.triggerAttackRelease('Bb1', '16n', time, 0.8);
      this.fmSynth.triggerAttackRelease('Bb2', '16n', time, 0.8);
    }

    if (this.counter % 2 === 0) {
      this.pluckSynth.triggerAttackRelease('G6', '16n', time);
    } else {
      this.pluckSynth.triggerAttackRelease('A7', '16n', time);
    }

    this.counter = (this.counter + 1) % 16;
  }

  playStop() {
    if (this.loopBeat) {
      console.log('PLAY/STOP BASIC SYNTHS');
      if (this.loopBeat.state === 'started') {
        this.loopBeat.stop();
      } else {
        this.loopBeat.start(0);
      }
    }
  }
}

export default BasicSynth;