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
import clsAuth from '../styles/Auth.module.scss';
import { DynamicModuleLoader, ReducersList } from '@/shared/lib/components/DynaminModuleLoader/DynaminModuleLoader';
import { AButton } from '@/shared/ui/AButton';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { AInput } from '@/shared/ui/AInput';

export interface LoginFormProps {
    className?: string;
}

const initialReducers: ReducersList = {
    loginForm: loginReducer
}

const LoginForm = memo(({ className }: LoginFormProps) => {
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
        await dispatch(loginByEmail({ email, password }));
    }, [dispatch, password, email]);

    return (
        <DynamicModuleLoader reducers={initialReducers}>
            {isLoading && ( <div>Loading</div> )}
            {!isLoading && (<div className={clsAuth.form__wrapper}>
                <div className={clsAuth.form}>
                    {error && ( <div>Error</div> )}
                    <AInput
                        placeholder='Email Address'
                        value={email}
                        name='email'
                        onChange={onChangeEmail}
                    />
                    <AInput
                        type='text'
                        placeholder='Password'
                        value={password}
                        name='password'
                        onChange={onChangePassword}
                    />
                    <AButton onClick={onLoginClick} isUppercase>Login</AButton>
                </div>
            </div>)}
        </DynamicModuleLoader>
    );
});

export default LoginForm;