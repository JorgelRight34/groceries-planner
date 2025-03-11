import { Component, model } from '@angular/core';


import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { AddGroceryButtonComponent } from '../../grocery/add-grocery-button/add-grocery-button.component';
import { SavePlanComponent } from '../../grocery-list/save-plan/save-plan.component';
import { ExportGroceryListComponent } from '../../grocery-list/export-grocery-list-button/export-grocery-list-button.component';
import { ShareLinkComponent } from '../../grocery-list/share-link/share-link.component';


@Component({
  selector: 'app-navbar',
  imports: [AddGroceryButtonComponent, SavePlanComponent, ExportGroceryListComponent, ShareLinkComponent],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  currentSection = model<string>();

  constructor(private authService: AuthService, private router: Router) { }

  handleLogout() {
    this.authService.logout();
    this.router.navigate(['hero']); // Travel to wildcart route
  }

  handleChangeCurrentSection(section: string) {
    this.currentSection.set(section); // Update selected section
  }
}
