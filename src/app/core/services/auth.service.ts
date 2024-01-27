import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';

import { Injectable } from '@angular/core';
import { Login } from '../models/entity/login';
import { LoginDTO } from '../models/dto/login.dto';
import { environment } from '../../../environments/environment.development';

@Injectable({
	providedIn: 'root',
})
export class AuthService {
	env = environment;
	constructor(private readonly http: HttpClient) {}

	login(body: Login): Observable<LoginDTO> {
		return this.http.post<LoginDTO>(`${this.env.url}/auth/login`, body).pipe(catchError(this.handleError));
	}

	public handleError(res: HttpErrorResponse) {
		return throwError(() => new Error(res.error.message));
	}
}
