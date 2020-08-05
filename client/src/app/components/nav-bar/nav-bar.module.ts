import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavBarComponent } from './nav-bar.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { AuthModule } from '../../services/auth';

@NgModule({
  declarations: [NavBarComponent],
  imports: [CommonModule, AuthModule, MatToolbarModule, MatButtonModule],
  exports: [NavBarComponent],
})
export class NavBarModule {}
