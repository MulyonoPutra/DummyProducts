import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { Product, Products } from '../models/entity/product';

import { HttpResponseEntity } from '../models/entity/http-response-entity';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';

@Injectable({
	providedIn: 'root',
})
export class ProductService {
	env = environment;
	constructor(private readonly http: HttpClient) {}

	findAll(): Observable<HttpResponseEntity<Products>> {
		return this.http.get<HttpResponseEntity<Products>>(`${this.env.url}/products`).pipe(
			/* map((response) => response.products), */
			catchError(this.handleError),
		);
	}

	findOne(id: string): Observable<Product> {
		return this.http.get<Product>(`${this.env.url}/products/${id}`).pipe(catchError(this.handleError));
	}

	public handleError(res: HttpErrorResponse) {
		return throwError(() => new Error(res.error.message));
	}
}
