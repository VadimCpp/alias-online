import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { logOut, createQuiz } from "../firebase";
import LanguageContext from "../contexts/languageContext";
import getString from '../utils/getString';
import AliasHeader from "../components/aliasHeader";
import FlexContainer from "../components/flexContainer";
import Button from "../components/button";
import Wrapper from "../components/wrapper";
import Header from "../components/header";
const Home = () => {

  const navigate = useNavigate();
  const [user, setUser] = useState(undefined);
  const { interfaceLang, setInterfaceLang } = useContext(LanguageContext);

  /*
    // Used to listen for changes to the logged-in user state.

    useEffect(() =>{
        const auth = getAuth()
        const unsubscribe = onAuthStateChanged(auth, authUser => authUser ? setUser(authUser) : setUser(null));
        return () => unsubscribe();
    }, []);
    console.log(user)
    */

  const onCreateQuiz = () => {
    navigate("signin");
  };

  return (
    <Wrapper>
      <Header>
        <AliasHeader>{getString(interfaceLang, "ALIAS_ONLINE")}</AliasHeader>
      </Header>

      <WelcomeMessage>{getString(interfaceLang, "PLAY_WITH_FRIENDS")}</WelcomeMessage>
      <Button onClick={onCreateQuiz}>
        {getString(interfaceLang, "PLAY")}
      </Button>

      {/*
      // TODO: this code we use later after all screen are created
      <ButtonsContainer>
        <button onClick={() => navigate("question")}>
          Add new question
        </button>
        <button
          style={{ marginLeft: "1em" }}
          onClick={() => navigate("questions")}
        >
         My questions
        </button>
      </ButtonsContainer>

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
    </Wrapper>
  );
};

const WelcomeMessage = styled.p`
  text-align: center;
  margin: 10em 0 13em;
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
