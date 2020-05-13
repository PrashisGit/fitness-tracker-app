import { Component, OnInit, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { Excercise } from '../excercise.model';
import { MatTableDataSource } from '@angular/material/table';
import { TrainingService } from '../training.service';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-past-training',
  templateUrl: './past-training.component.html',
  styleUrls: ['./past-training.component.css']
})
export class PastTrainingComponent implements OnInit, AfterViewInit, OnDestroy {
  displayedColumns: string[] = ['date', 'name', 'duration', 'calories', 'state'];
  dataSource = new MatTableDataSource<Excercise>();
  finishedExcercisesSub: Subscription;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  // dataSource: Excercise[] = [
  //   {id: 'crunches', name: 'Crunches', duration: 30, calories: 8, date: new Date(), state: 'completed' },
  //   {id: 'touch-toes', name: 'Touch Toes', duration: 180, calories: 10, date: new Date(), state: 'cancelled'},
  //   {id: 'side-lunges', name: 'Side Lunges', duration: 120, calories: 15, date: new Date(), state: 'cancelled'},
  //   {id: 'burpees', name: 'Burpees', duration: 60, calories: 30, date: new Date(), state: 'completed'}
  // ];

  constructor(private trainingService: TrainingService) { }


  ngOnInit(): void {
    //this.dataSource.data = this.trainingService.getCompletedOrCancelledExcercises();
    this.finishedExcercisesSub = this.trainingService.finishedExcercisesChanges.subscribe((excercises: Excercise[]) => {
      this.dataSource.data = excercises;
    });
    this.trainingService.fetchCompletedOrCancelledExcercises();
  }

  // apply sort after view is render
  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  applyFilter(filter: string) {
  this.dataSource.filter = filter.trim().toLowerCase();

  }

  ngOnDestroy() {
    this.finishedExcercisesSub.unsubscribe();
  }

}
