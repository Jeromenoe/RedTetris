import React from 'react';
import socketio from "socket.io-client";


const localHost = "http://localhost:3001"; 
const herokuHost = "https://redtetris42-heroku.herokuapp.com"
const socketURL = process.env.NODE_ENV === "production" ? herokuHost : localHost

export const socket = socketio.connect(socketURL);
export const SocketContext = React.createContext();