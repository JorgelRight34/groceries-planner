import { CommonModule } from '@angular/common';
import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-modal',
  imports: [CommonModule],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.css'
})
export class ModalComponent {
  title = input('');
  isOpen = input<boolean>(false);
  width = input<string>('auto');
  height = input<string>('auto');
  hideModal = output();
  isThisOpen = false;

  ngOnInit() {
    this.isThisOpen = this.isOpen();
  }

  handleHideModal() : void {
    this.hideModal.emit();
  }
}
