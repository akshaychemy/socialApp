import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { followUser, unfollowUser, fetchUserById } from '../services/api';

const UserProfile = () => {
  const { userId } = useParams();
  const [user, setUser] = useState(null);
  const [isFollowing, setIsFollowing] = useState(false);


  useEffect(() => {
    // Fetch user details and update state
    const fetchUser = async () => {
      try {
        const response = await fetchUserById(userId);
        console.log("userId",userId,response)
        setUser(response.data);
        // Check if the logged-in user is following this user
        setIsFollowing(response.data.followers.includes(localStorage.getItem('userId')));
      } catch (err) {
        console.error(err);
      }
    };

    fetchUser();
  }, [userId]);

  const handleFollow = async () => {
    try {
      await followUser(userId);
      setIsFollowing(true);
    } catch (err) {
      console.error(err);
    }
  };

  const handleUnfollow = async () => {
    try {
      await unfollowUser(userId);
      setIsFollowing(false);
    } catch (err) {
      console.error(err);
    }
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{user.username}</h1>
      <p>{user.email}</p>
      {isFollowing ? (
        <button onClick={handleUnfollow}>Unfollow</button>
      ) : (
        <button onClick={handleFollow}>Follow</button>
      )}
    </div>
  );
};

export default UserProfile;
