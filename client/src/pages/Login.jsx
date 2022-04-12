import React from "react";
import styled from "styled-components";
import register from "../assets/register.png";
import SimpleSnackbar from "../components/Toast";
import { mobile, tablet } from "../responsive";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../redux/apiCalls";
import { Link } from "react-router-dom";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(
      rgba(255, 255, 255, 0.6),
      rgba(255, 255, 255, 0.6)
    ),
    url(${register}) center bottom;
  background-repeat: no-repeat;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const Wrapper = styled.div`
  width: 30%;
  padding: 20px;
  background-color: rgba(255,255,255,.9);
  ${tablet({ width: "60%" })}
`;
const Title = styled.h1`
  font-size: 24px;
  font-weight: 300;
`;
const Form = styled.form`
  display: flex;
  flex-direction: column;
`;
const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 10px 0px;
  padding: 10px;
`;
const Btn = styled.button`
  width: 50%;
  border: none;
  padding: 15px 20px;
  background-color: purple;
  color: white;
  margin-bottom: 10px;
  cursor: pointer;
  ${mobile({ width: "100%" })}
  &:disabled {
    background-color: lightgrey;
    cursor: not-allowed;
  }
`;

const LinkTag = styled.div`
  margin: 5px 0px;
  font-size: 12px;
  text-decoration: underline;
  cursor: pointer;
`;

const Login = () => {
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const dispatch = useDispatch();
  const { isFetching } = useSelector((state) => state.user);

  React.useEffect(() => {}, [open]);

  const handleClick = (e) => {
    e.preventDefault();
    if (username && password) {
      login(dispatch, { username, password });
    } else {
      setOpen(true);
    }
  };

  return (
    <Container>
      <Wrapper>
        <Title>SIGN IN</Title>
        <Form>
          <Input
            placeholder="username"
            onChange={(e) => setUsername(e.target.value)}
          />
          <Input
            placeholder="password"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <Btn onClick={handleClick} disabled={isFetching}>
            LOGIN
          </Btn>
          {open && (
            <SimpleSnackbar color={"error"} message={"Something went wrong"} />
          )}
          <LinkTag>
            <Link to="/forgot">FORGOT PASSWORD?</Link>
          </LinkTag>
          <LinkTag>
            <Link to="/register">CREATE A NEW ACCOUNT</Link>
          </LinkTag>
          <LinkTag>
            <Link to="/">BACK TO SHOP</Link>
          </LinkTag>
        </Form>
      </Wrapper>
    </Container>
  );
};

export default Login;
