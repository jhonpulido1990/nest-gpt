import { Injectable } from '@nestjs/common';
import OpenAI from 'openai';

import {
  orthographyCheckCase,
  prosConsDicusserStreamUseCase,
  prosConsDicusserUseCase,
  translateUseCase,
} from './use-cases';
import { OrthographyDto } from './dtos/orthography.dto';
import { ProsConsDicusserDto } from './dtos/prosConsDiscuser.dto';
import { TranslateDto } from './dtos';

@Injectable()
export class GptService {
  private openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });

  // solo llama casos de uso
  async orthographyCheck(orthographyDto: OrthographyDto) {
    return await orthographyCheckCase(this.openai, {
      prompt: orthographyDto.prompt,
    });
  }

  async prosConsDicusser({ prompt }: ProsConsDicusserDto) {
    return await prosConsDicusserUseCase(this.openai, { prompt });
  }

  async prosConsDicusserStream({ prompt }: ProsConsDicusserDto) {
    return await prosConsDicusserStreamUseCase(this.openai, { prompt });
  }

  async translateText({ prompt, lang }: TranslateDto) {
    return await translateUseCase(this.openai, { prompt, lang });
  }
}
