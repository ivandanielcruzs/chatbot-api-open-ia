import { Inject, Injectable } from '@nestjs/common';
import {
  IProviderIA,
  IProviderIAToken,
} from '../../../bots/domain/services/IProviderIA';

@Injectable()
export class ChatIAService {
  constructor(
    @Inject(IProviderIAToken)
    private readonly ia: IProviderIA,
  ) {}

  async generateBotReply(prompt: string): Promise<string> {
    return this.ia.generateResponse(prompt);
  }
}
