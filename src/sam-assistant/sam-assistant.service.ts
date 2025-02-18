import { Injectable } from '@nestjs/common';
import OpenAI from 'openai';
import { createThreadUseCase } from './uses-cases';

@Injectable()
export class SamAssistantService {
  private openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });

  async createThread() {
    return await createThreadUseCase(this.openai);
  }
}
