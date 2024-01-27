import { CommonModule } from '@angular/common';
import { Component, OnDestroy, type OnInit } from '@angular/core';
import { ProductService } from '../../../core/services/product.service';
import { Products } from '../../../core/models/entity/product';
import { RouterModule } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';

@Component({
	selector: 'app-product-list',
	standalone: true,
	imports: [CommonModule, RouterModule],
	templateUrl: './product-list.component.html',
	styleUrls: ['./product-list.component.scss'],
	providers: [ProductService],
})
export class ProductListComponent implements OnInit, OnDestroy {
	private destroySubject = new Subject<void>();

	products!: Products;

	constructor(private readonly _productService: ProductService) {}

	ngOnInit(): void {
		this.findAll();
	}

	findAll(): void {
		this._productService
			.findAll()
			.pipe(takeUntil(this.destroySubject))
			.subscribe({
				next: (products) => {
					this.products = products.products;
				},
				error: (error) => {
          console.error(error);
				},
				complete: () => {},
			});
	}

	ngOnDestroy(): void {
		this.destroySubject.next();
		this.destroySubject.complete();
	}
}
