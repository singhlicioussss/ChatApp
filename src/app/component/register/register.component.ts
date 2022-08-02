import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/service/auth.service';
import { FormBuilder,FormGroup,Validators } from '@angular/forms';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  email:string='';
  password:string='';
  constructor(private auth:AuthService,private formbuilder:FormBuilder) { }

  ngOnInit(): void {
  }
  regForm: FormGroup = this.formbuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  })
  register() {

    if(this.email == '') {
      alert('Please enter email');
      return;
    }

    if(this.password == '') {
      alert('Please enter password');
      return;
    }

    this.auth.userRegistration(this.email,this.password);
    
    this.email = '';
    this.password = '';

  }

 }