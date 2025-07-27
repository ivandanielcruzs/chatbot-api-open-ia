import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { IBotRepository } from '../../domain/repositories/bot.repository.interface';

@Injectable()
export class DeleteBotUseCase {
  constructor(
    @Inject('IBotRepository') private readonly botRepository: IBotRepository,
  ) {}

  execute(botId: string): void {
    const bot = this.botRepository.findById(botId);
    if (!bot) throw new NotFoundException('Bot not found');
    this.botRepository.delete(botId);
  }
}
