import { useState } from "react";
import styled from "styled-components";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import { ToastContainer, toast } from "react-toastify";
import { ScaleLoader } from "react-spinners";
import firebase from "../firebase";
import {FormControlLabel,Checkbox,} from '@material-ui/core';

const LoginModal = (props) => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberme, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleEmail = (event) => {
    setEmail(event.target.value);
  };
  const handlePassword = (event) => {
    setPassword(event.target.value);
  };
  const handleCheck = (event) => {
    setRememberMe(event.target.checked);
  };

  const handlerLogin = () => {
    setLoading(true);
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((response) => {
        const { user } = response;
        const data = {
          userId: user.uid,
          email: user.email,
        };
        localStorage.setItem("user", JSON.stringify(data));
        const storage = localStorage.getItem("user");
        const loggedInUser = storage !== null ? JSON.parse(storage) : null;
        props.loggedIn(loggedInUser);
        setLoading(false);
      })
      .catch((error) => {
        toast.error(error.message);
        setLoading(false);
      });
  };

  const reset = (l) => {
    setEmail("");
    setPassword("");
    props.handleloginClick(l);
  };
  return (
    <>
      {props.loginModal === "open" && (
        <Container>
          <Content>
            <Header>
              <img src="/images/intra.jpg" alt="" />
              <h2>Login</h2>
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

                <ValidatorForm
                  onSubmit={handlerLogin}
                  onError={(errors) => {
                    for (const err of errors) {
                      console.log(err.props.errorMessages[0]);
                    }
                  }}
                  
                >
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
                  <FormControlLabel
                    control={
                      <Checkbox
                        value={rememberme}
                        onChange={(e) => handleCheck(e)}
                        color="primary"
                      />
                    }
                    label="Remember me"
                  />
                  {loading ? (
                    <ScaleLoader
                      // css={override}
                      size={150}
                      color={"#eb4034"}
                      loading={loading}
                    />
                  ) : (
                    <Loginbutton
                      type="submit"
                      fullWidth
                      variant="contained"
                    >
                      Sign In
                      
                    </Loginbutton>
                  )}
                  <p>Forgot password?</p>
                </ValidatorForm>
              </Editor>
            </SharedContent>
            <Sharecreation>
              {/* <Loginbutton>Login</Loginbutton> */}
              
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

  button {
    height: 40px;
    width: 40px;
    min-width: auto;
    color: rgba(0, 0, 0, 0.15);

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
  background: transparent;
  padding: 8px 12px;
`;

const Sharecreation = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 12px 24px 12px 16px;

  
`;

const Loginbutton = styled.button`
  margin-top: 15px;
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
    min-height: 100px;
    resize: none;
  }

  input {
    width: 100%;
    height: 5px;
    font-size: 16px;
    margin-bottom: 20px;
  }

  p {
    font-size: 13px;
    margin: 0px;
  }
`;

export default LoginModal;
