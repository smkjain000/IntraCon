import { useState } from "react";
import styled from "styled-components";

const RegisterModal = (props) => {
  const [editorText, setEditorText] = useState("");

  const reset = (e) => {
    setEditorText("");
    props.handleClick(e);
  };
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

                <form>
                  <label>
                    <p>Name</p>
                    <input name="name" placeholder="Enter Name" />
                  </label>

                  <label>
                    <p>Email</p>
                    <input type="email" placeholder="Enter Email " />
                  </label>

                  <label>
                    <p>Password</p>
                    <input type="password" placeholder="Enter Password" />
                  </label>

                  <label>
                    <p>Enrollment no</p>
                    <input type="number" placeholder="Enter Enrollment no" />
                  </label>

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
                </form>
              </Editor>
            </SharedContent>

            <Sharecreation>
              <Registerbutton>Register now</Registerbutton>
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
  background-color: rgba(0, 0, 0, 0.1);

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
  /* background: transparent; */
  background: rgba(0, 0, 0, 0.1);
  padding: 8px 12px;
`;

const Sharecreation = styled.div`
  display: flex;
  justify-content: center;
  padding: 12px 24px 12px 16px;
  background: rgba(0, 0, 0, 0.1);
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
    min-height: 100px;
    resize: none;
  }

  input {
    width: 100%;
    height: 35px;
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

export default RegisterModal;
