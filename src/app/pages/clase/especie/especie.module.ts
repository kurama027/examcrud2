import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ReactiveFormsModule} from "@angular/forms";
import {EspecieRoutingModule} from "./especie-routing.module"
import { FormComponent } from './form/form/form.component';
import { EspecieService } from 'src/app/providers/services/especie.service';
import { EspecieComponent } from './especie.component';



@NgModule({
  declarations: [
    EspecieComponent,
    FormComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    EspecieRoutingModule
  ],
  providers: [EspecieService], // Los servicios se ponen en providers
})
export class EspecieModule { }
