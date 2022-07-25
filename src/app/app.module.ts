import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ErrorComponent } from './components/error/error.component';
import { DefaultComponent } from './components/default/default.component';
import { CourseContainerComponent } from './components/course/course-container/course-container.component';
import {OKTA_CONFIG, OktaAuthModule, OktaAuthService, OktaConfig} from '@okta/okta-angular';
import {environment} from '../environments/environment';
import {AuthServiceToken, BearerTokenInterceptorInterceptor} from './security/bearer-token-interceptor.interceptor';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {RouterModule} from '@angular/router';
import { SignupFormComponent } from './components/course/signup-form/signup-form.component';
import { CourseScheduleComponent } from './components/course/course-schedule/course-schedule.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatTableModule} from '@angular/material/table';
import {MatSortModule} from '@angular/material/sort';

const config: OktaConfig = {
  issuer: environment.issuer,
  clientId: environment.clientId,
  redirectUri: `${environment.thisUri}/login/callback`,
  scopes: ['email'],
  responseType: ['token'],
  pkce: false,
};

@NgModule({
  declarations: [
    AppComponent,
    ErrorComponent,
    DefaultComponent,
    CourseContainerComponent,
    SignupFormComponent,
    CourseScheduleComponent
  ],
  imports: [
    OktaAuthModule,
    BrowserModule,
    HttpClientModule,
    RouterModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatInputModule,
    MatSelectModule,
    MatFormFieldModule,
    MatToolbarModule,
    MatIconModule,
    MatPaginatorModule,
    MatSortModule,
    MatTableModule
  ],
  providers: [
    {provide: OKTA_CONFIG, useValue: config },
    {
      provide: AuthServiceToken,
      useClass: OktaAuthService
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: BearerTokenInterceptorInterceptor,
      multi: true
    }],
  bootstrap: [AppComponent]
})
export class AppModule { }
