import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { signInWithGoogle, logOut } from "../firebase";
import LanguageContext from "../contexts/languageContext";
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
  const { interfaceLang } = useContext(LanguageContext);
  const { user } = useContext(UserContext);

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
            <img width="64"
                 height="64"
                 src={user.photoURL}
                 alt={user.displayName}
            />
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





      {/*
      {!user && (
        <UserManagementContainer>
          <button onClick={() => navigate("/login")}>Log in</button>
          <button
            style={{ marginLeft: "1em" }}
            onClick={() => navigate("/register")}
          >
            Register
          </button>
        </UserManagementContainer>
      )}
      {user && (
        <UserManagementContainer>
          <button onClick={() => logOut()}>Log out</button>
        </UserManagementContainer>
      )}
      */}
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

const UserManagementContainer = styled.div`
  position: absolute;
  bottom: 0;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-bottom: 5%;
`;

export default Signin;
