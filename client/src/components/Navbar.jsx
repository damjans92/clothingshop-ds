import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import SearchIcon from "@mui/icons-material/Search";
import Badge from "@mui/material/Badge";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import { mobile, mobilePt } from "../responsive";
import { Link } from "react-router-dom";
import { logout } from "../redux/userRedux";
import { publicRequest } from "../requestMethod";

const Container = styled.div`
  height: 60px;
  ${mobilePt({ height: "90px" })}
`;

const Wrapper = styled.div`
  padding: 10px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  ${mobile({ padding: "10px 0px" })}
`;

const Left = styled.div`
  flex: 1;
  display: flex;
`;

const Language = styled.span`
  font-size: 14px;
  cursor: pointer;
  ${mobilePt({ display: "none" })}
`;

const SearchContainer = styled.div`
  border: 0.5px solid lightgray;
  display: flex;
  align-items: center;
  margin-left: 25px;
  padding: 5px;
  position: relative;
  ${mobilePt({ marginLeft: "0px", order: 3 })}
`;

const Input = styled.input`
  border: none;
  ${mobilePt({ width: "100px" })}
  ${mobile({ width: "50px" })}
  &:focus {
    outline: none;
  }
`;

const Center = styled.div`
  flex: 1;
  text-align: center;
`;

const Logo = styled.h1`
  font-weight: bold;
  ${mobile({ fontSize: "24px" })}
  a {
    color: inherit;
    text-decoration: none;
  }
`;

const Right = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  ${mobile({ justifyContent: "center" })}
`;

const MenuItem = styled.div`
  font-size: 14px;
  cursor: pointer;
  margin-left: 25px;
  ${mobile({ fontSize: "12px", marginLeft: "10px" })}
  a {
    color: inherit;
    text-decoration: none;
  }
`;

const LinksStyled = styled(Link)`
  text-decoration: none;
  color: inherit;
  &:hover {
    text-decoration: ${(props) => (props.underline ? "underline" : "none")};
  }
`;
const SearchDropdown = styled.div`
  position: absolute;
  top: 30px;
  left: 0;
  width: 100%;
  z-index: 2;
  background-color: #fff;
  padding: 10px;
`;
const Navbar = () => {
  const quantity = useSelector((state) => state.cart.quantity);
  const cUser = useSelector((state) => state.user.currentUser);
  const [searchValue, setSearchValue] = useState("");
  const [searchProducts, setSearchProducts] = useState([]);
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(logout());
  };

  useEffect(() => {
    const searchHandler = async (e) => {
      const res = await publicRequest.post("/products/search", {
        searchQuery: searchValue,
      });

      setSearchProducts(res.data);
    };
    if (searchValue !== "") {
      searchHandler();
    } else {
      setSearchProducts([]);
    }

    return () => setSearchProducts([]);
  }, [searchValue]);

  return (
    <Container>
      <Wrapper>
        <Left>
          <SearchContainer>
            <Input
              placeholder="search"
              onChange={(e) => setSearchValue(e.target.value)}
              value={searchValue}
            />

            <SearchIcon style={{ color: "grey", fontSize: 16 }} />
            {searchProducts.length > 0 && (
              <SearchDropdown>
                {searchProducts.map((p) => (
                  <LinksStyled to={`/product/${p._id}`} underline>
                    <h4>{p.title}</h4>
                  </LinksStyled>
                ))}
              </SearchDropdown>
            )}
          </SearchContainer>
        </Left>
        <Center>
          <Logo>
            <Link to="/">LAMA.</Link>
          </Logo>
        </Center>
        <Right>
          {cUser ? (
            <>
              <span>Welcome, {cUser.username}</span>
              <MenuItem onClick={handleLogout}>LOGOUT</MenuItem>
            </>
          ) : (
            <>
              <MenuItem>
                <Link to="/register">REGISTER </Link>
              </MenuItem>

              <MenuItem>
                <Link to="/login">SIGN IN </Link>
              </MenuItem>
            </>
          )}
          <LinksStyled to="/cart">
            <MenuItem>
              <Badge badgeContent={quantity} color="primary">
                <ShoppingCartOutlinedIcon />
              </Badge>
            </MenuItem>
          </LinksStyled>
        </Right>
      </Wrapper>
    </Container>
  );
};

export default Navbar;
