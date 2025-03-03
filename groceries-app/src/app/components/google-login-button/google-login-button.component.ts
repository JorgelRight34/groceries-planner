declare var google: any;

import { Component } from '@angular/core';

import { AuthService } from '../../services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-google-login-button',
  imports: [],
  templateUrl: './google-login-button.component.html',
  styleUrl: './google-login-button.component.css'
})
export class GoogleLoginButtonComponent {
  constructor(
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService) { }

  ngOnInit() {
    const googleClientId = '861569645316-kiboa4ii9a1lp6l8mrl3pbeu2iofquoe.apps.googleusercontent.com';
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    google.accounts.id?.initialize({
      client_id: googleClientId,
      callback: this.handleLogin.bind(this),
    });

    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    google.accounts?.id.renderButton(document.getElementById("login-btn"), {
      theme: "filled_blue",
      size: "large",
      text: "continue_with",
      shape: "pill",
    });
  }

  handleOnClick() {
    console.log(this.authService.user());
  }

  handleLogin(token: any) {
    console.log("sending", token);
    // Send google OAuth JWT to API
    this.authService.loginWithGoogle(token.credential).subscribe({
      next: (data) => {
        console.log(data);
        this.router.navigate(['/planner']);
      },
      error: () => this.toastr.error('Oops!', 'An error has ocurred.')
    })
  }
}
