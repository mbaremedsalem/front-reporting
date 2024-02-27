import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BalancedetailleModel } from 'src/app/core/model/balancedetaille.model';
import { environment } from 'src/environments/environment';
const API_BALANCE_GENERALE_URL = environment.mybaseurl + 'get-balance-generale/';
const API_BALANCE_DETAILLE_URL = environment.mybaseurl + 'get-balance-detaile/';

@Injectable({
  providedIn: 'root'
})
export class BalanceGeneralService {

  constructor(private http: HttpClient) { }

  getAllBalangeneralle(): Observable<BalancedetailleModel[]> {
    //const headers = new HttpHeaders().set('Authorization','JWT '+localStorage.getItem('access'));
    return this.http.get<any[]>(API_BALANCE_GENERALE_URL);
  }


  getAllBalancedetaille():Observable<BalancedetailleModel[]> {
    //const headers = new HttpHeaders().set('Authorization','JWT '+localStorage.getItem('access'));
    return this.http.get<any[]>(API_BALANCE_DETAILLE_URL);
  }


}
