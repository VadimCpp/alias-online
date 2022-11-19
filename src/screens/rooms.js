import React, { useContext, useCallback } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import Container from "../components/constainer";
import { ReactComponent as SettingsIcon } from "../icons/settings.svg";
import { ReactComponent as MenuIcon } from "../icons/menu.svg";
import UserContext from "../contexts/userContext";
import Button from "../components/button";
import { updateRoom } from "../firebase";
import { isUserActive } from "../utils/helpers";

const Rooms = () => {
  // TODO: how to pass parameter once to the top tag of compound component?
  const HEADER_HEIGHT = "120px";
  const FOOTER_HEIGHT = "50px";

  const navigate = useNavigate();
  const { user, users, rooms, isLoading, lang } = useContext(UserContext);

  const isRoomEmpty = useCallback((room) => {
    for (let i = 0; i < users.length; i++) {
      if (users[i].room === room.uid && isUserActive(users[i].lastActiveAt)) {
        return false;
      }
    }
    return true;
  }, [users]);

  const getRoomName = useCallback((room) => {
    let result = room.name;
    const no = users.filter((u) => (u.room === room.uid && isUserActive(u.lastActiveAt))).length;
    if (no === 1) {
      result += " (1👤)";
    } else if (no > 1) {
      result += ` (${no}👥)`;
    }
    return result;
  }, [users]);

  const onClickRoom = async (room) => {
    await updateRoom(user.uid, room.uid);
    navigate(`/rooms/${room.uid}`);
  }

  return (
    <Container paddingTop={HEADER_HEIGHT} paddingBottom={FOOTER_HEIGHT}>
      <Container.Header height={HEADER_HEIGHT}>
        <RoomsHeader>
          <SettingsButton onClick={() => navigate("/lang-settings")} />
          <Title onClick={() => navigate("/")}>{lang("ALIAS_ONLINE")}</Title>
          <MenuButton onClick={() => null} />
        </RoomsHeader>
      </Container.Header>
      <Container.Content>
        <RoomsContent>
          { !isLoading && rooms.map((room) => {
            return <Button key={room.uid} onClick={() => onClickRoom(room)} isGray={isRoomEmpty(room)}>
              <ButtonTitle>{getRoomName(room)}</ButtonTitle>
              <ButtonSubTitle>{room.description}</ButtonSubTitle>
            </Button>
          })}
        </RoomsContent>
      </Container.Content>
      <Container.Footer height={FOOTER_HEIGHT}>
        <RoomsFooter>
          { lang(isLoading ? "LOADING" : "CHOOSE_ROOM" )}
        </RoomsFooter>
      </Container.Footer>
    </Container>
  );
};

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

const ButtonTitle = styled.span`
  font-size: 16px;
`;

const ButtonSubTitle = styled.span`
  padding-top: 4px;
  font-size: 12px;
`;

export default Rooms;
