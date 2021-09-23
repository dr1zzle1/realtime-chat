import { Avatar, Button, Container, Grid, TextField } from '@material-ui/core';
import React, { useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Context } from '..';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import Loader from './Loader';
import firebase from 'firebase/compat';
import s from './Chat.module.css';

const Chat = () => {
  const { auth, firestore } = React.useContext(Context);
  const [user] = useAuthState(auth);
  const [value, setValue] = useState('');
  const [messages, loading] = useCollectionData(
    firestore.collection('messages').orderBy('createdAt'),
  );

  const sendMessage = async () => {
    firestore.collection('messages').add({
      uid: user.uid,
      displayName: user.displayName,
      photoURL: user.photoURL,
      text: value,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
    });
    setValue('');
  };
  if (loading) {
    return <Loader />;
  }
  return (
    <Container>
      <Grid container style={{ height: window.innerHeight - 50 }} justify="center">
        <div className={s.messages}>
          {messages.map((message) => (
            <div
              className={s.message}
              style={{
                marginLeft: user.uid === message.uid ? 'auto' : '10px',
                marginBottom: '5px',
                boxShadow: ' 0 4px 12px rgba(16, 16, 16, 0.18), 0 16px 20px rgba(16, 16, 16, 0.17)',
              }}>
              <Grid container alignItems="center">
                <Avatar src={message.photoURL} />
                <div style={{ paddingLeft: '10px', fontSize: '18px' }}>{message.displayName}</div>
              </Grid>
              <div style={{ fontSize: '18px' }}>{message.text}</div>
            </div>
          ))}
        </div>
        <Grid
          container
          direction="column"
          alignItems="flex-end"
          style={{
            width: '80%',
          }}>
          <TextField
            style={{ marginBottom: '10px', border: ' 2px solid blue ', color: '#fff' }}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            fullWidth
            maxRows={2}
            placeholder="Введите ваше сообщение"
          />
          <Button
            style={{ color: '#fff', border: ' 2px solid gray ' }}
            onClick={sendMessage}
            variant="outlined">
            Отправить
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Chat;
