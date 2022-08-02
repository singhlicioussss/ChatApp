import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Auth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';
import {privateUser} from './user.constant';
interface user{
   name:string;
   id:number;
}
@Component({
  selector: 'app-privatechat',
  templateUrl: './privatechat.component.html',
  styleUrls: ['./privatechat.component.scss']
})
export class PrivatechatComponent implements OnInit {
  loginForm:FormGroup
  user:any
  userArray:any=[];
  arrayId:any=[];
  staticUser:['jayson','berlin','roman','tokyo'];
  man:any;
  
  constructor(private auth:Auth,private formbuilder:FormBuilder,private route:Router,
    private authService:AuthService) { 
    this.loginForm= formbuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    })
   }

  ngOnInit(): void {
    this.users();
    this.createId();
  }
  
  // get email(){
  //   return this.loginForm.get('email')?.value
  // }
  // get password(){
  //   return this.loginForm.get('password')?.value
  // }
  onLogin() {
    // this.authService.getAdmin().subscribe(res=>{
    //   console.log(res);
      // if(this.email==res['email'] && this.password==res['password']){
      //   this.route.navigate(['/chatroom/private'])
      // }
      // else{
      //   alert("invalid login")
      // }
    // })
  }
//   onCheck(){
//     for (let i=0;i<privateUser.data.length;i++){
//     if(this.loginForm.get('email')?.value==privateUser.data[i].Email&&this.loginForm.get('password')?.value==privateUser.data[i].Password ){
//       this.route.navigate(['/chatroom/private'])
//       localStorage.setItem('email',this.loginForm.get('email')?.value);
//       localStorage.setItem('password',this.loginForm.get('password')?.value)
//       return;
//     }
//     else{
//       alert("Enter correct details")
//     }
  
//     // if(this.loginForm.valid){
//       // this.onLogin();
//     // }
//   }
 
//  } 

 users(){
  this.user=privateUser.data;
  console.log(this.user.data)
  console.log(this.user.IID)
}
createId(){
  privateUser.data.forEach((elements)=>{
    this.arrayId.push(elements.id)
  })
  localStorage.setItem("IID",this.arrayId[1])
  
}
createRoom(){
this.man=this.staticUser.splice(this.arrayId[1])
console.log(this.man)
}
}