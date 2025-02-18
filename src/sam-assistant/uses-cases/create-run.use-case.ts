import OpenAI from 'openai';

interface Options {
  threadId: string;
  assistantId?: string;
}

export const createRubUseCase = async (
  openai: OpenAI,
  { threadId, assistantId = 'asst_fo3pOizFd71jbPEs7iKVSJCW' }: Options,
) => {
  const run = await openai.beta.threads.runs.create(threadId, {
    assistant_id: assistantId,
  });

  console.log(run);

  return run;
};
