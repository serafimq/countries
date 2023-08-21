import { Suspense, useEffect } from 'react';
import classes from './App.module.scss';
import { AppRouter } from '@/app/providers/router';
import { useDispatch } from 'react-redux';
import { userActions } from '@/entities/User';

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(userActions.initAuthData());
  }, [dispatch])

  return (
    <div className={classes.app}>
        <Suspense fallback="">
            <div className="content-page">
                <AppRouter />
            </div>
        </Suspense>
    </div>
  )
}

export default App;
