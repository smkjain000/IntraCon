import db, { auth, storage } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollectionData } from "react-firebase-hooks/firestore";
import React, { useRef, useState } from "react";
import firebase from "firebase";
import style from "../style/Chatroom.module.css";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import Header from "./Header";

function ChatRoom() {
  const [user] = useAuthState(auth);

  return (
    <div className={style.chatroom}>
      <header>
        <h1>Welcome {auth.currentUser.displayName} !</h1>
        <h1>Group Chat</h1>
        <h1>IntraCon</h1>
        {/* <SignOut /> */}
      </header>

      <section>{user ? <Chat /> : <SignIn />}</section>
    </div>
  );
}

function SignIn() {
  const signInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider);
  };

  return (
    <>
      <button className={style.signin} onClick={signInWithGoogle}>
        Sign in with Google
      </button>
      <p>
        Do not violate the community guidelines or you will be banned for life!
      </p>
    </>
  );
}

// function SignOut() {
//   return (
//     auth.currentUser && (
//       <button className="sign-out" onClick={() => auth.signOut()}>
//         Sign Out
//       </button>
//     )
//   );
// }
function Chat() {
  const dummy = useRef();
  const messagesRef = db.collection("messages");
  const query = messagesRef.orderBy("createdAt").limit(25);

  const [messages] = useCollectionData(query, { idField: "id" });

  const [formValue, setFormValue] = useState("");

  const sendMessage = async (e) => {
    e.preventDefault();

    const { uid, photoURL } = auth.currentUser;

    await messagesRef.add({
      text: formValue,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      uid,
      photoURL,
    });

    setFormValue("");
    dummy.current.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <mainchat className={style.mainchat}>
        {messages &&
          messages.map((msg) => <ChatMessage key={msg.id} message={msg} />)}

        <span ref={dummy}></span>
      </mainchat>

      <form className={style.form} onSubmit={sendMessage}>
        <input
          className={style.input}
          value={formValue}
          onChange={(e) => setFormValue(e.target.value)}
          placeholder="Interact with your peers"
        />

        <button className={style.button} type="submit" disabled={!formValue}>
          Send
        </button>
      </form>
    </>
  );
}

function ChatMessage(props) {
  const { text, uid, photoURL } = props.message;

  const messageClass = uid === auth.currentUser.uid ? "sent" : "received";
  return (
    <>
      {/* <div className={`message ${messageClass}`}> */}
      <div className={style.message}>
        <img
          className={style.img}
          src={
            photoURL || "https://api.adorable.io/avatars/23/abott@adorable.png"
          }
        />
        <div>{auth.currentUser.displayName}</div>
        <p className={style.p}>{text}</p>
      </div>
    </>
  );
}

export default ChatRoom;
