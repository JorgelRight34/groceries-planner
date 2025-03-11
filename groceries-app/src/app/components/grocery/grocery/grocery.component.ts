import { Component, input, signal } from '@angular/core';
import { Grocery } from '../../../models/grocery';
import { CommonModule } from '@angular/common';
import { GroceriesService } from '../../../services/groceries.service';
import { ModalComponent } from '../../shared/modal/modal.component';
import { GroceryFormComponent } from "../grocery-form/grocery-form.component";
import { ToastrService } from 'ngx-toastr';
import { days } from '../../../../lib/constants';

@Component({
  selector: 'app-grocery',
  imports: [CommonModule, ModalComponent, GroceryFormComponent],
  templateUrl: './grocery.component.html',
  styleUrl: './grocery.component.css'
})
export class GroceryComponent {
  grocery = input.required<Grocery>();
  addButton = input<boolean>(false);
  isModalShowing = signal<boolean>(false);
  days = [...days];

  constructor(
    private groceriesService: GroceriesService,
    private toastr: ToastrService
  ) { }

  onAddGrocery(event: Event) {
    event.stopPropagation();
    this.groceriesService.addGrocery(this.grocery());
  }

  handleSubstractOneGrocery(event: Event) {
    event.stopPropagation();
    this.groceriesService.substractOneGrocery(this.grocery());
  }

  onOpenEditForm(event: Event) {
    event.stopPropagation();
    this.isModalShowing.set(true);
  }

  onHideEditForm() {
    this.isModalShowing.set(false)
  }

  onEditFormSubmit(event: Grocery | null) {
    if (!event) return
    this.groceriesService.updateGrocery(event)
    this.toastr.success("Created", "Grocery succesfully updated.");
  }

  getGroceryQuantity(grocery: Grocery) {
    return grocery[this.groceriesService.currentDay()];
  }

  getWeekQuantity() {
    let count = 0;
    let groceryRead = this.grocery();
    days.forEach(day => {
      count += groceryRead[day];
    });
    return count
  }

  handleDelete() {
    if (confirm("Are you sure you want to delete this grocery?, it won't can be recovered")) {
      this.groceriesService.deleteGrocery(this.grocery().id).subscribe();
    }
  }
}
