import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { MediaService } from './media.service';

@Injectable({
  providedIn: 'root',
})
export class MediaResolver implements Resolve<any> {
  constructor(private mediaService: MediaService) {}

  resolve() {
    const userId = JSON.parse(localStorage.getItem('user_id'));
    return this.mediaService.getAllMediaForUser(userId);
  }
}
