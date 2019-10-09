import { Component, OnInit, Input } from '@angular/core';
import format from 'format-duration';
import { ActiveSetInterface } from 'src/types/active-set';
import { StatusService } from '../../services.status.service';

@Component({
  selector: 'app-active-set',
  templateUrl: './active-set.component.html',
  styleUrls: ['./active-set.component.scss'],
})
export class ActiveSetComponent implements OnInit {

  @Input() set: ActiveSetInterface;
  @Input() unit: 'kg' | 'lb';
  @Input() start: number;

  constructor(public statusService: StatusService) { }

  ngOnInit() {}

  timeInSeconds(completed: number): string {
    const total = completed - this.start;
    return format(total, { leading: true });
  }

}
