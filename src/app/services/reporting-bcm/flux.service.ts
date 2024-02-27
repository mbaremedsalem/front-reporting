import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FluxEntrantModel } from 'src/app/core/model/fluxentrants.model';
import { SuccessModel } from 'src/app/core/model/success.model';
import { environment } from 'src/environments/environment';
const API_FLUX_ENTRANT_URL = environment.mybaseurl + 'get-flux-entrant/';
const API_FLUX_SORTAN_URL = environment.mybaseurl + 'get-flux-sortant/';

const API_POST_FLUX_ENTRANT_URL = environment.mybaseurl + 'envoye-flux-entrant/';
const API_POST_FLUX_SORTANT_URL = environment.mybaseurl + 'envoye-flux-sortant/';

@Injectable({
  providedIn: 'root'
})
export class FluxService {
  constructor(private http: HttpClient) { }

  getAllFluxEntrant(): Observable<FluxEntrantModel[]> {
    return this.http.get<any[]>(API_FLUX_ENTRANT_URL);
  }
  getAllFluxSortant(): Observable<FluxEntrantModel[]> {
    return this.http.get<any[]>(API_FLUX_SORTAN_URL);
  }

  envoyeFluxSortant(fluxData: any[]): Observable<SuccessModel>  {
    const headers = new HttpHeaders().set('Authorization','Bearer '+localStorage.getItem('token'));
    //return this.http.post(API_POST_FLUX_ENTRANT_URL, fluxData,{headers});
    return this.http.post<SuccessModel>(API_POST_FLUX_SORTANT_URL, fluxData,{headers});
  }

  envoyeFluxEntrant(fluxData: any[]): Observable<SuccessModel>  {
    const headers = new HttpHeaders().set('Authorization','Bearer '+localStorage.getItem('token'));
    //return this.http.post(API_POST_FLUX_ENTRANT_URL, fluxData,{headers});
    return this.http.post<SuccessModel>(API_POST_FLUX_ENTRANT_URL, fluxData,{headers});
  }
}
