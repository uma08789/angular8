import { Component, OnInit, ViewChild } from '@angular/core';
import { ProductsService } from '../products.service';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css']
})
export class ProductsListComponent implements OnInit {

  @ViewChild(MatSort, {static:false}) sort: MatSort;
  @ViewChild(MatPaginator, {static:false}) paginator: MatPaginator;    
   
  constructor(private router: Router,private ps: ProductsService) { }

  displayedColumns: string[] = ['id', 'ProductName', 'ProductPrice', 'ProductQuantity', 'ActionItems'];

  MyDataSource = new MatTableDataSource();
 
  ngOnInit() {
	  this.ps.getProducts().subscribe((response) => {
	    this.MyDataSource.data = response;  
      this.MyDataSource.sort = this.sort;
      this.MyDataSource.paginator = this.paginator;            
	  });
  }

  deleteProduct(id) {
    this.ps.deleteProduct(id).subscribe(res => {           
      this.ps
        .getProducts()
        .subscribe((response) => {
          this.MyDataSource.data = response;
          this.MyDataSource.sort = this.sort;
          this.MyDataSource.paginator = this.paginator;          
      });       
    });
  }
}


