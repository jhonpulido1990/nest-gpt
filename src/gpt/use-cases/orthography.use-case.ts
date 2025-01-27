import OpenAI from 'openai';

interface Options {
  prompt: string;
}

export const orthographyCheckCase = async (
  openai: OpenAI,
  options: Options,
) => {
  const { prompt } = options;

  const completion = await openai.chat.completions.create({
    messages: [
      {
        role: 'system',
        content: 'eres un asistente muy util.',
      },
      {
        role: 'user',
        content: prompt,
      },
    ],
    model: 'gpt-4o-mini',
  });

  console.log(completion, prompt);

  return completion.choices[0];
};
