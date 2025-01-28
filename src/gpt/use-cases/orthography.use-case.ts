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
        content: `
        Te seran proveidos textos en español con posibles errores ortograficos y gramaticales,
        las palabras usadas deben de existir en el diccionario de la real academia española,
        Debes de responder en formato json,
        tu tarea es corregirlos y retornar informacion soluciones,
        tambien debes de dar un porcentaje de acierto por el usuario,

        si no hay errores, debes de retornar un mensaje de felicitaciones.
        ejemplo de salida:
        {
          userScore: number,
          errors: string[], // ['error -> solucion']
          mensaje: string, // usa emojis y texto para felicitar al ususario
        }
        `,
      },
      {
        role: 'user',
        content: prompt,
      },
    ],
    model: 'gpt-4o-mini',
    temperature: 0.3,
    max_tokens: 150,
  });

  console.log(completion, prompt);

  return completion.choices[0];
};
