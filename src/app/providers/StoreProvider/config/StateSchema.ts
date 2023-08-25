import {
    AnyAction,
    EnhancedStore,
    Reducer,
    ReducersMapObject,
} from '@reduxjs/toolkit';
import { CombinedState } from 'redux';
import { AxiosInstance } from 'axios';
import { UsersSchema } from '@/entities/User';
import { LoginSchema } from '@/features/UserAuth';
import { NavigateOptions, To } from 'react-router-dom';
// import { rtkApi } from '@/shared/api/rtkApi';

export interface StateSchema {
    users: UsersSchema;
    loginForm?: LoginSchema;
    // [rtkApi.reducerPath]: ReturnType<typeof rtkApi.reducer>;

    // async reducers
}

export type StateSchemaKey = keyof StateSchema;
// export type MountedReducer = OptionalRecord<StateSchemaKey, boolean>;
export interface ReducerManager {
    getReducerMap: () => ReducersMapObject<StateSchema>;
    reduce: (
        state: StateSchema,
        action: AnyAction,
    ) => CombinedState<StateSchema>;
    add: (key: StateSchemaKey, reducer: Reducer) => void;
    remove: (key: StateSchemaKey) => void;
    // getMountedReducer: () => MountedReducer;
    getMountedReducer: () => any;
}

export interface ReduxStoreWithManager extends EnhancedStore<StateSchema> {
    reducerManager: ReducerManager;
}

export interface ThunkExtraArg {
    api: AxiosInstance;
    navigate: (to: To, options?: NavigateOptions) => void;
}

export interface ThunkConfig<T> {
    rejectValue: T;
    extra: ThunkExtraArg;
    state: StateSchema;
}