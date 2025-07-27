import { CreateChatUseCase } from '../src/bots/application/use-cases/create-chat.usecase';
import { IChatRepository } from '../src/bots/domain/repositories/chat.repository.interface';
import { Chat } from '../src/bots/domain/entities/chat.entity';

describe('CreateChatUseCase', () => {
  it('should create a new chat for a bot', () => {
    const fakeBotId = 'bot-abc';
    const chat = new Chat();

    const mockChatRepo: IChatRepository = {
      create: (botId: string) => (botId === fakeBotId ? chat : null),
      findById: jest.fn(),
    };

    const useCase = new CreateChatUseCase(mockChatRepo);
    const result = useCase.execute(fakeBotId);

    expect(result).toBe(chat);
    expect(result.id).toBeDefined();
  });

  it('should throw if bot not found', () => {
    const useCase = new CreateChatUseCase({
      create: () => null,
      findById: jest.fn(),
    });

    expect(() => useCase.execute('invalid-bot')).toThrow('Bot not found');
  });
});
