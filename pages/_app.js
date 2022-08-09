import { StoreProvider, createStore } from 'easy-peasy';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/globals.css';
import model from '../model';
import React from 'react';
import Nav from '../Components/nav';
import '../src/config/firebase.config';
import AuthStateChanged from '../src/layout/AuthStateChanged';

const store = createStore(model);

function MyApp({ Component, pageProps }) {
  return (
    <StoreProvider store={store}>
      <AuthStateChanged>
        <Nav />
        <Component {...pageProps} />
      </AuthStateChanged>
    </StoreProvider>
  );
}

export default MyApp;
