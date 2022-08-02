import { Injectable } from '@angular/core';
import { user } from '@angular/fire/auth';
import { Observable } from 'rxjs';
import io from 'socket.io-client';
@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private socket=io('http://localhost:1600');
  constructor() { }
    
   
    jointheRoom(data:any)
    {
        this.socket.emit('join',data);
    } 
     createTheRoom(data:any){
        this.socket.emit('create',data)
     }

    newUserJoined()
    {
        let observable = new Observable<{user:String, message:String}>(observer=>{
            this.socket.on('new user joined', (data)=>{
                observer.next(data);
            });
            return () => {this.socket.disconnect();}
        });

        return observable;
    }

    leavetheRoom(data:any){
        
        this.socket.emit('leave',data);
        
    }

    userLeftRoom(){
        let observable = new Observable<{user:String, message:String}>(observer=>{
            this.socket.on('left room', (data)=>{
                observer.next(data);
            });
            return () => {this.socket.disconnect();}
        });

        return observable;
    }

    sendMessage(data:any)
    {
        this.socket.emit('message',data);
    }

    newMessageReceived(){
        let observable = new Observable<{user:String, message:String}>(observer=>{
            this.socket.on('new message', (data)=>{
                observer.next(data);
            });
            return () => {this.socket.disconnect();}
        });

        return observable;
    }
}

