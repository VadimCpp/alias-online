import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import UserContext from "../contexts/userContext";
import getString from '../utils/getString';
import AliasHeader from "../components/aliasHeader";
import Button from "../components/button";
import Wrapper from "../components/wrapper";
import Header from "../components/header";
import Main from "../components/main";
import { signInWithGoogle, logOut } from "../firebase";

const Home = () => {
  const navigate = useNavigate();
  const { user, interfaceLang, isLoading } = useContext(UserContext);

  return (
    <Wrapper>
      <Header isPrimary={true} isSign={false} onClick={() => navigate("/lang-settings")}>
        <AliasHeader>{getString(interfaceLang, "ALIAS_ONLINE")}</AliasHeader>
        {user && (
          <HomeSubHeader>
            <span>{getString(interfaceLang, "WELCOME")}, {user.displayName}</span>
          </HomeSubHeader>
        )}
      </Header>
      <Main>
        <Gap />
        {isLoading && (
          <WelcomeMessage>Loading...</WelcomeMessage>
        )}
        {!user && (
          <WelcomeMessage>{getString(interfaceLang, "PLAY_WITH_FRIENDS")}</WelcomeMessage>
        )}
        {user && (
          <Button
            uppercase={'uppercase'}
            onClick={() => navigate("/playing-room")}
          >
            {getString(interfaceLang, "PLAY")}
          </Button>
        )}
        {!user &&
          <Button
            uppercase={'none'}
            onClick={() => signInWithGoogle()}
          >
            {getString(interfaceLang, "SIGN_IN_WITH_GOOGLE")}
          </Button>
        }
        {user && (
          <Button
            uppercase={'uppercase'}
            onClick={() => logOut(user.uid)}
          >
            {getString(interfaceLang, "LOG_OUT")}
          </Button>
        )}
      </Main>
    </Wrapper>
  );
};

const WelcomeMessage = styled.p`  
  font-weight: 400;
  font-size: 20px;
  line-height: 27px;
  text-align: center;
  margin-top: 2em;
  padding-right: 4em;
  padding-left: 4em;  
`;

const HomeSubHeader = styled.p`
  display: flex;
  flex-direction: column;  
  gap: 0.5em;
  align-items: center;
  font-size: 1.5em; 
`;

const Gap = styled.div`height: 15vh`

export default Home;
