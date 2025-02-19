import { Component, input } from '@angular/core';
import { Grocery } from '../../models/grocery';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-grocery',
  imports: [CommonModule],
  templateUrl: './grocery.component.html',
  styleUrl: './grocery.component.css'
})
export class GroceryComponent {
  grocery = input<Grocery>()
}
