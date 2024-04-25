import { Component } from '@angular/core';
import { Product } from '../model/product';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent {
  products: Product[] = [];

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
   
    this.productService.getProducts().subscribe(
      (data: any) => {
        this.products = data;
      },
      (error: any) => {
        console.error('Error fetching user data:', error);
      }
    );
  
  }
  updateProduct(product: Product): void {
    this.productService.updateProduct(product.id, product)
      .subscribe(updatedProduct => {
        // Update product in the local array
        const index = this.products.findIndex(p => p.id === updatedProduct.id);
        if (index !== -1) {
          this.products[index] = updatedProduct;
        }
      });
  }
  deleteProduct(id: number): void {
    this.productService.deleteProduct(id)
      .subscribe(() => {
        // Remove product from the local array
        this.products = this.products.filter(p => p.id !== id);
      });
  }

 
}
