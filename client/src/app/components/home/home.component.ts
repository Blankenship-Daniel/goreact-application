import { Component, OnInit } from '@angular/core';
import { S3Service } from '../../services/s3/s3.service';
import { MediaService } from '../../services/media/media.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  accessToken: any;
  loading: boolean;
  urls: string[] = [];

  constructor(private s3: S3Service, public mediaService: MediaService) {}

  ngOnInit() {
    this.urls = this.mediaService.getLocalMediaUrls();
  }

  onFileInput($event) {
    const file = $event.target.files.item(0);
    if (file) {
      this.s3.fileUpload(file).subscribe(
        (res) => {
          const userId = localStorage.getItem('user_id');
          this.mediaService.uploadMedia(userId, res.Location).subscribe(() => {
            this.urls = this.mediaService.getLocalMediaUrls();
          });
        },
        (err) => {
          console.log('Error: ', err);
        }
      );
    }
  }
}
