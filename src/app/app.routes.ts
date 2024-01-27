import { AuthGuard } from './core/guards/auth.guard';
import { LayoutComponent } from './core/components/layout/layout.component';
import { Routes } from '@angular/router';

export const routes: Routes = [
	{
		path: '',
		component: LayoutComponent,
		children: [
			{
				path: '',
				loadComponent: () =>
					import('../app/modules/products/product-list/product-list.component').then(
						(m) => m.ProductListComponent,
					),
				canActivate: [AuthGuard],
			},
			{
				path: 'product/:id',
				loadComponent: () =>
					import('../app/modules/products/product-detail/product-detail.component').then(
						(m) => m.ProductDetailComponent,
					),
				canActivate: [AuthGuard],
			},
      {
        path: 'search',
        loadComponent: () =>
          import('../app/modules/products/product-search/product-search.component').then(
            (m) => m.ProductSearchComponent,
          ),
        canActivate: [AuthGuard],
      },
		],
	},
	{
		path: 'login',
		loadComponent: () => import('../app/modules/auth/auth.component').then((m) => m.AuthComponent),
	},
];
