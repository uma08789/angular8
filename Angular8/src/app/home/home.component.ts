import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../products.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {  

  productNames:any = [];
  quantity:any = [];

  //segment the data
  slicedProductNames:any;
  slicedQuantity:any;

  data:any;
  
  constructor(private productservice:ProductsService) { }  

  ngOnInit() {
    //Product - Stock Chart  
    this.productservice.getProducts().subscribe(response => {
      console.log(response);
      response.forEach(obj=>{
        console.log(obj.ProductName +'=>'+ obj.ProductQuantity);
        this.productNames.push(obj.ProductName);
        this.quantity.push(obj.ProductQuantity);
      });
      this.slicedProductNames=this.productNames.slice(0,200);
      this.slicedQuantity=this.quantity.slice(0,200);
      this.data = {
        labels:this.slicedProductNames,
        datasets: [
          {
            label: 'Mobile Product Stock',
            backgroundColor: '#b45678',
            bordercolor: '#000000',
            data: this.slicedQuantity
          }          
        ]
      }
    })
  }
}
