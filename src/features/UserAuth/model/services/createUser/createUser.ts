import { createAsyncThunk } from '@reduxjs/toolkit';
import {ThunkConfig} from '@/app/providers/StoreProvider';
import { User, userActions } from '@/entities/User';
import { USER_LOCALSTORAGE_KEY } from '@/shared/const/localStorage';
import { RegistrationUserProps } from '../../types/registrationSchema';

// первым аргументом в дженерике идет то что мы получим, вторым пропсы
export const createUser = createAsyncThunk
<
    User,
    RegistrationUserProps,
    ThunkConfig<string>
>(
    'registration/createUser',
    async (newUser, thunkApi) => {
        const { dispatch, extra, rejectWithValue } = thunkApi;
        console.log('registration/createUser', newUser);
        
        
        try {
            const response = await extra.api.post<User>('/users', newUser);

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