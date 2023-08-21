import { useDispatch, useSelector, useStore } from 'react-redux';
import { memo, useCallback, useEffect } from 'react';
import { getLoginEmail, getLoginPassword, getLoginError, getLoginIsLoading } from '../../model/selectors/getLoginState/getLoginState';
import { loginByEmail } from '../../model/services/loginByEmail/loginByEmail';
import { loginActions, loginReducer } from '../../model/slice/loginSlice';
import cls from './LoginForm.module.scss';
import { ReduxStoreWithManager } from '@/app/providers/StoreProvider';
import { DynamicModuleLoader, ReducersList } from '@/shared/lib/components/DynaminModuleLoader/DynaminModuleLoader';
// import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';

export interface LoginFormProps {
    className?: string;
    onSuccess?: () => void;
}

const initialReducers: ReducersList = {
    loginForm: loginReducer
}

const LoginForm = memo(({ className, onSuccess }: LoginFormProps) => {
    // const dispatch = useAppDispatch();
    const dispatch = useDispatch<any>();
    const email = useSelector(getLoginEmail);
    const password = useSelector(getLoginPassword);
    const error = useSelector(getLoginError);
    const isLoading = useSelector(getLoginIsLoading);

    const onChangeEmail = useCallback(
        (value: string) => {
            dispatch(loginActions.setEmail(value));
        },
        [dispatch],
    );

    const onChangePassword = useCallback(
        (value: string) => {
            dispatch(loginActions.setPassword(value));
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
            <button>Try it free 7 days then $20/mo. thereafter</button>
            <form>
                <input type="text" placeholder="First name"/>
                <input type="text" placeholder="Last Name"/>
                <input type="text" placeholder="Email Address"/>
                <input type="text" placeholder="Password"/>
                <button>Claim your free trial</button>
            </form>
            <p> 
                By clicking the button, you are agreeing to our <a href="#">Terms and Services</a>
            </p>
        </DynamicModuleLoader>
        // <DynamicModuleLoader reducers={initialReducers}>
        //     <div className={classNames(cls.LoginForm, {}, [className])}>
        //         <Text title={t('Форма авторизации')} />
        //         {error && (
        //             <Text
        //                 text={t('Вы ввели не верный логин или пароль')}
        //                 theme={TextTheme.ERROR}
        //             />
        //         )}
        //         <Input
        //             autofocus
        //             type="text"
        //             className={cls.input}
        //             placeholder={t('Введите логин')}
        //             onChange={onChangeUsername}
        //             value={username}
        //         />
        //         <Input
        //             type="text"
        //             className={cls.input}
        //             placeholder={t('Введите пароль')}
        //             onChange={onChangePassword}
        //             value={password}
        //         />
        //         <Button
        //             theme={ButtonTheme.OUTLINE}
        //             className={cls.loginBtn}
        //             onClick={onLoginClick}
        //             disabled={isLoading}
        //         >
        //             {t('Войти')}
        //         </Button>
        //     </div>
        // </DynamicModuleLoader>
    );
});

export default LoginForm;