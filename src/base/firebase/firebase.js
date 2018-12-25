import * as firebase from 'firebase';

const config = {
  apiKey: "AIzaSyAwh8DqAnErdj4dykQjfF7NfGd8mesPAU8",
  authDomain: 'message-bot-telegram.firebaseapp.com',
  databaseURL: 'https://message-bot-telegram.firebaseio.com',
  projectId: 'message-bot-telegram',
  storageBucket: 'message-bot-telegram.appspot.com',
  messagingSenderId: '234108005377'
};

firebase.initializeApp(config);

const database = firebase.database();
const storage = firebase.storage();

export {storage, firebase, database as default };