import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LockComponent } from './lock/lock.component';
import { LoginComponent } from './login/login.component';
import { FormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { environment } from 'src/environments/environment';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { AppsService } from './apps/apps.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { BearerHeaderInterceptor } from './apps/bearer-header.interceptor';
import { UnauthorisedInterceptor } from './apps/401.interceptor';

export const ngrxImports: NgModule['imports'] = [
  StoreModule.forRoot({}, {}),
  EffectsModule.forRoot([]),
  !environment.production ? StoreDevtoolsModule.instrument() : [],
  StoreDevtoolsModule.instrument({
    name: 'Mini-Hub App DevTools',
    maxAge: 25,
    logOnly: environment.production,
  }),
];
@NgModule({
  declarations: [ AppComponent, LockComponent, LoginComponent ],
  imports: [ BrowserModule, AppRoutingModule, FormsModule].concat(ngrxImports as any[]),
  providers: [
    AppsService,
    {
      provide:HTTP_INTERCEPTORS,
      useClass:BearerHeaderInterceptor,
      multi:true
    },
    {
      provide:HTTP_INTERCEPTORS,
      useClass:UnauthorisedInterceptor,
      multi:true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
