import { Body, Controller, Post } from '@nestjs/common';
import { GptService } from './gpt.service';
import { OrthographyDto, ProsConsDicusserDto } from './dtos';

@Controller('gpt')
export class GptController {
  constructor(private readonly gptService: GptService) {}

  @Post('orthography-check')
  orthographyCheck(@Body() orthographyDto: OrthographyDto) {
    //return orthographyDto;
    return this.gptService.orthographyCheck(orthographyDto);
  }

  @Post('pro-cons-discusser')
  prosConsDicusser(@Body() prosConsDicusserDto: ProsConsDicusserDto) {
    return this.gptService.prosConsDicusser(prosConsDicusserDto);
  }
}
