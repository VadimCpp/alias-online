import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import getString from "../utils/getString";
import AliasHeader from "../components/aliasHeader";
import LanguageContext from "../contexts/languageContext";
import ContainerWithTitle from "../components/containerWithTitle";
import UserList from "../components/userList";
import UserContext from "../contexts/userContext";

const PlayingRoom = () => {
  const navigate = useNavigate();
  const { interfaceLang } = useContext(LanguageContext);
  const { user, users, defaultRoom } = useContext(UserContext);

  return (
    <Container>
      <AliasHeader color={"black"}>{getString(interfaceLang, "ALIAS_ONLINE")}</AliasHeader>
      <HomeSubHeader>{defaultRoom?.name || getString(interfaceLang, "PLAYING_ROOM")}</HomeSubHeader>
      <ContainerWithTitle title={"Players"}>
        {users.length ? <UserList users={users} uid={user?.uid} /> : "Loading..."}
      </ContainerWithTitle>
      <ContainerWithTitle title={"Status"}>
        {defaultRoom?.status || "Loading..."}
      </ContainerWithTitle>
      <CreateQuizButton onClick={() => navigate("/signin")}>
        {getString(interfaceLang, "PLAY")}
      </CreateQuizButton>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding-right: 1em;
  padding-left: 1em;
  height: 100vh;
`;

const HomeSubHeader = styled.p`
  text-align: center;
  margin-bottom: 1em;
`;

const CreateQuizButton = styled.button`
  background-color: #54bab9;
  padding: 1em 4em;
  color: white;
  font-size: 1.5em;
`;

export default PlayingRoom;
