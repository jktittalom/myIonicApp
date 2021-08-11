import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from 'src/store/AppState';
import { LoadingState } from 'src/store/loading/LoadingState';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss'],
})
export class LoadingComponent implements OnInit {

  loadingState$: Observable<LoadingState> // observable will keep on eye to state change (to reducer) for keep changes on state
  
  //constructor(private store: Store<{loading: LoadingState}>) { }// for specific property access
  
  constructor(private store: Store<AppState>) { }
  
  ngOnInit() {
    this.loadingState$ = this.store.select('loading');
  }

}
