import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DefaultRoutingModule } from './default-routing.module';
import { NavbarComponent } from './layout/navbar/navbar.component';

@NgModule({
  imports: [
    CommonModule,
    DefaultRoutingModule
  ],
  declarations: [NavbarComponent]
})
export class DefaultModule { }
