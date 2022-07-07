import React, { useRef, useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { publicRequest } from "../requestMethod";
import { mobilePt } from "../responsive";
import SearchIcon from "@mui/icons-material/Search";

const SearchContainer = styled.div`
  border: 0.5px solid lightgray;
  display: flex;
  align-items: center;
  margin-left: 25px;
  padding: 5px;
  position: relative;
  ${mobilePt({ margin: "0 15px", width: "100%" })}
`;

const Input = styled.input`
  border: none;
  ${mobilePt({ width: "100%" })}
  &:focus {
    outline: none;
  }
`;

const SearchDropdown = styled.div`
  position: absolute;
  top: 30px;
  left: 0;
  width: 100%;
  z-index: 2;
  background-color: #fff;
  border: 1px solid #ccc;
  padding: 10px;
`;
const SearchItemTitle = styled.h4`
  margin: 5px 0;
  font-size: 16px;
`;
const LinksStyled = styled(Link)`
  text-decoration: none;
  color: inherit;
  &:hover {
    text-decoration: ${(props) => (props.underline ? "underline" : "none")};
  }
`;
const Search = () => {
  const [searchValue, setSearchValue] = useState("");
  const [searchProducts, setSearchProducts] = useState([]);
  const [searchOpen, setSearchOpen] = useState(false);

  const searchRef = useRef();

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

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (
        searchOpen &&
        searchRef.current &&
        !searchRef.current.contains(e.target)
      ) {
        setSearchOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [searchOpen]);

  return (
    <SearchContainer ref={searchRef}>
      <Input
        placeholder="search"
        onChange={(e) => setSearchValue(e.target.value)}
        onClick={() => setSearchOpen(true)}
        value={searchValue}
      />

      <SearchIcon style={{ color: "grey", fontSize: 16 }} />
      {searchOpen && searchProducts.length > 0 && (
        <SearchDropdown>
          {searchProducts.map((p) => (
            <LinksStyled to={`/product/${p._id}`} underline>
              <SearchItemTitle>{p.title}</SearchItemTitle>
            </LinksStyled>
          ))}
        </SearchDropdown>
      )}
    </SearchContainer>
  );
};

export default Search;
