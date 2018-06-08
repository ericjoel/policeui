import { Component, OnInit, EventEmitter, ViewChild } from '@angular/core';
import { map, startWith } from 'rxjs/operators';
import { PoliceService } from './police.service';
import { IDepartmentResponse } from '../../shared/models/responses/IDepartmentResponse';
import { Observable } from 'rxjs';
import { FormValidator } from '../../shared/utils/form-validator';
import { FormBuilder, Validators, FormControl } from '@angular/forms';
import { IProvinceResponse } from '../../shared/models/responses/IProvinceResponse';
import { MatSelectChange } from '@angular/material/select';
import { MatOptionSelectionChange, MatDatepicker, MAT_DATE_FORMATS, DateAdapter, MAT_DATE_LOCALE, MatDatepickerInputEvent } from '@angular/material';
import { IDistrictResponse } from '../../shared/models/responses/IDistrictResponse';
import {MomentDateAdapter} from '@angular/material-moment-adapter';

import { Moment } from 'moment';
import * as moment from 'moment';
import { Police } from '../../shared/models/Police';
import { IPoliceResponse } from '../../shared/models/responses/IPoliceResponse';
import { Router } from '@angular/router';

export const MY_FORMATS = {
  parse: {
    dateInput: 'LL',
  },
  display: {
    dateInput: 'LL',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@Component({
  selector: 'app-police',
  templateUrl: './police.component.html',
  styleUrls: ['./police.component.css'],
  providers: [ 
    {provide: MAT_DATE_LOCALE, useValue: 'es-PE'},
    {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS}, PoliceService ]
})
export class PoliceComponent extends FormValidator implements OnInit {

  public startDateControl = new FormControl(moment());
  public endDateControl = new FormControl(moment().add(1, 'years'));
  public maxDate              : Date;

  public disabledDepartment   :boolean = false;
  public disabledPolice       :boolean = false;
  public disabledDistrict     :boolean = false;

  public isSavingPolice: boolean;

  public policeErrorMessage: string;

  filteredOptionsDepartment: Observable<IDepartmentResponse[]>;
  departments: IDepartmentResponse[];

  filteredOptionsProvince: Observable<IProvinceResponse[]>;
  provinces: IProvinceResponse[];

  filteredOptionsDistrict: Observable<IDistrictResponse[]>;
  districts: IDistrictResponse[];

  formErrors = {
    'departmentControl': '',
    'districtControl': '',
    'provinceControl': '',
    'startDateControl': '',
    'endDateControl': ''
  };

  validationMessages = {
    'departmentControl': {
      'required': 'campo requerido'
    },
    'districtControl': {
      'required': 'campo requerido'
    },
    'provinceControl': {
      'required': 'campo requerido'
    },
    'startDateControl': {
      'required': 'campo requerido'
    },
    'endDateControl': {
      'required': 'campo requerido'
    }
  };


  constructor(_fb: FormBuilder, private _policeService: PoliceService,
    private _router: Router) { 
    super();
    this.maxDate = new Date(Date.now());
    
    this.form = _fb.group({
      departmentControl: [
        null,
        Validators.compose([
          Validators.required
        ]),
      ],
      districtControl: [
        null,
        Validators.compose([
          Validators.required
        ]),
      ],
      provinceControl: [
        null,
        Validators.compose([
          Validators.required
        ]),
      ],
      startDateControl: [
        null,
        Validators.compose([
          Validators.required
        ]),
      ],
      endDateControl: [
        null,
        Validators.compose([
          Validators.required
        ]),
      ]
    });

    this.form.controls['startDateControl'].disable();
    this.form.controls['endDateControl'].disable();
    
    this.form.valueChanges.subscribe(
      data => { this.onValueChanged(data); }
    );
  }

  ngOnInit() {
    this._policeService.getDepartments().subscribe(
      (data : IDepartmentResponse[]) => {
        this.departments = data;
        this.filteredOptionsDepartment = this.form.controls['departmentControl'].valueChanges.pipe(
          startWith<string | IDepartmentResponse>(''),
          map(value => typeof value === 'string' ? value : value.Name),
          map(name => this.departments.slice())
        );
      },
      error => {
        if (error.status == 0)
          this.policeErrorMessage = "No hay conexión con el servidor, contacte al administrador.";
        else if (error.status == 404)
          this.policeErrorMessage = "No se encontraron departamentos";
        else 
          this.policeErrorMessage = "Ha ocurrido un error, vuelva a intentar más tarde.";
      },
      () => {

      });
  }

  changeDepartment(event: MatOptionSelectionChange, department: IDepartmentResponse) {
    if (event.source.selected) {
      this.districts = [];
      this.filteredOptionsDistrict = this.form.controls['districtControl'].valueChanges.pipe(
        startWith<string | IDistrictResponse>(''),
        map(value => typeof value === 'string' ? value : value.Name),
        map(name => this.districts.slice())
      );

      this._policeService.getProvinces(department.Id).subscribe(
        (data: IProvinceResponse[]) => 
          { 
            this.provinces = data;
            this.filteredOptionsProvince = this.form.controls['provinceControl'].valueChanges.pipe(
              startWith<string | IProvinceResponse>(''),
              map(value => typeof value === 'string' ? value : value.Name),
              map(name => this.provinces.slice())
            );
          },
          error => {
            if (error.status == 0)
              this.policeErrorMessage = "No hay conexión con el servidor, contacte al administrador.";
            else if (error.status == 404)
              this.policeErrorMessage = "No se encontraron provincias";
            else 
              this.policeErrorMessage = "Ha ocurrido un error, vuelva a intentar más tarde.";
          }
      );
    }
  }

  changeProvince(event: MatOptionSelectionChange, province: IDistrictResponse) {
    if (event.source.selected) {
      this._policeService.getDistricts(province.Id).subscribe(
        (data: IDistrictResponse[]) => 
          { 
            this.districts = data;
            this.filteredOptionsDistrict = this.form.controls['districtControl'].valueChanges.pipe(
              startWith<string | IDistrictResponse>(''),
              map(value => typeof value === 'string' ? value : value.Name),
              map(name => this.districts.slice())
            );
          },
          error => {
            if (error.status == 0)
              this.policeErrorMessage = "No hay conexión con el servidor, contacte al administrador.";
            else if (error.status == 404)
              this.policeErrorMessage = "No se encontraron distritos";
            else 
              this.policeErrorMessage = "Ha ocurrido un error, vuelva a intentar más tarde.";
          }
      );
    }
  }

  changeStartDate(event: MatDatepickerInputEvent<Moment>){
    var fechaFinal = event.value;
    fechaFinal = fechaFinal.add(1, 'years')
    this.form.controls['endDateControl'].setValue(fechaFinal);
  }

  savePolice(e: Event) {
    e.preventDefault();
    this.form.updateValueAndValidity();

    if (this.form.invalid || this.isSavingPolice) {      
      return;
    }

    this.isSavingPolice = true;
    var startDate = this.startDateControl.value as Moment;
    var police = new Police();
    police.StartDate = startDate;
    police.IdDistrict = this.form.controls["districtControl"].value;
    police.IdDepartment = this.form.controls["departmentControl"].value;
    police.IdProvince = this.form.controls["provinceControl"].value;
    
    this._policeService.postPolice(police).subscribe(
      (data: IPoliceResponse) => {
        const url = `police-detail/${data.Id}`;
        this._router.navigate([url]);
      },
      (error) => {
        if (error.status == 0)
          this.policeErrorMessage = "No hay conexión con el servidor, contacte al administrador.";
        else if (error.status == 400) {
          this.policeErrorMessage = "Tiene datos inválidos en el formulario, por favor revise";
          console.log(error.message);
        }
        else 
          this.policeErrorMessage = "Ha ocurrido un error, vuelva a intentar más tarde.";                
      },
      () => { this.isSavingPolice = false; }
    );
  }

}
