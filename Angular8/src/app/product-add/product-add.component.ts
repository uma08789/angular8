import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ProductsService } from '../products.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.css']
})
export class ProductAddComponent implements OnInit {

  angForm: FormGroup;  
     

  constructor(private router: Router, private fb: FormBuilder, private ps: ProductsService) {
    this.createForm();
  }

  createForm() {
    this.angForm = this.fb.group({
      ProductName: ['', Validators.required ],
      ProductDescription: ['', Validators.required ],
      ProductPrice: ['', Validators.required ],
      ProductQuantity: ['', Validators.required ]
    });
  }
  

  addProduct(ProductName, ProductDescription, ProductPrice, ProductQuantity) {
    this.ps.addProduct(ProductName, ProductDescription, ProductPrice, ProductQuantity);
    this.router.navigate(['products-list']);
  }

  ngOnInit() {
  }

}

