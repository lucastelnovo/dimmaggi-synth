import { IonicModule } from "@ionic/angular";
import { RouterModule } from "@angular/router";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { MixerPage } from "./mixer.page";
import { StartupModalModule } from "../startup-modal/startup-modal.module";

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    StartupModalModule,
    RouterModule.forChild([{ path: "", component: MixerPage }]),
  ],
  declarations: [MixerPage],
})
export class MixerPageModule {}
