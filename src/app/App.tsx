import { useSelector, useDispatch } from 'react-redux';
import { StateSchema } from '@/app/providers/StoreProvider';
import { userActions, fetchUsers } from '@/entities/User';
import { generateUser } from '@/shared/lib/createUser/createUser';
import { useEffect } from 'react';
import classes from './App.module.scss';

const App = () => {
  const users = useSelector((state: StateSchema) => state.users.users);
  const dispatch = useDispatch<any>();

  useEffect(() => {
    dispatch(fetchUsers())
  }, [dispatch])

  const addNewUser = () => {
    dispatch(userActions.addUser(generateUser()))
  }

  const removeUser = (id: string) => {
    dispatch(userActions.removeUser({id}))
  }
  
  return (
    <>
      { users.map((user) => (
        <div key={user.id} onClick={() => removeUser(user.id)}> Name:  {user.username} </div>
      )) }
      <div className={classes.hello}>Hello world</div>
      <button onClick={addNewUser}>add user</button>
    </>
  )
}

export default App;
