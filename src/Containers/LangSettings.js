import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import UserContext from "../contexts/userContext";
import { updateLang } from "../firebase";
import getString from '../utils/getString';
import Wrapper from "../components/wrapper";
import Header from "../components/header";
import Footer from "../components/footer";
import Button from "../components/button";
import AliasHeader from "../components/aliasHeader";
import FlexContainer from "../components/flexContainer";
import Main from "../components/main";

const LangSettings = () => {
  const navigate = useNavigate();

  const { user, interfaceLang, setInterfaceLang } = useContext(UserContext);

  const langHandler = async (key) => {
    console.log("123", interfaceLang, user, key)
    if (user) {
      await updateLang(user.uid, key)
    } else {
      setInterfaceLang(key)
    }
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
    <Wrapper>
      <Header
        isPrimary={false}
        isSign={false}
        isLang={true}>
        <AliasHeader>Language settings</AliasHeader>
      </Header>
      <Main>
        <ButtonsWrapper>
          <FlexContainer direction={'column'}>
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
          </FlexContainer>
        </ButtonsWrapper>
      </Main>
      <Footer>
        <Button
          uppercase={'uppercase'}
          onClick={() => navigate("/signin")}
        >
          back
        </Button>
      </Footer>
    </Wrapper>
  );
};

const ButtonsWrapper = styled.div`
border: solid 0.1em;
border-radius: 2em;
padding: 1.5em 2em 1em 2em;
`

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

export default LangSettings;
