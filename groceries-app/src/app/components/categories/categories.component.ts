import { Component, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoriesService } from '../../services/categories.service';
import { Category } from '../../models/category';

@Component({
  selector: 'app-categories',
  imports: [CommonModule],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.css'
})
export class CategoriesComponent {
  categories = computed<Category[]>(
    () => this.categoriesService.getAllCategories()
  );

  constructor(private categoriesService: CategoriesService) { }

  handleChangeCategory(event: Event) {
    // Get category id from the select element
    let categoryId = (event.target as HTMLSelectElement).value;
    if (categoryId) { // If the default option was not selected
      const newCategory = this.categoriesService.findCategoryById(Number(categoryId));
      if (newCategory) {
        // If the selected category indeed e
        this.categoriesService.setCategory(newCategory);
        return
      }
    }

    // By default not category is selected
    this.categoriesService.setCategory(null);
  }
}
