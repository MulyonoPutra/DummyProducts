import { CommonModule } from '@angular/common';
import { Component, OnDestroy, type OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../../core/services/product.service';
import { Product } from '../../../core/models/entity/product';
import { Subject, takeUntil } from 'rxjs';

@Component({
	selector: 'app-product-detail',
	standalone: true,
	imports: [CommonModule],
	templateUrl: './product-detail.component.html',
	styleUrls: ['./product-detail.component.scss'],
	providers: [ProductService],
})
export class ProductDetailComponent implements OnInit, OnDestroy {
	product!: Product;
	private destroySubject = new Subject<void>();

	constructor(
		private readonly _productService: ProductService,
		private readonly route: ActivatedRoute,
	) {}

	ngOnInit(): void {
		this.findOne();
	}

	findOne(): void {
		const id = this.route.snapshot.paramMap.get('id')!;
		this._productService
			.findOne(id)
			.pipe(takeUntil(this.destroySubject))
			.subscribe({
				next: (response) => {
					this.product = response;
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
