import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BalanceGeneralAnnuelComponent } from './balance-general-annuel/balance-general-annuel.component';
import { FluxEntrantComponent } from './flux-entrant/flux-entrant.component';

import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { AcueilComponent } from './acueil/acueil.component';
import { LoginComponent } from './login/login.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { AuthGuard } from './core/guard/auth.guard';
import {HIGHLIGHT_OPTIONS} from 'ngx-highlightjs';
import { JwtInterceptor } from './core/helpers/jwt.interceptor';
import {HashLocationStrategy, LocationStrategy, registerLocaleData} from "@angular/common";
import { BalanceGeneralMensuelComponent } from './balance-general-mensuel/balance-general-mensuel.component';
import { BalanceDetailleAnnuelComponent } from './balance-detaille-annuel/balance-detaille-annuel.component';
import { BalanceDetailleMensuelComponent } from './balance-detaille-mensuel/balance-detaille-mensuel.component';
import { FluxSortantComponent } from './flux-sortant/flux-sortant.component';

@NgModule({
  declarations: [
    AppComponent,
    BalanceGeneralAnnuelComponent,
    FluxEntrantComponent,
    AcueilComponent,
    LoginComponent,
    BalanceGeneralMensuelComponent,
    BalanceDetailleAnnuelComponent,
    BalanceDetailleMensuelComponent,
    FluxSortantComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSidenavModule,
    MatListModule,
    MatToolbarModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [
    AuthGuard,
    {
      provide: HIGHLIGHT_OPTIONS, // https://www.npmjs.com/package/ngx-highlightjs
      useValue: {
        coreLibraryLoader: () => import('highlight.js/lib/core'),
        languages: {
          xml: () => import('highlight.js/lib/languages/xml'),
          typescript: () => import('highlight.js/lib/languages/typescript'),
          scss: () => import('highlight.js/lib/languages/scss'),
        }
      }
    },
    {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true},
    {provide: LocationStrategy, useClass: HashLocationStrategy},
    {provide: LOCALE_ID, useValue: 'fr'}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

