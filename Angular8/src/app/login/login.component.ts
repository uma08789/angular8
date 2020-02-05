import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  
  currentUser = {};
  errMsg = '';
  

  constructor(   
    public authService: AuthService,
    public router: Router
  ) {
      //if already logged in redirect to home page      
      if (this.authService.isLoggedIn() == true) {
        this.router.navigate(['/home']);
      }       
  }

  ngOnInit() {}

  loginUser(loginform:NgForm) {
    this.authService.login(loginform.value).subscribe((res: any) => {        
      localStorage.setItem('access_token', res.token);  

      this.authService.getUserProfile(res._id).subscribe((res) => {         
        this.currentUser = res;   
        localStorage.setItem('user_id', res.msg._id);             
        this.router.navigate(['user-profile/' + res.msg._id]);
      })
      
    },
      error => {               
          this.errMsg = error.error.message;          
      }
    );
  }
}