import styles from './UserCard.module.scss';
import { UserType } from '@/entities/users/model/usersSlice';

interface UserCardProps {
  user: UserType;
  isLastAdded: boolean;
}

const UserCard = ({ user, isLastAdded }: UserCardProps) => {
  return (
    <div className={styles.cardContainer}>
      <article
        className={[styles.card, isLastAdded ? styles._selected : ''].join(' ')}
      >
        <h4>
          Source: <u>{user.source}</u>{' '}
        </h4>
        <h3>
          <span>Name: </span>
          <span>{user.name}</span>
        </h3>
        <p>
          <span>Age: </span>
          <span>{user.age}</span>
        </p>
        <p>
          <span>Email: </span>
          <span>{user.email}</span>
        </p>
        <p>
          <span>Password: </span>
          <span>{user.password}</span>
        </p>
        <p>
          <span>Country: </span>
          <span>{user.country}</span>
        </p>
        <p>
          <span>Gender: </span>
          <span>{user.gender}</span>
        </p>
        <p>
          <span>Terms accepted: </span>
          <span>{user.terms.toString()}</span>
        </p>
        <img src={user.image} alt={user.name} />
      </article>
    </div>
  );
};

export default UserCard;
