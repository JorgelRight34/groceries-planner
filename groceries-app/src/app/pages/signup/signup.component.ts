import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router, RouterModule } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';
import { GoogleLoginButtonComponent } from '../../components/google-login-button/google-login-button.component';

@Component({
  selector: 'app-signup',
  imports: [ReactiveFormsModule, RouterModule, CommonModule, GoogleLoginButtonComponent],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {
  form = new FormGroup({
    username: new FormControl<string>('', Validators.required),
    email: new FormControl<string>('', [Validators.required, Validators.email]),
    password: new FormControl<string>('',
      [
        Validators.required,
        Validators.minLength(8),
        Validators.pattern(/[A-Z]/),
        Validators.pattern(/[a-z]/),
        Validators.pattern(/[0-9]/),
        Validators.pattern(/[@$!%*?&]/)
      ]
    ),
  });

  constructor(
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService
  ) { }

  handleSubmit(): void {
    if (!this.form.valid) return;

    const { username, email, password } = this.form.value;

    if (!username || !email || !password) return;

    this.authService.signup(username, email, password).subscribe({
      next: () => this.router.navigate(['/planner']),
      error: () => this.toastr.error("Invalid", "Invalid inputs")
    })
  }

  isFormFieldInvalid(field: string): boolean {
    // Validate if a given field from form has any error
    return (this.form.get(field)?.invalid && this.form.get(field)?.touched) || false;
  }


}
