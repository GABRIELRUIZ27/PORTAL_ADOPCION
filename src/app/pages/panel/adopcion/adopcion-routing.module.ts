import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdopcionComponent } from './adopcion.component';

const routes: Routes = [
  {
    path: '',
    component: AdopcionComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdopcionRoutingModule { }
