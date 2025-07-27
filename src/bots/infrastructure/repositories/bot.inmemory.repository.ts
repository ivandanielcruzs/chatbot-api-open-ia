import { Injectable } from '@nestjs/common';
import { IBotRepository } from '../../domain/repositories/bot.repository.interface';
import { Bot } from '../../domain/entities/bot.entity';

/**
 * ⚠️ This is an in-memory implementation for demonstration purposes only.
 * In a real-world app, this would be replaced by a database-backed repository.
 */

@Injectable()
export class BotInMemoryRepository implements IBotRepository {
  private readonly bots: Map<string, Bot> = new Map();

  create(name: string, basePrompt: string): Bot {
    const bot = new Bot(name, basePrompt);
    this.bots.set(bot.id, bot);
    return bot;
  }

  findAll(): Bot[] {
    return Array.from(this.bots.values());
  }

  findById(id: string): Bot | undefined {
    return this.bots.get(id);
  }

  delete(id: string): void {
    this.bots.delete(id);
  }
}
