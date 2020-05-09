import { Excercise } from './excercise.model';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()
export class TrainingService {

  excerciseChange = new Subject<Excercise>();
  private availableExcercises: Excercise[] = [
    {id: 'crunches', name: 'Crunches', duration: 30, calories: 8},
    {id: 'touch-toes', name: 'Touch Toes', duration: 180, calories: 10},
    {id: 'side-lunges', name: 'Side Lunges', duration: 120, calories: 15},
    {id: 'burpees', name: 'Burpees', duration: 60, calories: 30}
  ];

  private runningExcercise: Excercise;
  private excercices: Excercise[] = [];

  getAvailableExcercises() {
    return this.availableExcercises.slice();
  }

  startExcercise(selectedId: string) {
    this.runningExcercise = this.availableExcercises.find(ex =>
      ex.id === selectedId
    );
    this.excerciseChange.next({...this.runningExcercise});
  }
  completeExcercise() {
    this.excercices.push({
      ...this.runningExcercise,
      date: new Date(),
      state: 'completed'
    });
    this.runningExcercise = null;
    this.excerciseChange.next(null);
  }
  cancelExcercise(progress: number) {
    this.excercices.push({
      ...this.runningExcercise,
      duration: this.runningExcercise.duration * (progress / 100),
      calories: this.runningExcercise.duration * (progress / 100),
      date: new Date(),
      state: 'cancelled'
    });
    this.runningExcercise = null;
    this.excerciseChange.next(null);
  }

  getRunningExcercise() {
    return { ...this.runningExcercise };
  }
}
