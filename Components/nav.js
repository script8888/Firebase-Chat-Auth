import { action, thunk, useStoreActions, useStoreState } from 'easy-peasy';
import Link from 'next/link';
import React, { useState, useEffect, useCallback } from 'react';

const Nav = () => {
  const [showModeratorBoard, setShowModeratorBoard] = useState(false);
  const [showAdminBoard, setShowAdminBoard] = useState(false);
  const user = useStoreState((state) => state.auth.userData);
  const loggedIn = useStoreState((state) => state.auth.isLoggedIn);
  const logout = useStoreActions((actions) => actions.auth.logout);

  return (
    <nav className="navbar navbar-expand navbar-dark bg-dark">
      <div className="navbar-nav mr-auto">
        <li className="nav-item">
          <Link href={'/'} className="nav-link">
            Home
          </Link>
        </li>
        &nbsp;
        {user && loggedIn && (
          <li className="nav-item">
            <Link href={'/profile'} className="nav-link">
              User
            </Link>
          </li>
        )}
        &nbsp;
      </div>
      &nbsp;
      {user && loggedIn ? (
        <div className="navbar-nav ml-auto">
          <li className="nav-item">
            <Link href={'/profile'} className="nav-link">
              {user.username || ''}
            </Link>
          </li>
          <li className="nav-item">
            <p className="nav-link" onClick={() => logout()}>
              LogOut
            </p>
          </li>
        </div>
      ) : (
        <div className="navbar-nav ml-auto">
          <li className="nav-item">
            <Link href={'/login'} className="nav-link">
              Login
            </Link>
          </li>
          &nbsp; &nbsp;
          <li className="nav-item">
            <Link href={'/register'} className="nav-link">
              Sign Up
            </Link>
          </li>
        </div>
      )}
    </nav>
  );
};

export default Nav;
