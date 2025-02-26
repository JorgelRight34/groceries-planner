import { Component, computed, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Category } from '../../models/category';
import { GroceriesService } from '../../services/groceries.service';
import { CategoriesService } from '../../services/categories.service';
import { Grocery } from '../../models/grocery';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-grocery-form',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './grocery-form.component.html',
  styleUrl: './grocery-form-component.css'
})
export class GroceryFormComponent {
  groceryForm = new FormGroup({
    name: new FormControl<string>('', Validators.required),
    description: new FormControl<string>('', Validators.required),
    url: new FormControl<string>(''),
    imageUrl: new FormControl<string>(''),
    cost: new FormControl<number>(0, Validators.required),
  });
  categories = computed(() => this.categoriesService.getAllCategories());
  groceryCategory = signal<Category | null>(null);  // Category of the grocery to be posted
  currentSection = signal<string>('ADD');

  constructor(
    private groceriesService: GroceriesService,
    private categoriesService: CategoriesService
  ) { }

  onSubmit(): void {
    if (!this.groceryForm.valid) return

    // Create Grocery object
    const data = {
      ...this.groceryForm.value,
      category: this.groceryCategory(),
      [this.groceriesService.currentDay()]: 1,
    } as Grocery;

    this.groceriesService.addGrocery(data); // Add grocery
  }

  handleChangeCategory(event: Event) {
    // Get category id from the select element
    let categoryId = (event.target as HTMLSelectElement).value;
    if (categoryId) { // If the default option was not selected
      const newCategory = this.categoriesService.findCategoryById(Number(categoryId));
      if (newCategory) {
        // If the selected category indeed exists then set new category
        this.groceryCategory.set(newCategory);
        return
      }
    }

    // By default not category is selected
    this.groceryCategory.set(null);
  }
}
