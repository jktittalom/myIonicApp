import { FormBuilder, FormGroup } from "@angular/forms";
import { LoginPageForm } from "./login.page.form";

describe('LoginPageForm', () => {
    
    let loginPageForm: LoginPageForm;
    let form: FormGroup;

    beforeEach(() => {
        loginPageForm = new LoginPageForm(new FormBuilder());
        form = loginPageForm.createForm();
    })

    it('should create login form empty', () => {

        
        expect(form).not.toBeNull();
        expect(form.get('email')).not.toBeNull();
        expect(form.get('email').value).toEqual('');
        expect(form.get('email').valid).toBeFalsy(); // required validation
        expect(form.get('password')).not.toBeNull();
        expect(form.get('password').value).toEqual('');
        expect(form.get('password').valid).toBeFalsy(); // required validation
    })

    it('should have email invalid if email is not valid', () => {
        form.get('email').setValue('Invalid email');
        expect(form.get('email').valid).toBeFalsy();
    })

    it('should have email valid if email is valid', () => {
        form.get('email').setValue('abc@abc.com');
        expect(form.get('email').valid).toBeTruthy();
    })

    // to add form valid test

    it('should have valid form', () => {
        form.get('email').setValue('abc@abc.com');
        form.get('password').setValue('1111');
        expect(form.valid).toBeTruthy();
    })


})