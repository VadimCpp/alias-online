import React, { useContext, useEffect, useState, useCallback } from "react";
import styled from "styled-components";
import { useNavigate, useParams } from "react-router-dom";
import getString from "../utils/getString";
import UserList from "../components/userList";
import UserContext from "../contexts/userContext";
import { setLeader, setWinner, resetGame, resetScore, updateScore } from "../firebase";
import VOCABULARY from "../utils/vocabulary.json";
import Button from "../components/button";
import ResetButton from "../components/resetButton";
import Container from "../components/constainer";
import { ReactComponent as SettingsIcon } from "../icons/settings.svg";
import { ReactComponent as MenuIcon } from "../icons/menu.svg";

const PlayingRoom = () => {
  // TODO: how to pass parameter once to the top tag of compound component?
  const HEADER_HEIGHT = "120px";
  const FOOTER_HEIGHT = "130px";

  const navigate = useNavigate();

  let { slug } = useParams();
  const { user, users, rooms, interfaceLang } = useContext(UserContext);

  const [ isChooseWinner, setIsChooseWinner ] = useState(false);
  const [ room, setRoom ] = useState(null);

  useEffect(() => {
    const aRoom = rooms.find(r => r.uid === slug);
    if (aRoom) {
      setRoom(aRoom);
    }
  }, [rooms, slug]);

  let status = 0; // Game is not started
  let leaderUid = "";
  let leaderName = "";
  let winnerUid = "";
  let word = "";
  if (room) {
    leaderUid = room.leaderUid;
    leaderName = room.leaderName;
    winnerUid = room.winnerUid;
    word = room.word;

    if (leaderUid) {
      status = 1; // Leader explain the word
      if (leaderUid === user.uid) {
        status = 2; // You explain the word
      }
    } else if (winnerUid && word) {
      status = 3; // The match is over
      if (winnerUid === user.uid) {
        status = 4; // You win the match
      }
    }
  } else {
    console.error('No room found', slug);
  }

  const getIcon = (word) => {
    const w = VOCABULARY.find(w => word === w[room?.lang]);
    return (w && !!w['EMOJI'] ? w['EMOJI'] : '😵');
  };

  const getRandomCard = useCallback(() => {
    const wordsWithEmoji = VOCABULARY.filter(w => !!w['EMOJI']);
    const randomIndex = Math.ceil(Math.random() * (wordsWithEmoji.length-1));
    return wordsWithEmoji[randomIndex];
    }, []);

  const onPlayClick = async () => {
    const activeUsers = users.filter(u => {
      const today = new Date();
      const lastActiveAt = new Date(u.lastActiveAt);
      const lastActiveHoursAgo = (today - lastActiveAt) / 1000 / 60 / 60;
      // return (lastActiveHoursAgo < 1);
      return true;
    });

    if (activeUsers.length >= 3) {
      await updateScore(user.uid, (user.score || 0) + 1);
      setIsChooseWinner(false);
      const w = getRandomCard();
      await setLeader(user.uid, room.uid, user.displayName, w[room.lang]);
    } else {
      alert("To start a game you need at least three active players.");
    }
  }

  const onWinnerClick = async (user) => {
    await setWinner(user.uid, room.uid, user.displayName, room.word);
  }

  const onGetPrizeClick = async() => {
    // NOTE!
    // users object contains data about score:
    // https://docs.google.com/document/d/1J7g91NJokW6iptjZxOcIQbLNSpCceRIT7UVWEcZV_BA/edit#heading=h.ie7mxisro286
    // and user object contains only authorization information.
    // TODO: implement unified user information.
    const userData = users.find(u => u.uid === user.uid);
    await updateScore(user.uid,(userData.score || 0) + 1);
    setIsChooseWinner(false);
    const w = getRandomCard();
    await setLeader(user.uid, room.uid, userData.displayName, w[room.lang]);
  }

  const onResetGameClick = async () => {
    if (window.confirm(getString(interfaceLang,'ARE_YOU_SURE_YOU_WANT_TO_RESET_GAME'))) {
      await resetGame(room.uid);
      await resetScore(user.uid);
    }
  }

  if (!room) {
    return <>Loading...</>;
  }

  return (
    <Container paddingTop={HEADER_HEIGHT} paddingBottom={FOOTER_HEIGHT}>
      <Container.Header height={HEADER_HEIGHT}>
        <PlayingRoomHeader>
          <SettingsButton onClick={() => navigate("/lang-settings")} />
          <TitleAndSubtitle>
            <Title onClick={() => navigate("/")}>{getString(interfaceLang, "ALIAS_ONLINE")}</Title>
            <SubTitle>{room.name}</SubTitle>
          </TitleAndSubtitle>
          <MenuButton onClick={() => alert("TODO")} />
        </PlayingRoomHeader>
      </Container.Header>
      <Container.Content>
        {status === 0 && (
          <Center>
            <Border title={getString(interfaceLang, "PLAYERS")}>
              {users.length ? <UserList users={users} uid={user?.uid} room={room} onUserClick={() => {}}/> : getString(interfaceLang,"LOADING")}
            </Border>
          </Center>
        )}
        {status === 1 && (
          <Center>
            <Border title={getString(interfaceLang, "PLAYERS")}>
              {users.length ? <UserList users={users} uid={user?.uid} room={room} onUserClick={() => {}} /> : getString(interfaceLang,"LOADING")}
            </Border>
          </Center>
        )}
        {status === 2 && isChooseWinner && (
          <Center>
            <Border title={getString(interfaceLang, "PLAYERS")}>
              {users.length ? <UserList users={users} uid={user?.uid} room={room} onUserClick={onWinnerClick} /> : getString(interfaceLang,"LOADING")}
            </Border>
          </Center>
        )}
        {status === 2 && !isChooseWinner && (
          <Center>
            <Border title={getString(interfaceLang, "WORD")}>
              <EmojiImage>{getIcon(room?.word)}</EmojiImage>
              <StatusMessage>{room?.word}</StatusMessage>
            </Border>
          </Center>
        )}
        {status === 3 && (
          <Center>
            <Border title={getString(interfaceLang, "STATUS")}>
              <EmojiImage>{getIcon(room?.word)}</EmojiImage>
              <StatusMessage>
                {`${room?.winnerName} ${getString(interfaceLang, "HAS_GUESSED")} ${room?.word}`}
              </StatusMessage>
            </Border>
          </Center>
        )}
        {status === 4 && (
          <Center>
            <Border title={getString(interfaceLang, "STATUS")}>
              <EmojiImage>🥳</EmojiImage>
            </Border>
          </Center>
        )}
      </Container.Content>
      <Container.Footer height={FOOTER_HEIGHT}>
        <PlayingRoomControlFooter>
          {status === 0 && (
            <Button onClick={onPlayClick}>
              {getString(interfaceLang, "PLAY")}
            </Button>
          )}
          {status === 1 && (
            <ResetButton onClick={onResetGameClick}>
              {getString(interfaceLang, "RESET_GAME")}
            </ResetButton>
          )}
          {status === 2 && isChooseWinner && (
            <Button onClick={() => setIsChooseWinner(false)}>
              {getString(interfaceLang, "SHOW_PICTURE")}
            </Button>
          )}
          {status === 2 && !isChooseWinner && (
            <Button onClick={() => setIsChooseWinner(true)}>
              {getString(interfaceLang, "CHOOSE_VINNER")}
            </Button>
          )}
          {status === 3 && (
            <ResetButton onClick={onResetGameClick}>
              {getString(interfaceLang, "RESET_GAME")}
            </ResetButton>
          )}
          {status === 4 && (
            <Button onClick={onGetPrizeClick}>
              {getString(interfaceLang, "GET_PRIZE")}
            </Button>
          )}
        </PlayingRoomControlFooter>
        <PlayingRoomFooter>
          {status === 0 && (
            <>
              {getString(interfaceLang,"GAME_IS_NOT_STARTED_PRESS_PLAY_BUTTON")}
            </>
          )}
          {status === 1 && (
            <>
              {`${leaderName} ${getString(interfaceLang,"ARE_EXPLAINING_THE_WORD")}`}
            </>
          )}
          {status === 2 && isChooseWinner && (
            <>
              {getString(interfaceLang,"CHOOSE_THE_WINNER_OR_BACK_TO_PICTURE")}
            </>
          )}
          {status === 2 && !isChooseWinner && (
            <>
              {getString(interfaceLang, "YOU_ARE_EXPLAINING_THE_WORD")}
            </>
          )}
          {status === 3 && (
            <>
              {getString(interfaceLang, "WAIT_FOR_WINNER")}
            </>
          )}
          {status === 4 && (
            <>
              {getString(interfaceLang, "YOU_WIN_PRESS_GET_PRIZE")}
            </>
          )}
        </PlayingRoomFooter>
      </Container.Footer>
    </Container>
  );
};

const EmojiImage = styled.h2`
  font-size: 96px;
  text-align: center;
`;

const StatusMessage = styled.p`
  margin-top: 10px;
  text-align: center;
  font-size: 16px;
  font-weight: bold;
  max-width: 260px;
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

const SubTitle = styled.p`
  text-align: center;
  color: white;
  margin: 0;
`;

const TitleAndSubtitle = styled.div`
  margin-top: 16px;
  display: flex;
  flex-direction: column;
`;

const PlayingRoomHeader = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  height: 100%;
  background-color: #2BC48A;
  padding: 0 20px;
  z-index: 1;
`;

const PlayingRoomControlFooter = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  height: 80px;
  border-top: 1px solid rgb(241, 236, 228);
  background-color: rgb(251, 246, 238);
  padding: 0 20px;
  color: white;
`;

const PlayingRoomFooter = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  height: 50px;
  background-color: #222;
  padding: 0 20px;
  color: white;
`;

const Border = styled.div`
  border-radius: 0;
  border: 1px solid #51565F;
  padding: 10px 20px;
  background-color: white;
  min-width: 280px;
  max-width: 360px;
  margin: 20px 0;
`;

const Center = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  margin: 20px 0;
`;

export default PlayingRoom;
