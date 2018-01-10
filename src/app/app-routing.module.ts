import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CallingsComponent } from './callings/callings.component';
import { InterviewsComponent } from './interviews/interviews.component';
import { PrayersComponent } from './prayers/prayers.component';
import { SacramentCalendarComponent } from './sacrament-calendar/sacrament-calendar.component';
import { SacramentAttendanceComponent } from './sacrament-attendance/sacrament-attendance.component';
import { MembersComponent } from './members/members.component';
import { LoginComponent } from './login/login.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { CreateAccountComponent } from './create-account/create-account.component';
import { AuthGuardService } from './auth-guard.service';
import { UnitAuthComponent } from './unit-auth/unit-auth.component';
import {UploadMembersComponent} from "./upload-members/upload-members.component";
import {AboutComponent} from "./about/about.component";


const routes: Routes = [
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent,
    data: {
      title: 'Login'
    }
  },
  {
    path: 'register',
    component: CreateAccountComponent,
    data: {
      title: 'Create Account'
    }
  },
  {
    path: 'unit-auth',
    component: UnitAuthComponent,
    data: {
      title: 'Unit Authorization'
    }
  },
  {
    path: 'upload-members',
    component: UploadMembersComponent,
    canActivate: [AuthGuardService],
    data: {
      title: 'Upload Members',
      expectedRole: ['admin']
    }
  },
  {
    path: 'about',
    component: AboutComponent,
    data: {
      title: 'About'
    }
  },
  {
    path: 'home',
    component: DashboardComponent,
    canActivate: [AuthGuardService],
    data: {
      title: 'Dashboard',
      expectedRole: ['admin', 'bishopric']
    }
  },
  {
    path: 'callings',
    component: CallingsComponent,
    canActivate: [AuthGuardService],
    data: {
      title: 'Callings',
      expectedRole: ['admin', 'bishopric']
    }
  },
  {
    path: 'interviews',
    component: InterviewsComponent,
    canActivate: [AuthGuardService],
    data: {
      title: 'Schedule',
      expectedRole: ['admin', 'bishopric']
    }
  },
  {
    path: 'prayers',
    component: PrayersComponent,
    canActivate: [AuthGuardService],
    data: {
      title: 'Prayer Tracker',
      expectedRole: ['admin', 'bishopric']
    }
  },
  {
    path: 'sacrament-calendar',
    component: SacramentCalendarComponent,
    canActivate: [AuthGuardService],
    data: {
      title: 'Sacrament Meeting Calendar',
      expectedRole: ['admin', 'bishopric', 'member']
    }
  },
  {
    path: 'sacrament-attendance',
    component: SacramentAttendanceComponent,
    canActivate: [AuthGuardService],
    data: {
      title: 'Sacrament Meeting Attendance',
      expectedRole: ['admin', 'bishopric']
    }
  },
  {
    path: 'members',
    component: MembersComponent,
    canActivate: [AuthGuardService],
    data: {
      title: 'Members',
      expectedRole: ['admin', 'bishopric']
    }
  }
  ,
  {
    path: '**',
    component: PageNotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
