import React from "react";
import styled from "styled-components";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Announcement from "../components/Announcement";
import Navbar from "../components/Navbar";
import Newsletter from "../components/Newsletter";
import Products from "../components/Products";
import Footer from "../components/Footer";
import { mobile, tablet } from "../responsive";
import { useLocation } from "react-router-dom";

const Container = styled.div``;
const Title = styled.h1`
  margin: 20px;
`;
const FilterContainer = styled.div`
  display: flex;
  justify-content: space-between;
  ${tablet({ flexDirection: "column" })}
`;
const Filter = styled.div`
  margin: 20px;
  ${mobile({ display: "grid" })}
`;
const FilterText = styled.span`
  font-size: 20px;
  font-weight: 600;
  margin-right: 20px;
`;

// const Select = styled.select`
//   padding: 10px;
//   margin-right: 20px;
// `;
// const Option = styled.option``;

const ProductList = () => {
  const location = useLocation();
  const cat = location.pathname.split("/")[2];
  const [filters, setFilters] = React.useState(Object);
  const [sort, setSort] = React.useState("");

  const handleFilters = (e) => {
    const value = e.target.value;
    setFilters({
      ...filters,
      [e.target.name]: value,
    });
  };

  return (
    <Container>
      <Navbar />
      <Announcement />
      <Title>Mens {cat} Collection</Title>
      {cat !== undefined && (
        <FilterContainer>
          <Filter>
            <FilterText>Filter Products: </FilterText>
            <FormControl style={{ marginTop: "1rem" }} fullWidth>
              <InputLabel>Color</InputLabel>
              <Select
                name="color"
                onChange={handleFilters}
              >
                <MenuItem value="all">Color</MenuItem>
                <MenuItem value="white">White</MenuItem>
                <MenuItem value="black">Black</MenuItem>
                <MenuItem value="red">Red</MenuItem>
                <MenuItem value="green">Green</MenuItem>
                <MenuItem value="grey">Grey</MenuItem>
                <MenuItem value="orange">Orange</MenuItem>
                <MenuItem value="blue">Blue</MenuItem>
              </Select>
            </FormControl>
            {!(cat === "Accessories" || cat === "Sneakers") && (
              <FormControl style={{ marginTop: "1rem" }} fullWidth>
                <InputLabel>Size</InputLabel>
                <Select name="size" onChange={handleFilters}>
                  <MenuItem value="all">Size</MenuItem>
                  <MenuItem value="S">S</MenuItem>
                  <MenuItem value="M">M</MenuItem>
                  <MenuItem value="L">L</MenuItem>
                  <MenuItem value="XL">XL</MenuItem>
                  <MenuItem value="XXL">XXL</MenuItem>
                </Select>
              </FormControl>
            )}
          </Filter>
          <Filter>
            <FilterText>Sort Products: </FilterText>
            <FormControl style={{ marginTop: "1rem" }} fullWidth>
              <InputLabel>Sort</InputLabel>
              <Select onChange={(e) => setSort(e.target.value)}>
                <MenuItem value="all">All</MenuItem>
                <MenuItem value="newest">Newest</MenuItem>
                <MenuItem value="asc">Price (asc) </MenuItem>
                <MenuItem value="desc">Price (desc) </MenuItem>
              </Select>
            </FormControl>
          </Filter>
        </FilterContainer>
      )}
      <Products cat={cat} filters={filters} sort={sort} />
      <Newsletter />
      <Footer />
    </Container>
  );
};

export default ProductList;
