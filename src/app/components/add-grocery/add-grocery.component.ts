import { Component, input } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { GroceriesService } from '../../services/groceries.service';
import { Grocery } from '../../models/grocery';
import { GroceriesComponent } from '../groceries/groceries.component';
import { GroceryComponent } from '../grocery/grocery.component';

@Component({
  selector: 'app-add-grocery',
  imports: [ReactiveFormsModule, GroceryComponent],
  templateUrl: './add-grocery.component.html',
  styleUrl: './add-grocery.component.css'
})
export class AddGroceryComponent {
  addGroceryForm = new FormGroup({
    name: new FormControl<string>('', Validators.required),
    description: new FormControl<string>('', Validators.required),
    url: new FormControl<string>(''),
    imageUrl: new FormControl<string>(''),
    cost: new FormControl<number>(0, Validators.required),
  });

  constructor(private groceriesService: GroceriesService) { }

  onSubmit(): void {
    if (!this.addGroceryForm.valid) return

    const data = {
      ...this.addGroceryForm.value,
      days: [this.groceriesService.currentDay()],
    } as Grocery;

    this.groceriesService.addGrocery(data);
  }

  getGroceries() {
    return this.groceriesService.groceries;
  }

}
