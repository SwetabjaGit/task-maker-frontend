import * as firebase from 'firebase/app';
import 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDZLbR125zavswPBc42E8HRSaAEMP3VJxo",
  authDomain: "todoist-e031d.firebaseapp.com",
  databaseURL: "https://todoist-e031d.firebaseio.com",
  projectId: "todoist-e031d",
  storageBucket: "todoist-e031d.appspot.com",
  messagingSenderId: "447019769069",
  appId: "1:447019769069:web:839dcbd2770118eeb3c0e4",
  measurementId: "G-W6PCD78Z5L"
};

const firebaseObj = firebase.initializeApp(firebaseConfig);

export { firebaseObj as firebase };