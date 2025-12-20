import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { IonicModule } from "@ionic/angular";

import { StartupModalComponent } from "./startup-modal.component";

@NgModule({
  imports: [CommonModule, IonicModule],
  declarations: [StartupModalComponent],
  entryComponents: [StartupModalComponent],
})
export class StartupModalModule {}
