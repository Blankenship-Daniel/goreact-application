import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { S3Service } from './s3.service';

@NgModule({
  imports: [CommonModule],
  providers: [S3Service]
})
export class S3Module {}
