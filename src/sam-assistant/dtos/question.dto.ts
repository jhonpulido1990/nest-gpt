import { IsString } from 'class-validator';

export class QuestionDto {
  @IsString()
  readonly thread: string;

  @IsString()
  readonly question: string;
}
