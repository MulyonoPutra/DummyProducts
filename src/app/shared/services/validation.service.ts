import { FormControl, FormGroup } from '@angular/forms';

import { Injectable } from '@angular/core';

@Injectable({
	providedIn: 'root',
})
export class ValidationService {
	constructor() {}

	passwordMatchValidator(formGroup: FormGroup) {
		const password = formGroup.get('password')!;
		const confirmPassword = formGroup.get('confirmPassword')!;

		if (password.value !== confirmPassword.value) {
			confirmPassword.setErrors({ passwordMismatch: true });
		} else {
			confirmPassword.setErrors(null);
		}
	}

	isInvalid(control: FormControl): boolean {
		return control && control.touched && control.invalid;
	}

	getErrorMessage(control: FormControl): string {
		if (control.errors?.['required']) {
			return 'This field is required.';
		}
		if (control.errors?.['email']) {
			return 'Invalid email format.';
		}
		if (control.errors?.['minlength']) {
			const requiredLength = control.errors['minlength'].requiredLength;
			return `Password should be at least ${requiredLength} characters long.`;
		}
		if (control.errors?.['passwordMismatch']) {
			return 'Passwords do not match.';
		}
		if (control.errors?.['invalidPhoneNumber']) {
			return 'Invalid phone number format.';
		}

		return '';
	}
}
