import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { Category } from '../models/category';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {
  private url = 'http://localhost:5152/categories'
  hasFetched = signal<boolean>(false);
  currentCategory = signal<Category | null>(null);
  categories = signal<Category[]>([]);

  constructor(private http: HttpClient) { }

  getAllCategories(): Category[] {
    if (this.categories.length > 0 || this.hasFetched()) {
      return this.categories();
    }

    this.http.get<Category[]>(`${this.url}`).subscribe({
      next: (data) => {
        this.categories.set(data);
        this.hasFetched.set(true)
        return data;
      },
      error: (err) => console.error(err)
    });

    return this.categories();
  }

  findCategoryById(id: number): Category | undefined {
    return this.categories().find(category => category.id === id);
  }

  setCategory(category: Category | null): void {
    if (category?.id === this.currentCategory()?.id) return
    this.currentCategory.set(category);
  }
}
