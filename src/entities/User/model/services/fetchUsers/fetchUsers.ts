import {createAsyncThunk } from '@reduxjs/toolkit';
import { User } from '../../types/user';
import {ThunkConfig} from '@/app/providers/StoreProvider';
import axios from 'axios';

export const fetchUsers = createAsyncThunk<
    User[],
    void,
    ThunkConfig<string>
>(
    'users/fetchUsers',
    async (_, thunkApi) => {
        const { rejectWithValue } = thunkApi;
        try {
            const response = await axios.get<User[]>('http://localhost:8000/users');

            if (!response.data) {
                throw new Error();
            }
            return response.data;
        } catch (error) {
            return rejectWithValue('error');
        }
    }
)