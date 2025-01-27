import { Injectable } from '@nestjs/common';
import OpenAI from 'openai';

import { orthographyCheckCase } from './use-cases';
import { OrthographyDto } from './dtos/orthography.dto';

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
}
