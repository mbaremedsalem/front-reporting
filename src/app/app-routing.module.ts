import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BalanceGeneralAnnuelComponent } from './balance-general-annuel/balance-general-annuel.component';
import { FluxEntrantComponent } from './flux-entrant/flux-entrant.component';
import { AcueilComponent } from './acueil/acueil.component';
import { LoginComponent } from './login/login.component';
import { BalanceGeneralMensuelComponent } from './balance-general-mensuel/balance-general-mensuel.component';
import { BalanceDetailleAnnuelComponent } from './balance-detaille-annuel/balance-detaille-annuel.component';
import { BalanceDetailleMensuelComponent } from './balance-detaille-mensuel/balance-detaille-mensuel.component';
import { FluxSortantComponent } from './flux-sortant/flux-sortant.component';
import { UpdatePasswordComponent } from './update-password/update-password.component';

const routes: Routes = [
  
  { path: '', component: LoginComponent },
  { path: 'change-password', component: UpdatePasswordComponent },

  
  {
    path: 'acueil', // Incluez "home" dans le chemin
    component: AcueilComponent,
    children: [
      { path: 'balance-general-annuel', component: BalanceGeneralAnnuelComponent },
      { path: 'balance-general-mensuel', component: BalanceGeneralMensuelComponent },
      { path: 'balance-detaille-annuel', component: BalanceDetailleAnnuelComponent },
      { path: 'balance-detaille-manuel', component: BalanceDetailleMensuelComponent },
      { path: 'flux-entrant', component: FluxEntrantComponent },
      { path: 'flux-sortant', component: FluxSortantComponent },
      // { path: 'direction-admin', component: DirectionComponent },
      // { path: 'chart-banque-admin', component: DocumentAdminComponent },
      // { path: 'note-admin', component: NoteComponent },
      // { path: 'decision-admin', component: DesisionComponent },
      // { path: 'Texte-gouvernance-admin', component: TexteGouvernanceComponent },
      // { path: 'politique-banque-admin', component: PolitiqueBanqueComponent },
      // { path: 'profile-admin', component: ProfileComponent },
      // { path: 'agents', component: AgentComponent },
      // { path: 'gerants', component: GerantComponent },
      // { path: 'Archive-admin', component: ArchiveComponent },
      // { path: 'Avis', component: AvisComponent },
      // { path: 'Procedure', component: ProcedurComponent },
    ],
  }
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
