import { Component, OnInit, Input } from '@angular/core';

const MAX_SIZE = 60;

@Component({
  selector: 'app-plate-chart',
  templateUrl: './plate-chart.component.html',
  styleUrls: ['./plate-chart.component.scss'],
})
export class PlateChartComponent implements OnInit {

  @Input() setIndex: number;
  @Input() unit: 'kg' | 'lb';
  @Input() platesStart: number[];
  @Input() platesRemovedIndex: number;
  @Input() platesEnd: number[];
  @Input() platesAddedIndex: number;
  @Input() isExcessive: boolean;

  constructor() {}

  ngOnInit() {}

  public plateHeight(plate: number): string {
    let plateRatio = 1;
    const unitRatio = this.unit === 'kg'
      ? 1
      : 0.453592;
    const sz = plate * unitRatio;
    if (sz >= 24.9) {
      plateRatio = 1;
    } else if (sz >= 20) {
      plateRatio = 0.9;
    } else if (sz >= 15) {
      plateRatio = 0.8;
    } else if (sz >= 10) {
      plateRatio = 0.7;
    } else if (sz >= 4.5) {
      plateRatio = 0.6;
    } else if (sz >= 2.2) {
      plateRatio = 0.5;
    } else if (sz >= 1) {
      plateRatio = 0.4;
    } else if (sz >= 0.4) {
      plateRatio = 0.3;
    } else {
      plateRatio = 0.2;
    }
    return MAX_SIZE * plateRatio + 'px';
  }

  public leftInstructions(): string {
    let txt = '';
    if (this.platesRemovedIndex !== -1 && this.platesStart.length) {
      txt += 'Remove ';
      txt += this.platesStart
        .slice(this.platesRemovedIndex)
        .map((plate: number) => {
          return plate + this.unit;
        })
        .reverse()
        .join(' & ');
    }
    return txt;
  }

  public rightInstructions(): string {
    let txt = '';
    if (this.platesAddedIndex !== -1 && this.platesEnd.length) {
      txt += 'Add ';
      txt += this.platesEnd
        .slice(this.platesAddedIndex)
        .map((plate: number) => {
          return plate + this.unit;
        })
        .join(' & ');
    }
    return txt;
  }

  public sameAsBefore(): boolean {
    return this.platesStart.toString() === this.platesEnd.toString();
  }

}
