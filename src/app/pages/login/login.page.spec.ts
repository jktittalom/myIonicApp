import { formatCurrency } from '@angular/common';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { IonicModule, ToastController } from '@ionic/angular';
import { Store, StoreModule } from '@ngrx/store';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { AppState } from 'src/store/AppState';
import { loadingReducer } from 'src/store/loading/Loading.reducers';
import { recoverPassword, recoverPasswordFail, recoverPasswordSuccess } from 'src/store/login/login.actions';
import { loginReducer } from 'src/store/login/login.reducers';

import { LoginPage } from './login.page';

describe('LoginPage', () => {
  let component: LoginPage;
  let fixture: ComponentFixture<LoginPage>;
  let router: Router;
  let page;
  let store: Store<AppState>;
  let toastController: ToastController;  

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginPage ],
      imports: [
        IonicModule.forRoot(),
        AppRoutingModule,
        ReactiveFormsModule,
        StoreModule.forRoot([]),
        StoreModule.forFeature('loading', loadingReducer),
        StoreModule.forFeature('login', loginReducer)
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(LoginPage);
    router = TestBed.get(Router);
    store = TestBed.get(Store);
    toastController = TestBed.get(ToastController);

    //fixture.detectChanges();
    component = fixture.componentInstance;
    page = fixture.debugElement.nativeElement; // to get page native html tag
    
  }));

  it('should create form on init', () => {
    component.ngOnInit();
    expect(component.form).not.toBeUndefined();
  })

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should go to home page on login', () => {
    spyOn(router,'navigate');

    component.login();
    expect(router.navigate).toHaveBeenCalledWith(['home']);
  })

  it('should go to register page on register', () => {
    spyOn(router, 'navigate');
    component.register();
    expect(router.navigate).toHaveBeenCalledWith(['register']);
  })

  it('should recover email/password on forget email/password', () => {
    //1: Login page start
    //2: user input valid email
    //3: user clicked on forget email/password
    //4: expect loginState.isRecoveringPassword = true
    // We to follow above things:
    fixture.detectChanges(); //1
    component.form.get('email').setValue('abc@abc.com'); //2
    page.querySelector("#recoverPasswordButton").click(); //3
    store.select('login').subscribe(loginState => {
      expect(loginState.isRecoveringPassword).toBeTruthy();
    })

    //expect(true).toBeFalsy();
  })

  it('should show loading when recovering password', () => {
    //1: Start page
    //2: change isRecoveringPassword to true
    //3: varify loadingState.show == true

    fixture.detectChanges(); // 1
    store.dispatch(recoverPassword());
    store.select('loading').subscribe(loadingState => {
      expect(loadingState.show).toBeTruthy();
    })
  })

  it('should hide the loading and show success message when has recovered password', () => {
    spyOn(toastController, 'create');
    // 1: Start the page
    // 2: set the login state as recovering password
    // 3: set login state as recovered password
    // 4: verify loadingState.show == false
    // 5: verify msg shown
    
    fixture.detectChanges();  // 1
    store.dispatch(recoverPassword()); // 2
    store.dispatch(recoverPasswordSuccess()); // 3
    store.select('loading').subscribe(loadingState => {
      expect(loadingState.show).toBeFalsy();
    })
    expect(toastController.create).toHaveBeenCalledTimes(1);
    //expect(true).toBeFalsy();
  });

  it('should hide loading and show error message when error on recovered password', () => {
    spyOn(toastController,'create');
    //1: Start page
    //2: recover password
    //3: recover password fail
    //4: expect loading not show
    //5: expect error show 

    fixture.detectChanges();
    store.dispatch(recoverPassword());
    store.dispatch(recoverPasswordFail({error: "message--"}));

    store.select('loading').subscribe(loadinState => {
      expect(loadinState.show).toBeFalsy();
    })
    expect(toastController.create).toHaveBeenCalledTimes(1);

    //expect(false).toBeTruthy();
  })



});
