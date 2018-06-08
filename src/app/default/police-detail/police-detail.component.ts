import { Component, OnInit } from '@angular/core';
import { IPoliceResponse } from '../../shared/models/responses/IPoliceResponse';
import { ActivatedRoute } from '@angular/router';
import { PoliceService } from '../police/police.service';

@Component({
  selector: 'app-police-detail',
  templateUrl: './police-detail.component.html',
  styleUrls: ['./police-detail.component.css'],
  providers: [ PoliceService ]
})
export class PoliceDetailComponent implements OnInit {
  id: string; 
  private sub: any;
  police: IPoliceResponse;
  detailErrorMessage: string;

  constructor(private route: ActivatedRoute,
    private policeService: PoliceService) { }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.id = params['id'];
      this.policeService.getPoliceById(this.id.toString()).subscribe(
        (data:IPoliceResponse) => 
        {
          this.police = data;          
        },
        error => {
          if (error.status == 0) {
            this.detailErrorMessage = "No hay conexión con el servidor";
          }
          else if (error.status == 404) {
            this.detailErrorMessage = "No se ha encontrado ninguna poliza con el identificador pasado por parámetro";
          }
          else {
            this.detailErrorMessage = "Ha ocurrido un error en el servidor"
          }
        }
      )
   });
  }

}
