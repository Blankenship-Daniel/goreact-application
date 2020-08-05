import { TestBed, inject } from '@angular/core/testing';

import { GuestGuardService } from './guest-guard.service';
import { RouterTestingModule } from '@angular/router/testing';

describe('GuestGuardService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [GuestGuardService],
    });
  });

  it('should be created', inject(
    [GuestGuardService],
    (service: GuestGuardService) => {
      expect(service).toBeTruthy();
    }
  ));
});
