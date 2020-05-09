import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { TrainingService } from './training.service';

@Component({
  selector: 'app-training',
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.css'],

})
export class TrainingComponent implements OnInit {

  excerciseSub: Subscription;
  onGoingTraining  = false;
  constructor(private trainingService: TrainingService) { }

  ngOnInit(): void {
    this.trainingService.excerciseChange.subscribe(excercise => {
      if (excercise) {
        this.onGoingTraining = true;
      }else {
        this.onGoingTraining = false;
      }
    });
  }

}
