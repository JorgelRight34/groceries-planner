import { Component, output, signal } from '@angular/core';
import { AddGroceryButtonComponent } from '../add-grocery-button/add-grocery-button.component';
import { categories } from '../../../lib/constants';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-categories',
  imports: [CommonModule],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.css'
})
export class CategoriesComponent {
  categories = [...categories];
  changeCategory = output<string>();
  currentCategory = signal<string>('');

  handleChangeCategory(category: string) {
    const newCategory = category === this.currentCategory() ? '' : category;
    this.currentCategory.set(newCategory);
    this.changeCategory.emit(newCategory);
  }
}
