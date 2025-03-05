import { Component, computed, input, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Category } from '../../models/category';
import { Grocery } from '../../models/grocery';
import { CategoriesService } from '../../services/categories.service';
import { GroceriesService } from '../../services/groceries.service';
import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-edit-grocery-form',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './edit-grocery-form.component.html',
  styleUrl: './edit-grocery-form.component.css'
})
export class EditGroceryFormComponent {
  grocery = input.required<Grocery>();

  groceryForm!: FormGroup;

  categories = computed(() => this.categoriesService.getAllCategories());
  groceryCategory = signal<Category | null>(null);  // Category of the grocery to be posted

  constructor(
    private groceriesService: GroceriesService,
    private categoriesService: CategoriesService,
    private toastr: ToastrService,
  ) { }

  ngOnInit() {
    const categoryId = this.grocery().categoryId;
    if (categoryId) {
      let foundCategory = this.categoriesService.findCategoryById(categoryId);
      if (foundCategory) {
        this.groceryCategory.set(foundCategory);
      }
    }

    this.groceryForm = new FormGroup({
      name: new FormControl<string>(this.grocery().name || '', Validators.required),
      description: new FormControl<string>(this.grocery()?.description || '', Validators.required),
      url: new FormControl<string>(this.grocery().url || ''),
      imageUrl: new FormControl<string>(this.grocery().imageUrl || ''),
      cost: new FormControl<number>(this.grocery()?.cost || 0, Validators.required),
    });
  }

  onSubmit(): void {
    if (!this.groceryForm.valid) {
      this.toastr.error("Invalid form", "Please fill all the fields.")
      return
    }

    // Create Grocery object
    const data = {
      ...this.grocery(),
      ...this.groceryForm.value,
      category: this.groceryCategory(),
    } as Grocery;

    this.groceriesService.updateGrocery(data)
    this.groceryForm.reset();
    this.toastr.success("Created", "Grocery succesfully updated.");
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


  handleDelete() {
    if (confirm("Are you sure you want to delete this grocery?, it won't can be recovered")) {
      this.groceriesService.deleteGrocery(this.grocery().id).subscribe();
    }
  }

  validateFormField(field: string): boolean {
    return (this.groceryForm.get(field)?.invalid && this.groceryForm.get(field)?.touched) || false;
  }
}
