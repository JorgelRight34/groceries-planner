import { Injectable, signal } from '@angular/core';
import { Grocery } from '../models/grocery';
import { HttpClient } from '@angular/common/http';
import { Day } from '../models/day';
import { CategoriesService } from './categories.service';
import { GroceryList } from '../models/groceryList';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GroceriesService {
  private url = `https://localhost:7240`;
  groceriesLists = signal<Array<GroceryList>>([]);  // All lists of plans
  hasAlreadyFetched = signal<boolean>(false);
  groceriesHistory: Grocery[] = []; // All groceries that have been created
  currentGroceryList = signal<GroceryList | null>(null); // Selected grocery list
  currentDay = signal<Day>("monday");  // Current selected day for grocery list

  constructor(private http: HttpClient, private categoriesService: CategoriesService) {
    this.loadAllGroceriesLists()
  }

  loadAllGroceriesLists() {
    // Prevent infinite fetching
    if (this.hasAlreadyFetched()) return
    console.log("im fetching");

    // Get groceries lists
    this.http.get<Array<GroceryList>>(`${this.url}/grocerylist`).subscribe({
      next: (data) => {
        this.groceriesLists.set(data)
        this.hasAlreadyFetched.set(true);
      },
      error: (error) => console.error(error)
    })
  }

  getAllGroceries() {
    if (this.groceriesLists.length === 0) {
      this.loadAllGroceriesLists();
    }

    if (this.currentGroceryList() == null) return;

    return this.currentGroceryList()?.groceries;
  }

  getGroceriesByDay() {
    // Get all groceries of the selected day (currentDay)
    const day = this.currentDay();
    const currentCategory = this.categoriesService.currentCategory();
    const groceryList = this.currentGroceryList()?.groceries;

    if (groceryList?.length === 0) return

    if (currentCategory) {
      return groceryList?.filter(
        grocery => (
          grocery[day] > 0 && grocery.category?.id === currentCategory?.id
        )
      ) || []
    }

    return groceryList?.filter(
      grocery => (
        grocery[day] > 0
      )
    ) || []
  }

  getGroceriesByDayAndCategory(categoryId: number) {
    // Get all the groceries of the selected day (currentDay)
    // that have as category the corresponding category to categoryId
    return this.getGroceriesByDay()?.filter(
      grocery => grocery.categoryId === categoryId
    );
  }

  addGrocery(grocery: Grocery): void {
    // Add grocery t
    let day = this.currentDay();  // Current day
    const groceryList: Grocery[] | undefined = this.currentGroceryList()?.groceries;
    if (groceryList?.length === 0) return;

    // Check if a grocery with the same name already exists
    const existingGrocery = groceryList?.filter(
      g => g.name === grocery.name
    )[0];

    if (existingGrocery) {
      // If existing grocery add one to the day it's being added
      const copy = [...groceryList];
      const index = copy.findIndex((g) => g.id === existingGrocery.id);
      copy[index] = { ...grocery, [day]: grocery[day] + 1 };

      this.setCurrentGroceryList(copy);
    }
    else {
      // If there's not existing grocery create it from scratch
      const data: any = {
        ...grocery,
        [day]: 1,
      }

      if (grocery.category?.id) {
        data.categoryId = grocery.category?.id;
      }

      this.http.post<Grocery>(`${this.url}/groceries`, data).
        subscribe((data) => {
          // Add new grocery to the groceries array
          if (groceryList) {
            this.setCurrentGroceryList([data, ...groceryList])
          } else {
            this.setCurrentGroceryList([data]);
          }
        });
    }
  }

  substractOneGrocery(grocery: Grocery): void {
    // Add grocery t
    let day = this.currentDay();  // Current day
    const groceries = this.currentGroceryList()?.groceries;
    if (groceries?.length === 0) return

    // Check if a grocery with the same name already exists
    const existingGrocery = groceries?.filter(
      g => g.id === grocery.id
    )[0];

    if (existingGrocery) {
      // If existing grocery add one to the day it's being added
      const copy = [...groceries];
      const index = copy.findIndex((g) => g.id === existingGrocery.id);
      const substraction = grocery[day] - 1;
      copy[index] = { ...grocery, [day]: substraction < 0 ? 0 : substraction };
      this.setCurrentGroceryList(copy)
      return
    }
  }

  saveGroceryList(): Observable<Grocery[]> {
    const groceries = this.currentGroceryList()?.groceries;
    return this.http.post<Grocery[]>(
      `${this.url}/grocerylist/save-groceries-list`, groceries
    );
  }

  setCurrentGroceryList(data: Grocery[]) {
    this.currentGroceryList.update(prev => {
      if (prev) {
        return {
          id: prev.id,
          name: prev.name,
          description: prev.description,
          groceries: [...data]
        }
      }
      return prev
    })
  }

  deleteGrocery(groceryId: number): void {
    // 
  }

  createGroceryList(groceryList: GroceryList): Observable<GroceryList> {
    return this.http.post<GroceryList>(`${this.url}/grocerylist`, groceryList)
      .pipe(
        map(data => {
          this.groceriesLists.update(prev => [...prev, data]);
          return data
        })
      );
  }

  deleteGroceryList(groceryListId: number): Observable<{}> {
    return this.http.delete<{}>(`${this.url}/grocerylist/${groceryListId}`)
      .pipe((data) => {
        this.groceriesLists.update(prev => prev.filter(l => l.id != groceryListId))
        return data
      });
  }

  downloadPdf(groceryList: GroceryList) {
    return this.http.post<Blob>(`${this.url}/grocerylist/export-pdf`, groceryList);
  }
}
