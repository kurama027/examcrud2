import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import { EspecieComponent } from './especie.component';



const routes: Routes = [
  {
    path: '',
    component: EspecieComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EspecieRoutingModule {
}
