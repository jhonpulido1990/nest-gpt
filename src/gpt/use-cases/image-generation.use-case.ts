import OpenAI from 'openai';

interface Options {
  prompt: string;
  originalImage?: string;
  maskImage?: string;
}

export const imageGenerationUseCase = async (
  openai: OpenAI,
  { prompt, originalImage, maskImage }: Options,
) => {
  console.log({ prompt, originalImage, maskImage });
};
