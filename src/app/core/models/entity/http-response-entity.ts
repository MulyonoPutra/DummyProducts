export interface HttpResponseEntity<T> {
	products: T;
	total: number;
	skip: number;
	limit: number;
}
