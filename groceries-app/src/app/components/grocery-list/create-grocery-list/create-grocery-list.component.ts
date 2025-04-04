import { Component, signal } from '@angular/core';
import { ModalComponent } from '../../shared/modal/modal.component';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { GroceriesService } from '../../../services/groceries.service';
import { GroceryList } from '../../../models/groceryList';

@Component({
  selector: 'app-create-grocery-list',
  imports: [ModalComponent, ReactiveFormsModule],
  templateUrl: './create-grocery-list.component.html',
  styleUrl: './create-grocery-list.component.css'
})
export class CreateGroceryListComponent {
  isModalShowing = signal<boolean>(false);
  form = new FormGroup({
    name: new FormControl<string>('', Validators.required),
    description: new FormControl<string>('')
  })

  constructor(private groceriesService: GroceriesService) { }

  showModal() {
    this.isModalShowing.set(true);
  }

  onHideModal() {
    this.isModalShowing.set(false);
  }

  handleSubmit() {
    if (!this.form.valid) return

    const { name, description } = this.form.value;

    if (name && description) {
      const data: GroceryList = {
        id: undefined,  // To be defined by database
        name,
        description,
        groceries: []
      }

      // Create grocery list
      this.groceriesService.createGroceryList(data).subscribe();
    }
  }

  isFormFieldValid(field: string) {
    // Validate if a given field from form has any error
    return this.form.get(field)?.errors && this.form.get(field)?.touched;
  }
}
