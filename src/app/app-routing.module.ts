import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BalanceComponent } from './balance/balance.component';
import { FluxComponent } from './flux/flux.component';
import { AcueilComponent } from './acueil/acueil.component';

const routes: Routes = [
  
  {
    path: '', // Incluez "home" dans le chemin
    component: AcueilComponent,
    children: [
      { path: '', component: BalanceComponent },
      { path: 'flux', component: FluxComponent },
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
