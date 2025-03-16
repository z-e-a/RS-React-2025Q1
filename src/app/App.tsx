import { UsersState } from '@/entities/users/model/usersSlice';
import Header from '../components/Header';

import { RootStateType, useAppSelector } from './store';
import UserCard from '../components/UserCard';

function App() {
  const { usersList }: UsersState = useAppSelector<RootStateType, UsersState>(
    (store): UsersState => store.users
  );

  return (
    <>
      <Header />
      <main>
        {usersList.map((user, idx) => (
          <UserCard
            key={idx}
            user={user}
            isLastAdded={usersList.length - 1 == idx}
          />
        ))}
      </main>
    </>
  );
}
/* <Footer /> */

export default App;
