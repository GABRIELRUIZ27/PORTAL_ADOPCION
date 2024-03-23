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


  constructor(
    private securityService: SecurityService,
    private dashboardService: DashboardService
    ) 
    {
    this.getTotalPerritosEdad();
    this.getTotalPerritosTamano();
    this.getTotalPerritosGenero();
    localStorage.getItem('dataObject') && this.setDataUser();
    }

  setDataUser() {
    this.dataObject = this.securityService.getDataUser();
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
            series: [{
              type: 'pie',
              name: ' ',
              data: dataFromAPI.map((d) => ({ name: d.nombre, y: d.totalPerritos }))
            }]
          };

          if (container) {
            container.style.display = 'block';
          }

          Highcharts.chart('container-perritos-por-edad', this.optionsSimpatizantesPorProgramaSocial); console.log('dnji', this.optionsSimpatizantesPorProgramaSocial)
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
            series: [{
              type: 'pie',
              name: ' ',
              data: dataFromAPI.map((d) => ({ name: d.nombre, y: d.totalPerritos }))
            }]
          };

          if (container) {
            container.style.display = 'block';
          }

          Highcharts.chart('container-perritos-por-tamano', this.optionsSimpatizantesPorProgramaSocial); console.log('dnji', this.optionsSimpatizantesPorProgramaSocial)
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
            series: [{
              type: 'pie',
              name: ' ',
              data: dataFromAPI.map((d) => ({ name: d.nombre, y: d.totalPerritos }))
            }]
          };

          if (container) {
            container.style.display = 'block';
          }

          Highcharts.chart('container-perritos-por-genero', this.optionsSimpatizantesPorProgramaSocial); console.log('dnji', this.optionsSimpatizantesPorProgramaSocial)
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

