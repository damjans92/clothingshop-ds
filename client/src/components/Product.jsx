import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { useLocation } from "react-router-dom";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import { publicRequest } from "../requestMethod";
import { useDispatch } from "react-redux";
import { addProduct } from "../redux/cartRedux";
import { mobile } from "../responsive";

const Overlay = styled.div`
  opacity: 0;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.2);
  z-index: 3;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.5s ease;
`;

const Container = styled.div`
  flex: 1;
  margin: 5px;
  min-width: 280px;
  height: 432px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;

  &:hover ${Overlay} {
    opacity: 1;
  }
  ${mobile({ height: "auto" })}
`;
const Top = styled.div`
  position: relative;
  width: 100%;
  height: 350px;
`;
const Image = styled.img`
  height: 100%;
  width: 100%;
  z-index: 2;
  object-fit: cover;
`;
const Title = styled.h3`
  text-align: left;
  margin: 10px 0;
  width: 100%;
`;
const Price = styled.span`
  width: 100%;
  text-align: left;
`;
const Size = styled.span`
  width: 100%;
  text-align: left;
`;
const Icon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 10px;

  cursor: pointer;
  transition: all 0.5s ease;

  &:hover {
    background-color: #e9f5f5;
    transform: scale(1.1);
  }
`;
const LinksStyled = styled(Link)`
  text-decoration: none;
  color: inherit;
`;
const LinkBlock = styled(Link)`
  display: block;
  height: 100%;
`;
const Product = ({ item }) => {
  return (
    <Container>
      <Top>
        <LinkBlock to={`/product/${item._id}`}>
          <Image src={item.img} to={`/product/${item._id}`} />
          <Overlay />
        </LinkBlock>
      </Top>

      <Title>{item.title}</Title>
      <Price>${item.price}</Price>
      <Size>Size available: {item.size.join(", ")}</Size>
    </Container>
  );
};

export default Product;
