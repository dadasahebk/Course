import { Ingredient } from '../shared/ingredient.model';
import { EventEmitter } from '@angular/core';
import { Subject } from 'rxjs/Subject';

export class ShoppinglistServie {

    // ingredientsChanged = new EventEmitter<Ingredient []>();
    ingredientsChanged = new Subject<Ingredient[]>();
    startedEditing = new Subject<number>();

    Ingredients: Ingredient[] = [
        new Ingredient('Apple', 5),
        new Ingredient('Tomato', 10)
    ];

    getIngredients() {
        return this.Ingredients.slice();
    }

    getIngredient(index: number) {
        return this.Ingredients[index];
    }

    addIngredient(ingredient: Ingredient) {
        this.Ingredients.push(ingredient);
        // this.ingredientsChanged.emit(this.Ingredients.slice());
        this.ingredientsChanged.next(this.Ingredients.slice());
    }

    addIngredients(ingredients: Ingredient []) {
        // for (let ingredient of ingredients) {
        //     this.addIngredient(ingredient);
        // }
        this.Ingredients.push(...ingredients);
        // this.ingredientsChanged.emit(this.Ingredients.slice());
        this.ingredientsChanged.next(this.Ingredients.slice());
    }

    updateIngredient(index: number, newIngredient: Ingredient) {
        this.Ingredients[index] = newIngredient;
        this.ingredientsChanged.next(this.Ingredients.slice());
    }

    deleteIngredient(index: number) {
        this.Ingredients.splice(index, 1);
        this.ingredientsChanged.next(this.Ingredients.slice());
    }
}
