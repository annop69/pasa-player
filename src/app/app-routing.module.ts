import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShellRouteComponent } from './main/shell.route-component/shell.route-component';
import { LoginComponent } from './main/login/login.component';
import { LoginGuard } from './security/login.guard';
import { AuthenticationGuard } from './security/authentication.guard';
import { ValueCreatorComponent } from './route-components/value-creator/value-creator.component';
import { BusinessOperatorComponent } from './route-components/business-operator/business-operator.component';
import { CommentFeedbackComponent } from './route-components/comment-feedback/comment-feedback.component';
import { PeopleDeveloperComponent } from './route-components/people-developer/people-developer.component';
import { PerformanceFactorComponent } from './route-components/performance-factor/performance-factor.component';
import { StrengthAccomplishmentComponent } from './route-components/strength-accomplishment/strength-accomplishment.component';
import { RegisterComponent } from './main/register/register.component';

const routes: Routes = [
  { path: '', component: ShellRouteComponent, canActivate: [AuthenticationGuard],
    children: [
      { path: '', component: ValueCreatorComponent, canActivate: [AuthenticationGuard] },
      { path: 'people-developer', component: PeopleDeveloperComponent, canActivate: [AuthenticationGuard] },
      { path: 'business-operator', component: BusinessOperatorComponent, canActivate: [AuthenticationGuard] },
      { path: 'performance-factor', component: PerformanceFactorComponent, canActivate: [AuthenticationGuard] },
      { path: 'strength-accomplishment', component: StrengthAccomplishmentComponent, canActivate: [AuthenticationGuard] },
      { path: 'comment-feedback', component: CommentFeedbackComponent, canActivate: [AuthenticationGuard] } 
    ] },
  { path: 'login', component: LoginComponent, canActivate: [LoginGuard] },
  { path: 'register', component: RegisterComponent, canActivate: [LoginGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = [ShellRouteComponent, LoginComponent, ValueCreatorComponent, PeopleDeveloperComponent,
  PerformanceFactorComponent, StrengthAccomplishmentComponent, CommentFeedbackComponent, BusinessOperatorComponent, RegisterComponent]
