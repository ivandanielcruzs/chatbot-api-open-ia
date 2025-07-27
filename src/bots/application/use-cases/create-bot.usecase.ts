import { Inject, Injectable } from '@nestjs/common';
import { IBotRepository } from '../../domain/repositories/bot.repository.interface';
import { Bot } from '../../domain/entities/bot.entity';

@Injectable()
export class CreateBotUseCase {
  constructor(
    @Inject('IBotRepository') private readonly botRepository: IBotRepository,
  ) {}

  execute(name: string, basePrompt: string): Bot {
    const bot = this.botRepository.create(name, basePrompt);
    return bot;
  }
}
