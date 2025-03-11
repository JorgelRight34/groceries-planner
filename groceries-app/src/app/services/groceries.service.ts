import { computed, Injectable, signal } from '@angular/core';
import { Grocery } from '../models/grocery';
import { HttpClient } from '@angular/common/http';
import { Day } from '../models/day';
import { CategoriesService } from './categories.service';
import { GroceryList } from '../models/groceryList';
import { map, Observable, of } from 'rxjs';
import { Category } from '../models/category';
import { days } from '../../lib/constants';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class GroceriesService {
  private url = `http://localhost:5152`;
  groceriesLists = signal<Array<GroceryList>>([]);  // All lists of plans
  hasAlreadyFetched = signal<boolean>(false);
  groceriesHistory: Grocery[] = []; // All groceries that have been created
  currentGroceryList = signal<GroceryList | null>(null); // Selected grocery list
  currentCategory = computed(() => this.categoriesService.currentCategory());
  currentDay = signal<Day>("monday");  // Current selected day for grocery list
  shared = false;
  groceryListId: String = '';

  constructor(
    private http: HttpClient,
    private categoriesService: CategoriesService,
    private toastr: ToastrService
  ) { }

  loadAllGroceriesLists() {
    // Prevent infinite fetching
    if (this.hasAlreadyFetched()) return

    // Get groceries lists
    this.http.get<Array<GroceryList>>(`${this.url}/grocerylist`).subscribe({
      next: (data) => {
        console.log(data);
        this.groceriesLists.set(data);
        this.hasAlreadyFetched.set(true);
      },
      error: (error) => {
        if (error.status === 0) this.toastr.error('Network error', 'An error has ocurred.')
      }
    })
  }

  getAllGroceriesList() {
    if (this.groceriesLists.length === 0) {
      // If groceries hasn't been fetched then do it
      this.loadAllGroceriesLists();
    }
    return this.groceriesLists();
  }

  getGroceryList(id: string) {
    // Get specific grocery list, may it be shared or not
    return this.http.get<GroceryList>(`${this.url}/groceryList/${id}`).pipe(
      map(data => {
        this.currentGroceryList.set(data);
        return data;
      })
    )
  }

  getAllGroceries() {
    if (this.currentGroceryList() == null) return;
    return this.currentGroceryList()?.groceries;
  }

  getGroceriesByDayAndCategory(categorId?: number, day?: Day) {
    // Day is a parameter to allow getting by day on other contexts
    // If no day was provided then the day of the service will be used
    if (!day) {
      day = this.currentDay();  // Selected current day on the app
    }

    // Get all groceries of the selected day (currentDay)
    const categoryId = categorId || this.currentCategory();
    const groceryList = this.currentGroceryList()?.groceries;

    // Avoid further computation when list is empty
    if (!groceryList || groceryList?.length === 0) return

    // If there's a category then make the computation
    if (categoryId) {
      return groceryList?.filter(
        grocery => (
          grocery[day] > 0 && grocery.categoryId === categoryId
        )
      ) || []
    }

    // If there's not category simply return all the groceries
    // that are planned to buy on day
    return groceryList?.filter(
      grocery => (
        grocery[day] > 0
      )
    ) || []
  }

  addGrocery(grocery: Grocery): Observable<Grocery> | void {
    // Add grocery t
    let day = this.currentDay();  // Current day
    const groceryList: Grocery[] | undefined = this.currentGroceryList()?.groceries || [];

    // Check if a grocery with the same name already exists
    const existingGrocery = groceryList?.filter(
      g => g.id === grocery.id
    )[0];

    if (existingGrocery) {
      // If existing grocery add one to the day it's being added
      const copy = [...groceryList];

      // Update grocery at the index it originally was
      const index = copy.findIndex((g) => g.id === existingGrocery.id);
      copy[index] = { ...grocery, [day]: grocery[day] + 1 };
      this.setCurrentGroceryList(copy);
      return of(existingGrocery);
    }
    else {
      // If there's not existing grocery create it from scratch
      const data: any = {
        ...grocery,
        categoryId: grocery.category?.id,
        groceryListId: this.currentGroceryList()?.id,
        [day]: 1 // Start with 1 on day
      }
      const { category, ...newData } = data;

      return this.http.post<Grocery>(`${this.url}/groceries`, newData)
        .pipe(
          map(data => {
            // Add new grocery to the groceries array
            if (groceryList) {
              this.setCurrentGroceryList([data, ...groceryList])
            } else {
              this.setCurrentGroceryList([data]);
            }
            return data
          })
        )
    }
  }

  updateGrocery(grocery: Grocery): Observable<Grocery> | void {
    // Update grocery an leave it at the same index it was previously
    const groceryList: Grocery[] | undefined = this.currentGroceryList()?.groceries;
    if (!groceryList) return;

    const index = groceryList?.findIndex(g => g.id === grocery.id);
    groceryList[index] = grocery; // Replace grocery for the updated one
    this.setCurrentGroceryList(groceryList);
  }

  substractOneGrocery(grocery: Grocery): void {
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

      // Update at the index it originally was and substract one on the day it takes
      const index = copy.findIndex((g) => g.id === existingGrocery.id);
      const substraction = grocery[day] - 1;

      // Update grocery list with the new quantity of this grocery on day
      copy[index] = { ...grocery, [day]: substraction < 0 ? 0 : substraction };
      this.setCurrentGroceryList(copy)
      return
    }
  }

  saveGroceryList(): Observable<Grocery[]> | void {
    // Save all changes
    const groceries = this.currentGroceryList()?.groceries;
    const id = this.currentGroceryList()?.id;

    if (!groceries || !id) return;

    return this.http.post<Grocery[]>(
      `${this.url}/grocerylist/save-groceries-list`, {
      groceries,
      id: id
    }
    );
  }

  setCurrentGroceryList(data: Grocery[]) {
    this.currentGroceryList.update(prev => {
      if (prev) {
        return {
          ...prev,
          groceries: [...data]
        }
      }
      return prev
    })
  }

  deleteGrocery(groceryId: number) {
    // Delete a specific grocery
    return this.http.delete(`${this.url}/groceries/${groceryId}`).pipe(
      map(data => {
        this.currentGroceryList.update(prev => {
          if (prev) {
            return {
              ...prev,
              groceries: prev.groceries.filter(g => g.id != groceryId)
            }
          }
          return prev
        })
        return data;
      })
    )
  }

  createGroceryList(groceryList: GroceryList): Observable<GroceryList> {
    // Create a new grocery list
    return this.http.post<GroceryList>(`${this.url}/grocerylist`, groceryList)
      .pipe(
        map(data => {
          // Update grocery lists
          this.groceriesLists.update(prev => [...prev, data]);
          return data
        })
      );
  }

  deleteGroceryList(groceryListId: number): Observable<{}> {
    // Delete a grocery list
    return this.http.delete<{}>(`${this.url}/grocerylist/${groceryListId}`)
      .pipe((data) => {
        // Remove grocery list from array
        this.groceriesLists.update(prev => prev.filter(l => l.id != groceryListId))
        return data
      });
  }

  groupGroceriesByDayAndCategory() {
    // Construct data
    const data: any = {};
    const categories: Category[] = this.categoriesService.categories();
    let totalPrice = 0;
    let totalGroceries = 0;

    // Create a key for every day and inside each day a list of
    // { name: <category name> : groceries: [the groceries of that category on <day>]}
    days.forEach((day: Day) => {
      data[day] = []; // Initialize key
      categories.forEach(category => {
        // Insert each object
        const groceries = this.getGroceriesByDayAndCategory(category.id, day);
        if (groceries?.length && groceries?.length > 0) {
          totalPrice += groceries.reduce((sum, grocery) => sum + grocery.cost, 0);
          totalGroceries += groceries.reduce((sum, grocery) => sum + grocery[day], 0);
          data[day].push({
            name: category.name,
            groceries
          })
        }
      });
    });

    data.totalPrice = totalPrice;
    data.totalGroceries = totalGroceries;
    return data;
  }

  downloadPdf(groceryList: GroceryList) {
    const data = this.groupGroceriesByDayAndCategory();

    return this.http.post(
      `${this.url}/grocerylist/export-pdf`, data, { responseType: 'blob' }
    );
  }

  updateGroceryList(groceryList: GroceryList) {
    if (!groceryList.id) return

    return this.http.put<GroceryList>(`${this.url}/grocerylist/${groceryList.id}`, groceryList)
      .pipe(
        map(data => {
          // Update grocery lists
          const copy = [...this.groceriesLists()]
          const index = copy.findIndex(g => g.id === groceryList.id);
          copy[index] = data;
          this.groceriesLists.set(copy);
          return data;
        })
      )
  }
}
