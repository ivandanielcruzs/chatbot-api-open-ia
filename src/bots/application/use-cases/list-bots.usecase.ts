import { Inject, Injectable } from '@nestjs/common';
import { IBotRepository } from '../../domain/repositories/bot.repository.interface';
import { Bot } from '../../../bots/domain/entities/bot.entity';

@Injectable()
export class ListBotsUseCase {
  constructor(
    @Inject('IBotRepository') private readonly botRepository: IBotRepository,
  ) {}

  execute(): { id: string; name: string; totalChats: number }[] {
    const bots = this.botRepository.findAll();
    return bots.map((bot: Bot) => ({
      id: bot.id,
      name: bot.name,
      totalChats: bot.chats.length,
    }));
  }
}
