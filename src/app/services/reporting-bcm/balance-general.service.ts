import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BalanceGeneralService {

  constructor(private http: HttpClient) { }



  getBalanceAnnuel(): Observable<any[]> {
    
    return this.http.get<any[]>(`${environment.baseUrl}avis-by-admin/${localStorage.getItem('id')}/`);
  }
 
}
