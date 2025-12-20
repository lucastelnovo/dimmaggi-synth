import { Component } from "@angular/core";
import { SynthService } from "../synth.service";
import { ModalController } from "@ionic/angular";
import { StartupModalComponent } from "../startup-modal/startup-modal.component";

@Component({
  selector: "app-mixer",
  templateUrl: "./mixer.page.html",
  styleUrls: ["./mixer.page.scss"],
})
export class MixerPage {
  osc1Vol: any = this.synth.osc1.volume.value;
  osc2Vol: any = this.synth.osc2.volume.value;
  osc3Vol: any = this.synth.osc3.volume.value;
  noiseVol: any = this.synth.noise.volume.value;
  /*playerVol: any = this.synth.player.volume.value;*/
  muted1: Boolean = false;
  muted2: Boolean = false;
  muted3: Boolean = false;
  muted4: Boolean = false;
  muted5: Boolean = false;
  fxOrMix: any = "mix";
  reverbRoomSize: any = this.synth.reverb.roomSize.value;
  delayTime: any = this.synth.delay.delayTime.value;
  feedback: any = this.synth.delay.feedback.value;
  autofilterEnabled: boolean;
  autofilterSpeed: any = this.synth.autofilter.frequency.value;
  phaserSpeed: any = this.synth.phaser.frequency.value;
  chorusSpeed: any = this.synth.chorus.frequency.value;
  modalShown = false;

  constructor(private synth: SynthService, private modalCtrl: ModalController) {
    this.autofilterEnabled = false;
    this.mute(2);
    this.mute(3);
    this.mute(4);
  }

  async ionViewDidEnter() {
    if (!this.modalShown) {
      this.modalShown = true;
      await this.presentStartupModal();
    }
  }

  async presentStartupModal() {
    const modal = await this.modalCtrl.create({
      cssClass: "startup-modal",
      component: StartupModalComponent,
      backdropDismiss: false, // important for audio
    });

    await modal.present();
  }

  mute(channel) {
    switch (channel) {
      case 1:
        if (this.synth.osc1.mute) {
          this.synth.osc1.mute = false;
          this.muted1 = false;
        } else {
          this.synth.osc1.mute = true;
          this.muted1 = true;
        }
        break;
      case 2:
        if (this.synth.osc2.mute) {
          this.synth.osc2.mute = false;
          this.muted2 = false;
        } else {
          this.synth.osc2.mute = true;
          this.muted2 = true;
        }
        break;
      case 3:
        if (this.synth.osc3.mute) {
          this.synth.osc3.mute = false;
          this.muted3 = false;
        } else {
          this.synth.osc3.mute = true;
          this.muted3 = true;
        }
        break;
      case 4:
        if (this.synth.noise.mute) {
          this.synth.noise.mute = false;
          this.muted4 = false;
        } else {
          this.synth.noise.mute = true;
          this.muted4 = true;
        }
        break;
      case 5:
        if (this.synth.sample.mute) {
          this.synth.sample.mute = false;
          this.muted5 = false;
        } else {
          this.synth.sample.mute = true;
          this.muted5 = true;
        }
        break;
    }
  }

  changeVol(osc) {
    switch (osc) {
      case 0:
        this.synth.noise.volume.value = this.noiseVol;
        break;
      case 1:
        this.synth.osc1.volume.value = this.osc1Vol;
        break;
      case 2:
        this.synth.osc2.volume.value = this.osc2Vol;
        break;
      case 3:
        this.synth.osc3.volume.value = this.osc3Vol;
        break;
      case 4:
        /*this.synth.player.volume.value = this.playerVol;*/
        break;
      default:
        break;
    }
  }

  changeDelayFeedback() {
    this.synth.delay.feedback.value = this.feedback / 100;
  }

  changeDelayTime() {
    this.synth.delay.delayTime.value = this.delayTime / 100;
  }

  changeReverbRoom() {
    this.synth.reverb.roomSize.value = this.reverbRoomSize / 100;
  }

  changeAutofilter() {
    this.synth.autofilter.frequency.value = this.autofilterSpeed;
  }

  changePhaser() {
    this.synth.phaser.frequency.value = this.phaserSpeed;
  }

  changeChorus() {
    this.synth.phaser.frequency.value = this.chorusSpeed;
  }
}
