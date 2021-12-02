import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { Component, OnInit } from '@angular/core';
import { EspecieService } from '../../../providers/services/especie.service';
import { FormComponent } from './form/form/form.component';
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import Swal from 'sweetalert2';


@Component({
  selector: 'app-especie',
  templateUrl: './especie.component.html',
  styleUrls: ['./especie.component.css']
})
export class EspecieComponent implements OnInit {

  especies: any[] = [];
  constructor(private especieService: EspecieService,
    private modalService: NgbModal) { }

  ngOnInit(): void {
    this.getEspecies();
  }

  getEspecies(): void {
    this.especieService.getAll$().subscribe(response => {
      console.log(response);
      this.especies = response.data || [];
    });
  }

  openModal(): any {
    const modal = this.modalService.open(FormComponent, {
      size: 'lg',
      keyboard: false,
      backdrop: 'static'
    });
    // modal.componentInstance.arreglo = item;
    modal.componentInstance.title = 'Nueva';
    modal.result.then(res => {
      if (res.success) {
        // @ts-ignore
        Swal.fire({
          title: 'Especie',
          text: `${res.message}`,
          icon: 'success',
          confirmButtonColor: '#7f264a',
          timer: 1500
        });
        this.getEspecies();
      }
    }).catch(res => {
    });
  }

  openModalEdit(item: any): any {
    const modal = this.modalService.open(FormComponent, {
      size: 'lg',
      keyboard: false,
      backdrop: 'static'
    });
    modal.componentInstance.espeId = item.espeId;
    modal.componentInstance.item = item;
    modal.componentInstance.title = 'Modificar';
    modal.result.then(res => {
      if (res.success) {
        this.getEspecies();
        //swal.fire('Especie',`${res.message}`, 'success')
        Swal.fire({
          title: 'Especie',
          text: `${res.message}`,
          icon: 'success',
          confirmButtonColor: '#7f264a',
          timer: 1500
        });
      }
    }).catch(res => {
    });
  }

  public onDelete(item: any): void {
    const ID = item.espeId;
    const mensaje = '¿ Desea eliminar? : ' + ' ' + item.espeNombre;
    if (ID) {
      Swal.fire({
        title: 'Se eliminará el registro',
        text: `${mensaje}`,
        backdrop: true,
        //animation: true,
        showCloseButton: true,
        showCancelButton: true,
        showConfirmButton: true,
        confirmButtonColor: '#7f264a',
        confirmButtonText: 'Estoy de acuerdo!',
        cancelButtonText: 'Cancelar'
      }).then((result) => {
        if (result.value) {
          this.especieService.delete$(ID).subscribe(data => {
            if (data.success) {
              Swal.fire({
                title: 'Eliminado',
                text: data.message,
                backdrop: true,
                //animation: true,
                showConfirmButton: false,
                confirmButtonColor: '#7f264a',
                timer: 1500,
              });
              this.getEspecies();
            }
          });
        }
      });
    }
  }
}

