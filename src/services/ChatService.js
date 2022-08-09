import axios from 'axios';
import { initializeApp, firebase } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import {
  collection,
  addDoc,
  getDocs,
  serverTimestamp,
} from 'firebase/firestore';
import firebaseConfig from '../config/firebase.config';
import { doc, onSnapshot } from 'firebase/firestore';

const app = initializeApp(firebaseConfig);
getFirestore(app);
const db = getFirestore(app);

const ChatService = {
  sendChat: async (receiver, sender, text) => {
    try {
      const docRef = await addDoc(collection(db, 'chats'), {
        receiver: receiver,
        sender: sender,
        text: text,
        timestamp: serverTimestamp(),
      });
      console.log('Document written with ID: ', docRef.id);
    } catch (e) {
      console.error('Error adding document: ', e);
    }
  },
  streamChat: async () => {
    const unsub = onSnapshot(
      doc(db, 'chats', 'YYbhKoe5FbTEpO3oQ4P1'),
      (doc) => {
        console.log('Current data: ', doc.data());
      }
    );
  },
  getChat: async () => {
    const querySnapshot = await getDocs(collection(db, 'chats'));
    querySnapshot.forEach((doc) => {
      // console.log(`${doc.id} => ${doc.data()}`);
      console.log(doc);
    });
  },
};
export default ChatService;
