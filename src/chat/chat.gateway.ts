import {
    MessageBody,
    SubscribeMessage,
    WebSocketGateway,
    WebSocketServer,
    OnGatewayConnection,
    OnGatewayDisconnect
} from "@nestjs/websockets";
import { MessageService } from "src/message/message.service";

import { Server, Socket } from "socket.io";

@WebSocketGateway({
    port: 3001,
    cors: { origin: '*' },
    // path: 'http://localhost:3001/discus' // Chemin de connexion personnalisé
})
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
    
    private messageService: MessageService;

    @WebSocketServer() server: Server;

    constructor(messageService: MessageService) {
        this.messageService = messageService;
    }

    handleConnection(socket: Socket) {
        // Handle a new client connection
        const { userId, chatRoom } = socket.handshake.query;

        // Example: Logging the connection details
        console.log(`User connected: ${userId}, Room: ${chatRoom}`);
        
        // You can also store user data or initialize something here if needed
    }

    handleDisconnect(socket: Socket) {
        // Handle client disconnection
        console.log('User disconnected');

        // You can perform cleanup or remove user data here if needed
    }

    @SubscribeMessage('newMessage')
    handleNewMessage(@MessageBody() message: any) {
        this.server.emit('message', message);
        this.messageService.createMessageWithSocket(message);
    }
}
