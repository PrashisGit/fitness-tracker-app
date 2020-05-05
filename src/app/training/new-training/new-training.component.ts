import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { TrainingService } from '../training.service';
import { Excercise } from '../excercise.model';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css']
})
export class NewTrainingComponent implements OnInit {

  @Output() trainingStart = new EventEmitter<void>();
  constructor(private trainingService: TrainingService) { }

  excercise: Excercise[] = [];
  ngOnInit(): void {
    this.excercise = this.trainingService.getAvailableExcercises();
  }

  onGoingTraining(){
    this.trainingStart.emit();
  }

}
