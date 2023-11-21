export interface User {
  userId: string;
  userName: string;
  socketId: string;
}

export class Message {
  name: string;
  text: string;
  room: string;
  date: string;
}

export interface Room {
  name: string;
  host: User;
  users: User[];
}
