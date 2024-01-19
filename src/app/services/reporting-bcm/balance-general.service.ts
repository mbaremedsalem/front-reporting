import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BalancedetailleModel } from 'src/app/core/model/balancedetaille.model';
import { environment } from 'src/environments/environment';
const API_BALANCE_DETAILLE_URL = environment.baseUrl + 'balance_detailee';
@Injectable({
  providedIn: 'root'
})
export class BalanceGeneralService {

  constructor(private http: HttpClient) { }

  getAllBalancedetaille(): Observable<BalancedetailleModel[]> {
    return this.http.get<any[]>(API_BALANCE_DETAILLE_URL);

  }

}
