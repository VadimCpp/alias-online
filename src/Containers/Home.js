import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import LanguageContext from "../contexts/languageContext";
import getString from '../utils/getString';
import AliasHeader from "../components/aliasHeader";
import Button from "../components/button";
import Wrapper from "../components/wrapper";
import Header from "../components/header";
const Home = () => {

  const navigate = useNavigate();
  const { interfaceLang } = useContext(LanguageContext);

  const onPlay = () => {
    navigate("signin");
  };

  return (
    <Wrapper>
      <Header>
        <AliasHeader>{getString(interfaceLang, "ALIAS_ONLINE")}</AliasHeader>
      </Header>

      <WelcomeMessage>{getString(interfaceLang, "PLAY_WITH_FRIENDS")}</WelcomeMessage>
      <Button uppercase={'uppercase'} onClick={onPlay}>
        {getString(interfaceLang, "PLAY")}
      </Button>
    </Wrapper>
  );
};

const WelcomeMessage = styled.p`  
  font-weight: 400;
  font-size: 20px;
  line-height: 27px;
  text-align: center;
  margin-top: 3.5em;
  margin-bottom: 7.5em;
  padding-right: 4em;
  padding-left: 4em;  
`;

export default Home;
