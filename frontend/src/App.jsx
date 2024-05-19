import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Explore from './components/Explore/Explore';
import Register from './components/Auth/Register';
import Login from './components/Auth/Login';
import UserProfile from './components/UserProfile';
import Navbar from './components/Navbar/Navbar';
import Feed from './components/Feed';

const App = () => {
  return (
    <Router>
      <div>
        <Navbar />
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/user/:userId" element={<UserProfile />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/feed" element={<Feed />} />
          {/* Add other routes here */}
        </Routes>
      </div>
    </Router>
  );
};

export default App;
