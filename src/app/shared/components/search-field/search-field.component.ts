import { Component, EventEmitter, Output, inject } from '@angular/core';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search-field',
  standalone: true,
  imports: [
    CommonModule, FormsModule
  ],
  templateUrl: './search-field.component.html',
  styleUrls: ['./search-field.component.scss'],
})
export class SearchFieldComponent {
  query!: string;
  router = inject(Router);

  @Output() clicked = new EventEmitter<string>();

  search(): void {
    this.clicked.emit(this.query);
  }
}
