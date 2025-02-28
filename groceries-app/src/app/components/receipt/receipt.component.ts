import { Component, computed } from '@angular/core';
import { days } from '../../../lib/constants';
import { CommonModule } from '@angular/common';
import { GroceriesService } from '../../services/groceries.service';

@Component({
  selector: 'app-receipt',
  imports: [CommonModule],
  templateUrl: './receipt.component.html',
  styleUrl: './receipt.component.css'
})
export class ReceiptComponent {
  days = [...days]
  data = computed(() => this.groceriesService.groupGroceriesByDayAndCategory());

  constructor(private groceriesService: GroceriesService) { }
}
