import React, { useState, useEffect } from 'react';
import { useStoreState, useStoreActions } from 'easy-peasy';
const Index = () => {
  const userData = useStoreState((actions) => actions.auth.userData);
  const chat = useStoreActions((actions) => actions.auth.chat);
  const getChat = useStoreActions((action) => action.auth.getChat);
  useEffect(() => {
    getChat();
  }, []);
  return (
    <div className="container">
      <header className="jumbotron"></header>
      <button onClick={() => console.log(userData)}>DO IT</button>
      <button onClick={() => chat()}>Chat</button>
      <img src={userData?.photoURL} alt="" />
    </div>
  );
};
export default Index;
