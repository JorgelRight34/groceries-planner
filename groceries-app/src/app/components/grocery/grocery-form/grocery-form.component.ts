import { Component, computed, input, output, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Category } from '../../../models/category';
import { GroceriesService } from '../../../services/groceries.service';
import { CategoriesService } from '../../../services/categories.service';
import { Grocery } from '../../../models/grocery';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-grocery-form',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './grocery-form.component.html',
  styleUrl: './grocery-form-component.css'
})
export class GroceryFormComponent {
  grocery = input<Grocery | null>();
  formSubmit = output<Grocery | null>();
  groceryForm!: FormGroup;

  categories = computed(() => this.categoriesService.getAllCategories());
  groceryCategory = signal<Category | null>(null);  // Category of the grocery to be posted
  currentSection = signal<string>('ADD');

  constructor(
    private groceriesService: GroceriesService,
    private categoriesService: CategoriesService,
    private toastr: ToastrService,
  ) { }

  ngOnInit() {
    const categoryId = this.grocery()?.categoryId;
    if (categoryId) {
      let foundCategory = this.categoriesService.findCategoryById(categoryId);
      if (foundCategory) {
        this.groceryCategory.set(foundCategory);
      }
    }

    this.groceryForm = new FormGroup({
      name: new FormControl<string>(this.grocery()?.name || '', Validators.required),
      description: new FormControl<string>(this.grocery()?.description || '', Validators.required),
      url: new FormControl<string>(this.grocery()?.url || ''),
      imageUrl: new FormControl<string>(this.grocery()?.imageUrl || ''),
      cost: new FormControl<number>(this.grocery()?.cost || 0, Validators.required),
    });
  }

  onSubmit(): void {
    if (!this.groceryForm.valid) {
      this.toastr.error("Invalid form", "Please fill all the fields.");
      return
    }

    if (!this.groceryCategory()) {
      this.toastr.error("Please select a category.");
      return
    }

    // Create Grocery object
    const data = {
      ...this.groceryForm.value,
      category: this.groceryCategory(),
      [this.groceriesService.currentDay()]: 1,
    } as Grocery;

    this.formSubmit.emit(data);
    this.groceryForm.reset();
  }

  onCategoryChange(event: Event) {
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

  validateFormField(field: string): boolean {
    return (this.groceryForm.get(field)?.invalid && this.groceryForm.get(field)?.touched) || false;
  }
}
