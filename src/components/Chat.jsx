import { Avatar, Button, Container, Grid, TextField } from '@material-ui/core';
import React, { useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Context } from '..';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import Loader from './Loader';
import firebase from 'firebase/compat';

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
        <div
          style={{
            width: '80%',
            height: '70vh',
            border: '1px solid gray',
            overflowY: 'auto',
          }}>
          {messages.map((message) => (
            <div
              style={{
                margin: 10,
                border: user.uid === message.uid ? '2px solid green' : '2px solid green',
                marginLeft: user.uid === message.uid ? 'auto' : '10px',
                width: 'fit-content',
              }}>
              <Grid container>
                <Avatar src={message.photoURL} />
                <div>{message.displayName}</div>
              </Grid>
              <div>{message.text}</div>
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
            value={value}
            onChange={(e) => setValue(e.target.value)}
            fullWidth
            maxRows={2}
            variant="outlined"
          />
          <Button onClick={sendMessage} variant="outlined">
            Отправить
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Chat;
