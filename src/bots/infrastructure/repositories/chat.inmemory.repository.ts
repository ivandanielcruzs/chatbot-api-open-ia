import { Inject, Injectable } from '@nestjs/common';
import { IChatRepository } from '../../domain/repositories/chat.repository.interface';
import { Chat } from '../../domain/entities/chat.entity';
import { IBotRepository } from '../../domain/repositories/bot.repository.interface';

/**
 * ⚠️ This is an in-memory implementation for demonstration purposes only.
 * In a real-world app, chats would be persisted in a database.
 */
@Injectable()
export class ChatInMemoryRepository implements IChatRepository {
  constructor(
    @Inject('IBotRepository') private readonly botRepository: IBotRepository,
  ) {}

  create(botId: string): Chat | null {
    const bot = this.botRepository.findById(botId);
    if (!bot) return null;
    const chat = new Chat();
    bot.addChat(chat);
    return chat;
  }

  findById(botId: string, chatId: string): Chat | undefined {
    const bot = this.botRepository.findById(botId);
    return bot?.chats.find((chat: Chat) => chat.id === chatId);
  }
}
