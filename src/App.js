import { useEffect, useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import Home from "./components/Home";
import Login from "./components/Login";
import { getUserAuth } from "./actions";
import { connect } from "react-redux";
import RegisterModal from "./components/RegisterModal";
import LoginModal from "./components/LoginModal";
import ForgotPassword from "./components/ForgotPassword";
import ChatRoom from "./components/ChatRoom";


function App(props) {
  useEffect(() => {
    props.getUserAuth();
  }, []);

  const [user, setUser] = useState("");
  const [toggleForm, setToggleForm] = useState(true);
  const formMode = () => {
    setToggleForm(!toggleForm);
  };
  const userState = () => {
    const data = localStorage.getItem("user");
    const us = data !== null ? JSON.parse(data) : null;
    setUser(us);
  };

  useEffect(() => {
    userState();
  }, []);

  return (
    // <>
    //   {user !== null ? (
    //     <>setUserState={() => setUser(null)}</>
    //   ) : (
    //     <>
    //       {toggleForm ? (
    //         <LoginModal loggedIn={(user) => setUser(user)} />
    //       ) : (
    //         <RegisterModal toggle={() => formMode()} />
    //       )}
    //     </>
    //   )}

    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/">
            <Login />
          </Route>
          <Route path="/home">
            <Header />
            <Home />
          </Route>
          <Route exact path="/forgotpassword">
            <ForgotPassword />
          </Route>

          <Route exact path="/chatroom">
            <ChatRoom />
          </Route>
        </Switch>
      </Router>
    </div>
    // </>
  );
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => ({
  getUserAuth: () => dispatch(getUserAuth()),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
