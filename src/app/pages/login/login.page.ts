import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth/auth.service';
import { AppState } from 'src/store/AppState';
import { hide, show } from 'src/store/loading/Loading.actions';
import { login, loginFail, loginSuccess, recoverPassword, recoverPasswordFail, recoverPasswordSuccess } from 'src/store/login/login.actions';
import { LoginState } from 'src/store/login/LoginState';
import { LoginPageForm } from './login.page.form';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit, OnDestroy {
  
  form: FormGroup;
  loginStateSubscription: Subscription;

  constructor(private router: Router, private formBuilder: FormBuilder, private store: Store<AppState>, private toastController: ToastController, private authService: AuthService) { }

  ngOnInit() {
    this.form = new LoginPageForm(this.formBuilder).createForm();

    this.loginStateSubscription = this.store.select('login').subscribe(loginState => {
      this.onIsRecoveredPassword(loginState);
      this.onIsRecoveringPassword(loginState);
     // this.onIsRecoverdPasswordFail(loginState);

      this.onIsLoggingIn(loginState);
      this.onIsLoggedIn(loginState);

      this.onError(loginState);
      this.toggelLoading(loginState);
    })
  };

  ngOnDestroy() {
    if(this.loginStateSubscription){
      this.loginStateSubscription.unsubscribe();
    }
  }

  private toggelLoading(loginState: LoginState){
    if(loginState.isLoggingIn || loginState.isRecoveringPassword){
      this.store.dispatch(show());
    } else {
      this.store.dispatch(hide());
    }
  }

  private onIsRecoveringPassword(loginState: LoginState){
    if(loginState.isRecoveringPassword){
      this.authService.recoverEmailPassword(this.form.get('email').value).subscribe(() => {
        this.store.dispatch(recoverPasswordSuccess());
      },error => {
        this.store.dispatch(recoverPasswordFail({error}))
      });

    }
   
  }

  private async onIsRecoveredPassword(loginState: LoginState){
    if(loginState.isRecoveredPassword){
      const toast = await this.toastController.create({
        position: 'bottom',
        message: "Recovery email sent",
        color: "primary"
      });
      toast.present();
    }
  }

/*   private async onIsRecoverdPasswordFail(loginState: LoginState){

    if(loginState.error){
      const toast = await this.toastController.create({
        position: "bottom",
        message: loginState.error.message,
        color: "danger"
      });
      toast.present();
    }

  } */
  private onIsLoggingIn(loginState: LoginState){
    if(loginState.isLoggingIn){
      //this.store.dispatch(show());
      const email = this.form.get('email').value;
      const password = this.form.get('password').value;

      this.authService.login(email, password).subscribe(user => {
        this.store.dispatch(loginSuccess({user}));
      }, error => {
        this.store.dispatch(loginFail({error}));
      })
    }
  }



  private async onError(loginState: LoginState){

    if(loginState.error){
      const toast = await this.toastController.create({
        position: "bottom",
        message: loginState.error.message,
        color: "danger"
      });
      toast.present();
    }

  }

  private onIsLoggedIn(loginState: LoginState){
    if(loginState.isLoggedIn){
      this.router.navigate(['home']);
    }
  }


  forgetEmailPassword(){
    this.store.dispatch(recoverPassword()); 
  }

/*   forgetEmailPassword(){
    this.store.dispatch(show());
    
    setTimeout(() => {
      this.store.dispatch(hide())
    }, 3000);
  } */

  login(){
    //this.router.navigate(['home']);

    this.store.dispatch(login());

/*     this.loginStateSubscription = this.store.select('login').subscribe(loginState => {
      //this.onIsRecoveredPassword(loginState);
      //this.onIsRecoveringPassword(loginState);
      //this.onIsRecoverdPasswordFail(loginState);
      
    }) */

  }


  register(){
    this.router.navigate(['register']);
  }

}
