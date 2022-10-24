import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { signInWithGoogle, logOut } from "../firebase";
import UserContext from "../contexts/userContext";
import getString from '../utils/getString';
import AliasHeader from "../components/aliasHeader";
import Header from "../components/header";
import Wrapper from "../components/wrapper";
import Main from "../components/main";
import Footer from "../components/footer";
import Button from "../components/button";

const Signin = () => {
  const navigate = useNavigate();
  const { user, interfaceLang } = useContext(UserContext);

  const onSigninWithGoogle = () => {
    signInWithGoogle();
  };

  return (
    <Wrapper>
      <Header isPrimary={false}
              isSign={true}
              onClick={() => navigate("/lang-settings")}
      >
        <AliasHeader>{getString(interfaceLang, "ALIAS_ONLINE")}</AliasHeader>
        {!user &&
          <HomeSubHeader>{getString(interfaceLang, "SIGN_IN")}</HomeSubHeader>
        }
        {user && (
          <HomeSubHeader>
            <span>{getString(interfaceLang, "WELCOME")}, {user.displayName}</span>
          </HomeSubHeader>
        )}
      </Header>
      <Main>
        {!user && (
          <WelcomeMessage>{getString(interfaceLang, "SIGN_IN_WITH_GOOGLE_TO_JOIN_THE_PLAY")}</WelcomeMessage>
        )}
      </Main>
      <Footer>
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
            onClick={() => onSigninWithGoogle()}
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
      </Footer>
    </Wrapper>
  );
};

const HomeSubHeader = styled.p`
  display: flex;
  flex-direction: column;  
  gap: 0.5em;
  align-items: center;
  font-size: 1.5em; 
`;

const WelcomeMessage = styled.p`
  font-weight: 400;
  font-size: 20px;
  line-height: 27px;
  text-align: center;
  margin-top: 2em;
  padding-right: 1em;
  padding-left: 1em;
`;

export default Signin;
