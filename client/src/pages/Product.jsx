import React from "react";
import styled from "styled-components";
import Announcement from "../components/Announcement";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Newsletter from "../components/Newsletter";
import RemoveOutlinedIcon from "@mui/icons-material/RemoveOutlined";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { large, tablet, mobile_lg } from "../responsive";
import { publicRequest } from "../requestMethod";
import { Link, useLocation } from "react-router-dom";
import { addProduct } from "../redux/cartRedux";
import { useDispatch } from "react-redux";
import SimpleSnackbar from "../components/Toast";

const Container = styled.div``;
const Wrapper = styled.div`
  padding: 50px;
  display: flex;
  ${large({ flexDirection: "column" })}
`;
const ImgContainer = styled.div`
  flex: 1;
`;
const Image = styled.img`
  width: 100%;
  object-fit: cover;
`;
const InfoContainer = styled.div`
  flex: 1;
  padding: 0px 50px;
  ${mobile_lg({ padding: "0" })}
`;
const Title = styled.h1`
  font-weight: 200;
`;
const Desc = styled.p`
  margin: 20px 0px;
`;
const Price = styled.span`
  font-weight: 100;
  font-size: 40px;
`;
const FilterContainer = styled.div`
  width: 50%;
  display: flex;
  justify-content: space-between;
  margin: 30px 0px;
  ${tablet({ width: "100%", flexDirection: "column" })}
`;

const Filter = styled.div`
  display: flex;
  align-items: center;
  ${tablet({ paddingTop: "10px" })}
`;

const FilterTitle = styled.span`
  font-size: 20px;
  font-weight: 200;
  margin-right: 0.5rem;
`;

const FilterColor = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
  margin: 0px 5px;
  cursor: pointer;
`;

// const FilterSize = styled.select`
//   margin-left: 10px;
//   padding: 5px;
// `;

// const FilterSizeOption = styled.option``;
const AddContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  ${tablet({ width: "100%", flexDirection: "column", alignItems: "baseline" })}
`;
const AmountContainer = styled.div`
  display: flex;
  align-items: center;
  font-weight: 700;
`;
const Amount = styled.span`
  width: 30px;
  height: 30px;
  border-radius: 10px;
  border: 1px solid teal;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0px 5px;
`;
const Btn = styled.button`
  width: 125px;
  color: black;
  padding: 10px;
  border: 2px solid purple;
  background-color: white;
  font-weight: 500;
  cursor: pointer;
  ${tablet({ marginTop: "10px" })}

  &:hover {
    background-color: #f8f4f4;
  }
`;

const BtnContainer = styled.div`
  display: flex;
`;

const Product = () => {
  const location = useLocation();
  const id = location.pathname.split("/")[2];
  const [product, setProduct] = React.useState({});
  const [quantity, setQuantity] = React.useState(1);
  const [size, setSize] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const dispatch = useDispatch();

  React.useEffect(() => {
    const getProduct = async () => {
      try {
        const response = await publicRequest.get("/products/find/" + id);
        setProduct(response.data);
      } catch (err) {
        console.log(err);
      }
    };
    getProduct();
  }, [id]);

  const handleQuantity = (type) => {
    if (type === "decr") {
      setQuantity(quantity === 1 ? quantity : quantity - 1);
    } else {
      setQuantity(quantity + 1);
    }
  };

  const handleClick = () => {
    //add to Cart
    if (size) {
      dispatch(addProduct({ ...product, quantity, size }));
    } else {
      setOpen(true);
    }
  };

  return (
    <Container>
      <Navbar />
      <Announcement />
      <Wrapper>
        <ImgContainer>
          <Image src={product.img} alt="product_picture" />
        </ImgContainer>
        <InfoContainer>
          <Title>{product.title}</Title>
          <Desc>{product.desc}</Desc>
          <Price>${product.price}</Price>
          <FilterContainer>
            <Filter>
              <FilterTitle>Color</FilterTitle>
              {product.color?.map((c) => (
                <FilterColor key={c} color={c} />
              ))}
            </Filter>
            <Filter>
              <FilterTitle>Size</FilterTitle>
              <FormControl style={{ width: "125px" }} fullWidth>
                <InputLabel>Size</InputLabel>
                <Select onChange={(e) => setSize(e.target.value)}>
                  <MenuItem disabled>Size</MenuItem>
                  {product.size?.map(
                    (s) =>
                      !(s === "all") && (
                        <MenuItem key={s} value={s}>
                          {s}
                        </MenuItem>
                      )
                  )}
                </Select>
              </FormControl>
            </Filter>
          </FilterContainer>
          <AddContainer>
            <AmountContainer>
              <RemoveOutlinedIcon
                style={{ cursor: "pointer" }}
                onClick={() => handleQuantity("decr")}
              />
              <Amount>{quantity}</Amount>
              <AddOutlinedIcon
                style={{ cursor: "pointer" }}
                onClick={() => handleQuantity("incr")}
              />
            </AmountContainer>
            <BtnContainer>
              <Btn onClick={handleClick}>ADD TO CART</Btn>
              <Link style={{ marginLeft: "10px" }} to="/products">
                <Btn>CONTINUE SHOPPING</Btn>
              </Link>
            </BtnContainer>
          </AddContainer>
        </InfoContainer>
      </Wrapper>
      <Newsletter />
      <Footer />
      {open && (
        <SimpleSnackbar color={"error"} message={"Please choose a size"} />
      )}
    </Container>
  );
};

export default Product;
