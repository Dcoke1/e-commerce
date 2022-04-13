import styled from "styled-components";
import Announcement from "../components/Announcement";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
// import RemoveOutlinedIcon from "@mui/icons-material/RemoveOutlined";
// import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import { tablet } from "../responsive";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { clearCart } from "../redux/cartRedux";
import SimpleSnackbar from "../components/Toast";
import React from "react";
import { order } from "../redux/apiCalls";

const Container = styled.div``;
const Wrapper = styled.div`
  padding: 20px;
`;
const Title = styled.h1`
  font-weight: 300;
  text-align: center;
`;
const Top = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
  ${tablet({ flexDirection: "column", alignItems: "inherit" })}
`;
const TopButton = styled.button`
  padding: 10px;
  font-weight: 600;
  cursor: pointer;
  border: ${(props) => props.type === "filled" && "none"};
  background-color: ${(props) =>
    props.type === "filled" ? "black" : "transparent"};
  color: ${(props) => props.type === "filled" && "white"};
  ${tablet({ width: "100%" })}
`;
const TopTexts = styled.div`
  padding: 10px;
  font-weight: 600;
  cursor: pointer;
  ${tablet({
    textAlign: "center",
    display: "flex",
    justifyContent: "space-around",
  })}
`;
const TopText = styled.span`
  text-decoration: underline;
  margin: 0px 10px;
  cursor: pointer;
`;
const Bottom = styled.div`
  display: flex;
  justify-content: space-between;
  ${tablet({ flexDirection: "column-reverse" })}
`;
const Info = styled.div`
  flex: 3;
`;
const Product = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 2rem;
`;
const ProductDetail = styled.div`
  flex: 2;
`;
const Image = styled.img`
  width: 200px;
`;
const Details = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;
const ProductName = styled.span`
  flex: 1;
`;
const ProductId = styled.span`
  flex: 1;
`;
const ProductColor = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
`;
const ProductSize = styled.span`
  flex: 1;
`;
const PriceDetail = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
const ProductAmountContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;
const ProductAmount = styled.div`
  font-size: 24px;
  margin: 5px;
`;
const ProductPrice = styled.div`
  font-size: 30px;
  font-weight: 200;
`;
const Hr = styled.hr`
  background-color: #eee;
  border: none;
  height: 1px;
`;
const Summary = styled.div`
  flex: 1;
  border: 0.5px solid lightgray;
  border-radius: 10px;
  padding: 20px;
  height: 50vh;
`;
const SummaryTitle = styled.h1`
  font-weight: 200;
`;
const SummaryItem = styled.div`
  margin: 30px 0px;
  display: flex;
  justify-content: space-between;
  font-weight: ${(props) => props.type === "total" && "500"};
  font-size: ${(props) => props.type === "total" && "24px"};
`;
const SummaryItemText = styled.span`
  flex: 1;
`;
const SummaryItemPrice = styled.span`
  flex: 1;
`;
const Btn = styled.button`
  width: 100%;
  padding: 10px;
  background-color: black;
  color: white;
  font-weight: 600;
  cursor: pointer;
`;

const Cart = () => {
  const [orders, setOrder] = React.useState();
  const [open, setOpen] = React.useState(false);
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const loggedInUser = useSelector((state) => state.user.currentUser);

  const newOrder = {
    userId: loggedInUser && loggedInUser._id,
    products: [...cart.products],
    amount: cart.quantity,
    address: "Test",
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (loggedInUser && cart.products.length > 0) {
      order(newOrder, setOrder, console.log);
      emptyCart()
    } else {
      setOpen(true);
    }
  };

  const emptyCart = () => {
    dispatch(clearCart());
  };

  return (
    <Container>
      <Navbar />
      <Announcement />
      <Wrapper>
        <Title>YOUR BAG</Title>
        <Top>
          <Link to="/">
            <TopButton>CONTINUE SHOPPING</TopButton>
          </Link>
          <TopTexts>
            {loggedInUser && (
              <Link to="/myaccount">
                <TopText>My Account</TopText>
              </Link>
            )}
            <TopText onClick={emptyCart}>
              Clear Cart ({cart.products.length})
            </TopText>
          </TopTexts>
          <TopButton onClick={handleSubmit}>CHECKOUT NOW</TopButton>
        </Top>
        <Bottom>
          <Info>
            {cart.products?.map((item, key) => (
              <Product key={key}>
                <Link to={`/product/${item._id}`}>
                  <ProductDetail>
                    <Image src={item.img} alt="product_img" />
                    <Details>
                      <ProductName>
                        <b>Product: </b>
                        {item.title}
                      </ProductName>
                      <ProductId>
                        <b>ID: </b>
                        {item._id}
                      </ProductId>
                      <ProductColor color={item.color} />
                      <ProductSize>
                        <b>Size: {item.size}</b>
                      </ProductSize>
                    </Details>
                  </ProductDetail>
                </Link>
                <PriceDetail>
                  <ProductAmountContainer>
                    {/* <RemoveOutlinedIcon onClick={() => item.quantity-- } /> */}
                    <ProductAmount>{item.quantity}</ProductAmount>
                    {/* <AddOutlinedIcon onClick={() => item.quantity++} /> */}
                  </ProductAmountContainer>
                  <ProductPrice>${item.price * item.quantity}</ProductPrice>
                </PriceDetail>
              </Product>
            ))}
            <Hr />
          </Info>
          <Summary>
            <SummaryTitle>ORDER SUMMARY</SummaryTitle>
            <SummaryItem>
              <SummaryItemText>Subtotal</SummaryItemText>
              <SummaryItemPrice>$ {cart.total}</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem>
              <SummaryItemText>Estimated Shipping</SummaryItemText>
              <SummaryItemPrice>
                {cart.products.length ? "$ 25.90" : ""}
              </SummaryItemPrice>
            </SummaryItem>
            <SummaryItem>
              <SummaryItemText>Shipping Discount</SummaryItemText>
              <SummaryItemPrice>
                {cart.products.length ? "$ 5.90" : ""}
              </SummaryItemPrice>
            </SummaryItem>
            <SummaryItem type="total">
              <SummaryItemText>Total</SummaryItemText>
              <SummaryItemPrice>
                {cart.products.length ? `$ ${cart.total + 20}` : ""}
              </SummaryItemPrice>
            </SummaryItem>
            <Btn onClick={handleSubmit}>Check Out Now</Btn>
          </Summary>
        </Bottom>
        {open && (
          <SimpleSnackbar
            message={"Please sign in & choose order"}
            color={"error"}
          />
        )}
        {orders && (
          <SimpleSnackbar
            message={"Order placed successfully"}
            color={"success"}
          />
        )}
      </Wrapper>
      <Footer />
    </Container>
  );
};

export default Cart;
