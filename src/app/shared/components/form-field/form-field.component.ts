import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CommonModule } from '@angular/common';
import { ValidationService } from '../../services/validation.service';

@Component({
	selector: 'app-form-field',
	standalone: true,
	imports: [CommonModule, FormsModule, ReactiveFormsModule],
	templateUrl: './form-field.component.html',
	styleUrls: ['./form-field.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [ValidationService],
})
export class FormFieldComponent {

	@Input() label!: string;
	@Input() fieldName!: string;
	@Input() formGroup!: FormGroup;

	constructor(private validation: ValidationService) {}

	get isInvalid() {
		const control = this.formGroup.get(this.fieldName) as FormControl;
		return this.validation.isInvalid(control);
	}

	get getErrorMessage(): string {
		const control = this.formGroup.get(this.fieldName) as FormControl;
		return this.validation.getErrorMessage(control);
	}
}
