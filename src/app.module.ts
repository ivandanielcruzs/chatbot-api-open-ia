import { Module } from '@nestjs/common';
import { BotsModule } from './bots/bots.module';
import { OpenAIService } from './ai-providers/openai/openai.service';
import { IProviderIAToken } from './bots/domain/services/IProviderIA';

@Module({
  imports: [BotsModule],
  providers: [
    {
      provide: IProviderIAToken,
      useClass: OpenAIService,
    },
  ],
})
export class AppModule {}
