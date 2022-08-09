import axios from 'axios';
import { initializeApp, firebase } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import firebaseConfig from '../config/firebase.config';
import { doc, onSnapshot } from 'firebase/firestore';

const app = initializeApp(firebaseConfig);
getFirestore(app);
const db = getFirestore(app);

const ChatService = {
  sendChat: async () => {
    try {
      const docRef = await addDoc(collection(db, 'chats'), {
        receiver: 'ayomikun204@gmail.com',
        sender: 'fabtobi204@gmail.com',
        text: 'Lets goooooooo',
        timestamp: serverTimestamp(),
      });
      console.log('Document written with ID: ', docRef.id);
    } catch (e) {
      console.error('Error adding document: ', e);
    }
  },
  getChat: async () => {
    const unsub = onSnapshot(
      doc(db, 'chats', 'YYbhKoe5FbTEpO3oQ4P1'),
      (doc) => {
        console.log('Current data: ', doc.data());
      }
    );
  },
};
export default ChatService;
