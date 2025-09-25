import { createAction, props } from '@ngrx/store';


export const askAi = createAction('[AI] Ask', props<{ question: string }>());
export const askAiSuccess = createAction(
'[AI] Ask Success',
props<{ answer: string; id?: string; createdUtc?: string }>()
);
export const askAiFailure = createAction('[AI] Ask Failure', props<{ error: string }>());
export const resetAi = createAction('[AI] Reset');