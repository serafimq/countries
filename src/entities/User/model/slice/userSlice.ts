import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User, UsersSchema } from '../types/user';
import { fetchUsers } from '../services/fetchUsers/fetchUsers';
import { USER_LOCALSTORAGE_KEY } from '@/shared/const/localStorage';

const initialState: UsersSchema = {
    users: [],
    isLoading: false,
    error: undefined,
    authData: undefined,
};

const userSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        setAuthData: (state, action: PayloadAction<User>) => {
            state.authData = action.payload;
        },
        initAuthData: (state) => {
            const user = localStorage.getItem(USER_LOCALSTORAGE_KEY);
            if (user) {
                state.authData = JSON.parse(user);
            }
        },
        logout: (state) => {
            state.authData = undefined;
            localStorage.removeItem(USER_LOCALSTORAGE_KEY);
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchUsers.pending, (state) => {
                state.error = undefined;
                state.isLoading = true;
            })
            .addCase(fetchUsers.fulfilled, (state, action: PayloadAction<User[]>) => {
                state.isLoading = false;
                state.users = action.payload;
            })
            .addCase(fetchUsers.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
            

    }
});

export const { actions: userActions } = userSlice;
export const { reducer: userReducer } = userSlice;