import React, { useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { register } from "../redux/apiCalls";
import { mobile } from "../responsive";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0.5)
    ),
    url("https://images.pexels.com/photos/6984661/pexels-photo-6984661.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940")
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
  ${mobile({ width: "75%" })}
`;
const Form = styled.form`
  display: flex;
  flex-wrap: wrap;
`;
const Title = styled.h1`
  font-size: 24px;
  font-weight: 300;
`;
const InputWrap = styled.div`
  flex: 1;
  min-width: 40%;
  margin: 20px 10px 0px 0px;
`;
const Input = styled.input`
  padding: 10px;
  width: 100%;
  box-sizing: border-box;
`;
const Error = styled.p`
  color: red;
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
  margin-top: 15px;
  cursor: pointer;
`;

const Register = () => {
  const [inputs, setInputs] = useState({
    firstName: "",
    lastName: "",
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState([]);
  const dispatch = useDispatch();

  function validateRegister(values) {
    let errors = {};

    if (values.firstName.trim() === "") {
      errors.firstName = "First name is required";
    }
    if (values.lastName.trim() === "") {
      errors.lastName = "Last name is required";
    }
    if (values.email.trim() === "") {
      errors.email = "Email is required";
    }
    if (values.username.trim() === "") {
      errors.username = "Username is required";
    }
    if (values.password.trim() === "") {
      errors.password = "Password is required";
    }
    if (values.confirmPassword.trim() !== values.password.trim()) {
      errors.confirmPassword = "Passwords must match";
    }
    return errors;
  }

  const handleInputs = (e) => {
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (Object.keys(validateRegister(inputs)).length === 0) {
      register(dispatch, inputs);
    } else {
      setErrors(validateRegister(inputs));
    }
  };
  return (
    <Container>
      <Wrapper>
        <Title>CREATE AN ACCOUNT</Title>
        <Form onSubmit={handleSubmit}>
          <InputWrap>
            <Input
              placeholder="name"
              onChange={handleInputs}
              name="firstName"
            />
            {errors.firstName && <Error>{errors.firstName}</Error>}
          </InputWrap>
          <InputWrap>
            <Input
              placeholder="last name"
              onChange={handleInputs}
              name="lastName"
            />
            {errors.lastName && <Error>{errors.lastName}</Error>}
          </InputWrap>
          <InputWrap>
            <Input placeholder="email" onChange={handleInputs} name="email" />
            {errors.email && <Error>{errors.email}</Error>}
          </InputWrap>
          <InputWrap>
            <Input
              placeholder="username"
              onChange={handleInputs}
              name="username"
            />
            {errors.username && <Error>{errors.username}</Error>}
          </InputWrap>
          <InputWrap>
            <Input
              placeholder="password"
              onChange={handleInputs}
              name="password"
              type="password"
            />
            {errors.password && <Error>{errors.password}</Error>}
          </InputWrap>
          <InputWrap>
            <Input
              placeholder="confirm password"
              onChange={handleInputs}
              name="confirmPassword"
              type="password"
            />
            {errors.confirmPassword && <Error>{errors.confirmPassword}</Error>}
          </InputWrap>
          <Agreement>
            By creating an account, I consent to the processing of my personal
            data in accordance with the <b>PRIVACY POLICY</b>
          </Agreement>
          <Button>CREATE</Button>
        </Form>
      </Wrapper>
    </Container>
  );
};

export default Register;
