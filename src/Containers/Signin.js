import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { signInWithGoogle, logOut } from "../firebase";
import LanguageContext from "../contexts/languageContext";
import getString from '../utils/getString';

const Home = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(undefined);
  const { interfaceLang, setInterfaceLang } = useContext(LanguageContext);
  useEffect(() => {
    const auth = getAuth()
    const unsubscribe = onAuthStateChanged(auth, authUser => authUser ? setUser(authUser) : setUser(null));
    return () => unsubscribe();
  }, []);

  const onSigninWithGoogle = () => {
    signInWithGoogle();
  };

  return (
    <Container>
      <HomeHeader>{getString(interfaceLang, "ALIAS_ONLINE")}</HomeHeader>
      {!user &&
        <HomeSubHeader>{getString(interfaceLang, "SIGN_IN")}</HomeSubHeader>
      }
      {user && (
        <HomeSubHeader>
          <span>{getString(interfaceLang, "WELCOME")}, {user.displayName}</span>
          <img width="64" height="64" src={user.photoURL} alt={user.displayName} />
        </HomeSubHeader>
      )}
      <WelcomeMessage>{getString(interfaceLang, "SIGN_IN_WITH_GOOGLE_TO_JOIN_THE_PLAY")}</WelcomeMessage>
      {!user &&
        <CreateQuizButton onClick={() => onSigninWithGoogle()}>
          {getString(interfaceLang, "SIGN_IN_WITH_GOOGLE")}
        </CreateQuizButton>
      }
      {user && (
        <CreateQuizButton onClick={() => logOut()}>
           {getString(interfaceLang, "LOG_OUT")}
        </CreateQuizButton>
      )}
      <ButtonsContainer>
        <button onClick={() => navigate("/lang-settings")}>language settings</button>
      </ButtonsContainer>
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
    </Container>
  );
};

const HomeHeader = styled.h1`
  text-align: center;
  font-size: 3em;
  margin-bottom: .5em;
`;

const HomeSubHeader = styled.p`
  text-align: center;
  margin-bottom: 1em;
`;

const WelcomeMessage = styled.p`
  text-align: center;
  margin: 3em 0 3em;
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

const ButtonsContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-top: 10%;
`;

const CreateQuizButton = styled.button`
  background-color: #54bab9;
  padding: 1em 4em;
  color: white;
  font-size: 1.5em;
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

export default Home;