import React from "react";
import styled from "styled-components";
import { getOrder } from "../redux/apiCalls";
import { useSelector } from "react-redux";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Header = styled.h2`
  text-align: center;
`;
const SavedContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 25vh;
`;
const AccountDetails = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: rgba(0, 0, 0, 0.1) 1px solid;
  width: 325px;
  margin: 0 auto;
  padding: 1.5rem;
`;
const Span = styled.span`
  text-align: center;
`;

const MyAccount = () => {
  const user = useSelector((state) => state.user.currentUser);
  const [data, setData] = React.useState([]);
  const [message, setMsg] = React.useState();

  React.useEffect(() => {
    getOrder(user._id, setData, setMsg);
    return () => {}
  }, [user._id]);

  return (
    <div>
      <Navbar />
      <Header>My Account</Header>
      <AccountDetails>
        {(user.firstname && user.lastname) && (
          <span>{`${user.firstname} ${user.lastname}`}</span>
        )}
        <span>{`Username: ${user.username}`}</span>
        <span>{`Email: ${user.email}`}</span>
      </AccountDetails>

      <Header>Saved Orders</Header>
      <SavedContainer>
          <Span>{`Orders Total ${data.length}`}</Span>
        {!message ? (
          data[0]?.products.map((item, key) => (
            <Span key={key}>{item._id}</Span>
          ))
        ) : (
          <Span>No Saved Orders Yet</Span>
        )}
      </SavedContainer>
      <Footer />
    </div>
  );
};

export default MyAccount;
