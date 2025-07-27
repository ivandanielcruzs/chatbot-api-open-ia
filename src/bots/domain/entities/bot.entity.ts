import { v4 as uuid } from 'uuid';
import { Chat } from './chat.entity';

export class Bot {
  readonly id: string;
  readonly name: string;
  readonly basePrompt: string;
  chats: Chat[];

  constructor(name: string, basePrompt: string) {
    this.id = uuid();
    this.name = name;
    this.basePrompt = basePrompt;
    this.chats = [];
  }

  addChat(chat: Chat) {
    this.chats.push(chat);
  }
}
