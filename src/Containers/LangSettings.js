import React, { useContext } from "react";
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
import Main from "../components/main";
import ContainerWithTitle from "../components/containerWithTitle";

const BACK = -1;

const LangSettings = () => {
  const navigate = useNavigate();

  const { user, interfaceLang, setInterfaceLang } = useContext(UserContext);

  const langHandler = async (key) => {
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
        <AliasHeader onClick={() => navigate("/")}> { getString(interfaceLang, "LANGUAGE_SETTINGS") } </AliasHeader>
      </Header>
      <Main>
        <ContainerWithTitle title={getString(interfaceLang, "CHOOSE_LANGUAGE")}>
          <RadioButton>
            {
              langOptions.map((option) => {
                let isChecked = interfaceLang === option.langKey;
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
        </ContainerWithTitle>
      </Main>
      <Footer>
        <Button
          uppercase={'uppercase'}
          onClick={() => navigate(BACK)}
        >
          { getString(interfaceLang, "BACK") }
        </Button>
      </Footer>
    </Wrapper>
  );
};

const RadioButton = styled.div`
  font-size: 15px;
  display: flex;
  flex-direction: column;
  padding-bottom: 1.5em;
`;

export default LangSettings;
