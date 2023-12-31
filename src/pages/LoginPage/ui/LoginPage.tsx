import { memo } from 'react';
import '../../styles/AuthPages/base.scss';
import clsAuth from '../../styles/AuthPages/AuthPages.module.scss';
import cls from './LoginPage.module.scss';
import LoginForm from '@/features/UserAuth/ui/LoginForm/LoginForm';

const LoginPage = memo(() => {
    return <div className={clsAuth.authPage__wrapper}>
        <div className={clsAuth.authPage__content}>
            <h1 className={clsAuth.authPage__title}>Learn to code by watching others</h1>
            <p className={clsAuth.authPage__description}>
            See how experienced developers solve problems in real-time. Watching scripted tutorials is great, 
            but understanding how developers think is invaluable.
            </p>
        </div>
        <LoginForm className={clsAuth.authPage__form} />
    </div>;
});

export default LoginPage;