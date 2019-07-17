import {Component} from '@angular/core';
import {SynthService} from '../synth.service';
import * as Tone from 'tone';

@Component({
    selector: 'app-filters',
    templateUrl: 'filters.page.html',
    styleUrls: ['filters.page.scss']
})
export class FiltersPage {

    filter1Cutoff: any = this.synth.filter1.frequency.value;
    filter1Rolloff: any = '-12';
    filter1Type: any = 'lowpass';
    filter1Destination: any = 'none';
    filter2Cutoff: any = this.synth.filter2.frequency.value;
    filter2Rolloff: any = '-12';
    filter2Type: any = 'lowpass';
    filter2Destination: any = 'none';
    filterMasterCutoff: any = this.synth.filterMaster.frequency.value;
    filterMasterRolloff: any = '-12';
    filterMasterType: any = 'lowpass';
    filter1ActualConnection: any;
    filter2ActualConnection: any;

    constructor(private synth: SynthService) {
    }

    changeRolloff(filter) {
        console.log('changeRolloff', filter);
        switch (filter) {
            case 1:
                this.synth.filter1.rolloff = +this.filter1Rolloff;
                break;

        }

    }

    changeFilterType(filter) {
        console.log('changeFilterType', filter);
        switch (filter) {
            case 0:
                this.synth.filterMaster.type = this.filterMasterType;
                break;
            case 1:
                this.synth.filter1.type = this.filter1Type;
                break;
            case 2:
                this.synth.filter2.type = this.filter2Type;
                break;
        }

    }

    changeFilterDestination(filterSelected) {
        console.log('changeFilterDestination', filterSelected);
        switch (filterSelected) {
            case 1:
                if (this.filter1Destination == 'none') {
                    // Si hay una conexion previa al filtro, la saco
                    if (this.filter1ActualConnection) {
                        this.filter1ActualConnection.disconnect(this.synth.filter1);
                        this.filter1ActualConnection.connect(this.synth.filterMaster);
                        this.filter1ActualConnection = 'none';
                    }
                } else {
                    // Si el filtro ya esta conectado a otro oscilador, lo saco
                    if (this.filter1ActualConnection && this.filter1ActualConnection != 'none') {
                        this.filter1ActualConnection.disconnect(this.synth.filter1);
                        this.filter1ActualConnection.connect(this.synth.filterMaster);
                    }
                    this.filter1ActualConnection = this.synth.getSource(this.filter1Destination);
                    if (this.synth.isOn(this.filter1Destination)) {
                        // Desconecto el filtro del oscilador correspondiente
                        this.filter1ActualConnection.disconnect(this.synth.filterMaster, Tone.Master);
                    }
                    this.filter1ActualConnection.chain(this.synth.filter1, this.synth.filterMaster);
                }
                break;
            case 2:
                if (this.filter2Destination == 'none') {
                    // Si hay una conexion previa al filtro, la saco
                    if (this.filter2ActualConnection) {
                        this.filter2ActualConnection.disconnect(this.synth.filter2);
                        this.filter2ActualConnection.connect(this.synth.filterMaster);
                        this.filter2ActualConnection = 'none';
                    }
                } else {
                    // Si el filtro ya esta conectado a otro oscilador, lo saco
                    if (this.filter2ActualConnection && this.filter2ActualConnection != 'none') {
                        this.filter2ActualConnection.disconnect(this.synth.filter2);
                        this.filter2ActualConnection.connect(this.synth.filterMaster);
                    }
                    this.filter2ActualConnection = this.synth.getSource(this.filter2Destination);
                    if (this.synth.isOn(this.filter2Destination)) {
                        // Desconecto el filtro del oscilador correspondiente
                        this.filter2ActualConnection.disconnect(this.synth.filterMaster, Tone.Master);
                    }
                    this.filter2ActualConnection.chain(this.synth.filter2, this.synth.filterMaster);
                }
                break;
        }
    }

    changeCutoffFreq(filter) {
        console.log('changeCutoffFreq', filter);
        switch (filter) {
            case 0: // Master filter
                this.synth.filterMaster.frequency.value = this.filterMasterCutoff;
                break;
            case 1:
                this.synth.filter1.frequency.value = this.filter1Cutoff;
                break;
            case 2:
                this.synth.filter2.frequency.value = this.filter2Cutoff;
                break;
        }
    }
}
