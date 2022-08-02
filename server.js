var express = require('express');
const { get } = require('http');
var app = express()


const PORT=process.env.PORT || 1600
var http=require('http').createServer(app);
var  io  = require('socket.io')(http, {
    cors: {
        origin: '*'
    }
});
var users=[]


const server=http.listen(PORT,()=>{
    console.log("listening on port"+PORT)
})
var socket=io.listen(server);

io.on('connection',(socket)=>{
    console.log("some user connected",socket.id);


socket.on('join', function(data){

    socket.join(data.room);

    console.log(data.user +  ' has joined the room'  +  data.room)
    
    socket.broadcast.to(data.room).emit('new user joined', {user:data.user, message:'has joined this room.'});
  });

  socket.on('create',function(data){
  socket.join(data.idRoom)
  console.log(data.name + 'has joined the room' + data.idRoom)
  socket.broadcast.to(data.idRoom).emit('user has joined',{name:data.name,message:'has joined the room'});
  });
  
  socket.on('leave', function(data){
    console.log(data.user +  ' has leaved the room'  +  data.room)
    socket.broadcast.to(data.room).emit('left room', {user:data.user, message:'has left this room.'});
    socket.leave(data.room);
  });

  socket.on('message',function(data){
    io.in(data.room).emit('new message', {user:data.user, message:data.message});
  });
});
io.emit("user connected")