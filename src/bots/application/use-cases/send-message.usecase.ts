import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { IChatRepository } from '../../domain/repositories/chat.repository.interface';
import { IBotRepository } from '../../domain/repositories/bot.repository.interface';
import { ChatIAService } from '../services/chat-ia.service';
import { Message } from '../../domain/entities/message.entity';

@Injectable()
export class SendMessageUseCase {
  constructor(
    @Inject('IBotRepository') private readonly botRepo: IBotRepository,
    @Inject('IChatRepository') private readonly chatRepo: IChatRepository,
    private readonly chatIAService: ChatIAService,
  ) {}

  async execute(
    botId: string,
    chatId: string,
    userMessage: string,
  ): Promise<string> {
    const bot = this.botRepo.findById(botId);
    if (!bot) throw new NotFoundException('Bot not found');

    const chat = this.chatRepo.findById(botId, chatId);
    if (!chat) throw new NotFoundException('Chat not found');

    if (!chat.isActive()) return 'Conversation ended.';

    chat.addMessage(new Message('user', userMessage));

    const prompt = `${bot.basePrompt}\n\nUser: ${userMessage}`;
    const response = await this.chatIAService.generateBotReply(prompt);

    chat.addMessage(new Message('bot', response));
    return response;
  }
}
