import { Component } from '@angular/core';
import { GroceryListSelectorComponent } from '../../grocery-list/grocery-list-selector/grocery-list-selector.component';

@Component({
  selector: 'app-header',
  imports: [GroceryListSelectorComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

}
