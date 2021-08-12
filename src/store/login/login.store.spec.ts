import { AppInitialState } from "../AppInitialState";
import { recoverPassword, recoverPasswordFail, recoverPasswordSuccess } from "./login.actions";
import { loginReducer } from "./login.reducers";
import { LoginState } from "./LoginState";

describe('Login Store', () => {
    
    it('recoverPassword', () => {
        //expect(true).toBeFalsy();
        const initialState: LoginState = AppInitialState.login;

        const newState = loginReducer(initialState, recoverPassword());
        expect(newState).toEqual({
            ...initialState,
            error: null,
            isRecoveringPassword: true,
            isRecoveredPassword: false,
        });
    })

    it('recoverPasswordSuccess', () => {
        //expect(true).toBeFalsy();
        const initialState: LoginState = AppInitialState.login;

        const newState = loginReducer(initialState, recoverPasswordSuccess());
        expect(newState).toEqual({
            ...initialState,
            error: null,
            isRecoveringPassword: false,
            isRecoveredPassword: true,
        });
    })

    it('recoverPasswordFail', () => {
        //expect(true).toBeFalsy();
        const initialState: LoginState = AppInitialState.login;
        const error = {error: 'error--'};
        const newState = loginReducer(initialState, recoverPasswordFail({error}));
        expect(newState).toEqual({
            ...initialState,
            error,
            isRecoveringPassword: false,
            isRecoveredPassword: false,
        });
    })
})