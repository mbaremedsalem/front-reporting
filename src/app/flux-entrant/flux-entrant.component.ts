import { Component, Inject, LOCALE_ID, ViewChild } from '@angular/core';
import { FluxService } from '../services/reporting-bcm/flux.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UpdateDialogComponent } from '../update-dialog/update-dialog.component';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-flux',
  templateUrl: './flux-entrant.component.html',
  styleUrls: ['./flux-entrant.component.css']
})
export class FluxEntrantComponent {
  flux_entrant: any[] = [];


  dataSource = new MatTableDataSource<any>();
  searchTerm: string = '';
  fluxentrantList: any [] = [
    {
      isSelected:false
    }
  ]
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  constructor(private fluxEntrantService: FluxService,@Inject(LOCALE_ID) private locale: string,public dialog: MatDialog, private router: Router,private http: HttpClient) { }


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
 
  toggleSelection(flux: any) {
    flux.isSelected = !flux.isSelected;
  }

  envoyeFluxSortant() {
    const selectedFlux = this.dataSource.filteredData.filter((flux) => flux.isSelected);
    
    // Call the service to export data
    this.fluxEntrantService.envoyeFluxEntrant(selectedFlux).subscribe(
      (response) => {
        // Handle success, if needed
        console.log('Export successful', response);
      },
      (error) => {
        // Handle error
        console.error('Export failed', error);
      }
    );
  }
}
