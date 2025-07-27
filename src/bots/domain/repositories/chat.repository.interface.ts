import { Chat } from '../entities/chat.entity';

export interface IChatRepository {
  create(botId: string): Chat | null;
  findById(botId: string, chatId: string): Chat | undefined;
}
