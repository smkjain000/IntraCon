import { useState, useEffect } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import db, { auth, storage } from "../firebase";
import { ScaleLoader } from "react-spinners";

import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Button, makeStyles } from "@material-ui/core";

const RegisterModal = (props) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [enrollmentnumber, setEnrollmentNumber] = useState("");
  const [loading, setLoading] = useState(false);

  const classes = useStyles();

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
  const handleEnrollmentNumber = (event) => {
    setEnrollmentNumber(event.target.value);
  };

  const handleSignup = (e) => {
    // const user = {
    //   name,
    //   email,
    //   password,
    //   enrollmentnumber,
    // };
    e.preventDefault();
    setLoading(true);
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((response) => {
        // const currentUser = auth().currentUser;
        // const name = user.name;
        // currentUser
        //   .updateProfile({
        //     displayName: name,
        //   })
        //   .then(() => {
        //     db.collection("userdetails").doc(response.user.uid).set({
        //       name: user.name,
        //       email: user.email,
        //       enrollmentnumber: user.enrollmentnumber,
        //       uid: response.user.uid,
        //       createdat: new Date(),
        //     });
        //   });
        if (response) {
          toast.success("User Registered Successfully");

          return auth.currentUser.updateProfile({
            displayName: name,
          });
        }
        setLoading(false);
      })
      .catch((error) => {
        switch (error.code) {
          case "auth/email-already-in-use":
            toast.error(error.message);
            setLoading(false);
            break;
          case "auth/invalid-email":
            toast.error(error.message);
            setLoading(false);
            break;
          case "auth/weak-password":
            toast.error(error.message);
            setLoading(false);
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
    setEnrollmentNumber("");
    setLoading(false);
    props.handleClick(e);
  };

  const override = `
        display: block;
        margin-left: 100px;
        border-color: red;
    `;

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
                <ValidatorForm
                  onSubmit={handleSignup}
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
                    label="Name"
                    validators={["required"]}
                    errorMessages={["this field is required"]}
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

                  <TextValidator
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    label="Enrollment number"
                    validators={["required"]}
                    errorMessages={["this field is required"]}
                    name="enrollmentnumber"
                    type="number"
                    autoComplete="off"
                    placeholder="Enter enrollment number"
                    id="enroll"
                    value={enrollmentnumber}
                    onChange={handleEnrollmentNumber}
                  />

                  <Select>
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
                  </Select>

                  {loading ? (
                    <ScaleLoader
                      css={override}
                      size={150}
                      color={"#eb4034"}
                      loading={loading}
                    />
                  ) : (
                    <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      className={classes.submit}
                    >
                      Register
                    </Button>
                  )}
                </ValidatorForm>
              </Editor>
            </SharedContent>
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
  margin-top: -20px;
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
    font-size: 20px;
    margin-bottom: 5px;
    margin-top: 5px;
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

const useStyles = makeStyles((theme) => ({
  submit: {
    background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
    margin: theme.spacing(3, 0, 2),
    color: "#fff",
    padding: "10px",
  },
}));

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
