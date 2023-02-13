import openSocket from 'socket.io-client';
export const socket = openSocket(`${process.env.REACT_APP_BACKEND_URL}:8080`);
