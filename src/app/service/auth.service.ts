import { Injectable } from '@angular/core';
import {AngularFireAuth} from '@angular/fire/compat/auth'
import { Router } from '@angular/router';
import { doc, docData,Firestore} from '@angular/fire/firestore';
import { AngularFirestore } from '@angular/fire/compat/firestore';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private fireauth:AngularFireAuth,private router:Router,private firestore:AngularFirestore,private firestoree:Firestore
    ) { }
  //method to login
  userLogin(email:string,password:string){
     this.fireauth.signInWithEmailAndPassword(email,password).then((data:any)=>{
      localStorage.setItem('email',email);
      localStorage.setItem('UID',data.user?.uid)
      
      this.router.navigate(['/chatbox'])
     }).catch(()=>{
      this.router.navigate(['/login'])
      })
  }
  userRegistration(email:string,password:string){
    this.fireauth.createUserWithEmailAndPassword(email,password).then( ()=>
    { 
      this.firestore.collection('users').doc(email).set({Email:email});
      this.router.navigate(['/login']);
    }).catch(()=>{
    alert("some error is there");
    this.router.navigate(['/register'])
    })

  }
  userLogout(){
    this.fireauth.signOut().then( ()=>
      {
      localStorage.removeItem('token');
      this.router.navigate(['/login']);
      },err=>{
        alert(err.message);
      }
    )
  }
  getAdmin(){
    return this.firestore.collection('private').doc("user1").get();
  }
  // getUsers(){
  //   this.firestore.collection('users').get()
  // }
}


function token(token: any) {
  throw new Error('Function not implemented.');
}

