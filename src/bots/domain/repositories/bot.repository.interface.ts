import { Bot } from '../entities/bot.entity';

export interface IBotRepository {
  create(name: string, basePrompt: string): Bot;
  findAll(): Bot[];
  findById(id: string): Bot | undefined;
  delete(id: string): void;
}
