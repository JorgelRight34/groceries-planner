import { Component, input, signal } from '@angular/core';
import { Grocery } from '../../../models/grocery';
import { CommonModule } from '@angular/common';
import { GroceriesService } from '../../../services/groceries.service';
import { ModalComponent } from '../../shared/modal/modal.component';
import { EditGroceryFormComponent } from "../edit-grocery-form/edit-grocery-form.component";

@Component({
  selector: 'app-grocery',
  imports: [CommonModule, ModalComponent, EditGroceryFormComponent],
  templateUrl: './grocery.component.html',
  styleUrl: './grocery.component.css'
})
export class GroceryComponent {
  grocery = input.required<Grocery>();
  addButton = input<boolean>(false);
  isModalShowing = signal<boolean>(false);

  constructor(private groceriesService: GroceriesService) { }

  onAddGrocery() {
    this.groceriesService.addGrocery(this.grocery());
  }

  handleSubstractOneGrocery() {
    this.groceriesService.substractOneGrocery(this.grocery());
  }

  onOpenEditForm() {
    this.isModalShowing.set(true);
  }

  onHideEditForm() {
    this.isModalShowing.set(false)
  }

  getGroceryQuantity(grocery: Grocery) {
    return grocery[this.groceriesService.currentDay()];
  }
}
