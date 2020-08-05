import { TestBed } from '@angular/core/testing';

import { MediaResolver } from './media.resolver';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('MediaResolver', () => {
  let service: MediaResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(MediaResolver);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
