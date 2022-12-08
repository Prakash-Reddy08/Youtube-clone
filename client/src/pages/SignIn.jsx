import React, { useEffect } from "react";
import styled from "styled-components";
import { axiosPrivate } from "../utils/axios";
import { useDispatch, useSelector } from 'react-redux';
import { loginFailure, loginStart, loginSuccess } from "../features/userSlice";
import { useNavigate } from 'react-router-dom';
const SignIn = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { currentUser } = useSelector(state => state.user)
  useEffect(() => {
    if (currentUser) {
      navigate('/');
    }
  }, [navigate, currentUser])
  const handleSignIn = async (e) => {
    e.preventDefault();
    const email = e.target.email.value
    const password = e.target.password.value
    dispatch(loginStart());
    try {
      const res = await axiosPrivate.post('/auth/signin', { email, password });
      const { accessToken, ...userDetails } = res?.data;
      dispatch(loginSuccess(userDetails));
      e.target.email.value = ""
      e.target.password.value = ""
    } catch (error) {
      dispatch(loginFailure())
      console.log(error.response.data.message);
    }
  }
  const handleSignUp = async (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const email = e.target.email.value
    const password = e.target.password.value
    try {
      await axiosPrivate.post('/auth/signup', { name, email, password });
      e.target.name.value = ""
      e.target.email.value = ""
      e.target.password.value = ""
    } catch (error) {
      console.log(error.response.data.message);
    }
  }
  return (
    <Container>
      <Wrapper>
        <Title>Sign in</Title>
        <Form onSubmit={handleSignIn}>
          <SubTitle>to continue to Youtube</SubTitle>
          <Input name="email" type="email" placeholder="email" />
          <Input name="password" type="password" placeholder="password" />
          <Button>Sign in</Button>
        </Form>
        <Title>or</Title>
        <Form onSubmit={handleSignUp}>
          <Input name="name" type='text' placeholder="username" />
          <Input name="email" type="email" placeholder="email" />
          <Input name="password" type="password" placeholder="password" />
          <Button>Sign up</Button>
        </Form>
      </Wrapper>
      <More>
        English(USA)
        <Links>
          <Link>Help</Link>
          <Link>Privacy</Link>
          <Link>Terms</Link>
        </Links>
      </More>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: calc(100vh - 56px);
  color: ${({ theme }) => theme.text};
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  background-color: ${({ theme }) => theme.bgLighter};
  border: 1px solid ${({ theme }) => theme.soft};
  padding: 20px 50px;
  gap: 10px;
`;

const Form = styled.form`
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 10px;
`

const Title = styled.h1`
  font-size: 24px;
`;

const SubTitle = styled.h2`
  font-size: 20px;
  font-weight: 300;
`;

const Input = styled.input`
  border: 1px solid ${({ theme }) => theme.soft};
  border-radius: 3px;
  padding: 10px;
  background-color: transparent;
  width: 100%;
  color: ${({ theme }) => theme.text};
`;

const Button = styled.button`
  border-radius: 3px;
  border: none;
  padding: 10px 20px;
  font-weight: 500;
  cursor: pointer;
  background-color: ${({ theme }) => theme.soft};
  color: ${({ theme }) => theme.textSoft};
`;

const More = styled.div`
  display: flex;
  margin-top: 10px;
  font-size: 12px;
  color: ${({ theme }) => theme.textSoft};
`;

const Links = styled.div`
  margin-left: 50px;
`;

const Link = styled.span`
  margin-left: 30px;
`;


export default SignIn;