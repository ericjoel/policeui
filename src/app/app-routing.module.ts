import { NgModule } from '@angular/core';
import { RouterModule , Routes } from '@angular/router';
import { DefaultModule } from './default/default.module';

const appRoutes: Routes = [
    {
        path: '',
        loadChildren: () => DefaultModule,
    }
    
];
@NgModule({
    imports: [
        RouterModule.forRoot(appRoutes)
    ],
    exports: [
        RouterModule
    ]
})
export class AppRoutingModule { }