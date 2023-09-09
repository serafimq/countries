import { Navbar } from '@/widgets/Navbar';
import { memo } from 'react';

import './base.scss';
import cls from './MainPage.module.scss';

const MainPage = memo(() => {
    return (
        <div className={cls.main__wrapper}>
            <Navbar />
            <div>Main page 1</div>
        </div>
    );
});

export default MainPage;