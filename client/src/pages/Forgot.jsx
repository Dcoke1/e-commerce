import styled from "styled-components";
import login_img1 from "../assets/login_img1.png";
import { tablet, large } from "../responsive";
// import { useSelector } from "react-redux";
//import { publicRequest } from "../requestMethod";
import { Link } from "react-router-dom";
import React from "react";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0.5)
    ),
    url(${login_img1}) center;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  width: 40%;
  padding: 20px;
  background-color: rgba(255, 255, 255, 0.8);
  ${large({ width: "60%" })}
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 300px;
`;

const SuccessTitle = styled.h1`
  font-size: 24px;
  font-weight: 300px;
  text-align: center;
`;

const Form = styled.form`
  display: flex;
  flex-wrap: wrap;
`;
const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 20px 0px 15px 0px;
  padding: 12px;
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

const Forgot = () => {
  const [email, setEmail] = React.useState("");
  const [success, setSuccess] = React.useState(false);
//   const { isFetching, error } = useSelector((state) => state.user);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSuccess(true);
  };

  //     const sendPostRequest = async () => {
  //       if (email !== null) {
  //         try {
  //           const resp = await publicRequest.post("/auth/register", newRegister);
  //           setSuccess(resp.data);
  //         } catch (err) {
  //           console.error(err);
  //         }
  //       } else {
  //         console.log("Passwords do not match. Please re enter");
  //       }
  //     };
  //     sendPostRequest();
  //   };

  return (
    <Container>
      <Wrapper>
        {success ? (
          <SuccessContainer>
            <SuccessTitle>Check Email For Verification</SuccessTitle>
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
            <Title>FORGOT PASSWORD</Title>
            <Form>
              <Input
                onChange={(e) => setEmail(e.target.value)}
                placeholder="email"
                type="email"
                required
              />
              <BtnContainer>
                <Btn
                  id="create"
                  onClick={handleSubmit}
                  disabled={email.length > 4 ? false : true}
                >
                  VERIFY EMAIL
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

export default Forgot;
