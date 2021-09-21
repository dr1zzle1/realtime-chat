import React, { createContext } from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import firebase from 'firebase/compat';
import 'firebase/firestore';
import 'firebase/auth';

firebase.initializeApp({
  apiKey: 'AIzaSyB87JuRYaOOsFy0FtvJ8zELyUQmSENRGKc',
  authDomain: 'realtime-chat-57695.firebaseapp.com',
  projectId: 'realtime-chat-57695',
  storageBucket: 'realtime-chat-57695.appspot.com',
  messagingSenderId: '107095459653',
  appId: '1:107095459653:web:94694ccf952352419f202c',
  measurementId: 'G-M8E2CEDVT4',
});

export const Context = createContext(null);

const auth = firebase.auth();
const firestore = firebase.firestore();

ReactDOM.render(
  <Context.Provider
    value={{
      firebase,
      auth,
      firestore,
    }}>
    <App />
  </Context.Provider>,
  document.getElementById('root'),
);
