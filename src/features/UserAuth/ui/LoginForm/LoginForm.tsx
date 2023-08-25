import { useSelector } from 'react-redux';
import { memo, useCallback } from 'react';
import {
    getLoginEmail,
    getLoginPassword,
    getLoginError,
    getLoginIsLoading
} from '../../model/selectors/getLoginState/getLoginState';
import { loginByEmail } from '../../model/services/loginByEmail/loginByEmail';
import { loginActions, loginReducer } from '../../model/slice/loginSlice';
import cls from './LoginForm.module.scss';
import clsAuth from '../styles/Auth.module.scss';
import { DynamicModuleLoader, ReducersList } from '@/shared/lib/components/DynaminModuleLoader/DynaminModuleLoader';
import { AButton, ButtonTheme } from '@/shared/ui/AuthUI/AButton';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { AInput } from '@/shared/ui/AuthUI/AInput';

export interface LoginFormProps {
    className?: string;
    onSuccess?: () => void;
}

const initialReducers: ReducersList = {
    loginForm: loginReducer
}

const LoginForm = memo(({ className, onSuccess }: LoginFormProps) => {
    const dispatch = useAppDispatch();
    const email = useSelector(getLoginEmail);
    const password = useSelector(getLoginPassword);
    const error = useSelector(getLoginError);
    const isLoading = useSelector(getLoginIsLoading);

    const onChangeEmail = useCallback((e: string) => {
            dispatch(loginActions.setEmail(e));
        },
        [dispatch],
    );

    const onChangePassword = useCallback((e: string) => {
            dispatch(loginActions.setPassword(e));
        },
        [dispatch],
    );

    const onLoginClick = useCallback(async () => {
        const result = await dispatch(loginByEmail({ email, password }));
        if (result.meta.requestStatus === 'fulfilled') {
            // onSuccess();
        }
    }, [onSuccess, dispatch, password, email]);

    return (
        <DynamicModuleLoader reducers={initialReducers}>
            <div className={clsAuth.form__wrapper}>
                <div className={clsAuth.form}>
                    <AInput
                        placeholder='Email Address'
                        value={email}
                        onChange={onChangeEmail}
                    />
                    <AInput
                        type='text'
                        placeholder='Password'
                        value={password}
                        onChange={onChangePassword}
                    />
                    <AButton onClick={onLoginClick} isUppercase>Login</AButton>
                </div>
            </div>
        </DynamicModuleLoader>
    );
});

export default LoginForm;