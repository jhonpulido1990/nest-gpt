import { Injectable } from '@nestjs/common';
import { orthographyCheckCase } from './use-cases';
import { OrthographyDto } from './dtos/orthography.dto';

@Injectable()
export class GptService {
  // solo llama casos de uso
  async orthographyCheck(orthographyDto: OrthographyDto) {
    return await orthographyCheckCase({
      prompt: orthographyDto.prompt,
    });
  }
}
