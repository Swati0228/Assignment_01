import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Sensex } from '../models/sensex';

@Injectable({
  providedIn: 'root'
})
export class SensexService {

  constructor(private http: HttpClient) {}

  getSensexData(): Observable<Sensex[]> {

    return this.http
      .get<Sensex[]>('http://localhost:3000/api/sensex');
  }

}