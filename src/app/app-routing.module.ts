import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BalanceComponent } from './balance/balance.component';
import { FluxComponent } from './flux/flux.component';

const routes: Routes = [
  { path: '', component: BalanceComponent },
  { path: 'flux', component: FluxComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
