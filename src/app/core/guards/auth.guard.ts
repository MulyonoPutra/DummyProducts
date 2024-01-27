import { ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree } from '@angular/router';

import { Injectable } from '@angular/core';
import { LocalStorageService } from '../../shared/services/local-storage.service';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2';

@Injectable({
	providedIn: 'root',
})
export class AuthGuard {
	constructor(
		private readonly localStorageService: LocalStorageService,
		private router: Router,
	) {}

	canActivate(
		route: ActivatedRouteSnapshot,
		state: RouterStateSnapshot,
	): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
		const token = this.localStorageService.getItem('token');
		if (!token) {
			Swal.fire({
				icon: 'error',
				title: 'Oops...',
				text: 'You cannot access this page, please login first!',
			});
			this.router.navigate(['/login'], {
				queryParams: { returnUrl: state.url },
				replaceUrl: true,
			});
			return false;
		}
		return true;
	}
}
