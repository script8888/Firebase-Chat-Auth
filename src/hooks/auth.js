import { action, thunk } from 'easy-peasy';
import axios from 'axios';
import AuthService from '../services/AuthService';
import ChatService from '../services/ChatService';

const auth = {
  error: null,
  isLoggedIn: false,
  userData: null,
  setLoggedIn: action((state, payload) => {
    state.isLoggedIn = payload;
  }),
  setUserData: action((state, payload) => {
    state.userData = payload;
  }),
  setError: action((state, payload) => {
    state.error = payload;
  }),
  register: thunk(async (actions, payload) => {
    try {
      const data = await AuthService.register(payload.email, payload.password);
      if (!data.error) {
        actions.setLoggedIn(true);
        actions.setUserData(data);
      } else {
        actions.setError(data.error);
      }
    } catch (error) {
      console.log(error);
      actions.setError(error);
      actions.setLoggedIn(false);
      actions.setUserData(null);
    }
  }),
  loginEmail: thunk(async (actions, payload) => {
    try {
      const data = await AuthService.loginEmail(
        payload.email,
        payload.password
      );

      if (!data.errorCode) {
        actions.setLoggedIn(true);
        actions.setUserData(data);
      } else {
        actions.setError(data.errorCode);
      }
    } catch (error) {
      console.log('Error', error);
      actions.setError(error);
      actions.setLoggedIn(false);
      actions.setUserData(null);
    }
  }),
  loginWithGoogle: thunk(async (actions, payload) => {
    try {
      const data = await AuthService.loginWithGoogle();

      if (!data.error) {
        actions.setLoggedIn(true);
        actions.setUserData(data);
      } else {
        actions.setError(data.error);
      }
    } catch (error) {
      console.log(error);
      actions.setError(error);
      actions.setLoggedIn(false);
      actions.setUserData(null);
    }
  }),
  logout: thunk(async (actions, payload) => {
    actions.setLoggedIn(false);
    actions.setUserData(null);
    await AuthService.logout();
  }),
};

export default auth;
