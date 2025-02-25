import { Component, computed, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { GroceriesService } from '../../services/groceries.service';
import { Grocery } from '../../models/grocery';
import { GroceryComponent } from '../grocery/grocery.component';
import { CommonModule } from '@angular/common';
import { CategoriesService } from '../../services/categories.service';
import { Category } from '../../models/category';

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
  categories = computed(() => this.categoriesService.getAllCategories());
  groceries = computed(() => this.groceriesService.getAllGroceries());
  groceryCategory = signal<Category | null>(null);  // Category of the grocery to be posted
  currentSection = signal<string>('ADD');

  constructor(
    private groceriesService: GroceriesService,
    private categoriesService: CategoriesService
  ) { }

  onSubmit(): void {
    if (!this.addGroceryForm.valid) return

    // Create Grocery object
    const data = {
      ...this.addGroceryForm.value,
      category: this.groceryCategory(),
      [this.groceriesService.currentDay()]: 1,
    } as Grocery;

    this.groceriesService.addGrocery(data); // Add grocery
  }

  setCurrentSection(section: string) {
    // For mobile users to change between sections
    this.currentSection.set(section);
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
