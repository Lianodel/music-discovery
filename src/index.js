const Tone = require("tone");
require("../assets/styles/styles.scss");
import BasicSynth from './basic-synths';
import Tools from './tools';

document.getElementById('play_stop').onclick = playStop;

let basicSynth = new BasicSynth();

function setup() {
  basicSynth.setup();
  console.log(Tools.rng(1,2));
}

setup();

function playStop() {
  if (Tone.context.state !== 'running') {
    Tone.context.resume();
  }
  basicSynth.playStop();
}