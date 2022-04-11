import React from "react";
import styled from "styled-components";
import SearchIcon from "@mui/icons-material/Search";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import Badge from "@mui/material/Badge";
import { slide as MobileMenu } from "react-burger-menu";
import { tablet } from "../responsive";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../redux/userRedux";

const Container = styled.div`
  height: 60px;
  position: relative;
`;

const Wrapper = styled.div`
  padding: 10px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Left = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  ${tablet({ display: "none" })}
`;

const Language = styled.span`
  font-size: 14;
  cursor: pointer;
`;

const SearchContainer = styled.div`
  border: 0.5px solid lightgray;
  display: flex;
  align-items: center;
  margin: 0 25px;
  padding: 5px;
`;

const Input = styled.input`
  border: none;
`;

const Center = styled.div`
  flex: 1;
  text-align: center;
`;

const Logo = styled.h1`
  font-weight: bold;
  margin: 0;

`;

const Right = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  ${tablet({ display: "none" })}
`;

const UserLoginInfo = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const MenuItem = styled.div`
  font-size: 14px;
  cursor: pointer;
  margin-left: 25px;
`;

const MobileMenuFlex = styled.div`
  display: flex;
  flex-direction: column;
`;

const MobileUserLoginInfo = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 1.5rem;
`;

const MobileMenuItem = styled.div`
  margin-top: 1rem;
`;
const MobileLeft = styled.div`
  display: flex;
  align-items: center;
`;

const mobileMenuStyles = {
  bmBurgerButton: {
    position: "absolute",
    width: "36px",
    height: "30px",
    left: "1rem",
    top: "1rem",
  },
  bmBurgerBars: {
    background: "#373a47",
  },
  bmBurgerBarsHover: {
    background: "#a90000",
  },
  bmCrossButton: {
    height: "24px",
    width: "24px",
  },
  bmCross: {
    background: "#bdc3c7",
  },
  bmMenuWrap: {
    position: "fixed",
    height: "100%",
    top: "0px",
  },
  bmMenu: {
    overflow: "hidden",
    background: "#373a47",
    fontSize: "1.15em",
  },
  bmMorphShape: {
    fill: "#373a47",
  },
  bmItemList: {
    color: "#b8b7ad",
    padding: "0.8em",
  },
  bmItem: {
    display: "inline-block",
    padding: "0",
  },
  bmOverlay: {
    background: "rgba(0, 0, 0, 0.3)",
    top: "0px",
  },
};

const linkStyle = {
  color: "inherit",
  textDecoration: "none",
};

const Navbar = () => {
  const quantity = useSelector((state) => state.cart.quantity);
  const loggedInUser = useSelector((state) => state.user.currentUser);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout())
  }

  return (
    <Container className={"font-link"}>
      <MobileMenu styles={{ ...mobileMenuStyles }}>
        <Wrapper>
          <Link to="/">
          <Logo>Jeremiahs.</Logo>
          </Link>
          <MobileLeft style={{ marginTop: "8px" }}>
            <Language>EN</Language>
            <SearchContainer>
              <Input />
              <SearchIcon style={{ color: "gray", fontSize: "16px" }} />
            </SearchContainer>
            <Link to="/cart">
              <Badge
                style={{ display: "block" }}
                badgeContent={quantity}
                color="secondary"
              >
                <ShoppingCartOutlinedIcon
                  style={{ color: "rgb(184, 183, 173)", fontSize: "1.5rem" }}
                />
              </Badge>
            </Link>
          </MobileLeft>
          <MobileMenuFlex>
            {loggedInUser ? (
              <MobileUserLoginInfo>
                <span style={{ margin: "1rem 0" }}>{loggedInUser.email}</span>
                <LogoutOutlinedIcon onClick={handleLogout} />
              </MobileUserLoginInfo>
            ) : (
              <MobileUserLoginInfo style={{ fontSize: "1rem" }}>
                <Link style={linkStyle} to="/register">
                <MobileMenuItem>REGISTER</MobileMenuItem>
                </Link>
                <Link style={linkStyle} to="/login">
                  <MobileMenuItem>SIGN IN</MobileMenuItem>
                </Link>
              </MobileUserLoginInfo>
            )}
          </MobileMenuFlex>
        </Wrapper>
      </MobileMenu>
      <Wrapper>
        <Left>
          <Language>EN</Language>
          <SearchContainer>
            <Input />
            <SearchIcon style={{ color: "gray", fontSize: "16px" }} />
          </SearchContainer>
        </Left>
        <Center>
          <Link style={linkStyle} to="/">
            <Logo>Jeremiahs.</Logo>
          </Link>
        </Center>
        <Right>
          {loggedInUser ? (
            <UserLoginInfo>
              <span style={{ paddingRight: "1.5rem" }}>
                {loggedInUser.email}
              </span>
              <LogoutOutlinedIcon style={{cursor: "pointer"}} onClick={() => dispatch(logout())} />
            </UserLoginInfo>
          ) : (
            <UserLoginInfo>
              <Link style={linkStyle} to="/register">
                <MenuItem>REGISTER</MenuItem>
              </Link>
              <Link style={linkStyle} to="/login">
                <MenuItem>SIGN IN</MenuItem>
              </Link>
            </UserLoginInfo>
          )}
          <Link to="/cart">
            <MenuItem>
              <Badge badgeContent={quantity} color="secondary">
                <ShoppingCartOutlinedIcon />
              </Badge>
            </MenuItem>
          </Link>
        </Right>
      </Wrapper>
    </Container>
  );
};

export default Navbar;
