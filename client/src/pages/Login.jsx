import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import Navbar from "../components/Navbar";
import { login } from "../redux/apiCalls";
//import { Formik, Form, Field } from "formik";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0.5)
    ),
    url("https://images.pexels.com/photos/6984650/pexels-photo-6984650.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940")
      center;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const Wrapper = styled.div`
  width: 40%;
  padding: 20px;
  background-color: white;
`;
const Form = styled.form`
  display: flex;
  flex-direction: column;
`;
const Title = styled.h1`
  font-size: 24px;
  font-weight: 300;
`;
const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 10px 0;
  padding: 10px;
`;
const Agreement = styled.span`
  font-size: 12px;
  margin: 20px 0px;
`;
const Button = styled.button`
  width: 40%;
  border: none;
  padding: 15px 20px;
  background-color: teal;
  color: white;
  cursor: pointer;
  margin-bottom: 10px;
  &:disabled {
    color: green;
    cursor: not-allowed;
  }
`;
const Link = styled.a`
  margin: 5px 0px;
  font-size: 12px;
  text-decoration: underline;
  cursor: pointer;
`;
const Error = styled.span`
  color: red;
`;

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const dispatch = useDispatch();
  const { isFetching, error } = useSelector((state) => state.user);

  function validateLogin(values) {
    let errors = {};

    if (values.username.trim() === "") {
      errors.username = "Username is required";
    }
    if (values.password.trim() === "") {
      errors.password = "Password is required";
    }

    return errors;
  }

  const handleClick = (e) => {
    e.preventDefault();
    if (Object.keys(validateLogin({ username, password })).length === 0) {
      login(dispatch, { username, password });
    } else {
      setErrors(validateLogin({ username, password }));
    }
  };

  return (
    <Container>
      <Navbar />
      <Wrapper>
        <Title>SIGN IN</Title>

        <Form>
          <Input
            name="username"
            placeholder="name"
            onChange={(e) => setUsername(e.target.value)}
            value={username}
          />
          {errors.username && <Error>{errors.username}</Error>}
          <Input
            name="password"
            placeholder="password"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
          {errors.password && <Error>{errors.password}</Error>}
          <Button onClick={handleClick} disabled={isFetching}>
            LOGIN
          </Button>
          {error && <Error>Something went wrong...</Error>}
          <Link>DON'T REMEMBER THE PASSWORD?</Link>
          <Link>CREATE A NEW ACCOUNT</Link>
        </Form>
      </Wrapper>
    </Container>
  );
};

export default Login;
