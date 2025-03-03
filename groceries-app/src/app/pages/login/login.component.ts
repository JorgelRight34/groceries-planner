import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router, RouterModule } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { GoogleLoginButtonComponent } from '../../components/google-login-button/google-login-button.component';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, RouterModule, GoogleLoginButtonComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  form = new FormGroup({
    username: new FormControl<string>('', Validators.required),
    password: new FormControl<string>('', Validators.required),
  })

  constructor(
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService
  ) { }

  handleSubmit(): void {
    if (!this.form.valid) return;

    const { username, password } = this.form.value;

    if (!username || !password) return

    this.authService.login(username, password).subscribe({
      next: () => this.router.navigate(['/planner']),
      error: () => this.toastr.error("Invalid", "Invalid credentials")
    });
  }

  isFormFieldInvalid(field: string): boolean {
    return (this.form.get(field)?.invalid && this.form.get(field)?.touched) || false;
  }
}
