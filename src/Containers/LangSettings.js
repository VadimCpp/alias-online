import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import UserContext from "../contexts/userContext";
import { updateLang } from "../firebase";
import getString from '../utils/getString';
import Button from "../components/button";
import ContainerWithTitle from "../components/containerWithTitle";
import Container from "../components/constainer";

const BACK = -1;

const LangSettings = () => {
  // TODO: how to pass parameter once to the top tag of compound component?
  const HEADER_HEIGHT = "120px";
  const FOOTER_HEIGHT = "80px";

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
    },
    {
      text: 'NORWEGIAN',
      langKey: 'NO',
      abbreviation: 'NO',
    }
  ];

  return (
    <Container paddingTop={HEADER_HEIGHT} paddingBottom={FOOTER_HEIGHT}>
      <Container.Header height={HEADER_HEIGHT}>
        <LangHeader>
          <Title onClick={() => navigate("/")}>{getString(interfaceLang, "LANGUAGE_SETTINGS")}</Title>
        </LangHeader>
      </Container.Header>
      <Container.Content>
        <LangContent>
          <ContainerWithTitle title={getString(interfaceLang, "CHOOSE_LANGUAGE")}>
            <RadioButton>
              {
                langOptions.map((option) => {
                  let isChecked = interfaceLang === option.langKey;
                  return (
                    <p>
                      <input
                        type="radio"
                        name="langOptions"
                        id={option.langKey}
                        value={option.langKey}
                        checked={isChecked}
                        onChange={(e) => langHandler(e.target.value)}
                      />
                      <label key={option.langKey}>
                        {getString(interfaceLang, option.text)}
                      </label>
                    </p>
                  )
                })
              }
            </RadioButton>
          </ContainerWithTitle>
        </LangContent>
      </Container.Content>
      <Container.Footer height={FOOTER_HEIGHT}>
        <LangFooter>
          <Button onClick={() => navigate(BACK)}>
            { getString(interfaceLang, "BACK") }
          </Button>
        </LangFooter>
      </Container.Footer>
    </Container>
  );
};

const RadioButton = styled.div`
  font-size: 15px;
  display: flex;
  flex-direction: column;
  padding-bottom: 1.5em;
`;

const Title = styled.h1`  
  text-align: center;
  font-size: 36px;
  color: #ffffff;
  font-style: normal;
  font-weight: 700; 
  cursor: pointer;
`;

const LangHeader = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  height: 100%;
  background-color: #2BC48A;
  padding: 0 20px;
`;

const LangContent = styled.div`
  max-width: 360px;
  margin: 34px auto 0;
  padding: 0 10px;
`;

const LangFooter = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  height: 100%;
  background-color: #222;
  padding: 0 20px;
  color: white;
`;

export default LangSettings;
