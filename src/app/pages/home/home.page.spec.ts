import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { AppRoutingModule } from 'src/app/app-routing.module';

import { HomePage } from './home.page';

describe('HomePage', () => {
  let component: HomePage;
  let fixture: ComponentFixture<HomePage>;
  let router: Router;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ HomePage ],
      imports: [
        IonicModule.forRoot(),
        AppRoutingModule
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(HomePage);
    router = TestBed.get(Router);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('it should go to pickup-calls on see all', () => {
    spyOn(router,'navigate');
    component.allPickupCalls();
    expect(router.navigate).toHaveBeenCalledWith(['pickup-calls']);
  });

  it('it should go to new pickup on create pickup call', () => {
    spyOn(router,'navigate');
    component.newPickupCall();
    expect(router.navigate).toHaveBeenCalledWith(['pickup-call']);
  })
});
