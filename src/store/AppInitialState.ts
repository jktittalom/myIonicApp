import { AppState } from "./AppState";

export const AppInitialState: AppState = {
    loading: {
        show: false
    },
    login: {
        error: null,
        isRecoveringPassword: false,
        isRecoveredPassword: false,
        isLoggedIn: false,
        isLoggingIn: false,
    }

}