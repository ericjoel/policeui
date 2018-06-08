// Angular
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from '../../../environments/environment';
import { Police } from '../../shared/models/Police';

const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json'
    })
  };

@Injectable()
export class PoliceService {
    private _baseUrl = environment.apiUrl;

    constructor(private _http: HttpClient) { }

    getPoliceById(idPolice: string) {
        return this._http.get(`${this._baseUrl}polices/${idPolice}`);
    }

    postPolice(police: Police) {
        var dataSend = {
            'StartDate': police.StartDate.add(-5, 'hours').format("MM-DD-YYYY"),
            'IdDistrict': police.IdDistrict,
            'IdDepartment': police.IdDepartment,
            'IdProvince': police.IdProvince
        };

        return this._http.post(`${this._baseUrl}polices`, dataSend, httpOptions);
    }
    
    getDistricts(idProvince: string) {
        return this._http.get(`${this._baseUrl}address/districts/${idProvince}`);
    }

    getDepartments() {
        return this._http.get(this._baseUrl + 'address/departments');
    }

    getProvinces(idDepartment: string) {
        return this._http.get(`${this._baseUrl}address/provinces/${idDepartment}`);
    }
}