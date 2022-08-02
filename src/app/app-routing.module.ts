import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './component/login/login.component';
import { RegisterComponent } from './component/register/register.component';
import { ChatboxComponent } from './component/chatbox/chatbox.component';
import { canActivate, redirectLoggedInTo, redirectUnauthorizedTo } from '@angular/fire/auth-guard';
import { ChatroomComponent } from './chatroom/chatroom.component';
import { PrivatechatComponent } from './component/privatechat/privatechat.component';

const redirectUnauthorizedToLogin=()=>redirectUnauthorizedTo(['login'])
const redirectLogin=()=>redirectLoggedInTo(['chatbox'])
const routes: Routes = [
  {
    path:'',redirectTo:'login',pathMatch:'full'
  },
  {
    path:'chatbox',component:ChatboxComponent},
  // ...canActivate(redirectUnauthorizedToLogin)},
  {
    path:'login',component:LoginComponent,
    // ...canActivate(redirectLogin)
  },
  {
    path:'register',component:RegisterComponent
  },
  {
    path:'chatroom/:id',component:ChatroomComponent,

  },
  
  {
    path:'private',component:PrivatechatComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
