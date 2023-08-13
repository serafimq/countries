import {createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import {User, UsersSchema, FetchUser} from '../types/user';
import {ThunkConfig} from '@/app/providers/StoreProvider'

const initialState: UsersSchema = {
    users: [],
    isLoading: false,
    error: undefined,
    data: undefined,
};

export const fetchUsers = createAsyncThunk<
    FetchUser[],
    void,
    ThunkConfig<string>
>(
    'users/fetchUsers',
    async (_, thunkApi) => {
        const { rejectWithValue } = thunkApi;
        try {
            const response = await fetch('https://jsonplaceholder.typicode.com/users');

            if (!response.ok) {
                throw new Error('Server Error');
            }

            const data = await response.json();
            return data;
        } catch (error) {
            return rejectWithValue('error');
        }
    }
)

const userSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        addUser(state, action: PayloadAction<User>) {
            state.users.push({
                id: action.payload.id,
                username: action.payload.username,
                age: action.payload.age 
            })
        },
        removeUser(state, action: PayloadAction<{id: string}>) {
            const index = state.users.findIndex(user => user.id === action.payload.id);
            if (index !== -1) {
                state.users.splice(index, 1);
              }
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchUsers.pending, (state) => {
                state.error = undefined;
                state.isLoading = true;
            })
            .addCase(fetchUsers.fulfilled, (state, action: PayloadAction<FetchUser[]>) => {
                state.isLoading = false;
                state.data = action.payload;
            })
            .addCase(fetchUsers.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
            

    }
});

export const { actions: userActions } = userSlice;
export const { reducer: userReducer } = userSlice;