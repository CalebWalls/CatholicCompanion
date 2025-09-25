import { createReducer, on } from '@ngrx/store';


export type ChatMessage = { role: 'user' | 'assistant'; content: string; timestamp: string };


export interface AiState {
loading: boolean;
error: string | null;
conversation: ChatMessage[];
lastAnswer: string | null;
}


export const initialAiState: AiState = {
loading: false,
error: null,
conversation: [],
lastAnswer: null,
};


export const aiReducer = createReducer(
initialAiState,
on(resetAi, _ => initialAiState),
on(askAi, (state, { question }) => ({
...state,
loading: true,
error: null,
// push the user question immediately
conversation: [
...state.conversation,
{ role: 'user', content: question, timestamp: new Date().toISOString() },
],
})),
on(askAiSuccess, (state, { answer }) => ({
...state,
loading: false,
lastAnswer: answer,
conversation: [
...state.conversation,
{ role: 'assistant', content: answer, timestamp: new Date().toISOString() },
],
})),
on(askAiFailure, (state, { error }) => ({ ...state, loading: false, error }))
);




// ==============================
// FILE: src/app/state/ai/ai.selectors.ts
// ==============================
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { resetAi, askAi, askAiSuccess, askAiFailure } from './gpt.action';


export const AI_FEATURE_KEY = 'ai';


export const selectAiFeature = createFeatureSelector<AiState>(AI_FEATURE_KEY);


export const selectAiLoading = createSelector(selectAiFeature, s => s.loading);
export const selectAiError = createSelector(selectAiFeature, s => s.error);
export const selectAiConversation = createSelector(selectAiFeature, s => s.conversation);
export const selectAiAnswer = createSelector(selectAiFeature, s => s.lastAnswer);