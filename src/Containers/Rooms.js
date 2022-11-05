import React, {useContext} from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import getString from "../utils/getString";
import Container from "../components/constainer";
import { ReactComponent as SettingsIcon } from "../icons/settings.svg";
import { ReactComponent as MenuIcon } from "../icons/menu.svg";
import UserContext from "../contexts/userContext";
import Button from "../components/button";

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

const RoomsHeader = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  height: 100%;
  background-color: #2BC48A;
  padding: 0 20px;
`;

const RoomsContent = styled.div`
  padding: 10px 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const RoomsFooter = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  height: 100%;
  background-color: #222;
  padding: 0 20px;
  color: white;
`;

const Rooms = () => {
  // TODO: how to pass parameter once to the top tag of compound component?
  const HEADER_HEIGHT = "120px";
  const FOOTER_HEIGHT = "80px";

  const navigate = useNavigate();
  const { interfaceLang } = useContext(UserContext);

  return (
    <Container paddingTop={HEADER_HEIGHT} paddingBottom={FOOTER_HEIGHT}>
      <Container.Header height={HEADER_HEIGHT}>
        <RoomsHeader>
          <SettingsButton onClick={() => navigate("/lang-settings")} />
          <Title onClick={() => navigate("/")}>{getString(interfaceLang, "ALIAS_ONLINE")}</Title>
          <MenuButton onClick={() => alert("TODO")} />
        </RoomsHeader>
      </Container.Header>
      <Container.Content>
        <RoomsContent>
          <Button onClick={() => navigate("/playing-room")}>
            {"Bor i Norge"}
          </Button>
        </RoomsContent>
      </Container.Content>
      <Container.Footer height={FOOTER_HEIGHT}>
        <RoomsFooter>
          {getString(interfaceLang, "CHOOSE_ROOM")}
        </RoomsFooter>
      </Container.Footer>
    </Container>
  );
};

export default Rooms;
