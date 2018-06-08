import { NgModule } from '@angular/core';

import { DefaultRoutingModule } from './default-routing.module';
import { DefaultComponent } from './default.component';
import { NavbarComponent } from './layout/navbar/navbar.component';
import { SharedModule } from '../shared/shared.module';
import { CommonModule } from '@angular/common';
import { PoliceComponent } from './police/police.component';
import { PoliceDetailComponent } from './police-detail/police-detail.component';

@NgModule({
  imports: [
    SharedModule,
    CommonModule,    
    DefaultRoutingModule,
  ],
  declarations: [DefaultComponent, PoliceComponent, NavbarComponent, PoliceDetailComponent]
})
export class DefaultModule { }
