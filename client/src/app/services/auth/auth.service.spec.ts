import { TestBed } from '@angular/core/testing';

import { AuthService } from './auth.service';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { environment } from '../../../environments/environment';

describe('AuthService', () => {
  let service: AuthService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuthService],
    });
    service = TestBed.get(AuthService);
    httpTestingController = TestBed.get(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('Authentication', () => {
    let mockAuthRes = {
      user_id: 3,
      access_token:
        'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC9sb2NhbGhvc3Q6MzAwMFwvYXBpXC9yZWdpc3RlciIsImlhdCI6MTU5NjU1NzQwMCwiZXhwIjoxNTk2NTYxMDAwLCJuYmYiOjE1OTY1NTc0MDAsImp0aSI6IjhqTUd1WVc2VW9saFpLZVEiLCJzdWIiOjMsInBydiI6Ijg3ZTBhZjFlZjlmZDE1ODEyZmRlYzk3MTUzYTE0ZTBiMDQ3NTQ2YWEifQ.RsyuU_MrQ8Zy9PpZPzGNWZklVqUrIdlSGNiWlEICF28',
      token_type: 'bearer',
      expires_in: 3600,
    };
    const MockUser = {
      name: 'test',
      email: 'test@gmail.com',
      password: 'testpass',
    };
    it('should register a new User', () => {
      service
        .register(MockUser.name, MockUser.email, MockUser.password)
        .subscribe((res) => {
          expect(res).toBe(mockAuthRes);
        });
      const req = httpTestingController.expectOne(
        `${environment.apiUrl}/register`
      );
      expect(req.request.method).toEqual('POST');
      req.flush(mockAuthRes);
    });

    it('should login an existing User', () => {
      service.login(MockUser.email, MockUser.password).subscribe((res) => {
        expect(res).toBe(mockAuthRes);
      });
      const req = httpTestingController.expectOne(
        `${environment.apiUrl}/login`
      );
      expect(req.request.method).toEqual('POST');
      req.flush(mockAuthRes);
    });

    it('should logout an existing User', () => {
      const mockRes = {
        message: 'Successfully logged out',
      };
      service.logout(mockAuthRes.access_token).subscribe((res) => {
        expect(res).toBe(mockRes);
      });
      const req = httpTestingController.expectOne(
        `${environment.apiUrl}/logout`
      );
      expect(req.request.method).toEqual('POST');
      req.flush(mockRes);
    });
  });
});
