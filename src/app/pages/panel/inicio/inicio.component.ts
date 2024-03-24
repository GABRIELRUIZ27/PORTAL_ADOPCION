import { Component } from '@angular/core';
import { AppUserAuth } from 'src/app/models/login';
import { SecurityService } from 'src/app/core/services/security.service';
import * as Highcharts from 'highcharts';
import { DashboardService } from 'src/app/core/services/dashboard.service';
import HC_exporting from 'highcharts/modules/exporting';
HC_exporting(Highcharts);


interface PointOptionsWithTotal extends Highcharts.PointOptionsObject {
  totalItems: number;
}

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent {

  Highcharts: typeof Highcharts = Highcharts;
  optionsBeneficiariosPorProgramaSocial: Highcharts.Options = {};
  optionsSimpatizantesPorProgramaSocial: Highcharts.Options = {};
  optionssimpatizantesPoEdad: Highcharts.Options = {};
  optionssimpatizantesPorGenero: Highcharts.Options = { };
  optionsNubePalabras: Highcharts.Options = {};
  dataObject!: AppUserAuth | null;

  totalAdopciones: number = 0;
  porcentaje: number = 0;

  constructor(
    private securityService: SecurityService,
    private dashboardService: DashboardService
    ) 
    {
    this.dashboardService.getTotalAdopciones().subscribe(total => {
      this.totalAdopciones = total;
      this.calcularPorcentaje();
    });  
    this.getTotalPerritosEdad();
    this.getTotalPerritosTamano();
    this.getTotalPerritosGenero();
    this.getTotalPerritosDiscapacidad();
    localStorage.getItem('dataObject') && this.setDataUser();
    }

  setDataUser() {
    this.dataObject = this.securityService.getDataUser();
  }

  calcularPorcentaje() {
    this.porcentaje = (this.totalAdopciones / 10) * 100;
  }

  getTotalPerritosEdad() {
    const container = document.getElementById('container-perritos-por-edad');
    if (container) {
      container.style.display = 'none';
    }

    this.dashboardService.getTotalPerritosEdad().subscribe({
      next: (dataFromAPI) => {
        const hasData = dataFromAPI && dataFromAPI.length > 0;

        if (hasData) {
          this.optionsSimpatizantesPorProgramaSocial = {
            chart: {
              type: 'pie',
              renderTo: 'container-perritos-por-edad'
            },
            title: {
              text: 'Perritos por edad',
              align: 'left'
            },
            credits: {
              enabled: false
            },
            subtitle: {
              text: ''
            },
            plotOptions: {
              pie: {
                innerSize: 100,
                depth: 45
              }
            },
            colors: ['#FF5733', '#FFC300', '#C70039', '#900C3F', '#581845'], // Colores personalizados
            series: [{
              type: 'pie',
              name: ' ',
              data: dataFromAPI.map((d) => ({ name: d.nombre, y: d.totalPerritos }))
            }]
          };

          if (container) {
            container.style.display = 'block';
          }

          Highcharts.chart('container-perritos-por-edad', this.optionsSimpatizantesPorProgramaSocial);
        } else {
          if (container) {
            container.innerHTML = '<h2 class="page-title">Sin datos</h2>';
            container.style.display = 'block';
          }
        }
      }
    });
  }

  getTotalPerritosTamano() {
    const container = document.getElementById('container-perritos-por-tamano');
    if (container) {
      container.style.display = 'none';
    }

    this.dashboardService.getTotalPerritosTamaño().subscribe({
      next: (dataFromAPI) => {
        const hasData = dataFromAPI && dataFromAPI.length > 0;

        if (hasData) {
          this.optionsSimpatizantesPorProgramaSocial = {
            chart: {
              type: 'pie',
              renderTo: 'container-perritos-por-tamano'
            },
            title: {
              text: 'Perritos por tamaño',
              align: 'left'
            },
            credits: {
              enabled: false
            },
            subtitle: {
              text: ''
            },
            plotOptions: {
              pie: {
                innerSize: 100,
                depth: 45
              }
            },
            colors: ['#3498DB', '#2ECC71', '#F1C40F', '#E74C3C', '#8E44AD'], // Colores personalizados
            series: [{
              type: 'pie',
              name: ' ',
              data: dataFromAPI.map((d) => ({ name: d.nombre, y: d.totalPerritos }))
            }]
          };

          if (container) {
            container.style.display = 'block';
          }

          Highcharts.chart('container-perritos-por-tamano', this.optionsSimpatizantesPorProgramaSocial);
        } else {
          if (container) {
            container.innerHTML = '<h2 class="page-title">Sin datos</h2>';
            container.style.display = 'block';
          }
        }
      }
    });
  }

  getTotalPerritosGenero() {
    const container = document.getElementById('container-perritos-por-genero');
    if (container) {
      container.style.display = 'none';
    }

    this.dashboardService.getTotalPerritosGenero().subscribe({
      next: (dataFromAPI) => {
        const hasData = dataFromAPI && dataFromAPI.length > 0;

        if (hasData) {
          this.optionsSimpatizantesPorProgramaSocial = {
            chart: {
              type: 'pie',
              renderTo: 'container-perritos-por-genero'
            },
            title: {
              text: 'Perritos por genero',
              align: 'left'
            },
            credits: {
              enabled: false
            },
            subtitle: {
              text: ''
            },
            plotOptions: {
              pie: {
                innerSize: 100,
                depth: 45
              }
            },
            colors: ['#9B59B6', '#34495E', '#27AE60', '#F39C12', '#E74C3C'], // Colores personalizados
            series: [{
              type: 'pie',
              name: ' ',
              data: dataFromAPI.map((d) => ({ name: d.nombre, y: d.totalPerritos }))
            }]
          };

          if (container) {
            container.style.display = 'block';
          }

          Highcharts.chart('container-perritos-por-genero', this.optionsSimpatizantesPorProgramaSocial);
        } else {
          if (container) {
            container.innerHTML = '<h2 class="page-title">Sin datos</h2>';
            container.style.display = 'block';
          }
        }
      }
    });
  }

  getTotalPerritosDiscapacidad() {
    const container = document.getElementById('container-perritos-por-discapacidad');
    if (container) {
      container.style.display = 'none';
    }

    this.dashboardService.getTotalPerritosDiscapacidad().subscribe({
      next: (dataFromAPI) => {
        const hasData = dataFromAPI && dataFromAPI.length > 0;

        if (hasData) {
          this.optionsSimpatizantesPorProgramaSocial = {
            chart: {
              type: 'pie',
              renderTo: 'container-perritos-por-discapacidad'
            },
            title: {
              text: 'Perritos por discapacidad',
              align: 'left'
            },
            credits: {
              enabled: false
            },
            subtitle: {
              text: ''
            },
            plotOptions: {
              pie: {
                innerSize: 100,
                depth: 45
              }
            },
            colors: ['#8BC34A','#E91E63', '#FFC107', '#00BCD4', '#FF5722'], // Colores personalizados diferentes
            series: [{
              type: 'pie',
              name: ' ',
              data: dataFromAPI.map((d) => ({ name: d.nombre, y: d.totalPerritos }))
            }]
          };

          if (container) {
            container.style.display = 'block';
          }

          Highcharts.chart('container-perritos-por-discapacidad', this.optionsSimpatizantesPorProgramaSocial);
        } else {
          if (container) {
            container.innerHTML = '<h2 class="page-title">Sin datos</h2>';
            container.style.display = 'block';
          }
        }
      }
    });
  }
}

