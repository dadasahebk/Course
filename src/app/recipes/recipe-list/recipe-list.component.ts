import { Component, OnInit, EventEmitter, Output, OnDestroy } from '@angular/core';
import { Recipe } from '../recipe.model';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit, OnDestroy {
  // @Output() recipeWasSelected = new EventEmitter<Recipe>();

  // recipes: Recipe[] = [
  //   new Recipe('Test Recipe', 'This is simply a Test', 'http://maxpixel.freegreatpicture.com/static/photo/1x/Alcohol-Drink-Recipe-Cocktail-Cuba-Libre-Party-881004.jpg'),
  //   new Recipe('Another Test Recipe', 'This is simply a Test', 'http://maxpixel.freegreatpicture.com/static/photo/1x/Alcohol-Drink-Recipe-Cocktail-Cuba-Libre-Party-881004.jpg')
  // ];
  subscription: Subscription;
  recipes: Recipe[];

  constructor(private recipeServie: RecipeService,
              private router: Router,
              private route: ActivatedRoute) {

  }

  ngOnInit() {
    this.subscription = this.recipeServie.recipesChanged.subscribe(
      (recipes: Recipe[]) => { this.recipes = recipes; }
    );

    this.recipes = this.recipeServie.getRecipes();
  }

  // onRecipeSelected(recipe: Recipe) {
  //   this.recipeWasSelected.emit(recipe);
  // }

  onNewRecipe() {
    this.router.navigate(['new'], { relativeTo: this.route });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
