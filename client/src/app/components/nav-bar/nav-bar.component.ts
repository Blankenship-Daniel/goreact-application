import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss'],
})
export class NavBarComponent implements OnInit {
  accessToken: string;
  loading: boolean = false;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.accessToken = localStorage.getItem('access_token');
  }

  /**
   * Logout the user and revoke his token
   */
  logout() {
    this.loading = true;
    this.authService.logout(this.accessToken).subscribe(
      () => {
        this.logoutUser();
      },
      (err) => {
        // TODO: Return custom error code from the backend
        //  so that I don't have to do this janky string
        //  comparison.
        if (err.error.message === 'Token has expired') {
          this.logoutUser();
        }
      },
      () => {
        this.loading = false;
      }
    );
  }

  logoutUser() {
    localStorage.removeItem('user_id');
    localStorage.removeItem('access_token');
    localStorage.removeItem('media');
    this.router.navigate(['/login']);
  }
}
