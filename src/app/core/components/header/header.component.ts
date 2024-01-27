import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { take, timer } from 'rxjs';

import { CommonModule } from '@angular/common';
import { LocalStorageService } from '../../../shared/services/local-storage.service';

@Component({
	selector: 'app-header',
	standalone: true,
	imports: [CommonModule, RouterModule],
	templateUrl: './header.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush,
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
}
