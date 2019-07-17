import {Component, OnInit} from '@angular/core';
import AudioOscilloscope from 'audio-oscilloscope';
import * as Tone from 'tone';
import {SynthService} from '../synth.service';


@Component({
    selector: 'app-oscilloscope',
    templateUrl: './oscilloscope.page.html',
    styleUrls: ['./oscilloscope.page.scss'],
})
export class OscilloscopePage implements OnInit {

    constructor(private synth: SynthService) {
    }

    ngOnInit() {
        let oscilloscope = AudioOscilloscope(document.getElementById('myCanvas'), {
            canvas: {
                width: function() {
                    return window.innerWidth;
                },
                height: 400
            },
            canvasContext: {
                lineWidth: 1,
                fillStyle: '#111111',
                strokeStyle: '#efed1f'
            }
        });

        oscilloscope.draw();
        oscilloscope.addSource(this.synth.filterMaster);

    }

}
