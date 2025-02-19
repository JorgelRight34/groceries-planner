import { Component } from '@angular/core';

@Component({
  selector: 'app-categories',
  imports: [],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.css'
})
export class CategoriesComponent {
  categories: string[] = [
    "Fruits",
    "Cheese",
    "Dairy",
    "Spices",
    "Vegetables",
    "Meat",
    "Bakery",
    "Grains"
  ];  
}
