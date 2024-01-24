import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FluxEntrantModel } from 'src/app/core/model/fluxentrants.model';
import { environment } from 'src/environments/environment';
const API_FLUX_ENTRANT_URL = environment.baseUrl + 'flux_entrant';
const API_POST_FLUX_ENTRANT_URL = environment.baseUrlReporting + 'FluxEntrants_PeriodiciteQuotidienne';
@Injectable({
  providedIn: 'root'
})
export class FluxService {
  constructor(private http: HttpClient) { }

  getAllFluxEntrant(): Observable<FluxEntrantModel[]> {
    return this.http.get<any[]>(API_FLUX_ENTRANT_URL);
  }


  envoyeFluxEntrant(fluxData: any[]): Observable<any> {
    const headers = new HttpHeaders().set('Authorization','Bearer '+localStorage.getItem('tokenreporting'));
    return this.http.post(API_POST_FLUX_ENTRANT_URL, fluxData,{headers});
  }
}
