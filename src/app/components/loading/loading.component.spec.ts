import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { Store, StoreModule } from '@ngrx/store';
import { AppState } from 'src/store/AppState';
import { hide, show } from 'src/store/loading/Loading.actions';
import { loadingReducer } from 'src/store/loading/Loading.reducers';

import { LoadingComponent } from './loading.component';

describe('LoadingComponent', () => {
  let component: LoadingComponent;
  let fixture: ComponentFixture<LoadingComponent>;
  let store: Store<AppState>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ LoadingComponent ],
      imports: [
        IonicModule.forRoot(),
        StoreModule.forRoot([]),
        StoreModule.forFeature("loading", loadingReducer),

      ]
    }).compileComponents();

    fixture = TestBed.createComponent(LoadingComponent);
    store = TestBed.get(Store);
    component = fixture.componentInstance;
    fixture.detectChanges();

  }));

  it('should hide the component when it is not loading ', () => {
    const compiled = fixture.nativeElement; // this have accees to our html elements 

    store.dispatch(hide());
    fixture.detectChanges();
    expect(compiled.querySelected(".backdrop")).toBeNull();
  });

  it('should show the component when it is loading ', () => {
    const compiled = fixture.nativeElement; // this have accees to our html elements 

    store.dispatch(show());
    fixture.detectChanges();
    expect(compiled.querySelected(".backdrop")).not.toBeNull();
  });

});
