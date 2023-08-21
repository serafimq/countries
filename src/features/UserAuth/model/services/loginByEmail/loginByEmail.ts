import { createAsyncThunk } from '@reduxjs/toolkit';
import {ThunkConfig} from '@/app/providers/StoreProvider';
import axios from 'axios';
import { User, userActions } from '@/entities/User';
import { USER_LOCALSTORAGE_KEY } from '@/shared/const/localStorage';

interface LoginByEmailProps {
    email: string;
    password: string;
}

// первым аргументом в дженерике идет то что мы получим, вторым пропсы
export const loginByEmail = createAsyncThunk
<
    User,
    LoginByEmailProps,
    ThunkConfig<string>
>(
    'login/loginByEmail',
    async (authData, thunkApi) => {
        const { rejectWithValue, dispatch } = thunkApi;
        try {
            // в post джнериком передаем то что вернет нам сервер 
            const response = await axios.post<User>('http://localhost:8000/login', authData);

            if (!response.data) {
                throw new Error();
            }

            localStorage.setItem(USER_LOCALSTORAGE_KEY, JSON.stringify(response.data));
            dispatch(userActions.setAuthData(response.data));
            
            return response.data;
        } catch (error) {
            return rejectWithValue('error');
        }
    }
)