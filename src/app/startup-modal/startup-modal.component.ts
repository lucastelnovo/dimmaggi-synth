import { Component } from "@angular/core";
import { ModalController } from "@ionic/angular";
import * as Tone from "tone";

@Component({
  selector: "app-startup-modal",
  templateUrl: "./startup-modal.component.html",
})
export class StartupModalComponent {
  constructor(private modalCtrl: ModalController) {}

  async start() {
    await Tone.start(); // REQUIRED user interaction
    console.log("Audio started");
    this.modalCtrl.dismiss();
  }
}
