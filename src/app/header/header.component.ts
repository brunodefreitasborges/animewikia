import { Router } from '@angular/router';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
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
        width: '248px'
      })),
      transition('void <=> *', animate('300ms ease-in-out'))
    ]),
    trigger('loadPage', [
      state('void', style({
        opacity: 0,
        transform: 'translateY(100%)'
      })),
      state('*', style({
        opacity: 1,
        transform: 'translateY(0)'
      })),
      transition('void <=> *', animate('600ms ease'))
    ])
  ]
})
export class HeaderComponent {
  toggleInput:boolean = false;
  value = '';
  queryField = new FormControl();

  constructor(private store: AppStore, private router: Router) {}

  toggleInputField(): void {
    this.toggleInput = !this.toggleInput;
  }

  onSubmit() {
    this.home();
    this.store.fetchAnime(this.queryField.value);
  }

  home() {
    this.router.navigate(['/']);
  }

  onKeyPress(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      this.onSubmit();
    }
  }

}
