import { Component } from '@angular/core';
import { StatusService } from '../services.status.service';
import format from 'format-duration';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  public itemOpen: string | null;

  constructor(
    public statusService: StatusService
  ) {}

  public openItem(item: string): void {
    if (item && item !== this.itemOpen) {
      this.itemOpen = item;
    } else {
      this.itemOpen = null;
    }
  }

  public toDate(time: number): string {
    return new Date(time).toLocaleDateString();
  }

  public timeCompleted(start: number, end: number): string {
    if (start && end) {
      return format(end - start, { leading: true });
    } else {
      return 'skipped';
    }
  }

}
