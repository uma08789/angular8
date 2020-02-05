import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth.service';
import { LoginComponent } from './login/login.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'Angular8 Project';
  id: string;
  constructor(public authService: AuthService) { }
   
  ngOnInit() {  
    this.id = localStorage.getItem('user_id');      
  }  

  logout() {
    localStorage.removeItem('currentUser');
    localStorage.removeItem('user_id');      
    this.authService.logout();
  }
  
}