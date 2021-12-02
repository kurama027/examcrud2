import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {ClaseComponent} from "./clase.component";

const routes: Routes = [
  {
    path: '',
    component: ClaseComponent,
    children: [
      {
        path: 'especies',
        loadChildren: () => import('src/app/pages/clase/especie/especie.module')
          .then(m => m.EspecieModule),
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClaseRoutingModule {
}
