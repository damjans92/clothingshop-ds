import React from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import Badge from "@mui/material/Badge";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import { mobile, mobilePt } from "../responsive";
import { Link } from "react-router-dom";
import { logout } from "../redux/userRedux";
import Search from "./Search";

const Container = styled.div`
  height: 60px;
  ${mobilePt({ height: "90px" })}
`;

const Wrapper = styled.div`
  padding: 10px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  ${mobilePt({ padding: "10px 0px", flexWrap: "wrap" })}
`;

const Left = styled.div`
  flex: 1;
  display: flex;
  ${mobilePt({ width: "100%", flex: "auto", order: 3, marginTop: "15px" })}
`;

const Language = styled.span`
  font-size: 14px;
  cursor: pointer;
  ${mobilePt({ display: "none" })}
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

const Navbar = () => {
  const quantity = useSelector((state) => state.cart.quantity);
  const cUser = useSelector((state) => state.user.currentUser);

  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <Container>
      <Wrapper>
        <Left>
          <Search />
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
