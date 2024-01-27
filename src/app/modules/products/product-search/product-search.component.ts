import { CommonModule } from '@angular/common';
import { Component, OnDestroy, type OnInit } from '@angular/core';
import { ProductService } from '../../../core/services/product.service';
import { Router, ActivatedRoute, RouterModule } from '@angular/router';
import { Products } from '../../../core/models/entity/product';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-product-search',
  standalone: true,
  imports: [
    CommonModule, RouterModule
  ],
  templateUrl: './product-search.component.html',
  styleUrls: ['./product-search.component.scss'],
  providers: [ProductService]
})
export class ProductSearchComponent implements OnInit, OnDestroy {
  private destroySubject = new Subject<void>();
  query!: string;
  products!: Products;

  constructor(
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly _productService: ProductService,
  ) { }

  ngOnInit(): void {
    this.onSearch();
  }

  onSearch(): void {
    this.route.queryParams.subscribe((params) => {
      this.query = params['query'];
      if (this.query) {
        this._productService.search(this.query).pipe(takeUntil(this.destroySubject)).subscribe({
          next: (data: Products) => {
            this.products = data;
          },
        });
      }
    });
  }

  onNavigate(id: number): void {
    this.router.navigateByUrl('/product/' + id);
  }

  ngOnDestroy(): void {
    this.destroySubject.next();
    this.destroySubject.complete();
  }

}
