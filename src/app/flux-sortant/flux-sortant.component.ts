import { Component, Inject, LOCALE_ID, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { FluxService } from '../services/reporting-bcm/flux.service';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { SuccessModel } from '../core/model/success.model';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-flux-sortant',
  templateUrl: './flux-sortant.component.html',
  styleUrls: ['./flux-sortant.component.css']
})
export class FluxSortantComponent {
  dataSource = new MatTableDataSource<any>();
  searchTerm: string = '';
  fluxsortantList: any [] = [

  ] 
  loading: boolean = false;
  responseMessage: string = '';
  errorMessage: string | undefined;
  message: string | undefined;
  showErrorMessage: boolean = false;
  successMessage: string = '';
  showSuccessMessage: boolean = false;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  constructor(private fluxEntrantService: FluxService, private _snackBar: MatSnackBar,@Inject(LOCALE_ID) private locale: string,public dialog: MatDialog, private router: Router,private http: HttpClient) { }

  ngOnInit(): void {
    this.fluxEntrantService.getAllFluxSortant().subscribe((data:any[])=>{
      this.fluxsortantList = data;
      this.dataSource.data = this.fluxsortantList;
    });
  }

  applyFilter() {
    // Apply the filter directly to the MatTableDataSource
    this.dataSource.filter = this.searchTerm.trim().toLowerCase();
  }
 

  envoyeFluxSortant() {
    const selectedFlux = this.fluxsortantList.map(flux => ({
        banque: flux.BANQUE,
        referenceTransaction: flux.REFERENCE_TRANSACTION,
        dateTransaction: flux.DATE_TRANSACTION,
        typeSwfit: flux.TYPE_SWIFT,
        modeReglement: flux.MODE_REGLEMENT,
        devise: flux.DEVISE,
        montantTransaction: parseFloat(flux.MONTANT_TRANSACTION),
        tauxDeChange: parseFloat(flux.TAUX_CHANGE),
        nomDonneurOrdre: flux.NOM_DONNEUR_ORDRE,
        nifNni: flux.NIF_NNI,
        sourceDevise: flux.SOURCE_DEVISE,
        beneficiaire: flux.BENEFICIAIRE,
        produit: flux.PRODUIT,
        natureEconomique: flux.NATUREECONOMIQUE,
        pays: flux.PAYS,
        fkId: 0, // Remplacer par la valeur appropriée si nécessaire
        refBanque: '' // Remplacer par la valeur appropriée si nécessaire
    }));
    
    this.loading = true;

    // Call the service to export data
    this.fluxEntrantService.envoyeFluxSortant(selectedFlux).subscribe(
        (response: SuccessModel) => {
            // Handle success
            console.log('Export successful', response);
            this.loading = false;
            this.responseMessage = response.message;
            console.log(selectedFlux);
            this.message = response.message;
            this.showErrorMessage = true;
            if (this.message) {
              this.showSuccessAlert(this.message);
            }
             
        },
        (error) => {
            // Handle error
            this.message = error.error.message;
            this.showErrorMessage = true;
            if (this.message) {
              this.showErrorAlert(this.message);
            }
            console.error('Export failed', error);
            this.loading = false;
            this.responseMessage = error.error.message;
        }
    );
}

showErrorAlert(message: string) {
  this.errorMessage = message;
  this._snackBar.open(message, 'Fermer', {
    duration: 6000, // Durée d'affichage de l'alerte (3 secondes)
  });
}

  // Méthode pour afficher une alerte de succès
  showSuccessAlert(message: string) {
    this.successMessage = message;
    this.showSuccessMessage = true;
    this._snackBar.open(this.successMessage, 'Fermer', {
      duration: 3000, // Durée d'affichage de l'alerte de succès (3 secondes)
      panelClass: ['success-snackbar'] // Ajoutez une classe CSS pour styliser l'alerte de succès
    });

    // Réinitialiser les messages de succès après 3 secondes
    setTimeout(() => {
      this.successMessage = '';
      this.showSuccessMessage = false;
    }, )
  }

toggleSelection(flux: any) {
  flux.isSelected = !flux.isSelected;
}

}
