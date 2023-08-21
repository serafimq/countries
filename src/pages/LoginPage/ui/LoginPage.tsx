import { memo } from 'react';
import cls from './LoginPage.module.scss';
import LoginForm from '@/features/UserAuth/ui/LoginForm/LoginForm';

const LoginPage = memo(() => {
    return <div className={cls.loginPage__wrapper}>
        <div>
            <h1>Learn to code by watching others</h1>
            <p>
            See how experienced developers solve problems in real-time. Watching scripted tutorials is great, 
            but understanding how developers think is invaluable.
            </p>
        </div>
        <LoginForm />
    </div>;
});

export default LoginPage;