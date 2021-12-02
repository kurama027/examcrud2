import { Component, Input, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import { EspecieService } from 'src/app/providers/services/especie.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {


  especie: any;
  @Input() item: any;
  @Input() espe_Id: any;
  @Input() title: any;
  espeId: string;
  isUpdating: boolean;
  formGroup: FormGroup;
  constructor(public activeModal: NgbActiveModal,
    private formBuilder: FormBuilder,
    private especieService: EspecieService) { }

  ngOnInit(): void {
    this.inicio();
    this.isUpdating = false;
    if (this.item) {
      this.updateData();
    } else {
      this.item = [];
      this.espe_Id = '';
    }
    console.log(this.item);
  }
  private inicio(): any {
    const controls = {
      // idEmployee: ['', [Validators.required]],
      espeNombre: ['', [Validators.required]],
      espeObservacion: ['', [Validators.required]],
      espeLugarRescate: [''],
      espeFecha: [''],

    };
    this.formGroup = this.formBuilder.group(controls);

}
save(name: any): void {
  if (this.formGroup.invalid){
    this.formGroup.markAllAsTouched();
    return;
  }
  // this.formGroup.reset();
  const save: any = {
    espeNombre:name.espeNombre,
    espeObservacion:name.espeObservacion,
    espeLugarRescate:name.espeLugarRescate,
    espeFecha:name.espeFecha
  };
  this.especieService.add$(save).subscribe(response => {
    if (response.success) {
      this.activeModal.close({ success: true, message: response.message });
    } else {
    }
  }, () => { }, () => {  });
}

update(name: any): void {
  if (this.formGroup.invalid){
    this.formGroup.markAllAsTouched();
    return;
  }
  // this.formGroup.reset();
  const save: any = {
  espeId:this.espeId,
  espeNombre:name.espeNombre,
  espeObservacion:name.espeObservacion,
  espeLugarRescate:name.espeLugarRescate,
  espeFecha:name.espeFecha
  }
  this.especieService.update$(this.espeId, save).subscribe(response => {
    if (response.success) {
      this.activeModal.close({ success: true, message: response.message });
    } else {
    }
  }, () => { }, () => {  });
}

updateData(): any {
  const data = this.item;
  this.isUpdating = true;
  this.espeId = data.espeId;
  this.formGroup.patchValue({
    espeNombre: data.espeNombre,
  espeObservacion: data.espeObservacion,
  espeLugarRescate: data.espeLugarRescate,
  espeFecha: data.espeFecha
  });
}

public func() {
  this.activeModal.close();
}

validaForm(campo: string) {
  return this.formGroup.controls[campo].errors &&
    this.formGroup.controls[campo].touched;
}

}

