import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-signup',
  imports: [ReactiveFormsModule, RouterModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {
  form = new FormGroup({
    username: new FormControl<string>('', Validators.required),
    email: new FormControl<string>('', Validators.required),
    password: new FormControl<string>('', Validators.required),
  });

  constructor(private authService: AuthService, private router: Router) { }

  handleSubmit(): void {
    if (!this.form.valid) return;

    const { username, email, password } = this.form.value;

    if (!username || !email || !password) return;

    this.authService.signup(username, email, password).subscribe((data) => {
      console.log(data);
      this.router.navigate(['/']);
    })
  }
}
