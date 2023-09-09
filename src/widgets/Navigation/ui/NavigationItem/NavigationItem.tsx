import { memo } from 'react';
import { useSelector } from 'react-redux';
import { AppLink, AppLinkTheme } from '@/shared/ui/AppLink';
import { classNames } from '@/shared/lib/classNames/classNames';
import { getUserAuthData } from '@/entities/User';
import { NavigationItemType } from '../../model/types/navigation';
import cls from './NavigationItem.module.scss';

interface NavigationItemProps {
    className?: string;
    item: NavigationItemType;
    additionalClass?: string;
}

export const NavigationItem = memo(({ item, className, additionalClass }: NavigationItemProps) => {
    const isAuth = useSelector(getUserAuthData);

    if (!isAuth && item.authOnly) {
        return null;
    }

    return (
        <AppLink
            theme={item.theme ? item.theme : AppLinkTheme.SECONDARY}
            to={item.path}
            className={classNames(cls.item, {}, [className, additionalClass])}
        >
            {/* <item.Icon className={cls.icon} /> */}
            <span className={cls.link}>{item.text}</span>
        </AppLink>
    );
});