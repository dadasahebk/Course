import { Recipe } from './recipe.model';
import { EventEmitter, Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

import { Ingredient } from '../shared/ingredient.model';
import { ShoppinglistServie } from '../shopping-list/shopping-list.service';

@Injectable()
export class RecipeService {

    // recipeSelected = new EventEmitter<Recipe>();
    recipesChanged = new Subject<Recipe[]>();

    private recipes: Recipe[] = [
        new Recipe(
            'Kentucky Burger',
            'This is simply the best Kentucky Burger',
            'https://www.kfc.com.au/sites/default/files/aloha/Kentucky_Burger_Combo.jpg',
        [
            new Ingredient('Meat', 1),
            new Ingredient('French Fries', 10)
        ]),
        new Recipe(
            'Hamburger',
            'This is really awesome',
            'https://www.redrobin.com/content/dam/web/menu/tavern-menu/tavern-double-burger-1100.jpg',
        [
            new Ingredient('Buns', 2),
            new Ingredient('Meat', 1)
        ]),
        new Recipe(
            'Spaghetti',
            'very very tasty Spaghetti',
            'https://truffle-assets.imgix.net/06da1055-315-spaghettiborttaga-dishsquare1.jpg',
            [
                new Ingredient('Spaghetti', 5),
                new Ingredient('Tomato', 2)
            ]
        )
    ];

    constructor(private slService: ShoppinglistServie) {}

    setRecipes(recipes: Recipe[]) {
        this.recipes = recipes;
        this.recipesChanged.next(this.recipes.slice());
    }

    getRecipes() {
        return this.recipes.slice();
    }

    getRecipe(index: number) {
        return this.recipes[index];
    }

    addIngredienToShoppingList(ingredients: Ingredient []) {
        this.slService.addIngredients(ingredients);
    }

    addRecipe(recipe: Recipe) {
        this.recipes.push(recipe);
        this.recipesChanged.next(this.recipes.slice());
    }

    updateRecipe(index: number, newrecipe: Recipe) {
        this.recipes[index] = newrecipe;
        this.recipesChanged.next(this.recipes.slice());
    }

    deleteRecipe(index: number) {
        this.recipes.splice(index, 1);
        this.recipesChanged.next(this.recipes.slice());
    }
}
