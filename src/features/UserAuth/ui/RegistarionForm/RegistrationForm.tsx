// import { useSelector } from 'react-redux';
import { memo, useCallback } from 'react';
// import {
//     getLoginEmail,
//     getLoginPassword,
//     getLoginError,
//     getLoginIsLoading
// } from '../../model/selectors/getLoginState/getLoginState';
import cls from '../RegistarionForm/RegistrationForm.module.scss';
import clsAuth from '../styles/Auth.module.scss';
import { DynamicModuleLoader, ReducersList } from '@/shared/lib/components/DynaminModuleLoader/DynaminModuleLoader';
// import { userActions } from '@/entities/User';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { AButton, ButtonTheme } from '@/shared/ui/AuthUI/AButton';
import { AInput } from '@/shared/ui/AuthUI/AInput';

export interface RegistrationForm {
    className?: string;
    onSuccess?: () => void;
}

const initialReducers: ReducersList = {}

const RegistrationForm = memo(({}: RegistrationForm) => {
    const dispatch = useAppDispatch();
    // const email = useSelector(getLoginEmail);
    // const password = useSelector(getLoginPassword);
    // const error = useSelector(getLoginError);
    // const isLoading = useSelector(getLoginIsLoading);

    // const onChangeEmail = useCallback(
    //     (e: React.ChangeEvent<HTMLInputElement>) => {
    //         dispatch(loginActions.setEmail(e.target.value));
    //     },
    //     [dispatch],
    // );

    // const onChangePassword = useCallback(
    //     (e: React.ChangeEvent<HTMLInputElement>) => {
    //         dispatch(loginActions.setPassword(e.target.value));
    //     },
    //     [dispatch],
    // );

    // const onLoginClick = useCallback(async () => {
    //     const result = await dispatch(loginByEmail({ email, password }));
    //     if (result.meta.requestStatus === 'fulfilled') {
    //         // onSuccess();
    //     }
    // }, [onSuccess, dispatch, password, email]);

    // const onLogoutClick = useCallback(() => {
    //     dispatch(userActions.logout());
    // }, [dispatch]);

    return (
        <DynamicModuleLoader reducers={initialReducers}>
            <div className={clsAuth.form__wrapper}>
                <AButton
                    className={cls.form__actionButton}
                    theme={ButtonTheme.ACCENT}
                >
                    Try it free 7 days <span>then $20/mo. thereafter</span>
                </AButton>
                <div className={clsAuth.form}>
                    <AInput placeholder="First Name" />
                    <AInput placeholder="Last Name" />
                    <AInput placeholder="Email Address" />
                    <AInput placeholder="Password" />
                    <AButton isUppercase>Claim your free trial</AButton>
                    <p className={cls.form__terms}> 
                        By clicking the button, you are agreeing to our <span>Terms and Services</span>
                    </p>
                </div>
            </div>
        </DynamicModuleLoader>
    );
});

export default RegistrationForm;