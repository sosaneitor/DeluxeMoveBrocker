import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  // Actualiza el endpoint con el correo destino
  private endpoint = 'https://formsubmit.co/f6336212e86b52b8178c98c4acf7db72';

  constructor(private http: HttpClient) {}

  sendQuote(data: any): Observable<any> {
    return this.http.post(this.endpoint, data, {
        headers: { 'Accept': 'application/json' },
        responseType: 'text'
    });
  }
}
