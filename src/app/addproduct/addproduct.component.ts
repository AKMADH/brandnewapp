import { Component } from '@angular/core';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-addproduct',
  templateUrl: './addproduct.component.html',
  styleUrl: './addproduct.component.css'
})
export class AddproductComponent {
  productName: string = '';
  price: number = 0;
  showSuccessMessage: boolean = false;

  constructor(private productService: ProductService) { }
  addProduct(): void {
    const product = {
      name: this.productName,
      price: this.price
    };

    this.productService.addProduct(product)
      .subscribe(
        (response) => {
          console.log('Product added successfully:', response);
          this.showSuccessMessage = true;
        },
        (error) => {
          console.error('Error adding product:', error);
        }
      );
}
}
