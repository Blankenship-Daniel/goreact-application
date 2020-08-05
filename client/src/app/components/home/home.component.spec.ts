import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeComponent } from './home.component';
import { MatButtonModule } from '@angular/material/button';
import { S3Module } from '../../services/s3';
import { MediaModule } from '../../services/media';
import { NavBarModule } from '../nav-bar';
import { MediaViewModule } from '../media-view';
import { RouterTestingModule } from '@angular/router/testing';
import { S3Service } from 'src/app/services/s3/s3.service';
import { of } from 'rxjs';
import { MediaService } from 'src/app/services/media/media.service';
import { MatCardModule } from '@angular/material/card';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let s3: S3Service;
  let mediaService: MediaService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [HomeComponent],
      imports: [
        MatButtonModule,
        S3Module,
        MediaModule,
        NavBarModule,
        MediaViewModule,
        RouterTestingModule,
        MatCardModule,
      ],
      providers: [
        {
          provide: S3Service,
          useValue: {
            fileUpload: jest.fn(() => of(null)),
          },
        },
        {
          provide: MediaService,
          useValue: {
            uploadMedia: jest.fn(() => of(null)),
            getLocalMediaUrls: jest.fn(),
          },
        },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    s3 = TestBed.get(S3Service);
    mediaService = TestBed.get(MediaService);
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  describe('when uploading media', () => {
    it('should upload the media to S3', () => {
      const $event = {
        target: {
          files: {
            item(i) {
              return {
                name: 'test',
              };
            },
          },
        },
      };
      component.onFileInput($event);
      expect(s3.fileUpload).toHaveBeenCalledWith($event.target.files.item(0));
      expect(mediaService.getLocalMediaUrls).toHaveBeenCalled();
    });
  });
});
