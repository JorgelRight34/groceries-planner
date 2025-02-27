import { Component } from '@angular/core';
import { SavePlanComponent } from '../save-plan/save-plan.component';
import { AddGroceryButtonComponent } from '../add-grocery-button/add-grocery-button.component';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { ExportGroceryListComponent } from '../export-grocery-list-button/export-grocery-list-button.component';

@Component({
  selector: 'app-navbar',
  imports: [AddGroceryButtonComponent, SavePlanComponent, ExportGroceryListComponent],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  constructor(private authService: AuthService, private router: Router) { }

  handleLogout() {
    this.authService.logout();
    this.router.navigate(['']);
  }
}
