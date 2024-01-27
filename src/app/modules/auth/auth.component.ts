import { CommonModule } from '@angular/common';
import { Component, type OnInit } from '@angular/core';
import {
	FormGroup,
	FormBuilder,
	Validators,
	FormControl,
	FormsModule,
	ReactiveFormsModule,
	AbstractControl,
} from '@angular/forms';
import { Router } from '@angular/router';
import { Login } from '../../core/models/entity/login';
import { AuthService } from '../../core/services/auth.service';
import Swal from 'sweetalert2';
import { LocalStorageService } from '../../shared/services/local-storage.service';
import { FormFieldComponent } from '../../shared/components/form-field/form-field.component';

@Component({
	selector: 'app-auth',
	standalone: true,
	imports: [CommonModule, FormsModule, ReactiveFormsModule, FormFieldComponent],
	templateUrl: './auth.component.html',
	styleUrls: ['./auth.component.scss'],
	providers: [AuthService],
})
export class AuthComponent implements OnInit {
	form!: FormGroup;

	constructor(
		private readonly fb: FormBuilder,
		private readonly router: Router,
		private readonly _authService: AuthService,
		private readonly _localStorageService: LocalStorageService,
	) {}

	ngOnInit(): void {
		this.formInitialized();
	}

	formInitialized(): void {
		this.form = this.fb.group({
			username: ['', Validators.required],
			password: ['', Validators.required],
		});
	}

	get formCtrlValues(): Login {
		return {
			username: this.form.get('username')?.value,
			password: this.form.get('password')?.value,
		};
	}

	getFormControl(form: string): FormControl {
		return this.form.get(form) as FormControl;
	}

	markAllFormControlsAsTouched(formGroup: FormGroup): void {
		Object.values(formGroup.controls).forEach((control: AbstractControl) => {
			control.markAsTouched();
			if (control instanceof FormGroup) {
				this.markAllFormControlsAsTouched(control);
			}
		});
	}

	onSubmit(): void {
		if (this.form.valid) {
			this._authService.login(this.formCtrlValues).subscribe({
				next: (data) => {
					this._localStorageService.setItem('token', data.token);
				},
				error: (err) => {
					this.errorAlert(err);
				},
				complete: () => {
					this.router.navigateByUrl('/');
				},
			});
		} else {
			this.markAllFormControlsAsTouched(this.form);
		}
	}

	errorAlert(errorMessage: string): void {
		Swal.fire({
			icon: 'error',
			title: 'Oops...',
			text: errorMessage,
		});
	}
}
