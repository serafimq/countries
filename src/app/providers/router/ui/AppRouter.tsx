import { memo, Suspense, useCallback } from 'react';
import { Route, Routes } from 'react-router-dom';
// import { PageLoader } from '@/widgets/PageLoader';
import { RequireAuth } from '@/app/providers/router/ui/RequireAuth';
import { routeConfig } from '@/app/providers/router/config/routeConfig';
import { AppRoutesProps } from '@/shared/types/router';

const AppRouter = () => {
    const renderWithWrapper = useCallback((route: AppRoutesProps) => {
        const element = (
            // придумать PageLoader
            // <Suspense fallback={<PageLoader />}>{route.element}</Suspense>
            <Suspense fallback={'Loading...'}>{route.element}</Suspense>
        );

        return (
            <Route
                key={route.path}
                element={
                    route.authOnly ? (
                        <RequireAuth>{element}</RequireAuth>
                    ) : (
                        element
                    )
                }
                path={route.path}
            />
        );
    }, []);
    return (
        // <Suspense fallback={<PageLoader />}>
        <Suspense fallback={'Loading...'}>
            <Routes>{Object.values(routeConfig).map(renderWithWrapper)}</Routes>
        </Suspense>
    );
};

export default memo(AppRouter);