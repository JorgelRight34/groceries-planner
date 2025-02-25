import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { Category } from '../models/category';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {
  private url = 'https://localhost:7240/categories'
  currentCategory = signal<Category | null>(null);
  categories = signal<Category[]>([]);

  constructor(private http: HttpClient) { }

  getAllCategories(): Category[] {
    if (this.categories.length > 0) {
      return this.categories();
    }

    this.http.get<Category[]>(`${this.url}`).subscribe((data) => this.categories.set(data));

    return this.categories();
  }

  findCategoryById(id: number): Category | undefined {
    return this.categories().find(category => category.id === id);
  }

  setCategory(category: Category): void {
    if (category.id === this.currentCategory()?.id) return
    this.currentCategory.set(category);
  }
}
