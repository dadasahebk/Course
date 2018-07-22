import { Component, Output, EventEmitter } from '@angular/core';
import { Response } from '@angular/http';

import { DataStorageService } from '../shared/data-storage.service';
import { AuthService } from '../auth/auth.service';

@Component ({
    selector: `app-header`,
    templateUrl: `./header.component.html`
})

export class HeaderComponent {
    // @Output() featureSelected = new EventEmitter<string>();

    // onSelect(feature: string) {
    //     this.featureSelected.emit(feature);
    // }

    constructor(private dsService: DataStorageService, private authService: AuthService) {

    }

    onSaveData() {
        this.dsService.storeRecipes().subscribe(
            (response: Response) => { console.log(response); }
        );
    }

    onFetchData() {
        this.dsService.getRecipes();
    }

    onLogout() {
        this.authService.logout();
    }
}
