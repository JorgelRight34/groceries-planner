import { Component, input } from '@angular/core';
import { Grocery } from '../../models/grocery';
import { Day } from '../../models/day';
import { CommonModule } from '@angular/common';
import { GroceriesService } from '../../services/groceries.service';

@Component({
  selector: 'app-grocery',
  imports: [CommonModule],
  templateUrl: './grocery.component.html',
  styleUrl: './grocery.component.css'
})
export class GroceryComponent {
  grocery = input.required<Grocery>();
  addButton = input<boolean>(false);

  constructor(private groceriesService: GroceriesService) { }

  addGrocery() {
    this.groceriesService.addGrocery(this.grocery());
  }

  handleSubstractOneGrocery() {
    this.groceriesService.substractOneGrocery(this.grocery());
  }

  handleDelete() {
    this.groceriesService.deleteGrocery(this.grocery().id).subscribe(data => console.log(data))
  }

  getGroceryQuantity(grocery: Grocery) {
    return grocery[this.groceriesService.currentDay()];
  }
}
