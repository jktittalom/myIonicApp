import { createAction } from "@ngrx/store";
import { hide, show } from "./Loading.actions";
import { loadingReducer } from "./Loading.reducers";
import { LoadingState } from "./LoadingState";

describe('Loading store', () => {
    
    it('show', () => {
        const initalState: LoadingState = {show: false};
        const newState = loadingReducer(initalState, show());

        expect(newState).toEqual({show: true});
    })

    it('hide', () => {
        const initalState: LoadingState = {show: true};
        const newState = loadingReducer(initalState, hide());

        expect(newState).toEqual({show: false});
    })
    it('should keep action if action is unknown', () => {
        const initalState: LoadingState = {show: true};
        const action = createAction("UNKNOWN");
        const newState = loadingReducer(initalState, action);

        expect(newState).toEqual({show: true});
    })
})