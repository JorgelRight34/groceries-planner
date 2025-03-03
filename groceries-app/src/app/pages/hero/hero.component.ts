import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { GoogleLoginButtonComponent } from '../../components/google-login-button/google-login-button.component';

@Component({
  selector: 'app-hero',
  imports: [RouterModule, GoogleLoginButtonComponent],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.css'
})
export class HeroComponent {

}
