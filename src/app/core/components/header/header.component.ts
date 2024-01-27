import { Router, RouterModule } from '@angular/router';
import { take, timer } from 'rxjs';

import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { LocalStorageService } from '../../../shared/services/local-storage.service';
import { SearchFieldComponent } from '../../../shared/components/search-field/search-field.component';

@Component({
	selector: 'app-header',
	standalone: true,
	imports: [CommonModule, RouterModule, SearchFieldComponent],
	templateUrl: './header.component.html',
})
export class HeaderComponent {
	constructor(
		private readonly _localStorageService: LocalStorageService,
		private readonly router: Router,
	) {}

	logout(): void {
		this._localStorageService.clear();
		timer(2000)
			.pipe(take(1))
			.subscribe(() => this.router.navigateByUrl('/login'));
	}

  search(query: string): void {
    if (query?.trim()) {
      this.router.navigate(['/search'], { queryParams: { query: query } });
    }
  }
}
