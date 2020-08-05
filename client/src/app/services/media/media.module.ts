import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MediaService } from './media.service';
import { MediaResolver } from './media.resolver';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [CommonModule, HttpClientModule],
  providers: [MediaService, MediaResolver],
})
export class MediaModule {}
