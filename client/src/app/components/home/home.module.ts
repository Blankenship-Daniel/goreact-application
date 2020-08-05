import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardService } from '../../services/auth-guard';
import { MatButtonModule } from '@angular/material/button';
import { S3Module } from '../../services/s3';
import { MediaModule } from '../../services/media';
import { MediaResolver } from '../../services/media/media.resolver';
import { NavBarModule } from '../nav-bar';
import { MediaViewModule } from '../media-view';
import { MatCardModule } from '@angular/material/card';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    canActivate: [AuthGuardService],
    resolve: {
      mediaUrls: MediaResolver,
    },
  },
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatButtonModule,
    S3Module,
    MediaModule,
    NavBarModule,
    MediaViewModule,
    MatCardModule,
  ],
  declarations: [HomeComponent],
})
export class HomeModule {}
