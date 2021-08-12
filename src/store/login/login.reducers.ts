import { createReducer, on } from "@ngrx/store";
import { InitialState } from "@ngrx/store/src/models";
import { AppInitialState } from "../AppInitialState";
import { recoverPassword, recoverPasswordFail, recoverPasswordSuccess } from "./login.actions";
import { LoginState } from "./LoginState";

const initialState: LoginState = AppInitialState.login;

const reducer = createReducer(initialState,
    on(recoverPassword, currentState => {
        return {
            ...currentState,
            error: null,
            isRecoveredPassword: false,
            isRecoveringPassword: true,
        };
    }),
    on(recoverPasswordSuccess, currentState => {
        return {
            ...currentState,
            error: null,
            isRecoveringPassword: false,
            isRecoveredPassword: true
        };
    }),
    on(recoverPasswordFail, (currentState, action) => {
        return {
            ...currentState,
            error: action.error,
            isRecoveredPassword: false,
            isRecoveringPassword: false
        };
    })
)

export function loginReducer (state: LoginState, action){
    return reducer(state, action)
}