import { Component, input, signal } from '@angular/core';
import { GroceriesService } from '../../services/groceries.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ModalComponent } from '../modal/modal.component';
import { GroceryList } from '../../models/groceryList';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-edit-grocery-list-button',
  imports: [ReactiveFormsModule, ModalComponent],
  templateUrl: './edit-grocery-list-button.component.html',
  styleUrl: './edit-grocery-list-button.component.css'
})
export class EditGroceryListButtonComponent {
  isModalShowing = signal<boolean>(false);
  groceryList = input.required<GroceryList>();

  form!: FormGroup;

  constructor(private groceriesService: GroceriesService, private toastr: ToastrService) { }

  ngOnInit() {
    this.form = new FormGroup({
      name: new FormControl<string>(this.groceryList().name, Validators.required),
      description: new FormControl<string>(this.groceryList().description, Validators.required)
    })
  }

  showModal() {
    this.isModalShowing.set(true);
  }

  hideModal() {
    this.isModalShowing.set(false);
  }

  handleSubmit() {
    if (!this.form.valid) return

    const { name, description } = this.form.value;

    if (name && description) {
      const data: GroceryList = {
        ...this.groceryList(),
        name,
        description
      }

      this.groceriesService.updateGroceryList(data)?.subscribe({
        next: () => {
          this.toastr.success("Updated!", "Updated sucessfully.");
          this.hideModal();
        },
        error: () => this.toastr.error("Oops!", "An error has occured.")
      });
    }
  }

  deleteGroceryList(): void {
    const id = this.groceryList().id;
    if (id) {
      this.groceriesService.deleteGroceryList(id).subscribe();
    }
  }

  isFormFieldValid(field: string) {
    return this.form.get(field)?.errors && this.form.get(field)?.touched;
  }
}
