import { Component, OnInit} from '@angular/core';
import { TrainingService } from '../training.service';
import { Excercise } from '../excercise.model';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css']
})
export class NewTrainingComponent implements OnInit {

  constructor(private trainingService: TrainingService) { }

  excercise: Excercise[] = [];
  ngOnInit(): void {
    this.excercise = this.trainingService.getAvailableExcercises();
    console.log(this.excercise);
  }

  onStarttraining(form: NgForm){
   this.trainingService.startExcercise(form.value.excerciseSelect);
  }

}
