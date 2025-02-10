import * as path from 'path';
import * as fs from 'fs';

import { Injectable, NotFoundException } from '@nestjs/common';
import OpenAI from 'openai';

import {
  audioToTextUseCase,
  orthographyCheckCase,
  prosConsDicusserStreamUseCase,
  prosConsDicusserUseCase,
  textToAudioUseCase,
  translateUseCase,
} from './use-cases';
import { OrthographyDto } from './dtos/orthography.dto';
import { ProsConsDicusserDto } from './dtos/prosConsDiscuser.dto';
import { AudioToTextDto, TextToAudioDto, TranslateDto } from './dtos';

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

  async textToAudio({ prompt, voice }: TextToAudioDto) {
    return await textToAudioUseCase(this.openai, { prompt, voice });
  }

  async textToAudioGetter(fieldID: string) {
    const filePath = path.resolve(
      __dirname,
      '../../generated/audios/',
      `${fieldID}.mp3`,
    );
    const wasFound = fs.existsSync(filePath);
    if (!wasFound) throw new NotFoundException(`File ${fieldID} not found`);

    return filePath;
  }

  async audioToText(
    audioFile: Express.Multer.File,
    audioToTextDto: AudioToTextDto,
  ) {
    const { prompt } = audioToTextDto;
    return await audioToTextUseCase(this.openai, { audioFile, prompt });
  }
}
