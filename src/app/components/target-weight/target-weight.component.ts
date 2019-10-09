import { Component, OnInit } from '@angular/core';
import { StatusService } from 'src/app/services.status.service';

@Component({
  selector: 'app-target-weight',
  templateUrl: './target-weight.component.html',
  styleUrls: ['./target-weight.component.scss'],
})
export class TargetWeightComponent implements OnInit {

  constructor(public statusService: StatusService) { }

  ngOnInit() {}

}
