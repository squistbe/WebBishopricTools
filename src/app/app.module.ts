import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpModule } from '@angular/http';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MaterialModule } from './material.module';
import { ReactiveFormsModule, FormsModule} from '@angular/forms';
import { FileUploadModule } from 'ng2-file-upload';
import { DragulaModule } from 'ng2-dragula';
import { JwtHelperService, JwtModule } from '@auth0/angular-jwt';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CallingsComponent, FindMemberDialog, AddCallingDialog } from './callings/callings.component';
import { InterviewsComponent } from './interviews/interviews.component';
import { PrayersComponent } from './prayers/prayers.component';
import { SacramentCalendarComponent } from './sacrament-calendar/sacrament-calendar.component';
import { SacramentAttendanceComponent } from './sacrament-attendance/sacrament-attendance.component';
import { MembersComponent } from './members/members.component';
import { LoginComponent } from './login/login.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { CreateAccountComponent } from './create-account/create-account.component';
import { AlertDialogComponent } from './alert-dialog/alert-dialog.component';
import { UploadMembersComponent } from './upload-members/upload-members.component';
import { UnitAuthComponent } from './unit-auth/unit-auth.component';
import { AboutComponent } from './about/about.component';

import { AuthService } from './auth.service';
import { AuthGuardService } from './auth-guard.service';
import { OrgService } from './org.service';
import { AuthInterceptorService } from './auth-interceptor.service';
import { JwtInterceptorService } from './jwt-interceptor.service';
import { UnitService } from './unit.service';
import { CallingFilterService } from './calling-filter.service';

import { FilterPipe } from './filter.pipe';
import { OrgFilterDialog } from "./callings/org-filter-dialog";


@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    CallingsComponent,
    InterviewsComponent,
    PrayersComponent,
    SacramentCalendarComponent,
    SacramentAttendanceComponent,
    MembersComponent,
    LoginComponent,
    PageNotFoundComponent,
    CreateAccountComponent,
    UnitAuthComponent,
    AlertDialogComponent,
    UploadMembersComponent,
    AboutComponent,
    FilterPipe,
    FindMemberDialog,
    AddCallingDialog,
    OrgFilterDialog
  ],
  imports: [
    BrowserModule,
    HttpModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    ReactiveFormsModule,
    FileUploadModule,
    DragulaModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: () => {
          return localStorage.getItem('token');
        },
        whitelistedDomains: ['localhost:5000', 'lds-bishopric-tools.herokuapp.com', 'ldsbishoprictools.com']
      }
    })
  ],
  providers: [
    AuthService,
    AuthGuardService,
    UnitService,
    OrgService,
    AuthInterceptorService,
    CallingFilterService,
    JwtInterceptorService,
    JwtHelperService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent],
  entryComponents: [
    AlertDialogComponent,
    FindMemberDialog,
    AddCallingDialog,
    OrgFilterDialog
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
