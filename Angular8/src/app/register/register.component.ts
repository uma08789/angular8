import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent implements OnInit {  

  hide = true;

  constructor(   
    public authService: AuthService,
    public router: Router)
  {}

  ngOnInit() { }

  registerUser(form:NgForm){    
    console.log(form.value);
    this.authService.register(form.value).subscribe((res) => {
      console.log(res);
      if (res.result) {
        form.resetForm();
        this.router.navigate(['login']);
      }
    });
  }

}
