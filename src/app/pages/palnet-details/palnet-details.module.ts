import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PalnetDetailsPageRoutingModule } from './palnet-details-routing.module';

import { PalnetDetailsPage } from './palnet-details.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PalnetDetailsPageRoutingModule
  ],
  declarations: [PalnetDetailsPage]
})
export class PalnetDetailsPageModule {}
