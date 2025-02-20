import { Component } from '@angular/core';
import { DaySelectorComponent } from '../../components/day-selector/day-selector.component';
import { GroceriesComponent } from '../../components/groceries/groceries.component';

@Component({
  selector: 'app-home',
  imports: [GroceriesComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
