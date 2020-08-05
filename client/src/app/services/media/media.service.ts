import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class MediaService {
  private options: any;

  constructor(private http: HttpClient) {
    this.options = {
      headers: new HttpHeaders({
        Accept: 'application/json',
        'Content-Type': 'application/json',
      }),
    };
  }

  uploadMedia(userId: string, url: string) {
    return this.http
      .post(
        `${environment.apiUrl}/media/user/${userId}`,
        {
          url,
        },
        this.options
      )
      .pipe(tap((res: any) => this.setLocalMedia(res.url)));
  }

  getAllMediaForUser(userId: string) {
    return this.http.get(`${environment.apiUrl}/media/user/${userId}`).pipe(
      map((urls: any) => urls.map((obj: any) => obj.url)),
      tap((urls) => {
        localStorage.setItem('media', JSON.stringify(urls));
      })
    );
  }

  getLocalMediaUrls(): string[] {
    const urls = JSON.parse(localStorage.getItem('media'));
    return urls || [];
  }

  private setLocalMedia(url: string) {
    const urls = JSON.parse(localStorage.getItem('media'));
    if (urls) {
      urls.push(url);
      localStorage.setItem('media', JSON.stringify(urls));
    } else {
      localStorage.setItem('media', JSON.stringify([url]));
    }
  }
}
