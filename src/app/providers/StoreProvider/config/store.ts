import { configureStore, Reducer, ReducersMapObject } from '@reduxjs/toolkit';
import { CombinedState } from 'redux';
import { userReducer } from '@/entities/User';
import { $api } from '@/shared/api/api';
// import { rtkApi } from '@/shared/api/rtkApi';
import { createReducerManager } from './reducerManager';
import { StateSchema, ThunkExtraArg } from './StateSchema';
import { NavigateOptions, To } from 'react-router-dom';

export function createReduxStore(
    navigate: (to: To, options?: NavigateOptions) => void,
    initialState?: StateSchema,
    asyncReducers?: ReducersMapObject<StateSchema>,
) {
    const rootReducer: ReducersMapObject<StateSchema> = {
        ...asyncReducers,
        users: userReducer,
    //     // [rtkApi.reducerPath]: rtkApi.reducer,
    };

    const reducerManager = createReducerManager(rootReducer);

    const extraArg: ThunkExtraArg = {
        api: $api,
        navigate,
    };
    

    const store = configureStore({
        reducer: reducerManager.reduce as Reducer<CombinedState<StateSchema>>,
        preloadedState: initialState,
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware({
                thunk: {
                    extraArgument: extraArg,
                },
            }),
        //     }).concat(rtkApi.middleware),
});

    // @ts-ignore
    store.reducerManager = reducerManager;
    return store;

}
export type AppDispatch = ReturnType<typeof createReduxStore>['dispatch'];