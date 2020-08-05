import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthModule } from '../../services/auth';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { NavBarModule } from '../nav-bar';
import { RouterTestingModule } from '@angular/router/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { AuthService } from 'src/app/services/auth/auth.service';
import { of } from 'rxjs';
import { HomeModule } from '../home';
import { HomeComponent } from '../home/home.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authService: AuthService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [
        FormsModule,
        ReactiveFormsModule,
        AuthModule,
        MatCardModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        NavBarModule,
        HomeModule,
        RouterTestingModule.withRoutes([
          { path: '', component: HomeComponent },
        ]),
        NoopAnimationsModule,
      ],
      providers: [
        {
          provide: AuthService,
          useValue: {
            login: jest.fn(() => of(null)),
          },
        },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    authService = TestBed.get(AuthService);
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  describe('User login form', () => {
    it('should not be a valid form when no input from User', () => {
      const emailInput = component.form.controls.email;
      const passwordInput = component.form.controls.password;

      expect(emailInput.valid).toBeFalsy();
      expect(passwordInput.valid).toBeFalsy();
    });

    it('should validate email address', () => {
      const emailInput = component.form.controls.email;
      emailInput.setValue('notvalidemail');
      expect(emailInput.valid).toBeFalsy();
      emailInput.setValue('validemail@gmail.com');
      expect(emailInput.valid).toBeTruthy();
    });

    it('should allow form submission when all inputs valid', () => {
      const emailInput = component.form.controls.email;
      emailInput.setValue('test@gmail.com');
      const passwordInput = component.form.controls.password;
      passwordInput.setValue('test');

      expect(component.form.valid).toBeTruthy();
    });
  });

  describe('when the form is submitted', () => {
    it('should register the User', () => {
      const mockEmail = 'test@gmail.com';
      const mockPassword = 'test';
      const emailInput = component.form.controls.email;
      emailInput.setValue(mockEmail);
      const passwordInput = component.form.controls.password;
      passwordInput.setValue(mockPassword);

      component.login();
      expect(authService.login).toHaveBeenCalledWith(mockEmail, mockPassword);
    });
  });
});
