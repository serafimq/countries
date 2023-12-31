import {createSlice, PayloadAction } from '@reduxjs/toolkit';
// import {ThunkConfig} from '@/app/providers/StoreProvider'
import { LoginSchema } from '../types/loginSchema';
import { loginByEmail } from '../services/loginByEmail/loginByEmail';
import { User } from '@/entities/User';

const initialState: LoginSchema = {
    email: '',
    password: '',
    isLoading: false,
    error: undefined,
};

const loginSlice = createSlice({
    name: 'login',
    initialState,
    reducers: {
        setEmail(state, action: PayloadAction<string>) {
            state.email = action.payload;
        },
        setPassword(state, action: PayloadAction<string>) {
            state.password = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginByEmail.pending, (state) => {
                state.error = undefined;
                state.isLoading = true;
            })
            .addCase(loginByEmail.fulfilled, (state, action: PayloadAction<User>) => {
                state.isLoading = false;
                // state. = action.payload;
            })
            .addCase(loginByEmail.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
            

    }
});

export const { actions: loginActions } = loginSlice;
export const { reducer: loginReducer } = loginSlice;