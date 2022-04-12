import React from "react";
import styled from "styled-components";
import Product from "./Product";
import axios from "axios";
import { url } from "../requestMethod.js";
import { useLocation } from "react-router-dom";

const Container = styled.div`
  display: flex;
  padding: 20px;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const Products = ({ cat, filters, sort }) => {
  const [products, setProducts] = React.useState([]);
  const [filteredProducts, setFilteredProducts] = React.useState([]);
  const location = useLocation();


  React.useEffect(() => {
    const getProducts = async () => {
      try {
        const response = await axios.get(
          cat ? `${url}/products?category=${cat}` : `${url}/products`
        );
        setProducts(response.data);
      } catch (err) {
        console.log(err);
      }
    };
    getProducts();
  }, [cat]);

  React.useEffect(() => {
    cat &&
      setFilteredProducts(
        products.filter((item) =>
          Object.entries(filters).every(([key, value]) =>
            item[key].includes(value)
          )
        )
      );
  }, [cat, products, filters]);

  React.useEffect(() => {
    if (sort === "newest") {
      setFilteredProducts((prev) =>
        [...prev].sort((x, y) => new Date(y.createdAt) - new Date(x.createdAt))
      );
    } else if (sort === "asc") {
      setFilteredProducts((prev) =>
        [...prev].sort((x, y) => x.price - y.price)
      );
    } else if (sort === "desc") {
      setFilteredProducts((prev) =>
        [...prev].sort((x, y) => y.price - x.price)
      );
    } else {
      setFilteredProducts((prev) =>
        [...prev].sort((x, y) => new Date(x.createdAt) - new Date(y.createdAt))
      );
    }
  }, [sort]);

  return (
    <Container>
      {cat
        ? filteredProducts.map((item) => <Product key={item._id} item={item} />)
        : location.pathname === `/`
        ? products
            .slice(2, 10)
            .map((item) => <Product key={item._id} item={item} />)
        : products.map((item) => <Product key={item._id} item={item} />)}
    </Container>
  );
};

export default Products;
