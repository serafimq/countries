import { MainPage } from '@/pages/MainPage';
import { LoginPage } from '@/pages/LoginPage';
import { RegistrationPage } from '@/pages/RegistrationPage';
import { NotFoundPage } from '@/pages/NotFoundPage';
import {
    AppRoutes,
    getRouteMain,
    getRouteLogin,
    getRouteRegistration,
    getRouteAbout,
} from '@/shared/const/router';
import { AppRoutesProps } from '@/shared/types/router';

export const routeConfig: Record<AppRoutes, AppRoutesProps> = {
    [AppRoutes.MAIN]: {
        path: getRouteMain(),
        element: <MainPage />,
    },
    [AppRoutes.LOGIN]: {
        path: getRouteLogin(),
        element: <LoginPage />,
    },
    [AppRoutes.REGISTRATION]: {
        path: getRouteRegistration(),
        element: <RegistrationPage />,
    },
    [AppRoutes.ABOUT]: {
        path: getRouteAbout(),
        element: <RegistrationPage />,
        authOnly: true,
    },
    [AppRoutes.NOT_FOUND]: {
        path: '*',
        element: <NotFoundPage />,
    },
};