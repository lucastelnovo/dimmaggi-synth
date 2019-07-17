import {Component} from '@angular/core';
import {SynthService} from '../synth.service';

@Component({
    selector: 'app-envelope',
    templateUrl: 'envelope.page.html',
    styleUrls: ['envelope.page.scss']
})
export class EnvelopePage {

    env1Destination = 'none';
    env1ActualConnection: any = 'none';
    env1Attack = this.synth.env1.attack * 100;
    env1Decay = this.synth.env1.decay * 100;
    env1Sustain = this.synth.env1.sustain * 100;
    env1Release = this.synth.env1.release * 100;
    env2Destination = 'none';
    env2Attack = this.synth.env2.attack * 100;
    env2Decay = this.synth.env2.decay * 100;
    env2Sustain = this.synth.env2.sustain * 100;
    env2Release = this.synth.env2.release * 100;

    constructor(private synth: SynthService) {
    }

    changeParam(env, param) {
        switch (env) {
            case 1:
                switch (param) {
                    case 'attack':
                        console.log('ENV1 attack: ', this.env1Attack / 100);
                        this.synth.env1.attack = this.env1Attack / 100;
                        break;
                    case 'decay':
                        this.synth.env1.decay = this.env1Decay / 100;
                        break;
                    case 'sustain':
                        this.synth.env1.sustain = this.env1Sustain / 100;
                        break;
                    case 'release':
                        this.synth.env1.release = this.env1Release / 100;
                        break;
                }
                break;
            case 2:
                switch (param) {
                    case 'attack':
                        console.log('ENV2 attack: ', this.env2Attack / 100);
                        this.synth.env2.attack = this.env2Attack / 100;
                        break;
                    case 'decay':
                        this.synth.env2.decay = this.env2Decay / 100;
                        break;
                    case 'sustain':
                        this.synth.env2.sustain = this.env2Sustain / 100;
                        break;
                    case 'release':
                        this.synth.env2.release = this.env2Release / 100;
                        break;
                }
                break;
        }
    }

    changeEnvelopeDestination(env) {
        switch (env) {
            case 1:
                this.env1ActualConnection = this.synth.getSource(this.env1Destination);
                this.synth.env1.connect(this.env1ActualConnection.volume);
        }

    }

}
