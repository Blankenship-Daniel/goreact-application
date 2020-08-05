import { Component } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  form: FormGroup;
  loading: boolean;
  errors: boolean;

  constructor(
    fb: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {
    this.form = fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  login() {
    this.loading = true;
    this.errors = false;
    const email = this.form.controls.email.value;
    const password = this.form.controls.password.value;
    this.authService.login(email, password).subscribe(
      (res: any) => {
        localStorage.setItem('user_id', res.user_id);
        localStorage.setItem('access_token', res.access_token);
        this.loading = false;
        this.router.navigate(['/']);
      },
      (err: any) => {
        this.loading = false;
        this.errors = true;
      }
    );
  }
}
