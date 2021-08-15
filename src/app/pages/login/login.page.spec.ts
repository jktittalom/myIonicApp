import { formatCurrency } from '@angular/common';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { IonicModule, ToastController } from '@ionic/angular';
import { Store, StoreModule } from '@ngrx/store';
import { of, throwError } from 'rxjs';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { User } from 'src/app/model/user/User';
import { AuthService } from 'src/app/services/auth/auth.service';
import { AppState } from 'src/store/AppState';
import { loadingReducer } from 'src/store/loading/Loading.reducers';
import { login, recoverPassword, recoverPasswordFail, recoverPasswordSuccess } from 'src/store/login/login.actions';
import { loginReducer } from 'src/store/login/login.reducers';

import { LoginPage } from './login.page';

describe('LoginPage', () => {
  let component: LoginPage;
  let fixture: ComponentFixture<LoginPage>;
  let router: Router;
  let page;
  let store: Store<AppState>;
  let toastController: ToastController;  
  let authService: AuthService;

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
    authService = TestBed.get(AuthService);

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

/*   
// now we doing real action
it('should go to home page on login', () => {
    spyOn(router,'navigate');

    component.login();
    expect(router.navigate).toHaveBeenCalledWith(['home']);
  }) */

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
    //for async request
    spyOn(toastController, 'create').and.returnValue(<any> Promise.resolve({
      present: () => {}
    }))
    //spyOn(toastController,'create');
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
  });

  it('should show loading and start login when logging in', () => {
    //1: start the loading page,
    //2: set valid email,
    //3: set any password,
    //4: click on login button,
    //5: expect loading is showing
    //6: expect logging in

    fixture.detectChanges(); //1
    component.form.get('email').setValue('abc@abc.com'); //2
    component.form.get('password').setValue('123456'); //3
    page.querySelector('#loginButton').click();  //4

    //5
    store.select('loading').subscribe(loadingState => {
      expect(loadingState.show).toBeTruthy();
    })
    //6
    store.select('login').subscribe(loginState => {
      expect(loginState.isLoggingIn).toBeTruthy();
    })
  })

  it('should hide loading and send user to home page when user has been logged in', () => {
    spyOn(router, 'navigate');
    spyOn(authService, 'login').and.returnValue(of(new User()));

    //1: start the loading page,
    //2: set valid email,
    //3: set any password,
    //4: click on login button,
    //5: expect loading hidden
    //6: expect logged in,
    //7: expect home page showing

    fixture.detectChanges();
    component.form.get('email').setValue('abc@abc.com');
    component.form.get('password').setValue('123456');
    page.querySelector('#loginButton').click();
    store.select('loading').subscribe(loadingState => {
      expect(loadingState.show).toBeFalsy();
    })
    store.select('login').subscribe(loginState => {
      expect(loginState.isLoggedIn).toBeTruthy();
    })
    expect(router.navigate).toHaveBeenCalledWith(['home']);
  })

  it('it should hide the loading and show error message when user couldnot login', () => {
    
    spyOn(authService, 'login').and.returnValue(throwError({message: 'error'}));
    spyOn(toastController, 'create').and.returnValue(<any> Promise.resolve({
      present: () => {}
    }))
    //1: start the loading page,
    //2: set valid email,
    //3: set any password,
    //4: click on login button,
    //5: expect loading hidden
    //6: expect error msg show

    fixture.detectChanges();
    component.form.get('email').setValue('error@email.com');
    component.form.get('password').setValue('111');
    page.querySelector('#loginButton').click();
    
    store.select('loading').subscribe(loadingState => {
      expect(loadingState.show).toBeFalsy();
    })

    expect(toastController.create).toHaveBeenCalledTimes(1);
    
  })

});
