import { Component, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { GroceriesService } from '../../services/groceries.service';
import { Grocery } from '../../models/grocery';
import { GroceryComponent } from '../grocery/grocery.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-grocery',
  imports: [CommonModule, ReactiveFormsModule, GroceryComponent],
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
  currentSection = signal<string>('ADD');

  constructor(private groceriesService: GroceriesService) { }

  onSubmit(): void {
    if (!this.addGroceryForm.valid) return

    // Create Grocery object
    const data = {
      ...this.addGroceryForm.value,
      // Initialize days having the currentDay because
      // the form is for adding groceries to a certain day 
      // which is the current day
      days: [this.groceriesService.currentDay()],
    } as Grocery;

    this.groceriesService.addGrocery(data); // Add grocery
  }

  getGroceries() {
    return this.groceriesService.groceries();
  }

  setCurrentSection(section: string) {
    this.currentSection.set(section);
  }

}
