import { useState } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { signInAPI } from "../actions";
import { Redirect } from "react-router";
import RegisterModal from "./RegisterModal";
import LoginModal from "./LoginModal";

import React from "react";

const Login = (props) => {
  const [showModal, setShowModal] = useState("close");

  const handleClick = (e) => {
    e.preventDefault();
    if (e.target !== e.currentTarget) {
      return;
    }
    switch (showModal) {
      case "open":
        setShowModal("close");
        break;
      case "close":
        setShowModal("open");
        break;
      default:
        setShowModal("close");
        break;
    }
  };

  const [loginModal, setLoginModal] = useState("close");

  const handleloginClick = (l) => {
    l.preventDefault();
    if (l.target !== l.currentTarget) {
      return;
    }
    switch (loginModal) {
      case "open":
        setLoginModal("close");
        break;
      case "close":
        setLoginModal("open");
        break;
      default:
        setLoginModal("close");
        break;
    }
  };

  return (
    <Contain>
      {props.user && <Redirect to="/home" />}
      <Nav>
        <a href="/">
          <img src="/images/templogo.png" alt="" />
        </a>
        <div>
          <Joinbutton onClick={handleClick}>Join now</Joinbutton>
          <SignInbutton onClick={handleloginClick}> Sign in</SignInbutton>
        </div>
      </Nav>
      <RegisterModal showModal={showModal} handleClick={handleClick} />
      <LoginModal loginModal={loginModal} handleloginClick={handleloginClick} />
      <Section>
        <Hero>
          <h1>Welcome to your Professional Community</h1>
          <h4>Build a Strong Connection among individuals within a College</h4>
          <img src="/images/login-hero.svg" alt="" />
        </Hero>

        <Form>
          <Google onClick={() => props.signIn()}>
            <img src="/images/google.svg" alt="" />
            Sign in with Google
          </Google>
        </Form>
      </Section>
    </Contain>
  );
};

const Contain = styled.div`
  padding: 0px;
`;

const Nav = styled.nav`
  max-width: 1128px;
  margin: auto;
  padding: 12px 0 16px;
  display: flex;
  align-items: center;
  position: relative;
  justify-content: space-between;
  flex-wrap: nowrap;

  & > a {
    width: 135px;
    height: 34px;
    @media (max-width: 768px) {
      padding: 0 5px;
    }
  }
`;

const Joinbutton = styled.button`
  font-size: 16px;
  padding: 10px 12px;
  text-decoration: none;
  border-radius: 24px;
  color: rgb(0, 0, 0, 0.6);
  margin-right: 12px;
  &:hover {
    background-color: rgb(0, 0, 0, 0.08);
    color: rgb(0, 0, 0, 0.9);
    text-decoration: none;
  }
`;

const SignInbutton = styled.button`
  box-shadow: inset 0 0 0 1px #0a66c2;
  color: #0a66c2;
  border-radius: 24px;
  transition-duration: 167ms;
  font-size: 16px;
  font-weight: 600;
  padding: 10px 12px;
  text-align: center;
  background-color: rgba(0, 0, 0, 0);

  &:hover {
    background-color: rgba(112, 181, 249, 0.15);
    color: #0a66c2;
    text-decoration: none;
  }
`;

const Section = styled.section`
  display: flex;
  align-content: start;
  min-height: 700px;
  padding-bottom: 138px;
  padding-top: 40px;
  padding: 60px 0;
  position: relative;
  flex-wrap: wrap;
  width: 100%;
  max-width: 1128px;
  align-items: center;
  margin: auto;

  @media (max-width: 768px) {
    margin: 0;
    min-height: 0px;
  }
`;

const Hero = styled.div`
  width: 100%;
  h1 {
    padding-bottom: 0;
    width: 55%;
    font-size: 56px;
    color: #2977c9;
    font-weight: 200;
    line-height: 70px;

    @media (max-width: 768px) {
      text-align: center;
      font-size: 20px;
      font-weight: 700;
      width: 100%;
      line-height: 2;
    }
  }

  h4 {
    @media (max-width: 768px) {
      text-align: center;
      font-size: 13px;
      font-weight: 550;
      width: 100%;
      line-height: 2;
    }
  }

  img {
    //z-index:-1;
    width: 600px;
    height: 850px;
    position: absolute;
    bottom: -2px;
    right: -75px;

    @media (max-width: 768px) {
      top: 230px;
      width: initial;
      position: initial;
      height: initial;
    }
  }
`;

const Form = styled.div`
  margin-top: 100px;
  width: 408px;

  @media (max-width: 768px) {
    margin-top: 20px;
    margin-left: 25px;
  }
`;

const Google = styled.button`
  display: flex;
  justify-content: center;
  background-color: #fff;
  align-items: center;
  height: 56px;
  width: 100%;
  border-radius: 28px;
  box-shadow: inset 0 0 0 1px rgb(0 0 0 / 60%),
    inset 0 0 0 2px rgb(0 0 0 / 0%) inset 0 0 0 1px rgb(0 0 0 / 0%);
  vertical-align: middle;
  z-index: 0;
  transition-duration: 167ms;
  font-size: 20px;
  color: rgba(0 0 0 0.6);

  &:hover {
    background-color: rgb(207, 207, 207, 0.25);
    color: rgba(0, 0, 0, 0.75);
  }
`;

const mapStateToProps = (state) => {
  return {
    user: state.userState.user,
  };
};

const mapDispatchToProps = (dispatch) => ({
  signIn: () => dispatch(signInAPI()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
