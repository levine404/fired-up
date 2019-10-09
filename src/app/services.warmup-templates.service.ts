import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Storage } from '@ionic/storage';

import { Observable } from 'rxjs';

import { WarmupTemplateInterface } from '../types/warmup-template';
import * as WarmupTemplateActions from './actions/warmup-template.actions';
import { State, getAllWarmupTemplates, getWarmupTemplateById } from './reducers';
import { WarmupState } from './reducers/warmup-template.reducer';

@Injectable({
  providedIn: 'root'
})
export class WarmupService {
  public warmupTemplates: Observable<WarmupTemplateInterface[]>;
  private loaded: boolean;

  constructor(private storage: Storage, private store: Store<State>) {
    this.loaded = false;
    this.warmupTemplates = this.store.select(getAllWarmupTemplates);
    this.warmupTemplates.subscribe(templates => {
      if (this.loaded) {
        this.storage.set('warmupTemplates', templates);
      }
      this.loaded = true;
    });
  }

  getAllWarmupTemplates(): Observable<WarmupTemplateInterface[]> {
    return this.store.select(getAllWarmupTemplates);
  }

  getWarmupTemplate(id: string): Observable<WarmupTemplateInterface> {
    return this.store.select(getWarmupTemplateById, {
      id
    });
  }

  createWarmupTemplate(): void {
    this.store.dispatch(new WarmupTemplateActions.CreateWarmupTemplate());
  }

  deleteWarmupTemplate(templateId: string): void {
    this.store.dispatch(new WarmupTemplateActions.DeleteWarmupTemplate(templateId));
  }

  adjustPercentage(templateId: string, setIndex: number, value: number) {
    this.store.dispatch(new WarmupTemplateActions.AdjustPercentage({ templateId, setIndex, value }))
  }

  removeSet(templateId: string, setIndex: number) {
    this.store.dispatch(new WarmupTemplateActions.RemoveSet({ templateId, setIndex }));
  }

  addSet(templateId: string) {
    this.store.dispatch(new WarmupTemplateActions.AddSet({ templateId }));
  }

  adjustReps(templateId: string, setIndex: number, value: number) {
    this.store.dispatch(new WarmupTemplateActions.AdjustReps({ templateId, setIndex, value }));
  }

  changeTemplateName(templateId: string, value: string) {
    this.store.dispatch(new WarmupTemplateActions.ChangeTemplateName({ templateId, value }));
  }

  loadState(state: WarmupState): void {
    this.store.dispatch(new WarmupTemplateActions.LoadState(state));
  }
}
