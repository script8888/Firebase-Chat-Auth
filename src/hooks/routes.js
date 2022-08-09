import { useStoreState } from 'easy-peasy';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

export const withPublic = (Component) => {
  return function WithPublic(props) {
    const isLoggedIn = useStoreState((state) => state.auth.isLoggedIn);
    const router = useRouter();

    if (isLoggedIn === true) {
      router.replace('/');
      return <h1>Loading...</h1>;
    }
    return <Component {...props} />;
  };
};

export const withPrivate = (Component) => {
  return function WithPrivate(props) {
    const isLoggedIn = useStoreState((state) => state.auth.isLoggedIn);
    const router = useRouter();

    useEffect(() => {
      if (!isLoggedIn) {
        router.replace('/login');
        return <h1>Loading...</h1>;
      }
    }, []);

    return <Component {...props} />;
  };
};
