import {Component, ViewChild} from '@angular/core';
import {SynthService} from '../synth.service';
import {JoystickService} from '../joystick.service';

@Component({
    selector: 'app-fx',
    templateUrl: './fx.page.html',
    styleUrls: ['./fx.page.scss'],
})

export class FxPage {

    fxOrJoy: any = 'key';
    joy: any;
    xDestination: any = 'masterFilter';
    yDestination: any = 'lfo1Freq';
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
    @ViewChild('key1') key1: any;
    @ViewChild('key2') key2: any;
    @ViewChild('key3') key3: any;
    @ViewChild('key4') key4: any;
    @ViewChild('key5') key5: any;
    @ViewChild('key6') key6: any;
    @ViewChild('key7') key7: any;
    @ViewChild('key8') key8: any;
    @ViewChild('key9') key9: any;
    @ViewChild('key10') key10: any;
    @ViewChild('key11') key11: any;
    @ViewChild('key12') key12: any;
    @ViewChild('key13') key13: any;
    @ViewChild('key14') key14: any;
    @ViewChild('key15') key15: any;
    @ViewChild('key16') key16: any;
    @ViewChild('toggleSeq') toggleSeq: any;
    @ViewChild('toggleKey') toggleKey: any;

    constructor(private synth: SynthService, private joystick: JoystickService) {

    }

    changeDistortionAmount() {

    }

    changeAxisDestination(axis) {

    }

    touchStart(ev) {
        console.log('touchStart');
        this.joystick.onTouchStart(ev);
    }

    touchMove(ev) {
        this.joystick.onTouchMove(ev);
    }

    touchEnd(ev) {
        console.log('touchEnd');
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

    segmentChanged() {

        if (this.fxOrJoy == 'joy') {
            let me = this;
            setTimeout(function() {
                me.joystick.init(document.getElementById('joyDiv'), document.getElementById('joystick'));
                me.joystick.canvas.addEventListener('touchstart', this.onTouchStart, false);
                me.joystick.canvas.addEventListener('touchmove', this.onTouchMove, false);
                me.joystick.canvas.addEventListener('touchend', this.onTouchEnd, false);
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
            await me.delay(me.sequencerVelocity);
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
        console.log('playButton', num);
        if (!this.keyboardEnabled && !sequence) {
            //alert('You have to enable the keyboard trigger in order to use it :)');
            this.keyboardEnabled = true;
            this.toggleKey.checked = true;
        }
        let keyPressed;
        const freqOffset = 12;
        switch (num) {
            case 1:
                keyPressed = this.key1;
                break;
            case 2:
                keyPressed = this.key2;
                this.synth.osc1.frequency.value = this.freqOsc1 + freqOffset * (num - 1);
                this.synth.osc2.frequency.value = this.freqOsc2 + freqOffset * (num - 1);
                this.synth.osc3.frequency.value = this.freqOsc3 + freqOffset * (num - 1);
                break;
            case 3:
                keyPressed = this.key3;
                this.synth.osc1.frequency.value = this.freqOsc1 + freqOffset * (num - 1);
                this.synth.osc2.frequency.value = this.freqOsc2 + freqOffset * (num - 1);
                this.synth.osc3.frequency.value = this.freqOsc3 + freqOffset * (num - 1);
                break;
            case 4:
                keyPressed = this.key4;
                this.synth.osc1.frequency.value = this.freqOsc1 + freqOffset * (num - 1);
                this.synth.osc2.frequency.value = this.freqOsc2 + freqOffset * (num - 1);
                this.synth.osc3.frequency.value = this.freqOsc3 + freqOffset * (num - 1);
                break;
            case 5:
                keyPressed = this.key5;
                this.synth.osc1.frequency.value = this.freqOsc1 + freqOffset * (num - 1);
                this.synth.osc2.frequency.value = this.freqOsc2 + freqOffset * (num - 1);
                this.synth.osc3.frequency.value = this.freqOsc3 + freqOffset * (num - 1);
                break;
            case 6:
                keyPressed = this.key6;
                this.synth.osc1.frequency.value = this.freqOsc1 + freqOffset * (num - 1);
                this.synth.osc2.frequency.value = this.freqOsc2 + freqOffset * (num - 1);
                this.synth.osc3.frequency.value = this.freqOsc3 + freqOffset * (num - 1);
                break;
            case 7:
                keyPressed = this.key7;
                this.synth.osc1.frequency.value = this.freqOsc1 + freqOffset * (num - 1);
                this.synth.osc2.frequency.value = this.freqOsc2 + freqOffset * (num - 1);
                this.synth.osc3.frequency.value = this.freqOsc3 + freqOffset * (num - 1);
                break;
            case 8:
                keyPressed = this.key8;
                this.synth.osc1.frequency.value = this.freqOsc1 + freqOffset * (num - 1);
                this.synth.osc2.frequency.value = this.freqOsc2 + freqOffset * (num - 1);
                this.synth.osc3.frequency.value = this.freqOsc3 + freqOffset * (num - 1);
                break;
            case 9:
                keyPressed = this.key9;
                this.synth.osc1.frequency.value = this.freqOsc1 + freqOffset * (num - 1);
                this.synth.osc2.frequency.value = this.freqOsc2 + freqOffset * (num - 1);
                this.synth.osc3.frequency.value = this.freqOsc3 + freqOffset * (num - 1);
                break;
            case 10:
                keyPressed = this.key10;
                this.synth.osc1.frequency.value = this.freqOsc1 + freqOffset * (num - 1);
                this.synth.osc2.frequency.value = this.freqOsc2 + freqOffset * (num - 1);
                this.synth.osc3.frequency.value = this.freqOsc3 + freqOffset * (num - 1);
                break;
            case 11:
                keyPressed = this.key11;
                this.synth.osc1.frequency.value = this.freqOsc1 + freqOffset * (num - 1);
                this.synth.osc2.frequency.value = this.freqOsc2 + freqOffset * (num - 1);
                this.synth.osc3.frequency.value = this.freqOsc3 + freqOffset * (num - 1);
                break;
            case 12:
                keyPressed = this.key12;
                this.synth.osc1.frequency.value = this.freqOsc1 + freqOffset * (num - 1);
                this.synth.osc2.frequency.value = this.freqOsc2 + freqOffset * (num - 1);
                this.synth.osc3.frequency.value = this.freqOsc3 + freqOffset * (num - 1);
                break;
            case 13:
                keyPressed = this.key13;
                this.synth.osc1.frequency.value = this.freqOsc1 + freqOffset * (num - 1);
                this.synth.osc2.frequency.value = this.freqOsc2 + freqOffset * (num - 1);
                this.synth.osc3.frequency.value = this.freqOsc3 + freqOffset * (num - 1);
                break;
            case 14:
                keyPressed = this.key14;
                this.synth.osc1.frequency.value = this.freqOsc1 + freqOffset * (num - 1);
                this.synth.osc2.frequency.value = this.freqOsc2 + freqOffset * (num - 1);
                this.synth.osc3.frequency.value = this.freqOsc3 + freqOffset * (num - 1);
                break;
            case 15:
                keyPressed = this.key15;
                this.synth.osc1.frequency.value = this.freqOsc1 + freqOffset * (num - 1);
                this.synth.osc2.frequency.value = this.freqOsc2 + freqOffset * (num - 1);
                this.synth.osc3.frequency.value = this.freqOsc3 + freqOffset * (num - 1);
                break;
            case 16:
                keyPressed = this.key16;
                this.synth.osc1.frequency.value = this.freqOsc1 + freqOffset * (num - 1);
                this.synth.osc2.frequency.value = this.freqOsc2 + freqOffset * (num - 1);
                this.synth.osc3.frequency.value = this.freqOsc3 + freqOffset * (num - 1);
                break;
        }

        let me = this;
        keyPressed.el.style.backgroundColor = '#efed1f';
        this.synth.osc1.start();
        this.synth.osc2.start();
        this.synth.osc3.start();
        this.synth.noise.start();
        setTimeout(function() {
            keyPressed.el.style.backgroundColor = '#5f5e26';
            me.synth.osc1.stop();
            me.synth.osc2.stop();
            me.synth.osc3.stop();
            me.synth.noise.stop();
        }, me.noteDuration);


    }

    delay(ms: number) {
        console.log('delay');
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    shuffle(array) {
        let currentIndex = array.length, temporaryValue, randomIndex;

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

        console.log('randomSequence');

        this.sequencerEnabled = false;
        this.shuffle(this.stepsArray);

        this.sequencerEnabled = true;

    }

    reverseSequence() {

        console.log('reverseSequence');

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
