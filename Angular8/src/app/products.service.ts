import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  uri = 'http://localhost:7000/productapi';

  constructor(private http: HttpClient) { }



  addProduct(ProductName, ProductDescription, ProductPrice, ProductQuantity) {
    console.log(ProductName, ProductDescription, ProductPrice, ProductQuantity);
    const obj = {
      ProductName,
      ProductDescription,
      ProductPrice,
      ProductQuantity
    };
    this.http.post(this.uri + '/product-add', obj)
        .subscribe(res => console.log('Done'));
  }


  getProducts():Observable<any> {
    return this.http.get(this.uri);
  }

  editProduct(id) {
    return this.http.get(this.uri + '/product-edit/' + id);
  }

  updateProduct(ProductName, ProductDescription, ProductPrice, ProductQuantity, id) {
    const obj = {
      ProductName, ProductDescription, ProductPrice, ProductQuantity
    };

    this.http.post(this.uri + '/product-update/' +id, obj)
      .subscribe(res => console.log('Update Complete'));
  }

  deleteProduct(id) {
    return this.http.get(this.uri + '/product-delete/' + id);
     
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {    
      // A client-side or network error occurred
      console.error('Error Message:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.      
      console.error('Backend returned  code ' + error.status + ', message: ' + error.error);
    }
    // return an observable with a user-facing error message
    return throwError('Something went wrong. Please try again later.');
  }

 

}
