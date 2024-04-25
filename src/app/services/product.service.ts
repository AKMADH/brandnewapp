// src/app/product.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Product } from '../model/product';


@Injectable({
  providedIn: 'root'
})
export class ProductService {

apiurl:string="https://localhost:7298/api/Products";
  constructor(private http: HttpClient) { }

  getProducts() {
    
    return this.http.get(this.apiurl);

  // Implement other CRUD operations as needed
}
addProduct(product: any): Observable<any> {
  return this.http.post<any>(this.apiurl, product);
}
updateProduct(id: number, product: Product): Observable<Product> {
  const url = `${this.apiurl}/${id}`;
  return this.http.put<Product>(url, product);
}
getProductById(id: number): Observable<Product> {
  const url = `${this.apiurl}/${id}`;
  return this.http.get<Product>(url);
}
// Delete a product by ID
deleteProduct(id: number): Observable<void> {
  const url = `${this.apiurl}/${id}`;
  return this.http.delete<void>(url);
}
}