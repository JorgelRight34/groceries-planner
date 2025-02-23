import { Component } from '@angular/core';
import { AddGroceryButtonComponent } from '../add-grocery-button/add-grocery-button.component';

@Component({
  selector: 'app-header',
  imports: [AddGroceryButtonComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

}
