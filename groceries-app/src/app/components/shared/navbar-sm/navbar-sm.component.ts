import { Component, model } from '@angular/core';

import { AddGroceryButtonComponent } from '../../grocery/add-grocery-button/add-grocery-button.component';;
import { ExportGroceryListComponent } from '../../grocery-list/export-grocery-list-button/export-grocery-list-button.component';
import { GroceryListSelectorComponent } from '../../grocery-list/grocery-list-selector/grocery-list-selector.component';


@Component({
  selector: 'app-navbar-sm',
  imports: [AddGroceryButtonComponent, GroceryListSelectorComponent, ExportGroceryListComponent],
  templateUrl: './navbar-sm.component.html',
  styleUrl: './navbar-sm.component.css'
})
export class NavbarSmComponent {
  currentSection = model<string>();

  onCurrentSectionChange(section: string) {
    this.currentSection.set(section); // Change current section
  }
}
