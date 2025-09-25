// ==============================
// FILE: src/app/catholic-companion/catholic-companion.component.ts
// ==============================
import { ChangeDetectionStrategy, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable, Subject, combineLatest } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';
import { selectAiAnswer, selectAiConversation, selectAiError, selectAiLoading } from '../../store/gpt/gpt.reducer';
import { askAi, resetAi } from '../../store/gpt/gpt.action';
import { MatIconModule } from "@angular/material/icon";
import { MatCardModule } from "@angular/material/card";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatProgressBarModule } from "@angular/material/progress-bar";
import { MatChipsModule } from '@angular/material/chips';
import { AsyncPipe, DatePipe } from '@angular/common';
//import { askAi, resetAi } from '../state/ai/ai.actions';
//import { selectAiAnswer, selectAiConversation, selectAiError, selectAiLoading } from '../state/ai/ai.selectors';


@Component({
selector: 'gpt',
templateUrl: './gpt.component.html',
styleUrls: ['./gpt.component.scss'],
changeDetection: ChangeDetectionStrategy.OnPush,
imports: [MatIconModule, MatCardModule, MatFormFieldModule, MatProgressBarModule, MatChipsModule, AsyncPipe, DatePipe],
})
export class GptComponent implements OnInit, OnDestroy {
@ViewChild('questionBox') questionBox!: ElementRef<HTMLTextAreaElement>;


// Removed duplicate and incorrectly typed form declaration


loading$!: Observable<boolean>;
error$!: Observable<string | null>;
answer$!: Observable<string | null>;
conversation$!: Observable<ReadonlyArray<{ role: 'user' | 'assistant'; content: string; timestamp: string }>>;


readonly starterQuestions: ReadonlyArray<string> = [
'Why be Catholic?',
'How do I pray the Rosary?',
'Where does the papacy come from in the Bible?',
'What is the Eucharist?',
'What does the Church teach about salvation?',
];


private destroyed$ = new Subject<void>();


form: ReturnType<FormBuilder['group']>;

constructor(private fb: FormBuilder, private store: Store) {
  this.form = this.fb.group({
	question: ['', [Validators.required, Validators.minLength(3)]],
  });
}


ngOnInit(): void {
this.loading$ = this.store.select(selectAiLoading);
this.error$ = this.store.select(selectAiError);
this.answer$ = this.store.select(selectAiAnswer);
this.conversation$ = this.store.select(selectAiConversation);


// Auto-growing textarea height
combineLatest([this.form.get('question')!.valueChanges]).pipe(takeUntil(this.destroyed$)).subscribe(() => {
setTimeout(() => this.autogrow(), 0);
});
}


submit(): void {
const q = (this.form.value.question || '').trim();
if (!q) return;
this.store.dispatch(askAi({ question: q }));
}


useStarter(q: string): void {
this.form.patchValue({ question: q });
this.submit();
}


clearAll(): void {
this.store.dispatch(resetAi());
this.form.reset();
setTimeout(() => this.questionBox?.nativeElement.focus(), 0);
}


onKeydown(e: KeyboardEvent): void {
if (e.key === 'Enter' && !e.shiftKey) {
e.preventDefault();
this.submit();
}
}


private autogrow(): void {
if (!this.questionBox) return;
const el = this.questionBox.nativeElement;
el.style.height = 'auto';
el.style.height = Math.min(el.scrollHeight, 240) + 'px';
}


ngOnDestroy(): void {
this.destroyed$.next();
this.destroyed$.complete();
}
}