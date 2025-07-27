import { ListBotsUseCase } from '../src/bots/application/use-cases/list-bots.usecase';
import { IBotRepository } from '../src/bots/domain/repositories/bot.repository.interface';
import { Bot } from '../src/bots/domain/entities/bot.entity';
import { Chat } from '../src/bots/domain/entities/chat.entity';

describe('ListBotsUseCase', () => {
  it('should return all bots with chat counts', () => {
    const bot1 = new Bot('Bot A', 'Prompt A');
    bot1.addChat(new Chat());
    const bot2 = new Bot('Bot B', 'Prompt B');

    const mockRepo: IBotRepository = {
      findAll: () => [bot1, bot2],
      findById: jest.fn(),
      create: jest.fn(),
      delete: jest.fn(),
    };

    const useCase = new ListBotsUseCase(mockRepo);
    const result = useCase.execute();

    expect(result).toEqual([
      { id: bot1.id, name: bot1.name, totalChats: 1 },
      { id: bot2.id, name: bot2.name, totalChats: 0 },
    ]);
  });
});
