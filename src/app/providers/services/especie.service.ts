import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {IResponse} from "../utils/response";
import {EntityDataService} from "../utils/entity-data.service";
import {END_POINTS} from "../utils/end-points";

@Injectable({
  providedIn: 'root'
})
export class EspecieService  extends EntityDataService<IResponse>{

  constructor(protected httpClient: HttpClient) {
    super(httpClient, END_POINTS.api+END_POINTS.admin.especie);
  }
/*
  private apiUrl: string = "http://localhost:8080/api/employee";

  constructor(private httpClient: HttpClient) { }

  listar(): Observable<IResponse>{
    const url = this.apiUrl;
    return this.httpClient.get<IResponse>(url);
  }

  public addNameData$(serviceName: any, data: any): Observable<IResponse> {
    // return this.httpClient.post<IResponse>(`${serviceName}`, data);
    return this.httpClient.post<IResponse>(this.apiUrl, data);
  }

  public updateNameIdData$(serviceName: any, id: any, data: any): Observable<IResponse> {
    //return this.httpClient.put<IResponse>(`${this.endPoint}/${serviceName}/${id}`, data);
    return this.httpClient.put<IResponse>(`${this.apiUrl}/${id}`, data);
  }*/
}
