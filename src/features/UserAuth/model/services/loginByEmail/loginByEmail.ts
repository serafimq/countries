import { createAsyncThunk } from '@reduxjs/toolkit';
import {ThunkConfig} from '@/app/providers/StoreProvider';
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
        const { extra, rejectWithValue, dispatch } = thunkApi;
        try {
            // в post джнериком передаем то что вернет нам сервер 
            const response = await extra.api.post<User>('/login', authData);

            if (!response.data) {
                throw new Error();
            }

            localStorage.setItem(USER_LOCALSTORAGE_KEY, JSON.stringify(response.data));
            dispatch(userActions.setAuthData(response.data));

            extra.navigate('/');
            
            return response.data;
        } catch (error) {
            return rejectWithValue('error');
        }
    }
)