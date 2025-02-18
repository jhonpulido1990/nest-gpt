import { Injectable } from '@nestjs/common';
import OpenAI from 'openai';
import {
  checkCompleteStatusUseCase,
  createMessageUseCase,
  createRubUseCase,
  createThreadUseCase,
} from './uses-cases';
import { QuestionDto } from './dtos/question.dto';
import { getMessageListUseCase } from './uses-cases/get-message-list.use-case';

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

    await checkCompleteStatusUseCase(this.openai, {
      runId: run.id,
      threadId: threadId,
    });
    const messages = await getMessageListUseCase(this.openai, { threadId });
    return messages.reverse();
  }
}
