import React, { useEffect } from 'react';
import { useStoreState } from 'easy-peasy';
import { useRouter } from 'next/router';
import { withPrivate } from '../src/hooks/routes';

const Profile = () => {
  const user = useStoreState((state) => state.auth.userData);

  return (
    <div className="container">
      {user ? (
        <>
          <header className="jumbotron">
            <h3>
              <strong>{user.username}</strong> Profile
            </h3>
          </header>
          <p>
            <strong>Token:</strong> {user.accessToken} ... {user.accessToken}
          </p>
          <p>
            <strong>Id:</strong> {user.id}
          </p>
          <p>
            <strong>Email:</strong> {user.email}
          </p>
          <strong>Authorities:</strong>
        </>
      ) : (
        <></>
      )}
    </div>
  );
};
export default withPrivate(Profile);
