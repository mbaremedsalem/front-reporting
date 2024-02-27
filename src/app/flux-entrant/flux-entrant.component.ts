import { Component, Inject, LOCALE_ID, ViewChild } from '@angular/core';
import { FluxService } from '../services/reporting-bcm/flux.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UpdateDialogComponent } from '../update-dialog/update-dialog.component';
import { environment } from 'src/environments/environment.prod';
import { SuccessModel } from '../core/model/success.model';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-flux',
  templateUrl: './flux-entrant.component.html',
  styleUrls: ['./flux-entrant.component.css']
})
export class FluxEntrantComponent {



  dataSource = new MatTableDataSource<any>();
  searchTerm: string = '';
  fluxentrantList: any [] = [

  ] 
  loading: boolean = false;
  responseMessage: string = '';
  errorMessage: string | undefined;
  message: string | undefined;
  showErrorMessage: boolean = false;
  successMessage: string = '';
  showSuccessMessage: boolean = false;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  constructor(private fluxEntrantService: FluxService,private _snackBar: MatSnackBar,@Inject(LOCALE_ID) private locale: string,public dialog: MatDialog, private router: Router,private http: HttpClient) { }


  ngOnInit(): void {
    this.fluxEntrantService.getAllFluxEntrant().subscribe((data:any[])=>{
      this.fluxentrantList = data;
      this.dataSource.data = this.fluxentrantList;
    });
  
  }

  // -------
  openUpdateDialog(noteId: number) {
    const dialogRef = this.dialog.open(UpdateDialogComponent, {
      data: { noteId: noteId },
      width: '1200px',
      panelClass: 'custom-dialog-container',
      position: {
        left: '227px', // Ajoutez la valeur de padding-left que vous souhaitez
      },
      disableClose: true
    });
  
    dialogRef.afterClosed().subscribe((formData: FormData) => {
      if (formData) {
        this.updateDocument(noteId, formData);
      }
    });
  }
  updateDocument(id: number, formData: FormData): void {
    const headers = new HttpHeaders({
      'Authorization': `JWT ${localStorage.getItem('access')}`,
    });
  
    this.http.put(`${environment.baseUrl}update-document/${id}`, formData, { headers }).subscribe(
      (response: any) => {
        // Gérer la réponse de l'API ici
        console.log('Update success:', response);
        window.location.reload();
      },
      (error: any) => {
        // Gérer les erreurs ici
        console.error('Erreur lors de la mise à jour du document :', error);
      }
    );
  }
  applyFilter() {
    // Apply the filter directly to the MatTableDataSource
    this.dataSource.filter = this.searchTerm.trim().toLowerCase();
  }
  envoyeFluxEntrantt() {
    const selectedFlux = this.fluxentrantList.map(flux => ({
      banque: flux.BANQUE,
      referenceTransaction: flux.REFERENCETRANSACTION,
      dateTransaction: flux.DATETRANSACTION,
      typeSwfit: flux.TYPESWFIT,
      modeReglement: flux.MODEREGLEMENT,
      devise: flux.DEVISE,
      montantTransaction: parseFloat(flux.MONTANTTRANSACTION), // Assurez-vous que le montant est converti en nombre
      tauxDeChange: parseFloat(flux.TAUXDECHANGE), // Assurez-vous que le taux de change est converti en nombre
      nomDonneurOrdre: flux.NOMDONNEURORDRE,
      nifNni: flux.NIF_NNI,
      beneficiaire: flux.BENEFICIAIRE,
      produit: flux.PRODUIT,
      natureEconomique: flux.NATUREECONOMIQUE,
      pays: flux.PAYS
    }));
    
    this.loading = true;

    // Call the service to export data
    this.fluxEntrantService.envoyeFluxEntrant(selectedFlux).subscribe(
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
