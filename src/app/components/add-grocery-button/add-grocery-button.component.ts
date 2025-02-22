import { Component, input, signal } from '@angular/core';
import { ModalComponent } from '../modal/modal.component';
import { AddGroceryComponent } from '../add-grocery/add-grocery.component';
import { GroceriesService } from '../../services/groceries.service';

@Component({
  selector: 'app-add-grocery-button',
  imports: [AddGroceryComponent, ModalComponent],
  templateUrl: './add-grocery-button.component.html',
  styleUrl: './add-grocery-button.component.css'
})
export class AddGroceryButtonComponent {
  isModalOpen = signal<boolean>(false);
  selectedDay = input<string>('Monday');
  text = input<string>('+ Add');

  constructor(private groceriesService: GroceriesService) { }

  toggleModalOpen(): void {
    this.isModalOpen.update(prev => !prev);
  }

  hideModal(): void {
    this.isModalOpen.set(false);
  }

  getTitle(): string {
    return `+ Add grocery for ${this.groceriesService.currentDay()}`
  }
}
