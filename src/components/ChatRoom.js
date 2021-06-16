import db, { auth, storage } from "../firebase";
import React, { useRef, useState } from "react";
import "./Chatroom.css";

import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import "firebase/analytics";

import { useAuthState } from "react-firebase-hooks/auth";
import { useCollectionData } from "react-firebase-hooks/firestore";
import Header from "./Header";

function ChatRoom() {
  const [user] = useAuthState(auth);

  return (
    <>
      <Header />
      <div className="ChatRoom">
        <header>
          <h1>Welcome {auth.currentUser.displayName} !</h1>
          <h1>Group chat</h1>
          <h1>IntraCon</h1>
        </header>

        <section>{user ? <Chat /> : <SignIn />}</section>
      </div>
    </>
  );
}

function SignIn() {
  const signInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider);
  };

  return (
    <>
      <button className="sign-in" onClick={signInWithGoogle}>
        Sign in with Google
      </button>
      <p className="p">
        Do not violate the community guidelines or you will be banned for life!
      </p>
    </>
  );
}

// function SignOut() {
//   return auth.currentUser && (
//     <button className="sign-out" onClick={() => auth.signOut()}>Sign Out</button>
//   )
// }

function Chat() {
  const dummy = useRef();
  const messagesRef = db.collection("messages");
  const query = messagesRef.orderBy("createdAt");

  const [messages] = useCollectionData(query, { idField: "id" });

  const [formValue, setFormValue] = useState("");

  const sendMessage = async (e) => {
    e.preventDefault();

    const { uid, photoURL, displayName } = auth.currentUser;

    await messagesRef.add({
      text: formValue,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      displayName,
      uid,
      photoURL,
    });

    setFormValue("");
    dummy.current.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <main className="main">
        {messages &&
          messages.map((msg) => <ChatMessage key={msg.id} message={msg} />)}

        <span ref={dummy}></span>
      </main>

      <form className="form" onSubmit={sendMessage}>
        <input
          className="input"
          value={formValue}
          onChange={(e) => setFormValue(e.target.value)}
          placeholder="Interact with your peers !!!"
        />

        <button className="formbutton" type="submit" disabled={!formValue}>
          Send
        </button>
      </form>
    </>
  );
}

function ChatMessage(props) {
  const { text, uid, photoURL, displayName } = props.message;

  const messageClass = uid === auth.currentUser.uid ? "sent" : "received";

  return (
    <>
      <div className={`message ${messageClass}`}>
        <img className="img" src={photoURL || "/images/user.svg"} />

        <span className="span">{displayName}</span>
        <p className="p">{text}</p>
      </div>
    </>
  );
}

export default ChatRoom;
