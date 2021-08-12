import { createAction, props } from "@ngrx/store";

export const recoverPassword = createAction("[Recover Password]");
export const recoverPasswordSuccess = createAction("[Recover Password] success");
export const recoverPasswordFail = createAction("[Recover Password] fail", props<{error: any}>());