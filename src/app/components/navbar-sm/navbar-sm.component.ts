import { Component, output } from '@angular/core';
import { AddGroceryButtonComponent } from '../add-grocery-button/add-grocery-button.component';

@Component({
  selector: 'app-navbar-sm',
  imports: [AddGroceryButtonComponent],
  templateUrl: './navbar-sm.component.html',
  styleUrl: './navbar-sm.component.css'
})
export class NavbarSmComponent {
  changeCurrentSection = output<string>();

  handleChangeCurrentSection(section: string) {
    this.changeCurrentSection.emit(section);
  }
}
