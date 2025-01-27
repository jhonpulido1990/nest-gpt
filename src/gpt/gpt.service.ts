import { Injectable } from '@nestjs/common';
import { orthographyCheckCase } from './use-cases';

@Injectable()
export class GptService {
  // solo llama casos de uso
  async orthographyCheck() {
    return await orthographyCheckCase();
  }
}
