import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/service/auth.service';
import { FormBuilder,FormGroup,Validators } from '@angular/forms';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  email:string='';
  password:string='';
  constructor(private auth:AuthService,private formbuilder:FormBuilder) { }

  ngOnInit(): void {
  }
  loginForm:FormGroup=this.formbuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  })
  
 
    login() {

      if(this.email == '') {
        alert('Please enter email');
        return;
      }
  
      if(this.password == '') {
        alert('Please enter password');
        return;
      }
  
      this.auth.userLogin(this.email,this.password);
      
      this.email = '';
      this.password = '';
  
    }
    logout(){
      this.auth.userLogout();
    }
    // users(){
    //   this.auth.getUsers();
    // }
}