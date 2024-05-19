import React from 'react';
import Register from './components/Auth/Register';
import Login from './components/Auth/Login';
import CreatePost from './components/Posts/CreatePost';
import Feed from './components/Feed';

const App = () => {
  return (
    <div>
      <h1>Social Media App</h1>
      <Register />
      <Login />
      <CreatePost />
      <Feed />
    </div>
  );
};

export default App;
