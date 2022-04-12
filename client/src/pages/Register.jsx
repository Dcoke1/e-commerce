import styled from "styled-components";
import login_img from "../assets/login_img.png";
import { tablet } from "../responsive";
import { publicRequest } from "../requestMethod";
import { Link } from "react-router-dom";
import React from "react";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0.5)
    ),
    url(${login_img}) center;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const Wrapper = styled.div`
  width: 40%;
  padding: 20px;
  background-color: rgba(255,255,255,.9);
  ${tablet({ width: "75%" })}
`;
const Title = styled.h1`
  font-size: 24px;
  font-weight: 300px;
  ${tablet({ textAlign: "center" })}
`;

const SuccessTitle = styled.h1`
  font-size: 24px;
  font-weight: 300px;
  text-align: center;
`;
const SubTitle = styled.h2`
  text-align: center;
`;
const Form = styled.form`
  display: flex;
  flex-wrap: wrap;
`;
const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 20px 10px 0px 0px;
  padding: 10px;
`;
const Agreement = styled.span`
  font-size: 12px;
  margin: 20px 0px;
`;

const SpanPassword = styled.span`
  color: red;
  margin: 5px;
`;

const SuccessContainer = styled.div``;

const BtnContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
`;
const Btn = styled.button`
  width: 100%;
  border: none;
  padding: 15px 20px;
  margin-bottom: 10px;
  background-color: purple;
  color: white;
  cursor: pointer;
  ${tablet({ width: "100%" })}

  &:disabled {
    background-color: lightgrey;
  }
`;

const Register = () => {
  const [name, setName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [userName, setUserName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [confirm, setConfirm] = React.useState("");
  const [success, setSuccess] = React.useState();

  const handleSubmit = (e) => {
    e.preventDefault();

    const newRegister = {
      firstname: name,
      lastname: lastName,
      username: userName,
      email: email,
      password: password === confirm ? confirm : null,
    };

    const sendPostRequest = async () => {
      if (newRegister.password !== null) {
        try {
          const resp = await publicRequest.post("/auth/register", newRegister);
          setSuccess(resp.data);
        } catch (err) {
          console.error(err);
        }
      } else {
        console.log("Passwords do not match. Please re enter");
      }
    };
    sendPostRequest();
  };

  return (
    <Container>
      <Wrapper>
        {success ? (
          <SuccessContainer>
            <SuccessTitle>Account Successfully Created</SuccessTitle>
            <SubTitle>Welcome, {success.firstname}</SubTitle>
            <BtnContainer>
              <Link to="/login">
                <Btn>LOGIN</Btn>
              </Link>
              <Link to="/">
                <Btn>BACK TO SHOP</Btn>
              </Link>
            </BtnContainer>
          </SuccessContainer>
        ) : (
          <>
            <Title>CREATE AN ACCOUNT</Title>
            <Form>
              <Input
                onChange={(e) => setName(e.target.value)}
                placeholder="first name"
              />
              <Input
                onChange={(e) => setLastName(e.target.value)}
                placeholder="last name"
              />
              <Input
                onChange={(e) => setUserName(e.target.value)}
                placeholder="username"
                required
              />
              <Input
                onChange={(e) => setEmail(e.target.value)}
                placeholder="email"
                type="email"
                required
              />
              <Input
                onChange={(e) => setPassword(e.target.value)}
                placeholder="password"
                required
              />
              <Input
                onChange={(e) => setConfirm(e.target.value)}
                placeholder="confirm password"
                required
              />
              <Agreement>
                By creating an account, I consent to the processing of my
                personal data in accordance with the <b>PRIVACY POLICY</b>
              </Agreement>
              {password !== confirm && (
                <SpanPassword>Passwords do not match yet!</SpanPassword>
              )}
              <BtnContainer>
                <Btn
                  id="create"
                  onClick={handleSubmit}
                  disabled={
                    name && lastName && userName && email && password && confirm && (password.length === confirm.length)
                      ? false
                      : true
                  }
                >
                  CREATE
                </Btn>
                <Link to="/">
                  <Btn>BACK TO SHOP</Btn>
                </Link>
              </BtnContainer>
            </Form>
          </>
        )}
      </Wrapper>
    </Container>
  );
};

export default Register;
