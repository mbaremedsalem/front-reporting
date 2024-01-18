import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BalancedetailleModel } from '../core/model/balancedetaille.model';
import { environment } from 'src/environments/environment';

const API_BALANCE_DETAILLE_URL = environment.baseUrl + '/etatBCM/EtatBCM_BalanceDetaillee';
const API_BALANCE_DETAILLE_MENSUEL_URL = environment.baseUrl + '/etatBCM/EtatBCM_BalanceDetaillee_Mensuel';
const API_BALANCE_DETAILLE_ANNUEL_URL = environment.baseUrl + '/etatBCM/EtatBCM_BalanceDetaillee_Annuel';
const API_UPDATE_BALANCE_DETAILLE_URL = environment.baseUrl + '/etatBCM/EtatBCM_BalanceDetaillee/updateCompteBalanceDetaillee';
const API_UPDATE_BALANCE_DETAILLE_MENSUEL_URL = environment.baseUrl + '/etatBCM/EtatBCM_BalanceDetaillee_Mensuel/updateCompteBalanceDetailleeMensuel';
const API_UPDATE_BALANCE_DETAILLE_ANNUEL_URL = environment.baseUrl + '/etatBCM/EtatBCM_BalanceDetaillee_Annuel/updateCompteBalanceDetailleeAnnuel';
const API_BALANCE_DEVISE_URL = environment.baseUrl + '/etatBCM/EtatBCM_BalanceDetaillee/devises';
const API_BALANCE_MENSUEL_DEVISE_URL = environment.baseUrl + '/etatBCM/EtatBCM_BalanceDetaillee_Mensuel/devises';
const API_BALANCE_ANNUEL_DEVISE_URL = environment.baseUrl + '/etatBCM/EtatBCM_BalanceDetaillee_Annuel/devises';

const API_BALANCE_AGE_URL = environment.baseUrl + '/etatBCM/EtatBCM_BalanceDetaillee/ages';
const API_BALANCE_MENSUEL_AGE_URL = environment.baseUrl + '/etatBCM/EtatBCM_BalanceDetaillee_Mensuel/ages';
const API_BALANCE_ANNUEL_AGE_URL = environment.baseUrl + '/etatBCM/EtatBCM_BalanceDetaillee_Annuel/ages';
const API_EXISTS_CPTE_BD_URL = environment.baseUrl + '/etatBCM/EtatBCM_BalanceDetaillee/exitsCompte';
const API_EXISTS_CPTE_BD_MENSUEL_URL = environment.baseUrl + '/etatBCM/EtatBCM_BalanceDetaillee_Mensuel/exitsCompte';
const API_EXISTS_CPTE_BD_ANNUEL_URL = environment.baseUrl + '/etatBCM/EtatBCM_BalanceDetaillee_Annuel/exitsCompte';

@Injectable({
  providedIn: 'root'
})
export class BalancedetailleService {

  constructor(private http: HttpClient) { }

  getAllBalancedetaille(): Observable<BalancedetailleModel[]> {
    return this.http.get<BalancedetailleModel[]>(API_BALANCE_DETAILLE_URL);

  }

  getAllBalancedetailleMensuel(): Observable<BalancedetailleModel[]> {
    return this.http.get<BalancedetailleModel[]>(API_BALANCE_DETAILLE_MENSUEL_URL);
  }

  getAllBalancedetailleAnnuel(): Observable<BalancedetailleModel[]> {
    return this.http.get<BalancedetailleModel[]>(API_BALANCE_DETAILLE_ANNUEL_URL);
  }
}
