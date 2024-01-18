import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, ViewChild } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { UpdateDialogComponent } from '../update-dialog/update-dialog.component';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { BalanceGeneralService } from '../services/reporting-bcm/balance-general.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-balance',
  templateUrl: './balance-general-annuel.component.html',
  styleUrls: ['./balance-general-annuel.component.css']
})
export class BalanceGeneralAnnuelComponent {
  balances: any[] = [];
  useTraditionalTable = false;

  displayedColumns: string[] = ['sujet', 'code', 'description', 'file', 'direction_nom','date_ajout','actions'];

  // Define the MatTableDataSource for the Material table
  dataSource = new MatTableDataSource<any>();
  searchTerm: string = '';
  filteredDocuments: any[] = [];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  constructor(private balanceService: BalanceGeneralService,public dialog: MatDialog, private router: Router,private http: HttpClient) { }

  // onPageChange(event: PageEvent): void {
  //   const page = event.pageIndex + 1;
  //   const pageSize = event.pageSize;
  
  //   this.balanceService.getBalanceAnnuel(page, pageSize).subscribe((data: any[]) => {
  //     this.notes = data;
  //     this.dataSource.data = this.notes;

  //   });
  // }
  ngOnInit(): void {

  
    this.balanceService.getBalanceAnnuel().subscribe((data: any[]) => {
      this.balances = data;
      this.dataSource.data = this.balances; // Set the data for the Material table
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
 
  toggleSelection(avis: any) {
    avis.isSelected = !avis.isSelected;
  }
}
