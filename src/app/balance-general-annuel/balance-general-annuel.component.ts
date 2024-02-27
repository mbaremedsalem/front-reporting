import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, Inject, LOCALE_ID, ViewChild } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { UpdateDialogComponent } from '../update-dialog/update-dialog.component';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { BalanceGeneralService } from '../services/reporting-bcm/balance-general.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-balance',
  templateUrl: './balance-general-annuel.component.html',
  styleUrls: ['./balance-general-annuel.component.css']
})
export class BalanceGeneralAnnuelComponent {
  balances: any[] = [];
  dataSource = new MatTableDataSource<any>();
  searchTerm: string = '';
  balanceList: any [] = [
    {
      isSelected:false
    }
  ]
  importedData: any[] = [];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  constructor(private balanceService: BalanceGeneralService,@Inject(LOCALE_ID) private locale: string,public dialog: MatDialog, private router: Router,private http: HttpClient) { }


  ngOnInit(): void {
    this.balanceService.getAllBalangeneralle().subscribe((data:any[])=>{
      this.balanceList = data;
      this.dataSource.data = this.balanceList;
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
 
  toggleSelection(balance: any) {
    balance.isSelected = !balance.isSelected;
  }

    onFileSelected(event: any): void {
      const file = event.target.files[0];
      if (file) {
        this.readExcel(file);
      }
    }
  
    readExcel(file: File): void {
      const reader: FileReader = new FileReader();
  
      reader.onload = (e: any) => {
        const data = e.target.result;
        const workbook: XLSX.WorkBook = XLSX.read(data, { type: 'binary' });
        const sheetName = workbook.SheetNames[0];
        const excelData = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);
        this.importedData = excelData;
      };
  
      reader.readAsBinaryString(file);
    }
  
    importExcel(): void {
     
      console.log(this.importedData);
    }
}
