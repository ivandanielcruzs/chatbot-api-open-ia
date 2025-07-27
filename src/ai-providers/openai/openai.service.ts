import { IProviderIA } from '../../bots/domain/services/IProviderIA';
import { Injectable } from '@nestjs/common';
import OpenAI from 'openai';

@Injectable()
export class OpenAIService implements IProviderIA {
  private readonly client = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });

  async generateResponse(prompt: string): Promise<string> {
    const response = await this.client.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'system', content: prompt }],
      temperature: 0.7,
    });
    return response.choices[0].message.content ?? '';
  }
}
