import { Component, input } from '@angular/core';
import { Grocery } from '../../models/grocery';
import { CommonModule } from '@angular/common';
import { GroceriesService } from '../../services/groceries.service';

@Component({
  selector: 'app-grocery',
  imports: [CommonModule],
  templateUrl: './grocery.component.html',
  styleUrl: './grocery.component.css'
})
export class GroceryComponent {
  grocery = input.required<Grocery>()

  constructor(private groceriesService: GroceriesService) { }

  handleDeleteGrocery() {
    this.groceriesService.deleteGrocery(this.grocery()?.id);
  }
}
