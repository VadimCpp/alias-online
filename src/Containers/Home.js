import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import UserContext from "../contexts/userContext";
import Button from "../components/button";
import { signInWithGoogle, logOut } from "../firebase";
import Container from "../components/constainer";
import { ReactComponent as SettingsIcon } from "../icons/settings.svg";
import { ReactComponent as MenuIcon } from "../icons/menu.svg";

const Home = () => {
  // TODO: how to pass parameter once to the top tag of compound component?
  const HEADER_HEIGHT = "120px";
  const FOOTER_HEIGHT = "50px";

  const navigate = useNavigate();
  const { user, isLoading, lang } = useContext(UserContext);

  return (
    <Container paddingTop={HEADER_HEIGHT} paddingBottom={FOOTER_HEIGHT}>
      <Container.Header height={HEADER_HEIGHT}>
        <HomeHeader>
          <SettingsButton onClick={() => navigate("/lang-settings")} />
          <Title onClick={() => navigate("/")}>{lang("ALIAS_ONLINE")}</Title>
          <MenuButton onClick={() => alert("TODO")} />
        </HomeHeader>
      </Container.Header>
      <Container.Content>
        <HomeContent>
          <HomeSubHeader>
            {
              !!user ?
              `${lang("WELCOME")}, ${user.displayName}` :
              lang("PLAY_WITH_FRIENDS")
            }
          </HomeSubHeader>
          {user && (
            <Button onClick={() => navigate("/rooms")}>
              {lang("PLAY")}
            </Button>
          )}
          {!user &&
          <Button onClick={() => signInWithGoogle()}>
            {lang("SIGN_IN_WITH_GOOGLE")}
          </Button>
          }
          {user && (
            <Button onClick={() => logOut(user.uid)}>
              {lang("LOG_OUT")}
            </Button>
          )}
        </HomeContent>
      </Container.Content>
      <Container.Footer height={FOOTER_HEIGHT}>
        <HomeFooter>
          { lang(isLoading ? "LOADING" : "WELCOME" )}
        </HomeFooter>
      </Container.Footer>
    </Container>
  );
};

const HomeSubHeader = styled.p`
  text-align: center;
  gap: 0.5em;
  align-items: center;
  font-size: 1.5em; 
  margin: 35px auto;
`;

const HomeHeader = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
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
