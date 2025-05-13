import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';

class SocketService {
  constructor() {
    this.client = new Client({
      // Utilise SockJS avec GitHub Codespaces :
      webSocketFactory: () => new SockJS('https://symmetrical-happiness-jjrqv56pw7p93j6jw-9090.app.github.dev/ws'),
      debug: function (str) {
        console.log(str);
      },
      reconnectDelay: 5000,
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000,
    });
  }

  connect(onMessageReceived) {
    this.client.onConnect = () => {
      this.client.subscribe('/topic/messages', (message) => {
        onMessageReceived(JSON.parse(message.body));
      });
    };

    this.client.activate();
  }

  disconnect() {
    this.client.deactivate();
  }

  sendMessage(message) {
    this.client.publish({
      destination: '/app/chat',
      body: JSON.stringify(message)
    });
  }
}

export default new SocketService();
