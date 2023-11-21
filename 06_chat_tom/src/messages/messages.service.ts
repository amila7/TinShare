import { Injectable } from '@nestjs/common';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
import { Message } from './entities/message.entity';
import * as moment from 'moment';

@Injectable()
export class MessagesService {
  messages: Message[] = [
    {
      name: '管理者',
      text: 'ようこそ room-1へ',
      room: 'room-1',
      date: '2023-11-02 14:32',
    },
    {
      name: '管理者',
      text: 'ようこそ room-2へ',
      room: 'room-2',
      date: '2023-11-02 14:32',
    },
    {
      name: '管理者',
      text: 'ようこそ room-3へ',
      room: 'room-3',
      date: '2023-11-02 14:32',
    },
  ];
  clientToUser = {};

  identify(name: string, clientId: string) {
    this.clientToUser[clientId] = name;

    console.log('clientToUser=', this.clientToUser);

    // You can check who is curentry online.
    return Object.values(this.clientToUser);
  }

  getClientName(clientId: string) {
    return this.clientToUser[clientId];
  }

  create(createMessageDto: CreateMessageDto) {
    const message = { ...createMessageDto };
    console.log('create message=', message);

    const date = new Date();
    const formattedDate = moment(date).format(' YYYY/MM/DD HH:mm:ss');
    console.log(formattedDate); // 2023/11/02 12:34:56

    message.date = formattedDate;

    this.messages.push(message); // TODO improve
    return message;
  }

  findAll(room: string) {
    console.log('room=', room);
    let result = this.messages.filter((message) => message.room === room);
    console.log('filter=', result);
    return result;
  }
}
