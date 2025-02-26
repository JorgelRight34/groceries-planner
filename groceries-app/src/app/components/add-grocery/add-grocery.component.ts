import { Component, computed, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { GroceriesService } from '../../services/groceries.service';
import { Grocery } from '../../models/grocery';
import { GroceryComponent } from '../grocery/grocery.component';
import { CommonModule } from '@angular/common';
import { CategoriesService } from '../../services/categories.service';
import { Category } from '../../models/category';
import { GroceryFormComponent } from '../grocery-form/grocery-form.component';

@Component({
  selector: 'app-add-grocery',
  imports: [CommonModule, ReactiveFormsModule, GroceryComponent, GroceryFormComponent],
  templateUrl: './add-grocery.component.html',
  styleUrl: './add-grocery.component.css'
})
export class AddGroceryComponent {
  groceries = computed(() => this.groceriesService.getAllGroceries());
  currentSection = signal<string>('ADD');

  constructor(
    private groceriesService: GroceriesService,
    private categoriesService: CategoriesService
  ) { }

  setCurrentSection(section: string) {
    // For mobile users to change between sections
    this.currentSection.set(section);
  }
}
