import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap } from 'rxjs';
import { askAi, askAiSuccess, askAiFailure } from './gpt.action';
import { AiService } from './gpt.service';


@Injectable()
export class AiEffects {
ask$ = createEffect(() =>
this.actions$.pipe(
ofType(askAi),
switchMap(({ question }) =>
this.ai.ask(question).pipe(
map(res => askAiSuccess({ answer: res.answer, id: res.id, createdUtc: res.createdUtc })),
catchError(err => of(askAiFailure({ error: this.humanizeError(err) })))
)
)
)
);


constructor(private actions$: Actions, private ai: AiService) {}


private humanizeError(err: any): string {
if (!err) return 'Something went wrong.';
const title = err?.error?.title || err?.statusText;
const detail = err?.error?.errors?.request?.[0];
return title ? `${title}${detail ? ' — ' + detail : ''}` : 'Unable to reach Catholic Companion service.';
}
}