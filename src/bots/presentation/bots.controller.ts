// bots/presentation/bots.controller.ts

import {
  Controller,
  Post,
  Get,
  Delete,
  Patch,
  Param,
  Body,
} from '@nestjs/common';

import { CreateBotUseCase } from '../application/use-cases/create-bot.usecase';
import { ListBotsUseCase } from '../application/use-cases/list-bots.usecase';
import { CreateChatUseCase } from '../application/use-cases/create-chat.usecase';
import { SendMessageUseCase } from '../application/use-cases/send-message.usecase';
import { DeleteBotUseCase } from '../application/use-cases/delete-bot.usecase';

@Controller('bots')
export class BotsController {
  constructor(
    private readonly createBot: CreateBotUseCase,
    private readonly listBots: ListBotsUseCase,
    private readonly createChat: CreateChatUseCase,
    private readonly sendMessage: SendMessageUseCase,
    private readonly deleteBot: DeleteBotUseCase,
  ) {}

  @Post()
  create(@Body() body: { name: string; basePrompt: string }) {
    const bot = this.createBot.execute(body.name, body.basePrompt);
    return { botId: bot.id };
  }

  @Get()
  list() {
    return this.listBots.execute();
  }

  @Post(':id/chat')
  createNewChat(@Param('id') botId: string) {
    const chat = this.createChat.execute(botId);
    return { chatId: chat.id };
  }

  @Patch(':id/chat/:chatId')
  async send(
    @Param('id') botId: string,
    @Param('chatId') chatId: string,
    @Body() body: { message: string },
  ) {
    const response = await this.sendMessage.execute(
      botId,
      chatId,
      body.message,
    );
    return { response };
  }

  @Delete(':id')
  delete(@Param('id') botId: string) {
    this.deleteBot.execute(botId);
    return { deleted: true };
  }
}
