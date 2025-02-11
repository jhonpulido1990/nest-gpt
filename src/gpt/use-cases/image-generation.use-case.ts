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
  // Todo: verificar original image

  const response = await openai.images.generate({
    prompt: prompt,
    model: 'dall-e-2',
    n: 1,
    size: '1024x1024',
    quality: 'standard',
    response_format: 'url',
  });

  console.log(response);
  return {
    url: response.data[0].url,
    localPath: '',
    revised_prompt: response.data[0].revised_prompt,
  };
};
