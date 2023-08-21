import thunkMiddleware from 'redux-thunk';
import { configureStore, Reducer, ReducersMapObject } from '@reduxjs/toolkit';
import { CombinedState } from 'redux';
import { userReducer } from '@/entities/User';
// import { $api } from '@/shared/api/api';
// import { rtkApi } from '@/shared/api/rtkApi';
import { createReducerManager } from './reducerManager';
import { StateSchema } from './StateSchema';

export function createReduxStore(
    initialState?: StateSchema,
    asyncReducers?: ReducersMapObject<StateSchema>,
) {
    const rootReducer: ReducersMapObject<StateSchema> = {
        ...asyncReducers,
        users: userReducer,
    //     // [rtkApi.reducerPath]: rtkApi.reducer,
    };

    const reducerManager = createReducerManager(rootReducer);

    // const extraArg: ThunkExtraArg = {
    //     api: $api,
    // };
    

    const store = configureStore({
        // reducer: rootReducer,
        // devTools: true,
        reducer: reducerManager.reduce as Reducer<CombinedState<StateSchema>>,
        preloadedState: initialState,
        middleware: [thunkMiddleware],
        // middleware: (getDefaultMiddleware) =>
        //     getDefaultMiddleware({
        //         thunk: {
        //             extraArgument: extraArg,
        //         },
        //     }).concat(rtkApi.middleware),
});

    // @ts-ignore
    store.reducerManager = reducerManager;
    return store;

}
export type AppDispatch = ReturnType<typeof createReduxStore>['dispatch'];