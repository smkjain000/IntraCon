import { useState, useEffect } from "react";
import styled from "styled-components";
// import fire from "../components/fire";
import { connect } from "react-redux";

import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { registerAPI } from "../actions";
import {
  Typography,
  Paper,
  Avatar,
  Button,
  FormControl,
  Input,
  InputLabel,
} from "@material-ui/core";
import { Link, withRouter } from "react-router-dom";
import { Height } from "@material-ui/icons";
import firebase from "../firebase";

const RegisterModal = (props) => {
  // const [editorText, setEditorText] = useState("");

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

  const handleSignup = () => {
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((payload) => {
        if (payload) {
          toast.success("User Registered Successfully");
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

  const reset = (e) => {
    setName("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
    props.handleClick(e);
  };

  // async function onRegister() {
  //   try {
  //     await firebase.register(name, email, password);
  //     await firebase.addenroll(enroll);
  //     props.register();
  //   } catch (error) {
  //     alert(error.message);
  //   }
  // }

  return (
    <>
      {props.showModal === "open" && (
        <Container>
          <Content>
            <Header>
              <img src="/images/intra.jpg" alt="" />
              <h2>Registration</h2>
              <button onClick={(event) => reset(event)}>
                <img src="/images/close.png" alt="" />
              </button>
            </Header>
            <SharedContent>
              <Editor>
                {/* <textarea
              value={editorText}
              onChange={(e) => setEditorText(e.target.value)}
              placeholder="Enter Name"
              autoFocus={true}
            ></textarea> */}

                <ValidatorForm onSubmit={handleSignup}>
                  <TextValidator
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    label="Name"
                    validators={["required"]}
                    name="name"
                    autoComplete="off"
                    placeholder="Enter Name"
                    id="name"
                    value={name}
                    onChange={handleName}
                  />

                  <TextValidator
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    label="Email"
                    validators={["required", "isEmail"]}
                    errorMessages={[
                      "this field is required",
                      "email is not valid",
                    ]}
                    name="email"
                    autoComplete="off"
                    placeholder="Enter Email"
                    id="email"
                    value={email}
                    onChange={handleEmail}
                  />

                  <TextValidator
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    label="Password"
                    validators={["required"]}
                    type="password"
                    errorMessages={["this field is required"]}
                    name="password"
                    autoComplete="off"
                    placeholder="Enter Password"
                    id="password"
                    value={password}
                    onChange={handlePassword}
                  />

                  <TextValidator
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    label="Confirm Password"
                    validators={["isPasswordMatch", "required"]}
                    errorMessages={[
                      "password mismatch",
                      "this field is required",
                    ]}
                    name="confirmpassword"
                    type="password"
                    autoComplete="off"
                    placeholder="Enter confirm passoword"
                    id="confirmpassword"
                    value={confirmPassword}
                    onChange={handleConfirmPassowerd}
                  />

               <Registerbutton type="submit" fullWidth variant="contained">
                Register
              </Registerbutton>

                  {/* <Select>
                    <p>Select branch</p>
                    <select>
                      <option value="IT">IT</option>
                      <option value="ECE">ECE</option>
                      <option selected value="CSE">
                        CSE
                      </option>
                      <option value="EEE">EEE</option>
                    </select>

                    <p>Select Year</p>
                    <select>
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option selected value="3">
                        3
                      </option>
                      <option value="4">4</option>
                    </select>
                  </Select> */}
                </ValidatorForm>
              </Editor>
            </SharedContent>

            <Sharecreation>
              {/* <Registerbutton type="submit" fullWidth variant="contained">
                Register
              </Registerbutton> */}
            </Sharecreation>
          </Content>
        </Container>
      )}
    </>
  );
};

const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 9999;
  color: black;
  background-color: rgba(0, 0, 0, 0.8);
  animation: fadeIn 0.4s;
`;

const Content = styled.div`
  width: 100%;
  max-width: 552px;
  background-color: white;
  max-height: 90%;
  overflow: initial;
  border-radius: 5px;
  position: relative;
  display: flex;
  flex-direction: column;
  top: 32px;
  margin: 0 auto;
`;

const Header = styled.div`
  display: block;
  padding: 16px 20px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.15);
  font-size: 25px;
  line-height: 1.5;
  color: black;
  font-weight: 400;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: white;

  button {
    height: 40px;
    width: 40px;
    min-width: auto;
    background-color: transparent;
    border: none;

    svg,
    img {
      pointer-events: none;
    }
  }
`;

const SharedContent = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  overflow-y: auto;
  vertical-align: baseline;
  background: white;
  padding: 1px 10px;
`;

const Sharecreation = styled.div`
  display: flex;
  justify-content: center;
  padding: 12px 24px 12px 16px;
  background: white;
`;

const Registerbutton = styled.button`
  border-radius: 50px;
  padding-left: 16px;
  padding-right: 16px;
  padding-top: 16px;
  padding-bottom: 16px;
  background: ${(props) => (props.disabled ? "rgba(0,0,0,0.8)" : "#0a66c2")};
  color: ${(props) => (props.disabled ? "rgba(1,1,1,0.2)" : "white")};
  &:hover {
    background: ${(props) => (props.disabled ? "rgba(0,0,0,0.08)" : "#004182")};
  }
`;

const Editor = styled.div`
  padding: 12px 24px;
  textarea {
    width: 100%;
    min-height: 50px;
    resize: none;
  }

  input {
    width: 100%;
    height: 0px;
    font-size: 16px;
    margin-bottom: 20px;
    border: none;
  }
`;

const Select = styled.div`
  display: flex;
  justify-content: space-between;

  select {
    width: 60px;
    height: 20px;
    border: none;
  }
`;

// const mapStateToProps = (state) => {
//   return {
//     user: state.userState.user,
//   };
// };

// const mapDispatchToProps = (dispatch) => ({
//   register: () => dispatch(registerAPI()),
// });

// export default connect(mapStateToProps, mapDispatchToProps)(RegisterModal);

export default RegisterModal;
