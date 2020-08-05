import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterComponent } from './register.component';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthModule } from '../../services/auth';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { NavBarModule } from '../nav-bar';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { of } from 'rxjs';
import { AuthService } from '../../services/auth/auth.service';
import { HomeModule } from '../home';
import { HomeComponent } from '../home/home.component';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;
  let authService: AuthService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HomeModule,
        RouterTestingModule.withRoutes([
          {
            path: '',
            component: HomeComponent,
          },
        ]),
        FormsModule,
        ReactiveFormsModule,
        AuthModule,
        MatCardModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        NavBarModule,
        NoopAnimationsModule,
      ],
      declarations: [RegisterComponent],
      providers: [
        {
          provide: AuthService,
          useValue: {
            register: jest.fn(() => of(null)),
          },
        },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    authService = TestBed.get(AuthService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('User registration form', () => {
    it('should not be a valid form when no input from User', () => {
      const usernameInput = component.form.controls.username;
      const emailInput = component.form.controls.email;
      const passwordInput = component.form.controls.password;

      expect(usernameInput.valid).toBeFalsy();
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
      const usernameInput = component.form.controls.username;
      usernameInput.setValue('test');
      const emailInput = component.form.controls.email;
      emailInput.setValue('test@gmail.com');
      const passwordInput = component.form.controls.password;
      passwordInput.setValue('test');

      expect(component.form.valid).toBeTruthy();
    });

    describe('when the form is submitted', () => {
      it('should register the User', () => {
        const mockUsername = 'test';
        const mockEmail = 'test@gmail.com';
        const mockPassword = 'test';
        const usernameInput = component.form.controls.username;
        usernameInput.setValue(mockUsername);
        const emailInput = component.form.controls.email;
        emailInput.setValue(mockEmail);
        const passwordInput = component.form.controls.password;
        passwordInput.setValue(mockPassword);

        component.register();
        expect(authService.register).toHaveBeenCalledWith(
          mockUsername,
          mockEmail,
          mockPassword
        );
      });
    });
  });
});
