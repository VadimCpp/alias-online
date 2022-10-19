import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { signInWithGoogle, logOut } from "../firebase";
import LanguageContext from "../contexts/languageContext";
import getString from '../utils/getString';

const LangSettings = () => {
  const navigate = useNavigate();
  const { interfaceLang, setInterfaceLang } = useContext(LanguageContext);

  const langHandler = (key) => {
    setInterfaceLang(key)
  }

  const langOptions = [
    {
      text: 'ENGLISH',
      langKey: 'EN',
      abbreviation: 'GB',
    },
    {
      text: 'UKRANIAN',
      langKey: 'UA',
      abbreviation: 'UA',
    },
    {
      text: 'RUSSIAN',
      langKey: 'RU',
      abbreviation: 'RU',
    }
  ];


  return (
    <Container>
      <ButtonBack>
        <button onClick={() => navigate("/signin")}>back</button>
      </ButtonBack>
      <HomeHeader>Language settings</HomeHeader>
      <ButtonsWrapper>
        <ButtonsContainer>
          <ButtonsContainerHeader>
            Choice Language
          </ButtonsContainerHeader>

          <RadioButton>
            {
              langOptions.map((option) => {
                let isChecked = interfaceLang === option.langKey ? true : false;
                return (
                  <label key={option.langKey}>
                    <input
                      type="radio"
                      name="langOptions"
                      value={option.langKey}
                      checked={isChecked}
                      onChange={(e) => langHandler(e.target.value)}
                    />
                    {getString(interfaceLang, option.text)} {option.abbreviation}
                  </label>
                )
              })
            }
          </RadioButton>
        </ButtonsContainer>
      </ButtonsWrapper>
    </Container>
  );
};

const HomeHeader = styled.h1`
  text-align: center;
  font-size: 3em;
  margin-bottom: .5em;
`;


const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding-right: 1em;
  padding-left: 1em;
  height: 100vh;
`;
const ButtonsWrapper = styled.div`
border: solid 0.1em;
border-radius: 2em;
padding: 1.5em 2em 1em 2em;
`

const ButtonsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 10%;
`;

const RadioButton = styled.div`
  font-size: 15px;
  display: flex;
  flex-direction: column;
  padding-bottom: 1.5em;

`;

const ButtonsContainerHeader = styled.div`
  font-size: 20px;
  position: relative;
  top: -55px;
  background: gray;
  padding: 10px 15px 10px 15px;
  border-radius: 50px;
`;

const ButtonBack = styled.div`
left: -5em;
border: red 2px;
`

export default LangSettings;
