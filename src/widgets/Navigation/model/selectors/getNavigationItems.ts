import { createSelector } from '@reduxjs/toolkit';
import { getUserAuthData } from '@/entities/User';
import { NavigationItemType } from '../types/navigation';
import {
    getRouteAbout,
    getRouteLogin,
    getRouteMain,
    getRouteRegistration,
} from '@/shared/const/router';
import { AppLinkTheme } from '@/shared/ui/AppLink';

export const getNavigationItems = createSelector(getUserAuthData, (userData) => {
    const navigationItems: NavigationItemType[] = [
        {
            path: getRouteMain(),
            text: 'Features',
        },
        {
            path: getRouteMain(),
            text: 'Company',
        },
        {
            path: getRouteMain(),
            text: 'Careers',
        },
    ];

    if (userData) {
        navigationItems.push(
            {
                path: getRouteAbout(),
                text: 'About',
            },
        );
    } else {
        navigationItems.push(
            {
                path: getRouteLogin(),
                text: 'Login',
                addClass: 'button'
            },
            {
                path: getRouteRegistration(),
                text: 'Register',
                addClass: 'button',
                theme: AppLinkTheme.PRIMARY
            },
        );
    }

    return navigationItems;
});