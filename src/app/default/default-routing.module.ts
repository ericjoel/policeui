import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DefaultComponent } from './default.component';
import { PoliceComponent } from './police/police.component';
import { PoliceDetailComponent } from './police-detail/police-detail.component';

const routes: Routes = [
  {
    path: '',
    component: DefaultComponent,
    children : [{
      path: '',
      redirectTo: 'police',
      pathMatch: 'full'
    },
    {
      path: 'police',
      component: PoliceComponent
    },
    {
      path: 'police-detail/:id',
      component: PoliceDetailComponent
    }]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DefaultRoutingModule { }