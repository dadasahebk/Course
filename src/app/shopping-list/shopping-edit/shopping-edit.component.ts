// import { Component, OnInit, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';
import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';

import { Ingredient } from '../../shared/ingredient.model';
import { ShoppinglistServie } from '../shopping-list.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})

export class ShoppingEditComponent implements OnInit, OnDestroy {
  // @ViewChild('inputName') inputNameRef: ElementRef;
  // @ViewChild('inputAmount') inputAmountRef: ElementRef;
  // @Output() ingredeientAdded = new EventEmitter<Ingredient>();

  @ViewChild('f') slForm: NgForm;
  subscription: Subscription;
  editMode = false;
  editedItemIndex: number;
  editedItem: Ingredient;

  constructor(private slService: ShoppinglistServie) { }

  ngOnInit() {
    this.subscription = this.slService.startedEditing.subscribe(
      (index: number) => {
        this.editedItemIndex = index;
        this.editMode = true;
        this.editedItem = this.slService.getIngredient(index);
        this.slForm.setValue({
          name: this.editedItem.name,
          amount: this.editedItem.amount
        });
      }
    );
  }

  onSubmit(form: NgForm) {
    // const ingName = this.inputNameRef.nativeElement.value;
    // const ingAmount = this.inputAmountRef.nativeElement.value;
    // const newIngredient = new Ingredient(ingName, ingAmount);
    // this.ingredeientAdded.emit(newIngredient);

    const value = form.value;
    const newIngredient = new Ingredient(value.name, value.amount);
    if (this.editMode) {
        this.slService.updateIngredient(this.editedItemIndex, newIngredient);
    } else {
       this.slService.addIngredient(newIngredient);
    }
  }

  onClear() {
    this.slForm.reset();
    this.editMode = false;
  }

  onDelete(index: number) {
    this.slService.deleteIngredient(this.editedItemIndex);
    this.onClear();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
