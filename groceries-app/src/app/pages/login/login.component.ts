import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  form = new FormGroup({
    username: new FormControl<string>('', Validators.required),
    password: new FormControl<string>('', Validators.required),
  })

  constructor(private authService: AuthService, private router: Router) { }

  handleSubmit(): void {
    if (!this.form.valid) return;

    const { username, password } = this.form.value;

    if (!username || !password) return

    this.authService.login(username, password).subscribe(data => {
      console.log(data);
      this.router.navigate(['/']);
    });
  }
}
