import React from 'react';
import styled from "styled-components"
import SendIcon from '@mui/icons-material/Send';
import { mobile } from '../responsive';

const Container = styled.div`
    height: 60vh;
    background-color: #fcf5f5;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;

`
const Title = styled.h1`
    font-size: 70px;
    margin-bottom: 20px;
    ${mobile({ fontSize: "50px", textAlign: "center" })}
`
const Description = styled.div`
    font-size: 24px;
    font-weight: 300;
    margin-bottom: 20px;
    padding: 0 20px;
    text-align: center;
`
const InputContainer = styled.div`
    width: 50%;
    height: 40px;
    background-color: white;
    display: flex;
    justify-content: space-between;
    border: 1px solid lightgrey;
`
const Input = styled.input`
    border: none;
    flex: 8;
    padding-left: 20px;
`
const Btn = styled.button`
    flex: 1;
    border: none;
    background-color: teal;
    color: white;
`

const Newsletter = ({item}) => {
  return (
    <Container>
        <Title>Newsletter</Title>
        <Description>Get Timely Updates From Your Favorite Products</Description>
        <InputContainer>
            <Input placeholder='Your email'/>
            <Btn>
                <SendIcon />
            </Btn>
        </InputContainer>
    </Container>
  );
}

export default Newsletter;
