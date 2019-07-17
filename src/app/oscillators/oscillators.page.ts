import {Component} from '@angular/core';
import {SynthService} from '../synth.service';
import {FilePath} from '@ionic-native/file-path/ngx';
import {FileChooser} from '@ionic-native/file-chooser/ngx';
import {NativeAudio} from '@ionic-native/native-audio/ngx';

@Component({
    selector: 'app-oscillators',
    templateUrl: 'oscillators.page.html',
    styleUrls: ['oscillators.page.scss']
})
export class OscillatorsPage {

    osc1Freq: any = this.synth.osc1Freq;
    osc1FreqFine: any = this.osc1Freq;
    minFineOsc1Freq: any = this.osc1Freq - 150;
    maxFineOsc1Freq: any = this.osc1Freq + 150;
    osc1Waveform: any = this.synth.osc1Waveform;
    osc1On: Boolean = false;
    osc2Freq: any = this.synth.osc2Freq;
    osc2FreqFine: any = this.osc2Freq;
    minFineOsc2Freq: any = this.osc2Freq - 150;
    maxFineOsc2Freq: any = this.osc2Freq + 150;
    osc2Waveform: any = this.synth.osc2Waveform;
    osc2On: Boolean = false;
    osc3Freq: any = this.synth.osc3Freq;
    osc3FreqFine: any = this.osc3Freq;
    minFineOsc3Freq: any = this.osc3Freq - 150;
    maxFineOsc3Freq: any = this.osc3Freq + 150;
    osc3Waveform: any = this.synth.osc3Waveform;
    osc3On: Boolean = false;
    noiseType: any = this.synth.noiseType;
    noiseOn: Boolean = false;

    player: any;
    playActive: Boolean = false;
    sampleUploaded: Boolean = false;
    sampleReversed: Boolean = false;
    sampleURI: any;

    constructor(private synth: SynthService, private fileChooser: FileChooser, private filePath: FilePath, private nativeAudio: NativeAudio) {
        console.log('constructor OscillatorsPage');
        console.log(synth);
    }

    changeFreq(osc) {
        switch (osc) {
            case 1:
                this.synth.osc1.frequency.value = this.osc1Freq;
                this.osc1FreqFine = this.osc1Freq;
                if (this.osc1Freq <= 150) {
                    this.minFineOsc1Freq = 20;
                    this.maxFineOsc1Freq = this.osc1Freq + 150;
                } else {
                    this.minFineOsc1Freq = this.osc1Freq - 150;
                    this.maxFineOsc1Freq = this.osc1Freq + 150;
                }
                break;
            case 2:
                this.synth.osc2.frequency.value = this.osc2Freq;
                this.osc2FreqFine = this.osc2Freq;
                if (this.osc2Freq <= 150) {
                    this.minFineOsc2Freq = 20;
                    this.maxFineOsc2Freq = this.osc2Freq + 150;
                } else {
                    this.minFineOsc2Freq = this.osc2Freq - 150;
                    this.maxFineOsc2Freq = this.osc2Freq + 150;
                }
                break;
            case 3:
                this.synth.osc3.frequency.value = this.osc3Freq;
                this.osc3FreqFine = this.osc3Freq;
                if (this.osc3Freq <= 150) {
                    this.minFineOsc3Freq = 20;
                    this.maxFineOsc3Freq = this.osc3Freq + 150;
                } else {
                    this.minFineOsc3Freq = this.osc3Freq - 150;
                    this.maxFineOsc3Freq = this.osc3Freq + 150;
                }
                break;
            default:
                break;
        }
    }

    changeFreqFine(osc) {
        switch (osc) {
            case 1:
                this.synth.osc1.frequency.value = this.osc1FreqFine;
                break;
            case 2:
                this.synth.osc2.frequency.value = this.osc2FreqFine;
                break;
            case 3:
                this.synth.osc3.frequency.value = this.osc3FreqFine;
                break;
            default:
                break;
        }
    }

    changeWaveform(osc, type) {
        console.log('changeWaveform', osc, type);
        switch (osc) {
            case 0:
                this.noiseType = type;
                this.synth.noise.type = this.noiseType;
                break;
            case 1:
                this.osc1Waveform = type;
                this.synth.osc1.type = this.osc1Waveform;
                break;
            case 2:
                this.osc2Waveform = type;
                this.synth.osc2.type = this.osc2Waveform;
                break;
            case 3:
                this.osc3Waveform = type;
                this.synth.osc3.type = this.osc3Waveform;
                break;
            default:
                break;
        }
    }

    uploadSample() {
        this.fileChooser.open()
            .then(uri => {
                console.log(uri);
                this.filePath.resolveNativePath(uri)
                    .then(filePath => {
                        console.log(filePath);
                        this.sampleURI = filePath;
                        this.sampleUploaded = true;
                        this.createSampler(this.sampleURI);
                    })
                    .catch(err => console.log(err));
            })
            .catch(e => {
                console.log(e);
                this.sampleUploaded = false;
            });
    }

    createSampler(uri) {

        console.log('createSampler()', uri.toString());

        this.nativeAudio.preloadSimple('uniqueId1', uri.toString()).then(() =>
            this.nativeAudio.loop('uniqueId1')
        );

        /*this.player = this.synth.createPlayer(uri.toString());
        //play as soon as the buffer is loaded
        this.player.autostart = true;
        this.playActive = true;
        this.player.loop = true;*/

    }

    reverseSample() {

        if (this.sampleReversed) {
            this.player.reverse = false;
            this.sampleReversed = false;
        } else {
            this.player.reverse = true;
            this.sampleReversed = true;
        }
    }

    deleteSample() {
        this.playActive = false;
        this.sampleUploaded = false;
    }

    playFile() {

        if (this.playActive) {
            this.playActive = false;
            this.player.stop();
        } else {
            this.playActive = true;
            this.player.start();
        }
    }

    stopOsc(osc) {
        console.log('stopOsc', osc);
        switch (osc) {
            case 0:
                if (this.noiseOn) {
                    this.synth.noise.stop();
                    this.noiseOn = false;
                    this.synth.noiseOn = false;
                } else {
                    this.synth.noise.start();
                    this.noiseOn = true;
                    this.synth.noiseOn = true;
                }
                break;
            case 1:
                if (this.osc1On) {
                    this.synth.osc1.stop();
                    this.osc1On = false;
                    this.synth.osc1On = false;
                } else {
                    this.synth.osc1.start();
                    this.osc1On = true;
                    this.synth.osc1On = true;
                }
                break;
            case 2:
                if (this.osc2On) {
                    this.synth.osc2.stop();
                    this.osc2On = false;
                    this.synth.osc2On = false;
                } else {
                    this.synth.osc2.start();
                    this.osc2On = true;
                    this.synth.osc2On = true;
                }
                break;
            case 3:
                if (this.osc3On) {
                    this.synth.osc3.stop();
                    this.osc3On = false;
                    this.synth.osc3On = false;
                } else {
                    this.synth.osc3.start();
                    this.osc3On = true;
                    this.synth.osc3On = true;
                }
                break;
            default:
                break;
        }
    }

}
