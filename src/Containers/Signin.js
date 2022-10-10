import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { signInWithGoogle, logOut } from "../firebase";

const Home = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(undefined);

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
      <HomeHeader>Alias online</HomeHeader>
      {!user &&
        <HomeSubHeader>Sign in</HomeSubHeader>
      }
      {user && (
        <HomeSubHeader>
          <span>Welcome, {user.displayName}</span>
          <img width="64" height="64" src={user.photoURL} alt={user.displayName} />
        </HomeSubHeader>
      )}
      <WelcomeMessage>Please, sign in with Google
        to join the playing room</WelcomeMessage>
      {!user &&
        <CreateQuizButton onClick={() => onSigninWithGoogle()}>
          Sign in with Google
        </CreateQuizButton>
      }
      {user && (
        <CreateQuizButton onClick={() => logOut()}>
          Log out
        </CreateQuizButton>
      )}
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
  margin: 10em 0 13em;
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
