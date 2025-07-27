import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { IChatRepository } from '../../domain/repositories/chat.repository.interface';
import { Chat } from '../../domain/entities/chat.entity';

@Injectable()
export class CreateChatUseCase {
  constructor(
    @Inject('IChatRepository') private readonly chatRepository: IChatRepository,
  ) {}

  execute(botId: string): Chat {
    const chat = this.chatRepository.create(botId);
    if (!chat) throw new NotFoundException('Bot not found');
    return chat;
  }
}
