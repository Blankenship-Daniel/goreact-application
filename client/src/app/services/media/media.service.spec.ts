import { TestBed } from '@angular/core/testing';

import { MediaService } from './media.service';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { environment } from '../../../environments/environment';

describe('MediaService', () => {
  let service: MediaService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(MediaService);
    httpTestingController = TestBed.get(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should upload media', () => {
    const userId = '1';
    const url = 'http://test.com/media';
    const mockRes = {
      user_id: userId,
      url,
    };
    service.uploadMedia(userId, url).subscribe((res) => {
      expect(res).toBe(mockRes);
    });

    const req = httpTestingController.expectOne(
      `${environment.apiUrl}/media/user/${userId}`
    );

    expect(req.request.method).toEqual('POST');

    req.flush(mockRes);
  });

  it('should get all media for a given user', () => {
    const userId = '1';
    const mockRes = [
      {
        url: 'test1.com',
      },
      { url: 'test2.com' },
      { url: 'test3.com' },
    ];
    service.getAllMediaForUser(userId).subscribe((res) => {
      expect(res).toBe(['test1.com', 'test2.com', 'test3.com']);
    });

    const req = httpTestingController.expectOne(
      `${environment.apiUrl}/media/user/${userId}`
    );

    expect(req.request.method).toEqual('GET');

    req.flush(mockRes);
  });
});
