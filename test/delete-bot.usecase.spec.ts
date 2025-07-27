/* eslint-disable @typescript-eslint/unbound-method */
import { DeleteBotUseCase } from '../src/bots/application/use-cases/delete-bot.usecase';
import { IBotRepository } from '../src/bots/domain/repositories/bot.repository.interface';
import { Bot } from '../src/bots/domain/entities/bot.entity';

describe('DeleteBotUseCase', () => {
  it('should delete an existing bot', () => {
    const bot = new Bot('Bot X', 'Prompt');
    const mockRepo: IBotRepository = {
      findById: jest.fn().mockReturnValue(bot),
      delete: jest.fn(),
      findAll: jest.fn(),
      create: jest.fn(),
    };

    const useCase = new DeleteBotUseCase(mockRepo);
    useCase.execute(bot.id);

    expect(mockRepo.delete).toHaveBeenCalledWith(bot.id);
  });

  it('should throw if bot not found', () => {
    const useCase = new DeleteBotUseCase({
      findById: () => undefined,
      delete: jest.fn(),
      findAll: jest.fn(),
      create: jest.fn(),
    });

    expect(() => useCase.execute('invalid-id')).toThrow('Bot not found');
  });
});
