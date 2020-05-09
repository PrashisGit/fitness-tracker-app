import { Component, OnInit} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { StopTrainingDialogComponent } from './stop-training-dialog.component';
import { TrainingService } from '../training.service';

@Component({
  selector: 'app-current-training',
  templateUrl: './current-training.component.html',
  styleUrls: ['./current-training.component.css']
})
export class CurrentTrainingComponent implements OnInit {
  progress = 0;
  timer: number;
  constructor(public dialog: MatDialog, private trainingService: TrainingService) { }

  ngOnInit(): void {
    this.startOrResumeTraining();
  }

  startOrResumeTraining() {
    const step = this.trainingService.getRunningExcercise().duration / 100 * 1000;
    this.timer =  setInterval(() => {
      this.progress += 1;
      if(this.progress >= 100){
        this.trainingService.completeExcercise();
        clearInterval(this.timer);
      }
    }, step);
  }

  onStopTimer() {
    clearInterval(this.timer);
    const dialogRef =  this.dialog.open(StopTrainingDialogComponent,
      {data: {progress: this.progress}}
      );

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.trainingService.cancelExcercise(this.progress);
      } else {
        this.startOrResumeTraining();
      }
    });
  }

}
