import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav>
      <ul>
        <li><Link to="/explore">Explore</Link></li>
        {/* Add other links here */}
      </ul>
    </nav>
  );
};

export default Navbar;
