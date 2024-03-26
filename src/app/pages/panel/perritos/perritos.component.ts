import { Component, Inject, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PaginationInstance } from 'ngx-pagination';
import { NgxSpinnerService } from 'ngx-spinner';
import { MensajeService } from 'src/app/core/services/mensaje.service';
import { LoadingStates } from 'src/app/global/global';

import { Perritos } from 'src/app/models/perritos';
import * as XLSX from 'xlsx';
import { PerritosService } from 'src/app/core/services/perritos.service';
import { Genero } from 'src/app/models/genero';
import { GeneroService } from 'src/app/core/services/generos.service';

import { Tamaño } from 'src/app/models/tamaño';
import { TamañoService } from 'src/app/core/services/tamaño.service';

import { Edad } from 'src/app/models/edad';
import { EdadService } from 'src/app/core/services/edad.service';

import { Discapacidad } from 'src/app/models/discapacidad';
import { DiscapacidadService } from 'src/app/core/services/discapacidad.service';
@Component({
  selector: 'app-perritos',
  templateUrl: './perritos.component.html',
  styleUrls: ['./perritos.component.css']
})
export class PerritosComponent {

  @ViewChild('closebutton') closebutton!: ElementRef;
  @ViewChild('searchItem') searchItem!: ElementRef;

  perrito!: Perritos;
  perritoForm!: FormGroup;
  perritos: Perritos[] = [];
  perritosFilter: Perritos[] = [];
  isLoading = LoadingStates.neutro;
  genero: Genero[] = [];
  edad: Edad[] = [];
  tamano: Tamaño[] = [];
  discapacidad: Discapacidad[] = [];
  filtroGenero: any;
  filtroTamano: any;
  filtroEdad: any;
  filtroDiscapacidad: any;
  perritosFiltrados: any[] = [];
  isModalAdd = true;
  imagenAmpliada: string | null = null;
  mostrarModal = false;

  public imgPreview: string = '';
  public isUpdatingImg: boolean = false;

  constructor(
    @Inject('CONFIG_PAGINATOR') public configPaginator: PaginationInstance,
    private spinnerService: NgxSpinnerService,
    private perritosService: PerritosService,
    private generoService: GeneroService,
    private tamanoService: TamañoService,
    private edadService: EdadService,
    private mensajeService: MensajeService,
    private formBuilder: FormBuilder,
    private discapacidadService: DiscapacidadService,
  ) {
    this.perritosService.refreshListPerritos.subscribe(() => this.getPerritos());
    this.getPerritos();
    this.getDiscapacidades();
    this.getGenero();
    this.getTamano();
    this.getEdad();
  }

  getGenero() {
    this.generoService.getAll().subscribe({
      next: (dataFromAPI) => {
        this.genero = dataFromAPI;
        console.log('Género', this.genero);
      },
      error: (error) => {
        console.error(error);
      },
    });
  }

  getTamano() {
    this.tamanoService.getAll().subscribe({
      next: (dataFromAPI) => {
        this.tamano = dataFromAPI;
        console.log('Tamaño', this.tamano);
      },
      error: (error) => {
        console.error(error);
      },
    });
  }
 
  getEdad() {
    this.edadService.getAll().subscribe({
      next: (dataFromAPI) => {
        this.edad = dataFromAPI;
        console.log('Edad', this.edad);
      },
      error: (error) => {
        console.error(error);
      },
    });
  }

  getDiscapacidades() {
    this.discapacidadService.getAll().subscribe({
      next: (dataFromAPI) => {
        this.discapacidad = dataFromAPI;
        console.log('Discapacidades', this.discapacidad);
      },
      error: (error) => {
        console.error(error);
      },
    });
  }

  getPerritos() {
    this.isLoading = LoadingStates.trueLoading;
    this.perritosService.getAll().subscribe({
      next: (dataFromAPI) => {
        this.perritos = dataFromAPI;
        this.perritosFiltrados = this.perritos;
        this.isLoading = LoadingStates.falseLoading;
      },
      error: () => {
        this.isLoading = LoadingStates.errorLoading;
      },
    });
  }

  aplicarFiltros() {
    // Implementa la lógica para aplicar los filtros
    console.log("Filtro de género:", this.filtroGenero);
    console.log("Filtro de tamaño:", this.filtroTamano);
    console.log("Filtro de edad:", this.filtroEdad);
    console.log("Filtro de discapacidad:", this.filtroDiscapacidad);

    this.perritosFiltrados = this.perritos.filter(perrito => {
      // Implementa la lógica de filtrado aquí
      let filtroGenero = !this.filtroGenero || this.sonObjetosIguales(this.filtroGenero, perrito.genero);
      let filtroTamano = !this.filtroTamano || this.sonObjetosIguales(this.filtroTamano, perrito.tamaño);
      let filtroEdad = !this.filtroEdad || this.sonObjetosIguales(this.filtroEdad, perrito.edad);
      let filtroDiscapacidad = !this.filtroDiscapacidad || this.sonObjetosIguales(this.filtroDiscapacidad, perrito.discapacidad);

      console.log("Filtros aplicados:", filtroGenero, filtroTamano, filtroEdad, filtroDiscapacidad);

      return filtroGenero && filtroTamano && filtroEdad && filtroDiscapacidad;
    });

    console.log("Perritos filtrados:", this.perritosFiltrados);
}

// Método para verificar si dos objetos son iguales
sonObjetosIguales(obj1: any, obj2: any) {
    return JSON.stringify(obj1) === JSON.stringify(obj2);
}

  limpiarFiltros() {
    this.filtroGenero = null;
    this.filtroTamano = null;
    this.filtroEdad = null;
    this.filtroDiscapacidad = null;
    this.perritosFiltrados = this.perritos;
  }
}





