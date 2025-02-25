import { Component } from '@angular/core';
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

  constructor(private categoriesService: CategoriesService) { }

  handleChangeCategory(event: Event) {
    // If new category is the same as selected then unselect category
    const categoryId = (event.target as HTMLSelectElement).value;
    const newCategory = this.categoriesService.findCategoryById(Number(categoryId));
    if (newCategory) {
      this.categoriesService.setCategory(newCategory);
    }
  }

  getGroceries(): Category[] {
    return this.categoriesService.getAllCategories();
  }
}
