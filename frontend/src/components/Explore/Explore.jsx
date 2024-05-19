import React, { useState, useEffect } from 'react';
import { fetchExploreUsers, followUser, unfollowUser } from '../../services/api';

const Explore = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetchExploreUsers();
        setUsers(response.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchUsers();
  }, []);

  const handleFollow = async (userId) => {
    try {
      await followUser(userId);
      setUsers(users.map(user => user._id === userId ? { ...user, isFollowing: true } : user));
    } catch (err) {
      console.error(err);
    }
  };

  const handleUnfollow = async (userId) => {
    try {
      await unfollowUser(userId);
      setUsers(users.map(user => user._id === userId ? { ...user, isFollowing: false } : user));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <h1>Explore Users</h1>
      <ul>
        {users.map(user => (
          <li key={user._id}>
            <h2>{user.username}</h2>
            <p>{user.email}</p>
            <p>Followers:{user.followers.length}</p>
            <p>following:{user.following.length}</p>
            {user.isFollowing ? (
              <button onClick={() => handleUnfollow(user._id)}>Unfollow</button>
            ) : (
              <button onClick={() => handleFollow(user._id)}>Follow</button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Explore;
