import { Excercise } from './excercise.model';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class TrainingService {

  excerciseChange = new Subject<Excercise>();
  excercisesChanges = new Subject<Excercise[]>();
  finishedExcercisesChanges = new Subject<Excercise[]>();
  private availableExcercises: Excercise[] = [];

  private runningExcercise: Excercise;


  constructor(private fireStore: AngularFirestore) {}

  fetchAvailableExcercises() {
    this.fireStore.collection('availableExcercises')
      .snapshotChanges()
      .pipe(
        map(docArray => {
          return docArray.map(doc => {
            return {
              id: doc.payload.doc.id,
              name: doc.payload.doc.data().name,
              duration: doc.payload.doc.data().duration,
              calories: doc.payload.doc.data().calories
            };
          });
        })
      )
      .subscribe((excercises: Excercise[]) => {
        this.availableExcercises = excercises;
        this.excercisesChanges.next([...this.availableExcercises]);
      });
  }

  startExcercise(selectedId: string) {
    this.runningExcercise = this.availableExcercises.find(ex =>
      ex.id === selectedId
    );
    this.excerciseChange.next({...this.runningExcercise});
  }
  completeExcercise() {
    this.addDataToDatabase({
      ...this.runningExcercise,
      date: new Date(),
      state: 'completed'
    });
    this.runningExcercise = null;
    this.excerciseChange.next(null);
  }
  cancelExcercise(progress: number) {
    this.addDataToDatabase({
      ...this.runningExcercise,
      duration: this.runningExcercise.duration * (progress / 100),
      calories: this.runningExcercise.calories * (progress / 100),
      date: new Date(),
      state: 'cancelled'
    });
    this.runningExcercise = null;
    this.excerciseChange.next(null);
  }

  getRunningExcercise() {
    return { ...this.runningExcercise };
  }

  fetchCompletedOrCancelledExcercises() {
    this.fireStore.collection('finishedExcercises').valueChanges()
    .subscribe((excercises: Excercise[]) => {
      this.finishedExcercisesChanges.next(excercises);
    });
  }

  private addDataToDatabase(excercise: Excercise) {
    this.fireStore.collection('finishedExcercises').add(excercise);
  }
}
