import { Component, ViewChild } from "@angular/core";
import { SynthService } from "../synth.service";
import { JoystickService } from "../joystick.service";

@Component({
  selector: "app-fx",
  templateUrl: "./fx.page.html",
  styleUrls: ["./fx.page.scss"],
})
export class FxPage {
  fxOrJoy: any = "key";
  joy: any;
  xDestination: any = "masterFilter";
  yDestination: any = "lfo1Freq";
  keyboardEnabled: boolean = false;
  sequencerEnabled: boolean = false;
  showVelocity: boolean = false;
  sequencerVelocity: any = 2000;
  steps: any = 12;
  stepsArray: Array<any> = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  noteDuration: any = 500;
  freqOsc1: any = this.synth.osc1.frequency.value;
  freqOsc2: any = this.synth.osc2.frequency.value;
  freqOsc3: any = this.synth.osc3.frequency.value;
  @ViewChild("key1") key1: any;
  @ViewChild("key2") key2: any;
  @ViewChild("key3") key3: any;
  @ViewChild("key4") key4: any;
  @ViewChild("key5") key5: any;
  @ViewChild("key6") key6: any;
  @ViewChild("key7") key7: any;
  @ViewChild("key8") key8: any;
  @ViewChild("key9") key9: any;
  @ViewChild("key10") key10: any;
  @ViewChild("key11") key11: any;
  @ViewChild("key12") key12: any;
  @ViewChild("key13") key13: any;
  @ViewChild("key14") key14: any;
  @ViewChild("key15") key15: any;
  @ViewChild("key16") key16: any;
  @ViewChild("toggleSeq") toggleSeq: any;
  @ViewChild("toggleKey") toggleKey: any;

  constructor(private synth: SynthService, private joystick: JoystickService) {}

  changeDistortionAmount() {}

  changeAxisDestination(axis) {}

  touchStart(ev) {
    console.log("touchStart");
    this.joystick.onTouchStart(ev);
  }

  touchMove(ev) {
    this.joystick.onTouchMove(ev);
  }

  touchEnd(ev) {
    console.log("touchEnd");
    this.joystick.onTouchEnd(ev);
  }

  mouseDown(ev) {
    this.joystick.onMouseDown(ev);
  }

  mouseMove(ev) {
    this.joystick.onMouseMove(ev);
  }

  mouseUp(ev) {
    this.joystick.onMouseUp(ev);
  }

  get sequencerDelay() {
    const MIN = 50;
    const MAX = 3000;
    return MAX - this.sequencerVelocity + MIN;
  }

  segmentChanged() {
    if (this.fxOrJoy == "joy") {
      let me = this;
      setTimeout(function () {
        me.joystick.init(
          document.getElementById("joyDiv"),
          document.getElementById("joystick")
        );
        me.joystick.canvas.addEventListener(
          "touchstart",
          this.onTouchStart,
          false
        );
        me.joystick.canvas.addEventListener(
          "touchmove",
          this.onTouchMove,
          false
        );
        me.joystick.canvas.addEventListener("touchend", this.onTouchEnd, false);
      }, 100);
    }
  }

  enableKeyboard() {
    if (this.keyboardEnabled) {
      this.keyboardEnabled = false;
      this.synth.osc1.start();
      this.synth.osc2.start();
      this.synth.osc3.start();
      this.synth.noise.start();
    } else {
      this.synth.osc1.stop();
      this.synth.osc2.stop();
      this.synth.osc3.stop();
      this.synth.noise.stop();
      this.keyboardEnabled = true;
    }
  }

  enableSequencer() {
    if (this.keyboardEnabled) {
      this.keyboardEnabled = false;
      this.toggleKey.checked = false;
    }
    if (this.sequencerEnabled) {
      this.sequencerEnabled = false;
      this.showVelocity = false;
    } else {
      this.sequencerEnabled = true;
      this.showVelocity = true;
      this.playSequence();
    }
  }

  async playSequence() {
    let me = this;

    for (let seq of this.stepsArray) {
      console.log("sequencerDelay", me.sequencerDelay);
      await me.delay(me.sequencerDelay);
      me.playButton(seq, true);
      if (!me.sequencerEnabled) {
        return;
      }
    }

    if (this.sequencerEnabled) {
      this.playSequence();
    } else {
      return;
    }
  }

  playButton(num, sequence = false) {
    console.log("playButton", num);

    if (!this.keyboardEnabled && !sequence) {
      this.keyboardEnabled = true;
      this.toggleKey.checked = true;
    }

    const freqOffset = 12;
    const offset = freqOffset * (num - 1);

    // get key dynamically (key1 ... key16)
    const keyPressed = this[`key${num}`];
    if (!keyPressed) return;

    // update oscillator frequencies (skip offset for key 1 if needed)
    if (num > 1) {
      [
        [this.synth.osc1, this.freqOsc1],
        [this.synth.osc2, this.freqOsc2],
        [this.synth.osc3, this.freqOsc3],
      ].forEach(([osc, baseFreq]) => {
        osc.frequency.value = baseFreq + offset;
      });
    }

    // visual feedback
    keyPressed.el.style.backgroundColor = "#efed1f";

    // start sound
    [
      this.synth.osc1,
      this.synth.osc2,
      this.synth.osc3,
      this.synth.noise,
    ].forEach((osc) => osc.start());

    setTimeout(() => {
      keyPressed.el.style.backgroundColor = "#5f5e26";

      [
        this.synth.osc1,
        this.synth.osc2,
        this.synth.osc3,
        this.synth.noise,
      ].forEach((osc) => osc.stop());
    }, this.noteDuration);
  }

  delay(ms: number) {
    console.log("delay");
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  shuffle(array) {
    let currentIndex = array.length,
      temporaryValue,
      randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }

    return array;
  }

  randomSequence() {
    console.log("randomSequence");

    this.sequencerEnabled = false;
    this.shuffle(this.stepsArray);

    this.sequencerEnabled = true;
  }

  reverseSequence() {
    console.log("reverseSequence");

    this.sequencerEnabled = false;
    let k = this.steps;
    for (let i = 0; i < this.steps; i++) {
      this.stepsArray.push(k);
      k--;
    }

    this.sequencerEnabled = true;
  }

  changeSeqSteps() {
    let play = false;

    if (this.sequencerEnabled) {
      this.sequencerEnabled = false;
      play = true;
    }

    this.stepsArray = [];
    let me = this;
    let i;
    for (i = 1; i <= this.steps; i++) {
      me.stepsArray.push(i);
    }

    if (play) {
      this.sequencerEnabled = true;
      this.playSequence();
    }

    return;
  }
}
