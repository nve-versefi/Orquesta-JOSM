// integrantes.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class IntegrantesService {
  private  apiBaseUrl = environment.apiUrl; 
  private apiMusicos = `${this.apiBaseUrl}/integrantes`;
  private apiDirectiva = `${this.apiBaseUrl}/directiva`;
  private apiInfo = `${this.apiBaseUrl}/info`;
  private apiGaleria = `${this.apiBaseUrl}/galeria`;
  private apiEventos = `${this.apiBaseUrl}/eventos`;

  constructor(private http: HttpClient) {}

  
  obtenerMusicos(): Observable<any[]> {
    return this.http.get<any[]>(this.apiMusicos)
      .pipe(
        catchError(error => {
          console.error('Error en la solicitud HTTP:', error);
          throw error; // Puedes personalizar esto según tus necesidades
        })
      );
  }

  
  obtenerDirectiva(): Observable<any[]> {
    return this.http.get<any[]>(this.apiDirectiva)
      .pipe(
        catchError(error => {
          console.error('Error en la solicitud HTTP:', error);
          throw error; // Puedes personalizar esto según tus necesidades
        })
      );
  }

  obtenerInfo(): Observable<any[]> {
    return this.http.get<any[]>(this.apiInfo)
      .pipe(
        catchError(error => {
          console.error('Error en la solicitud HTTP:', error);
          throw error; // Puedes personalizar esto según tus necesidades
        })
      );
  }

  
  obtenerGaleria(): Observable<any[]> {
    return this.http.get<any[]>(this.apiGaleria)
      .pipe(
        catchError(error => {
          console.error('Error en la solicitud HTTP:', error);
          throw error; // Puedes personalizar esto según tus necesidades
        })
      );
  }

  obtenerEventos(): Observable<any[]> {
    return this.http.get<any[]>(this.apiEventos)
      .pipe(
        catchError(error => {
          console.error('Error en la solicitud HTTP:', error);
          throw error; // Puedes personalizar esto según tus necesidades
        })
      );
  }
}



