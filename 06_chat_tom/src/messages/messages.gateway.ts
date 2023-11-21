import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  WebSocketServer,
  ConnectedSocket,
} from '@nestjs/websockets';
import { MessagesService } from './messages.service';
import { CreateMessageDto } from './dto/create-message.dto';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class MessagesGateway {
  @WebSocketServer()
  server: Server;

  constructor(private readonly messagesService: MessagesService) {}

  @SubscribeMessage('createMessage')
  create(@MessageBody() createMessageDto: CreateMessageDto) {
    console.log('createMessageDto=', createMessageDto);
    const message = this.messagesService.create(createMessageDto);

    if (!message.name) {
      message.name = 'anonymous';
    }

    // this.server.emit('message', message);
    this.server.to(message.room).emit('message', message);

    return message;
  }

  @SubscribeMessage('findAllMessages')
  findAll(@MessageBody('room') room: string) {
    console.log('findAllMessages room=', room);
    return this.messagesService.findAll(room);
  }

  @SubscribeMessage('rooms')
  rooms() {
    console.log('rooms');
    return ['room-1', 'room-2', 'room-3'];
  }

  //複雑になるので、roomは１つにしている。
  @SubscribeMessage('join')
  joinRoom(
    @MessageBody('room') room: string,
    @MessageBody('name') name: string,
    @ConnectedSocket() client: Socket,
  ) {
    client.join(room);

    console.log('join name=', name);
    console.log('join room=', room);
    console.log('join id=', client.id);
    return this.messagesService.identify(name, client.id);
  }

  @SubscribeMessage('typing')
  async typing(
    @MessageBody('isTyping') isTyping: boolean,
    @ConnectedSocket() client: Socket,
  ) {
    const name = this.messagesService.getClientName(client.id);
    console.log('typing=', name);
    console.log('isTyping=', isTyping);

    // this.server.emit('typing', { name, isTyping });

    client.broadcast.emit('typing', { name, isTyping });
  }
}
