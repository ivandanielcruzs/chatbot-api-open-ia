/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { ChatIAService } from '../src/bots/application/services/chat-ia.service';
import { SendMessageUseCase } from '../src/bots/application/use-cases/send-message.usecase';
import { Bot } from '../src/bots/domain/entities/bot.entity';
import { Chat } from '../src/bots/domain/entities/chat.entity';
import { IBotRepository } from '../src/bots/domain/repositories/bot.repository.interface';
import { IChatRepository } from '../src/bots/domain/repositories/chat.repository.interface';

describe('SendMessageUseCase', () => {
  let useCase: SendMessageUseCase;
  let mockBotRepo: jest.Mocked<IBotRepository>;
  let mockChatRepo: jest.Mocked<IChatRepository>;
  let mockIAService: jest.Mocked<ChatIAService>;

  beforeEach(() => {
    mockBotRepo = {
      findById: jest.fn(),
      findAll: jest.fn(),
      create: jest.fn(),
      delete: jest.fn(),
    };

    mockChatRepo = {
      findById: jest.fn(),
      create: jest.fn(),
    };

    mockIAService = {
      generateBotReply: jest.fn(),
    } as any;

    useCase = new SendMessageUseCase(mockBotRepo, mockChatRepo, mockIAService);
  });

  it('should return a bot response', async () => {
    const chat = new Chat();
    const bot = new Bot('Historian', 'You are a bot');

    mockChatRepo.findById.mockReturnValue(chat);
    mockBotRepo.findById.mockReturnValue(bot);
    mockIAService.generateBotReply.mockResolvedValue('This is a response');

    const result = await useCase.execute(bot.id, chat.id, 'Who was Iturbide?');

    expect(result).toBe('This is a response');
    expect(chat.messages[0].content).toBe('Who was Iturbide?');
    expect(chat.messages[1].content).toBe('This is a response');
  });

  it('should end conversation after 5 minutes', async () => {
    const bot = new Bot('Historian', 'You are a bot');
    mockBotRepo.findById.mockReturnValue(bot);

    const oldChat = new Chat();
    oldChat.setStartTime(new Date(Date.now() - 6 * 60 * 1000));
    mockChatRepo.findById.mockReturnValue(oldChat);

    const result = await useCase.execute(bot.id, oldChat.id, 'Hello?');

    expect(result).toBe('Conversation ended.');
    expect(oldChat.messages.length).toBe(0); // No message added
  });

  it('should throw if chat is not found', async () => {
    const bot = new Bot('Historian', 'You are a bot');
    mockBotRepo.findById.mockReturnValue(bot);

    mockChatRepo.findById.mockReturnValue(undefined);

    await expect(
      useCase.execute(bot.id, 'fakeChatId', 'Hello'),
    ).rejects.toThrow('Chat not found');
  });

  it('should throw if bot is not found', async () => {
    const chat = new Chat();
    mockChatRepo.findById.mockReturnValue(chat);
    mockBotRepo.findById.mockReturnValue(undefined);

    await expect(useCase.execute('botId', chat.id, 'Hi')).rejects.toThrow(
      'Bot not found',
    );
  });
});
