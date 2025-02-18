import { Injectable } from '@nestjs/common';
import OpenAI from 'openai';
import {
  createMessageUseCase,
  createRubUseCase,
  createThreadUseCase,
} from './uses-cases';
import { QuestionDto } from './dtos/question.dto';

@Injectable()
export class SamAssistantService {
  private openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });

  async createThread() {
    return await createThreadUseCase(this.openai);
  }

  async userQuestion({ threadId, question }: QuestionDto) {
    const message = await createMessageUseCase(this.openai, {
      threadId,
      question,
    });

    const run = await createRubUseCase(this.openai, { threadId });
  }
}
