import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FooterComponent } from '../footer/footer.component';
import { HeaderComponent } from '../header/header.component';
import { RouterOutlet } from '@angular/router';

@Component({
	selector: 'app-layout',
	standalone: true,
	imports: [CommonModule, RouterOutlet, HeaderComponent, FooterComponent],
	templateUrl: './layout.component.html',
})
export class LayoutComponent {
}
