import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NavBarComponent } from './nav-bar.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { AuthModule } from '../../services/auth';
import { AuthService } from '../../services/auth/auth.service';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

describe('NavBarComponent', () => {
  let component: NavBarComponent;
  let fixture: ComponentFixture<NavBarComponent>;
  let mockAccessToken = 'mock.access.token';
  let authService: AuthService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [NavBarComponent],
      imports: [
        MatToolbarModule,
        MatButtonModule,
        AuthModule,
        RouterTestingModule,
      ],
      providers: [
        {
          provide: AuthService,
          useValue: {
            logout: jest.fn(() => of(null)),
          },
        },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    component.accessToken = mockAccessToken;
    fixture.detectChanges();
    authService = TestBed.get(AuthService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('when the Logout button is pressed', () => {
    it('should logout the current User', () => {
      component.logout();
      expect(authService.logout).toHaveBeenCalledWith(mockAccessToken);
    });
  });
});
