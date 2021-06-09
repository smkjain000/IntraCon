import { useState } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { signInAPI } from "../actions";
import { Redirect } from "react-router";
import RegisterModal from "./RegisterModal";
import LoginModal from "./LoginModal";

import React, { useEffect } from "react";
import {
  CssBaseline,
  Avatar,
  Typography,
  Button,
  Grid,
  Link,
  makeStyles,
  Card,
  CardContent,
} from "@material-ui/core";
import { LockRounded } from "@material-ui/icons";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
// import fire from '../helpers/db';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { auth } from "../firebase";

const Login = (props) => {
  const [showModal, setShowModal] = useState("close");

  const classes = useStyles();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleName = (event) => {
    setName(event.target.value);
  };

  const handleEmail = (event) => {
    setEmail(event.target.value);
  };
  const handlePassword = (event) => {
    setPassword(event.target.value);
  };
  const handleConfirmPassowerd = (event) => {
    setConfirmPassword(event.target.value);
  };
  const handleSignUp = () => {
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((response) => {
        if (response) {
          props.toggle();
          toast.success("User Registered Successfully");
          return auth.currentUser.updateProfile({
            displayName: name,
          });
        }
      })
      .catch((error) => {
        switch (error.code) {
          case "auth/email-already-in-use":
            toast.error(error.message);
            break;
          case "auth/invalid-email":
            toast.error(error.message);
            break;
          case "auth/weak-password":
            toast.error(error.message);
            break;
        }
      });
  };

  useEffect(() => {
    ValidatorForm.addValidationRule("isPasswordMatch", (value) => {
      if (value !== password) {
        return false;
      }
      return true;
    });
    return () => {
      ValidatorForm.removeValidationRule("isPasswordMatch");
    };
  }, [password]);

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
          {/* <img src="/images/login-hero.svg" alt="" /> */}

          <Container component="main" maxWidth="xs">
            <Card className={classes.card}>
              <CardContent>
                <ToastContainer />
                <CssBaseline />
                <div className={classes.paper}>
                  <Avatar className={classes.avatar}>
                    <LockRounded />
                  </Avatar>
                  <Typography component="h1" variant="h5">
                    Register
                  </Typography>
                  <ValidatorForm
                    onSubmit={handleSignUp}
                    className={classes.form}
                  >
                    <TextValidator
                      variant="outlined"
                      margin="normal"
                      fullWidth
                      label="Name"
                      onChange={handleName}
                      name="name"
                      value={name}
                      validators={["required"]}
                      errorMessages={["this field is required"]}
                      autoComplete="off"
                    />
                    <TextValidator
                      variant="outlined"
                      margin="normal"
                      fullWidth
                      label="Email"
                      onChange={handleEmail}
                      name="email"
                      value={email}
                      validators={["required", "isEmail"]}
                      errorMessages={[
                        "this field is required",
                        "email is not valid",
                      ]}
                      autoComplete="off"
                    />
                    <br />
                    <TextValidator
                      variant="outlined"
                      fullWidth
                      label="Password"
                      onChange={handlePassword}
                      name="password"
                      type="password"
                      value={password}
                      validators={["required"]}
                      errorMessages={["this field is required"]}
                      autoComplete="off"
                    />
                    <br />
                    <TextValidator
                      variant="outlined"
                      label="Confirm password"
                      fullWidth
                      onChange={handleConfirmPassowerd}
                      name="confirmPassword"
                      type="password"
                      validators={["isPasswordMatch", "required"]}
                      errorMessages={[
                        "password mismatch",
                        "this field is required",
                      ]}
                      value={confirmPassword}
                      autoComplete="off"
                    />
                    <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      className={classes.submit}
                    >
                      Register Now
                    </Button>
                  </ValidatorForm>
                </div>
              </CardContent>
            </Card>
          </Container>
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

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
    margin: theme.spacing(3, 0, 2),
    color: "#fff",
    padding: "10px",
  },
  card: {
    marginTop: "60px",
    paddingLeft: "20px",
    paddingRight: "20px",
    paddingBottom: "20px",
  },
  pointer: {
    cursor: "pointer",
    color: "red",
  },
}));

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
      font-weight: 500;
      width: 100%;
      line-height: 2;
    }
  }

  /* .img {
    //z-index:-1;
    width: 700px;
    height: 670px;
    position: absolute;
    bottom: -2px;
    right: -150px;

    @media (max-width: 768px) {
      top: 230px;
      width: initial;
      position: initial;
      height: initial;
    }
  } */
`;

const Container = styled.div`
  width: 450px;
  height: 700px;
  position: absolute;
  bottom: -2px;
  right: -10px;

  @media (max-width: 768px) {
    top: 200px;
    width: initial;
    position: initial;
    height: initial;
  }
`;

const Form = styled.div`
  margin-top: 100px;
  width: 408px;

  @media (max-width: 768px) {
    margin-top: 20px;
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
