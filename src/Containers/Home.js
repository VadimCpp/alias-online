import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import UserContext from "../contexts/userContext";
import getString from '../utils/getString';
import Button from "../components/button";
import { signInWithGoogle, logOut } from "../firebase";
import Container from "../components/constainer";
import { ReactComponent as SettingsIcon } from "../icons/settings.svg";
import { ReactComponent as MenuIcon } from "../icons/menu.svg";

const Home = () => {
  // TODO: how to pass parameter once to the top tag of compound component?
  const HEADER_HEIGHT = "120px";
  const FOOTER_HEIGHT = "80px";

  const navigate = useNavigate();
  const { user, interfaceLang, isLoading } = useContext(UserContext);

  return (
    <Container paddingTop={HEADER_HEIGHT} paddingBottom={FOOTER_HEIGHT}>
      <Container.Header height={HEADER_HEIGHT}>
        <HomeHeader>
          <SettingsButton onClick={() => navigate("/lang-settings")} />
          <Title onClick={() => navigate("/")}>{getString(interfaceLang, "ALIAS_ONLINE")}</Title>
          <MenuButton onClick={() => alert("TODO")} />
        </HomeHeader>
      </Container.Header>
      <Container.Content>
        <HomeContent>
          {user && (
            <HomeSubHeader>
              <span>{getString(interfaceLang, "WELCOME")}, {user.displayName}</span>
            </HomeSubHeader>
          )}
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
              onClick={() => navigate("/rooms")}
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
        </HomeContent>
      </Container.Content>
      <Container.Footer height={FOOTER_HEIGHT}>
        <HomeFooter>
          { getString(interfaceLang, isLoading ? "LOADING" : "WELCOME" )}
        </HomeFooter>
      </Container.Footer>
    </Container>
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

const HomeHeader = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  height: 100%;
  background-color: #2BC48A;
  padding: 0 20px;
`;

const SettingsButton = styled(SettingsIcon)`
  transition: all .5s;
  width: 36px;
  height: 36px;
  &:hover {
    transform: scale(1.25);
  }
`;

const MenuButton = styled(MenuIcon)`
  transition: all .5s;
  width: 36px;
  height: 36px;
  &:hover {
    transform: scale(1.25);
  }
  visibility: hidden;
`;

const Title = styled.h1`  
  text-align: center;
  font-size: 36px;
  color: #ffffff;
  font-style: normal;
  font-weight: 700; 
  cursor: pointer;
`;

const Gap = styled.div`height: 15vh`;

const HomeContent = styled.div`
  padding: 10px 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const HomeFooter = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  height: 100%;
  background-color: #222;
  padding: 0 20px;
  color: white;
`;

export default Home;
