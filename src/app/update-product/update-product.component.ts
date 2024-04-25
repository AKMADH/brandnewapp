import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductService } from '../services/product.service';


@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.component.html',
  styleUrls: ['./update-product.component.css']
})
export class UpdateProductComponent implements OnInit {

  updateProductForm!: FormGroup;
  id: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService,
    private formBuilder: FormBuilder

  ) { 
    
  }

  ngOnInit(): void {
    this.updateProductForm = this.formBuilder.group({
      productName: ['', Validators.required],
      price: ['', Validators.required]
    });

    // Load product details for update
    this.id = this.route.snapshot.params['id'];
    this.productService.getProductById(this.id).subscribe(product => {
      this.updateProductForm.patchValue({
        productName: product.name,
        price: product.price
      });
    });
  }

  updateProduct(): void {
    if (this.updateProductForm.invalid) {
      return;
    }

    const productData = this.updateProductForm.value;
    this.productService.updateProduct(this.id, productData).subscribe(() => {
      console.log('Product updated successfully');
      this.router.navigate(['/products']); 
    }, error => {
      console.error('Error updating product:', error);
      // Handle error
    });
  }
}
