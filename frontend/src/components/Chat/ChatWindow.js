import { Client } from '@stomp/stompjs';

const socketService = {
  client: null,
  
  init: () => {
    socketService.client = new Client({
      brokerURL: 'ws://localhost:9090/ws',
      debug: (str) => console.log(str),
      reconnectDelay: 5000
    });
  },
  
  connect: (callback) => {
    socketService.init();
    socketService.client.onConnect = () => {
      socketService.client.subscribe('/topic/messages', (message) => {
        callback(JSON.parse(message.body));
      });
    };
    socketService.client.activate();
  },
  
  disconnect: () => {
    if (socketService.client) {
      socketService.client.deactivate();
    }
  },
  
  sendMessage: (message) => {
    socketService.client.publish({
      destination: '/app/chat',
      body: JSON.stringify(message)
    });
  }
};

export default socketService;