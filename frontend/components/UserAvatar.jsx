import React from 'react';
import { useAuth } from '../context/AuthContext';

const UserAvatar = () => {
  const { currentUser } = useAuth();

  if (!currentUser) return null;

  const getInitial = (name) => {
    return name?.charAt(0).toUpperCase();
  };

  return (
    <div style={styles.avatarContainer}>
      {currentUser.photoURL ? (
        <img src={currentUser.photoURL} alt="Profile" style={styles.avatarImage} />
      ) : (
        <div style={styles.avatarFallback}>
          {getInitial(currentUser.displayName || currentUser.email)}
        </div>
      )}
    </div>
  );
};

const styles = {
  avatarContainer: {
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    overflow: 'hidden',
    backgroundColor: '#5A67D8',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white',
    fontWeight: 'bold',
    fontSize: '18px',
  },
  avatarImage: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  avatarFallback: {
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
};

export default UserAvatar;
