import {Component} from '@angular/core';
import {SynthService} from '../synth.service';

@Component({
    selector: 'app-lfo',
    templateUrl: './lfo.page.html',
    styleUrls: ['./lfo.page.scss'],
})
export class LfoPage {

    lfo1Freq: any = 100;
    lfo1FreqLabel: any = this.lfo1Freq / 100;
    lfo1Amp: any = 5;
    lfo1Waveform: any = 'sine';
    lfo1Destination: any = 'none';
    lfo1Parameter: any = 'freq';
    lfo1ActualConnection: any = 'none';
    lfo2Freq: any = 100;
    lfo2FreqLabel: any = this.lfo2Freq / 100;
    lfo2Amp: any = 5;
    lfo2Waveform: any = 'sine';
    lfo2Destination: any = 'none';
    lfo2Parameter: any = 'freq';
    lfo2ActualConnection: any = 'none';
    lfo3Freq: any = 100;
    lfo3FreqLabel: any = this.lfo3Freq / 100;
    lfo3Amp: any = 5;
    lfo3Waveform: any = 'sine';
    lfo3Destination: any = 'none';
    lfo3Parameter: any = 'freq';
    lfo3ActualConnection: any = 'none';

    constructor(private synth: SynthService) {
    }

    changeWaveform(lfo, type) {
        console.log('changeWaveform', lfo, type);
        switch (lfo) {
            case 1:
                this.lfo1Waveform = type;
                this.synth.lfo1.type = this.lfo1Waveform;
                break;
            case 2:
                this.lfo2Waveform = type;
                this.synth.lfo2.type = this.lfo2Waveform;
                break;
            case 3:
                this.lfo3Waveform = type;
                this.synth.lfo3.type = this.lfo3Waveform;
                break;
            default:
                break;
        }
    }

    changeFreq(lfo) {
        switch (lfo) {
            case 1:
                this.lfo1FreqLabel = this.lfo1Freq / 100;
                this.synth.lfo1.frequency.value = this.lfo1FreqLabel;
                break;
            case 2:
                this.lfo2FreqLabel = this.lfo2Freq / 100;
                this.synth.lfo2.frequency.value = this.lfo2FreqLabel;
                break;
            case 3:
                this.lfo3FreqLabel = this.lfo3Freq / 100;
                this.synth.lfo3.frequency.value = this.lfo3FreqLabel;
                break;
            default:
                break;
        }
    }

    changeAmplitude(lfo) {
        switch (lfo) {
            case 1:
                this.synth.lfo1.amplitude.value = this.lfo1Amp;
                break;
            case 2:
                this.synth.lfo2.amplitude.value = this.lfo2Amp;
                break;
            case 3:
                this.synth.lfo3.amplitude.value = this.lfo3Amp;
                break;
            default:
                break;
        }
    }

    changeLFODestination(lfo) {
        switch (lfo) {
            case 1:
                this.synth.lfo1.disconnect();
                if (this.lfo1Destination == 'none') {
                    break;
                }
                this.lfo1ActualConnection = this.synth.getSource(this.lfo1Destination);
                if (this.lfo1Parameter == 'freq') {
                    const frequency = this.lfo1ActualConnection.frequency.value;
                    this.synth.lfo1.connect(this.lfo1ActualConnection.frequency);
                    this.lfo1ActualConnection.frequency.value = frequency;
                }
                break;
            case 2:
                this.synth.lfo2.disconnect();
                if (this.lfo2Destination == 'none') { // desactivo el LFO
                    break;
                }
                this.lfo2ActualConnection = this.synth.getSource(this.lfo2Destination);
                if (this.lfo2Parameter == 'freq') {
                    const frequency = this.lfo2ActualConnection.frequency.value;
                    this.synth.lfo2.connect(this.lfo2ActualConnection.frequency);
                    this.lfo2ActualConnection.frequency.value = frequency;
                }
                break;
            case 3:
                this.synth.lfo3.disconnect();
                if (this.lfo3Destination == 'none') { // desactivo el LFO
                    break;
                }
                this.lfo3ActualConnection = this.synth.getSource(this.lfo3Destination);
                if (this.lfo3Parameter == 'freq') {
                    const frequency = this.lfo3ActualConnection.frequency.value;
                    this.synth.lfo3.connect(this.lfo3ActualConnection.frequency);
                    this.lfo3ActualConnection.frequency.value = frequency;
                }
                break;

            default:
                break;
        }
    }

}
