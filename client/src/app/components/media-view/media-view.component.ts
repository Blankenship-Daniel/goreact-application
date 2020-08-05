import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-media-view',
  templateUrl: './media-view.component.html',
  styleUrls: ['./media-view.component.scss'],
})
export class MediaViewComponent implements OnInit {
  @Input('url') url: string;
  fileType: string;

  ngOnInit() {
    this.fileType = this.url.split('.').pop();
  }
}
