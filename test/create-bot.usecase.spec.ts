/* eslint-disable @typescript-eslint/unbound-method */
import { CreateBotUseCase } from '../src/bots/application/use-cases/create-bot.usecase';
import { IBotRepository } from '../src/bots/domain/repositories/bot.repository.interface';
import { Bot } from '../src/bots/domain/entities/bot.entity';

describe('CreateBotUseCase', () => {
  let createBotUseCase: CreateBotUseCase;
  let mockBotRepository: jest.Mocked<IBotRepository>;

  beforeEach(() => {
    mockBotRepository = {
      create: jest.fn(),
      findAll: jest.fn(),
      findById: jest.fn(),
      delete: jest.fn(),
    };

    createBotUseCase = new CreateBotUseCase(mockBotRepository);
  });

  it('should create a new bot and return it', () => {
    const name = 'HistoryBot';
    const prompt = 'You are an expert in Mexican History.';

    const newBot = new Bot(name, prompt);
    mockBotRepository.create.mockReturnValue(newBot);

    const result = createBotUseCase.execute(name, prompt);

    expect(mockBotRepository.create).toHaveBeenCalledWith(name, prompt);
    expect(result.name).toBe('HistoryBot');
    expect(result.basePrompt).toContain('Mexican History');
    expect(result.id).toBeDefined();
    expect(result.chats).toEqual([]);
  });
});
