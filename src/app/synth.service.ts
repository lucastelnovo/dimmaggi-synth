import { Injectable } from "@angular/core";
import * as Tone from "tone";

@Injectable({
  providedIn: "root",
})
export class SynthService {
  osc1Freq: any = 200;
  osc1Waveform: any = "sine";
  osc1On: any = true;
  osc2Freq: any = 400;
  osc2Waveform: any = "sine";
  osc2On: any = true;
  osc3Freq: any = 600;
  osc3Waveform: any = "sine";
  osc3On: any = true;
  noiseType: any = "pink";
  noiseOn: Boolean = true;
  osc1 = new Tone.Oscillator(this.osc1Freq, this.osc1Waveform);
  osc2 = new Tone.Oscillator(this.osc2Freq, this.osc2Waveform);
  osc3 = new Tone.Oscillator(this.osc3Freq, this.osc3Waveform);
  noise = new Tone.Noise(this.noiseType);
  sample: any;
  player: any;
  filter1 = new Tone.Filter(10000, "lowpass", -12);
  filter2 = new Tone.Filter(10000, "lowpass", -12);
  filterMaster = new Tone.Filter(20000, "lowpass", -12);
  lfo1 = new Tone.LFO("4n", 0.01, 10);
  lfo2 = new Tone.LFO("4n", 0.01, 10);
  lfo3 = new Tone.LFO("4n", 0.01, 10);
  env1 = new Tone.Envelope({
    attack: 0.1,
    decay: 0.2,
    sustain: 1,
    release: 0.8,
  });
  env2 = new Tone.Envelope({
    attack: 0.1,
    decay: 0.2,
    sustain: 1,
    release: 0.8,
  });
  reverb = new Tone.JCReverb(0);
  delay = new Tone.FeedbackDelay(0, 0);
  phaser = new Tone.Phaser({
    frequency: 0,
    octaves: 5,
    baseFrequency: 0,
  });

  autofilter = new Tone.AutoFilter(0).toMaster().start();
  chorus = new Tone.Chorus(0, 2.5, 0.5);

  constructor() {
    console.log("Hello Singleton Synth Service");

    this.osc1.chain(this.filterMaster, this.delay, this.reverb, Tone.Master);
    this.osc2.chain(this.filterMaster, this.delay, this.reverb, Tone.Master);
    this.osc3.chain(this.filterMaster, this.delay, this.reverb, Tone.Master);
    this.noise.chain(this.filterMaster, this.delay, this.reverb, Tone.Master);
    this.osc1.start();
    this.osc2.start();
    this.osc3.start();
    this.noise.start();
    this.lfo1.start();
    this.lfo2.start();
    this.lfo3.start();

    this.filterMaster.connect(this.autofilter);
  }

  getSource(source) {
    switch (source) {
      case "osc1":
        return this.osc1;
      case "osc2":
        return this.osc2;
      case "osc3":
        return this.osc3;
      case "noise":
        return this.noise;
      case "filter1":
        return this.filter1;
      case "filter2":
        return this.filter2;
      case "masterFilter":
        return this.filterMaster;
    }
  }

  isOn(osc) {
    switch (osc) {
      case "osc1":
        return this.osc1On;
      case "osc2":
        return this.osc2On;
      case "osc3":
        return this.osc3On;
      case "noise":
        return this.noiseOn;
    }
  }

  createPlayer(uri) {
    this.player = new Tone.Player(uri).toMaster();
    return this.player;
  }
}
