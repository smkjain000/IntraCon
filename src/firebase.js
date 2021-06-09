import firebase from "firebase";
require('firebase/auth')


var firebaseConfig = {
  apiKey: "AIzaSyCUh_IfZjpna0kuOjk_MRr1JhmNgXZkSCk",
  authDomain: "intracon-f9d37.firebaseapp.com",
  projectId: "intracon-f9d37",
  storageBucket: "intracon-f9d37.appspot.com",
  messagingSenderId: "876677518245",
  appId: "1:876677518245:web:2221e3df6b5e5749e7ce4c",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();
const storage = firebase.storage();

export { auth, provider, storage,firebaseApp};

export default db;






	