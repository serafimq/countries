import { memo, useCallback, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { classNames } from '@/shared/lib/classNames/classNames';
import { getNavigationItems } from '../../model/selectors/getNavigationItems';
import cls from './Navigation.module.scss';
import { NavigationItem } from '../NavigationItem/NavigationItem';
import { getUserAuthData, userActions } from '@/entities/User';
import { AButton, ButtonTheme } from '@/shared/ui/AButton';
import { getRouteLogin } from '@/shared/const/router';
import { loginByEmail } from '@/features/UserAuth/model/services/loginByEmail/loginByEmail';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';

interface NavigationProps {
    className?: string;
}

export const Navigation = memo(({ className }: NavigationProps) => {
    const authData = useSelector(getUserAuthData);
    const navigationItemsList = useSelector(getNavigationItems);

    const dispatch = useAppDispatch();

    const setClassGap = (path: string) => {
        if (path === getRouteLogin()) {
            return cls.Navigation__gap;
        }
        return '';
    }

    const itemsList = useMemo(
        () =>
            navigationItemsList.map((item, index) => (
                <NavigationItem
                    item={item}
                    className={setClassGap(item.path)}
                    additionalClass={item.addClass}
                    key={item.path + index}
                />
            )),
        [navigationItemsList],
    );
    
    const onLogout = useCallback(async () => {
        await dispatch(userActions.logout());
    }, [dispatch]);

    return (
        <nav
            className={classNames(cls.Navigation, {}, [className])}
        >
            {itemsList}
            {authData && (
                <AButton
                    theme={ButtonTheme.MAIN}
                    className={classNames(cls.Navigation__gap, {}, ['button'])}
                    onClick={onLogout}
            >
                    Log out
                </AButton>
            )}
        </nav>
    );
});