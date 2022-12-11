import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged, filter, map, Observable, tap } from 'rxjs';
import { AppStore } from '../store/app.store';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  animations: [
    trigger('toggleInput', [
      state('void', style({
        opacity: 0,
        width: '0px',
      })),
      state('*', style({
        opacity: 1,
        width: '256px',
      })),
      transition('void <=> *', animate('300ms ease-in-out'))
    ])
  ]
})
export class HeaderComponent {
  toggleInput:boolean = false;
  value = '';
  queryField = new FormControl();

  constructor(private store: AppStore) {}

  toggleInputField(): void {
    this.toggleInput = !this.toggleInput;
  }

  onSubmit() {
    this.store.fetchAnime(this.queryField.value);
  }

}
