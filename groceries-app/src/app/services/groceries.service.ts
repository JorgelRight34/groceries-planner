import { inject, Injectable, signal } from '@angular/core';
import { Grocery } from '../models/grocery';
import { HttpClient } from '@angular/common/http';
import { Day } from '../models/day';
import { map, Observable } from 'rxjs';
import { CategoriesService } from './categories.service';

@Injectable({
  providedIn: 'root'
})
export class GroceriesService {
  private url = `https://localhost:7240/groceries`;
  groceries = signal<Array<Grocery>>([]);
  hasAlreadyFetched = signal<boolean>(false);
  groceriesHistory: Grocery[] = []; // All groceries that have been created
  currentDay = signal<Day>("monday");  // Current selected day for grocery list

  constructor(private http: HttpClient, private categoriesService: CategoriesService) {
    this.loadAllGroceries()
  }

  loadAllGroceries() {
    if (this.hasAlreadyFetched()) return
    this.http.get<Grocery[]>(`${this.url}`).subscribe({
      next: (data) => {
        this.groceries.set(data)
        this.hasAlreadyFetched.set(true);
      },
      error: (error) => console.error(error)
    })
  }

  getAllGroceries() {
    if (this.groceries.length === 0) {
      this.loadAllGroceries();
    }

    return this.groceries();
  }

  getGroceriesByDay() {
    // Get all groceries of the selected day (currentDay
    const day = this.currentDay();
    const currentCategory = this.categoriesService.currentCategory();

    if (!day) return this.groceries();

    if (currentCategory) {
      return this.groceries().filter(
        grocery => (
          grocery[day] > 0 && grocery.category?.id === currentCategory?.id
        )
      ) || []
    }

    return this.groceries().filter(
      grocery => (
        grocery[day] > 0
      )
    ) || []
  }

  getGroceriesByDayAndCategory(categoryId: number) {
    // Get all the groceries of the selected day (currentDay)
    // that have as category the corresponding category to categoryId
    return this.getGroceriesByDay().filter(
      grocery => grocery.category?.id === categoryId
    );
  }

  addGrocery(grocery: Grocery): void {
    // Add grocery t
    let day = this.currentDay();  // Current day
    // Check if a grocery with the same name already exists
    const existingGrocery = this.groceries().filter(
      g => g.name === grocery.name
    )[0];

    if (existingGrocery) {
      // If existing grocery add one to the day it's being added
      const copy = [...this.groceries()];
      const index = copy.findIndex((g) => g.id === existingGrocery.id);
      copy[index] = { ...grocery, [day]: grocery[day] + 1 };

      this.groceries.set(copy);
    } else {
      // If there's not existing grocery create it from scratch
      const data: any = {
        ...grocery,
        [day]: 1,
      }

      if (grocery.category?.id) {
        data.categoryId = grocery.category?.id;
      }

      this.http.post<Grocery>(`${this.url}`, data).
        subscribe((data) => {
          // Add new grocery to the groceries array
          this.groceries.update(prev => [data, ...prev])
        });
    }
  }

  substractOneGrocery(grocery: Grocery): void {
    // Add grocery t
    let day = this.currentDay();  // Current day
    // Check if a grocery with the same name already exists
    const existingGrocery = this.groceries().filter(
      g => g.id === grocery.id
    )[0];

    if (existingGrocery) {
      // If existing grocery add one to the day it's being added
      const copy = [...this.groceries()];
      const index = copy.findIndex((g) => g.id === existingGrocery.id);
      const substraction = grocery[day] - 1;
      copy[index] = { ...grocery, [day]: substraction < 0 ? 0 : substraction };
      this.groceries.set(copy);
      return
    }
  }

  saveGroceryList(): Observable<Grocery[]> {
    return this.http.post<Grocery[]>(`${this.url}/save-groceries-list`, this.groceries());
  }

  deleteGrocery(groceryId: number): void {
    // 
  }
}
