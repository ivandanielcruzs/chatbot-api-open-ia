import { v4 as uuid } from 'uuid';
import { Message } from './message.entity';

export class Chat {
  readonly id: string;
  messages: Message[];
  private startTime: Date;

  constructor() {
    this.id = uuid();
    this.startTime = new Date();
    this.messages = [];
  }

  addMessage(message: Message) {
    this.messages.push(message);
  }

  isActive(maxMinutes = 5): boolean {
    const now = new Date();
    const diff = (now.getTime() - this.startTime.getTime()) / (1000 * 60);
    return diff < maxMinutes;
  }

  // test only
  setStartTime(time: Date) {
    this.startTime = time;
  }
}
