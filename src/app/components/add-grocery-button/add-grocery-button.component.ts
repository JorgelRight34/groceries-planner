import { Component, input, signal } from '@angular/core';
import { ModalComponent } from '../modal/modal.component';
import { AddGroceryComponent } from '../add-grocery/add-grocery.component';

@Component({
  selector: 'app-add-grocery-button',
  imports: [AddGroceryComponent, ModalComponent],
  templateUrl: './add-grocery-button.component.html',
  styleUrl: './add-grocery-button.component.css'
})
export class AddGroceryButtonComponent {
  isModalOpen = signal<boolean>(false);
  selectedDay = input<string>('Monday');

  toggleModalOpen() : void {
    this.isModalOpen.update(prev => !prev);
  }

  hideModal() : void {
    this.isModalOpen.set(false);
  }
}
