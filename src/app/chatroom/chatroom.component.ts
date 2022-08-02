import { Component, OnInit } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { ChatService } from '../service/chat.service';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-chatroom',
  templateUrl: './chatroom.component.html',
  styleUrls: ['./chatroom.component.scss'],
})
export class ChatroomComponent implements OnInit {
  messageText: String;
  userArray: any = [];
  user: String;
  ifTextAvailable: boolean = false;
  email: any = '';
  room: String;
  userCount=0;
  roomArray: [];
  messageArray: Array<{ user: String; message: String }> = [];
  constructor(
    private chatService: ChatService,
    private auth: AuthService,
    private activatedRoute: ActivatedRoute
  ) {}
  chatRoomName: any;
  ngOnInit(): void {
    document.addEventListener('keypress',($event)=>{
      if ($event.key=="Enter"){
        this.sendMessage();
      }
    })
    this.chatRoomName = this.activatedRoute.snapshot.paramMap.get('id');

    this.email = localStorage.getItem('email');

    this.chatService
      .newUserJoined()
      .subscribe((data) => this.messageArray.push(data));

    this.chatService
      .userLeftRoom()
      .subscribe((data) => this.messageArray.push(data));

    this.chatService
      .newMessageReceived()
      .subscribe((data) => this.messageArray.push(data));

    this.join();
  }
  join() {
    if(this.email  && this.chatRoomName)
    this.messageArray.push({
      user: this.email,
      message: this.chatRoomName,
    });
    else{
      alert("please enter a valid room")
    }
      this.chatService.jointheRoom({
        user: this.email,
        room: this.chatRoomName,
      });
      
    
     
    
    
  }

  leave() {
    this.chatService.leavetheRoom({ user: this.email, room: this.chatRoomName });
    let a:number=+localStorage.getItem('Php')!
    localStorage.setItem('Php',''+(--a))
  }
  
  sendMessage() {
    if(this.messageText!='' && this.messageText!=null){
    // this.messageArray.push({
    //   user: this.email,
    //   message: this.messageText,
    // });
    
    this.chatService.sendMessage({
      user: this.email,
      room: this.chatRoomName,
      message: this.messageText,
    })
    this.chatService.newMessageReceived();
    this.messageText="";
  }}
}
