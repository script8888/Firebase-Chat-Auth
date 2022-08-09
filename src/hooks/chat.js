import { action, thunk } from 'easy-peasy';
import axios from 'axios';
import ChatService from '../services/ChatService';

const chat = {
  messages: [],
  setMessages: action((state, payload)=>{
    state.messages.push(payload);
  }),
  sendChat: thunk(async (actions, payload) => {
    const data = await ChatService.sendChat();
    // return data;
  }),
  getChat: thunk(async (actions, payload) => {
    const data = await ChatService.getChat();
  }),
};

export default chat;
