import { Component, OnInit } from '@angular/core';
import { ChatService } from 'src/app/service/chat.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { collectionData, Firestore } from '@angular/fire/firestore';
import { collection } from 'firebase/firestore';
import { FormBuilder,FormGroup,Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';
@Component({
  selector: 'app-chatbox',
  templateUrl: './chatbox.component.html',
  styleUrls: ['./chatbox.component.scss']
})
export class ChatboxComponent implements OnInit {
  userArray:any=[];
  user:String;
  ifTextAvailable:boolean=false;
  email:any='';
  room:String;
  buttonDisabled:boolean=true;
  messageText:String;
  show=false;
  serverName:any;
  messageArray:Array<{user:String,message:String}> = [];
  constructor(private chatService:ChatService,private firestore:Firestore,private formbuilder:FormBuilder
    ,private auth:AuthService,private route:Router){
    
  }
  
  ngOnInit(): void {

    let doc=collection(this.firestore,'users')
    collectionData(doc).subscribe(data=>{
      console.log(data);
      for (let i=0;i<data.length;i++){
            this.userArray.push(data[i]['email'])
           } 
          //  console.log(this.userArray) 
    })
        
  
      
    this.email=localStorage.getItem('email');

      

    this.chatService.newUserJoined()
    .subscribe(data=> this.messageArray.push(data));


    this.chatService.userLeftRoom()
    .subscribe(data=>this.messageArray.push(data));

    this.chatService.newMessageReceived()
    .subscribe(data=>this.messageArray.push(data));

    
  }
  
  chatForm: FormGroup = this.formbuilder.group({
    message: ['', [Validators.required, Validators.minLength(3)]]
  })

  userJoin(){
    if(this.serverName=='Php'){
    let a:number=+localStorage.getItem(this.serverName)!
    localStorage.setItem(this.serverName,''+(++a))
    if (a>2){
     
      alert("cant join")

    }
    else{
      this.route.navigate(["/chatroom/"+this.serverName])

    }
  }
  else{
    this.route.navigate(["/chatroom/"+this.serverName])
  }
  }
  
  join(){
    if(this.email && this.room){
    this.messageArray.push({
      user: this.email,
      message: this.room
    })
    this.userJoin();
  }
    else{
      alert('enter valid room name')
    }
    console.log('aaaa');
  //     this.chatService.jointheRoom({user:this.email, room:this.room});
   }

  // leave(){
  //     this.chatService.leavetheRoom({user:this.email, room:this.room});

  // }

  // sendMessage()
  // {
  //   this.messageArray.push({
  //     user: this.email,
  //     message: this.messageText
  //   })
  //   this.chatService.sendMessage({user:this.email, room:this.room, message:this.messageText});
  //   this.chatService.newMessageReceived();
  
  // }
  logout(){
    this.auth.userLogout();
  }
  valueChanged(event:any){
    this.serverName=event.target.value;
  }
}
