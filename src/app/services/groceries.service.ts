import { Injectable } from '@angular/core';
import { Grocery } from '../models/grocery';
import { groceries } from '../../lib/constants';

@Injectable({
  providedIn: 'root'
})
export class GroceriesService {
  groceries: Grocery[] = [...groceries]

  constructor() { }

  getGroceriesByDay(day?: string) {
    if (!day) {
      return this.groceries;
    }

    return this.groceries.filter(grocery => grocery.days.includes(day)) || []
  }
}
