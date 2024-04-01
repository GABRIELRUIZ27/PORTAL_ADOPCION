import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PerritosComponent } from './perritos.component';

const routes: Routes = [
  {
    path: '',
    component: PerritosComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PerritosRoutingModule { }
