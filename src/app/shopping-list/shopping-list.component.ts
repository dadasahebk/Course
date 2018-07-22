import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { Ingredient } from '../shared/ingredient.model';
import { ShoppinglistServie } from './shopping-list.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})

export class ShoppingListComponent implements OnInit, OnDestroy {

  Ingredients: Ingredient[];
  private subsription: Subscription;

  // Ingredients: Ingredient[] = [
  //   new Ingredient('Apple', 5),
  //   new Ingredient('Tomato', 10)
  // ];

  constructor(private slService: ShoppinglistServie) { }

  ngOnInit() {
    this.Ingredients = this.slService.getIngredients();
    this.subsription = this.slService.ingredientsChanged.subscribe(
      (ingredients: Ingredient []) => { this.Ingredients = ingredients; }
    );
  }

  // oningredeientAdded(ingredient: Ingredient) {
  //   this.Ingredients.push(ingredient);
  // }

  onEditItem(index: number) {
    this.slService.startedEditing.next(index);
  }

  ngOnDestroy() {
    this.subsription.unsubscribe();
  }
}
