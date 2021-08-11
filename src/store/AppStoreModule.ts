
import { StoreModule } from "@ngrx/store";
import { loadingReducer } from "./loading/Loading.reducers";

export const AppStoreModule = [
   StoreModule.forRoot([]),
   StoreModule.forFeature('loading', loadingReducer)

]