import { io } from 'socket.io-client';

const socket = io('http://localhost:8080/finnhub');

socket.on('connect', () => {
  console.log('Connected to WebSocket server');

  socket.emit('subscribe', { symbol: 'AAPL' }, (res) => {
    console.log('Subscription response:', res);
  });
});

socket.on('message', (data) => {
  console.log(data);
});

socket.onAny((...args) => {
  console.log(args);
});
