import { Component, output } from '@angular/core';
import { AddGroceryButtonComponent } from '../add-grocery-button/add-grocery-button.component';
import { GroceryListSelectorComponent } from '../grocery-list-selector/grocery-list-selector.component';
import { ExportGroceryListComponent } from '../export-grocery-list-button/export-grocery-list-button.component';

@Component({
  selector: 'app-navbar-sm',
  imports: [AddGroceryButtonComponent, GroceryListSelectorComponent, ExportGroceryListComponent],
  templateUrl: './navbar-sm.component.html',
  styleUrl: './navbar-sm.component.css'
})
export class NavbarSmComponent {
  changeCurrentSection = output<string>();

  handleChangeCurrentSection(section: string) {
    this.changeCurrentSection.emit(section);
  }
}
