import { Module } from '@nestjs/common';

import { BotInMemoryRepository } from './infrastructure/repositories/bot.inmemory.repository';
import { ChatInMemoryRepository } from './infrastructure/repositories/chat.inmemory.repository';

import { CreateBotUseCase } from './application/use-cases/create-bot.usecase';
import { ListBotsUseCase } from './application/use-cases/list-bots.usecase';
import { CreateChatUseCase } from './application/use-cases/create-chat.usecase';
import { SendMessageUseCase } from './application/use-cases/send-message.usecase';
import { DeleteBotUseCase } from './application/use-cases/delete-bot.usecase';

import { ChatIAService } from './application/services/chat-ia.service';
import { BotsController } from './presentation/bots.controller';
//import { IProviderIAToken } from './domain/services/IProviderIA';
import { OpenAIService } from '../ai-providers/openai/openai.service';
import { IProviderIAToken } from './domain/services/IProviderIA';

@Module({
  controllers: [BotsController],
  providers: [
    // Repositories
    BotInMemoryRepository,
    {
      provide: 'IBotRepository',
      useExisting: BotInMemoryRepository,
    },
    ChatInMemoryRepository,
    {
      provide: 'IChatRepository',
      useExisting: ChatInMemoryRepository,
    },

    // Services
    OpenAIService,
    {
      provide: IProviderIAToken,
      useExisting: OpenAIService,
    },
    ChatIAService,

    // Use cases
    CreateBotUseCase,
    ListBotsUseCase,
    CreateChatUseCase,
    SendMessageUseCase,
    DeleteBotUseCase,
  ],
  exports: [],
})
export class BotsModule {}
