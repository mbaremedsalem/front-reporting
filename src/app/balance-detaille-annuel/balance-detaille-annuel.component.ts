import {Component, OnInit} from '@angular/core';
import {BalancedetailleModel} from "../core/model/balancedetaille.model";

import {ActivatedRoute} from "@angular/router";
import * as XLSX from "xlsx";
import { ColumnMode, NgxDatatableModule } from '@swimlane/ngx-datatable';
import { BalancedetailleService } from '../service/balancedetaille.service';

@Component({
  selector: 'app-balance-detaille-annuel',
  templateUrl: './balance-detaille-annuel.component.html',
  styleUrls: ['./balance-detaille-annuel.component.scss']
})
export class BalanceDetailleAnnuelComponent implements OnInit {

  balancedetailleModels: BalancedetailleModel[] = [];
  perttemp: BalancedetailleModel[] = [];
  loadingIndicator = true;
  totalSdeBD = 0;
  ColumnMode = ColumnMode;
  rows: BalancedetailleModel[] = [];
  temp: BalancedetailleModel[] = [];
  loading: boolean = false;

  constructor(private balancedetailleService: BalancedetailleService,
              private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.getBalanceDetaillesAnnuel();
  }

  getBalanceDetaillesAnnuel() {
    this.loading = true;
    this.balancedetailleService.getAllBalancedetailleAnnuel().subscribe(
      data => {
        this.balancedetailleModels = data;
        this.rows = data;
        this.perttemp = data;
        if (this.perttemp) this.perttemp?.forEach(value => {
          this.totalSdeBD += value.soldeMru;
        })
        this.loading = false;
      }
    )
  }

  updateFilter(event: any) {

    const val = event.target.value.toLowerCase();
    if (val) {
      this.temp = this.rows;
      // filter our data
      const temp = this.temp.filter(function (d) {
        return (d.compte.toLowerCase().indexOf(val) !== -1 || d.devise.toLowerCase().indexOf(val) !== -1 || d.intituleCompteComptable.toLowerCase().indexOf(val) !== -1 || d.compteBancaireClient.toLowerCase().indexOf(val) !== -1 ||
          d.intituleCompteBancaire.toLowerCase().indexOf(val) !== -1 || !val);
      });
      this.rows = temp;
    } else {
      this.rows = this.perttemp;
    }
  }

  exportexcel(): void {

    /*const  data =this.rows.map(value => {
      return value.superieurFullname
    })*/
    const data = this.rows.map(value => {
        return {
          dateClotureBalance: value.dateClotureBalance,
          compte: value.compte,
          intituleCompteComptable: value.intituleCompteComptable,
          compteBancaireClient: value.compteBancaireClient,
          age: value.age,
          intituleCompteBancaire: value.intituleCompteBancaire,
          estClientApparente: value.estClientApparente,
          resident: value.resident,
          devise: value.devise,
          activiteClient: value.activiteClient,
          secteurActiviteClient: value.secteurActiviteClient,
          soldeDebiteur: value.soldeDebiteur,
          soldeCrediteur: value.soldeCrediteur,
          soldeMru: value.soldeMru
        }
      }
    );

    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(data);

    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    /* save to file */
    XLSX.writeFile(wb, 'BalanceDetaille.xlsx');

  }


}
