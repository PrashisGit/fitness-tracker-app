import { Component, OnInit, OnDestroy} from '@angular/core';
import { TrainingService } from '../training.service';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Excercise } from '../excercise.model';


@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css']
})
export class NewTrainingComponent implements OnInit, OnDestroy {

  constructor(private trainingService: TrainingService) { }

  excercise: Excercise[];
  excerciseSubscription: Subscription;

  ngOnInit(): void {
    //this.excercise = this.trainingService.getAvailableExcercises();
    //this.excercise = this.fireStore.collection('availableExcercises').valueChanges();
    this.excerciseSubscription =  this.trainingService.excercisesChanges.subscribe(excercises => {
      this.excercise = excercises;
    });
    this.trainingService.fetchAvailableExcercises();

  }

  onStarttraining(form: NgForm){
   this.trainingService.startExcercise(form.value.excerciseSelect);
  }

  ngOnDestroy() {
    this.excerciseSubscription.unsubscribe();
  }

}
