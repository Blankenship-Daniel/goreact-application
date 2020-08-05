import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login.component';
import { Routes, RouterModule } from '@angular/router';
import { GuestGuardService } from '../../services/guest-guard';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthModule } from '../../services/auth';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { NavBarModule } from '../nav-bar';

const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
    canActivate: [GuestGuardService],
  },
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    AuthModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    NavBarModule,
  ],
  declarations: [LoginComponent],
})
export class LoginModule {}
