import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.state';
import { GetDailyUpdates } from '../../store/daily-reflections/daily-relflections.actions';
import { selectDailyReflections } from '../../store/daily-reflections/daily-relflections.selector';
import {
  CompanionService,
  localDateKey,
} from '../../services/companion.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  today = new Date();
  state$ = this.store.select(selectDailyReflections);
  done: string[] = [];
  plan = [
    {
      id: 'pray',
      title: 'Begin with prayer',
      detail: 'A quiet moment before the noise.',
      path: '/prayer',
      time: '2 MIN',
    },
    {
      id: 'read',
      title: 'Spend time in the Word',
      detail: 'Let today’s readings meet you where you are.',
      path: '/daily-readings',
      time: '5 MIN',
    },
    {
      id: 'love',
      title: 'Put love into action',
      detail: 'Reach out to someone who needs a little care.',
      path: '/intentions',
      time: 'YOUR PACE',
    },
  ];
  tools = [
    {
      icon: 'spark',
      title: 'A moment of prayer',
      description: 'Pray the Rosary or simply sit in stillness.',
      path: '/prayer',
      tag: 'MAKE SPACE',
    },
    {
      icon: 'heart',
      title: 'Begin again',
      description: 'A thoughtful guide to prepare for confession.',
      path: '/confession',
      tag: 'FIND PEACE',
    },
    {
      icon: 'leaf',
      title: 'Carry someone in prayer',
      description: 'Keep your intentions close to your heart.',
      path: '/intentions',
      tag: 'PRAY FOR OTHERS',
    },
  ];

  constructor(
    private store: Store<AppState>,
    public companion: CompanionService,
  ) {}

  ngOnInit(): void {
    this.done = this.companion.getPlan(this.today);
    this.store.dispatch(
      GetDailyUpdates({ request: { date: localDateKey(this.today) } }),
    );
  }

  toggle(id: string): void {
    this.done = this.done.includes(id)
      ? this.done.filter((item) => item !== id)
      : [...this.done, id];
    this.companion.savePlan(this.today, this.done);
  }
}
