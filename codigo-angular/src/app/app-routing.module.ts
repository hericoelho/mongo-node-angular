import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { SolicitationListComponent } from './solicitation-list/solicitation-list.component';
import { SolicitationDetailsComponent } from './solicitation-details/solicitation-details.component';
import { SolicitationCreateComponent } from './solicitation-create/solicitation-create.component';
import { AuthGuard } from './_helpers/auth.guard';


const routes: Routes = [
    { path: '', component: HomeComponent, canActivate: [AuthGuard] },
    { path: 'solicitation', component: SolicitationListComponent, canActivate: [AuthGuard] },
    { path: 'solicitation/new', component: SolicitationCreateComponent, canActivate: [AuthGuard] },
    { path: 'solicitation/:solicitaionId', component: SolicitationDetailsComponent, canActivate: [AuthGuard] },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
