import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  private endpoint = 'https://formspree.io/f/xjkwvwoa';

  constructor(private http: HttpClient) {}

  sendQuote(data: any): Observable<any> {
    // Convertimos el objeto plano en un string tipo x-www-form-urlencoded
    //const body = new HttpParams({ fromObject: this.flattenData(data) });

    const headers = new HttpHeaders({
      'Accept': 'application/json'
    });

    return this.http.post(this.endpoint, data, {
      headers,
      responseType: 'text'  // Formsubmit no devuelve JSON, mejor usar 'text'
    });
  }

  private flattenData(data: any): { [key: string]: string } {
    const flat: { [key: string]: string } = {};

    for (const key in data) {
      if (Array.isArray(data[key])) {
        // Para arrays como `preferred_contact`, puedes concatenar con comas
        flat[key] = data[key].join(', ');
      } else {
        flat[key] = String(data[key]);
      }
    }

    return flat;
  }
}
