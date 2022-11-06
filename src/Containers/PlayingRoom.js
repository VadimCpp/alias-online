import React, {useContext, useEffect, useState} from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import getString from "../utils/getString";
import ContainerWithTitle from "../components/containerWithTitle";
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
  const FOOTER_HEIGHT = "80px";

  const navigate = useNavigate();
  const { user, users, defaultRoom, interfaceLang } = useContext(UserContext);

  const leaderUid = defaultRoom?.leaderUid;
  const leaderName = defaultRoom?.leaderName;
  const winnerUid = defaultRoom?.winnerUid;
  const word = defaultRoom?.word;

  let status = 0; // Game is not started
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

  const [ isChooseWinner, setIsChooseWinner ] = useState(false);
  const [ wordToExplain, setWordToExplain ] = useState("");
  const [ imageToExplain, setImageToExplain ] = useState("");

  const getIcon = (word) => {
    const w = VOCABULARY.find(w => word === w['NO']);
    return (w && !!w['EMOJI'] ? w['EMOJI'] : '😵');
  }

  const getRandomCard = () => {
    const wordsWithEmoji = VOCABULARY.filter(w => !!w['EMOJI']);
    const randomIndex = Math.ceil(Math.random() * (wordsWithEmoji.length-1));
    const randomWord = wordsWithEmoji[randomIndex];
    console.log('Random card is: ', randomWord);
    setWordToExplain(randomWord["NO"]);
    setImageToExplain(randomWord["EMOJI"]);
  };
  useEffect(() => getRandomCard(), []);

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
      await setLeader(user.uid, user.displayName);
      getRandomCard();
    } else {
      alert("To start a game you need at least three active players.");
    }
  }

  const onWinnerClick = async (user) => {
    await setWinner(user.uid, user.displayName || "dsf", wordToExplain);
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
    await setLeader(user.uid, userData.displayName);
    getRandomCard();
  }

  const onResetGameClick = async () => {
    if (window.confirm(getString(interfaceLang,'ARE_YOU_SURE_YOU_WANT_TO_RESET_GAME'))) {
      await resetGame();
      await resetScore(user.uid);
    }
  }

  return (
    <Container paddingTop={HEADER_HEIGHT} paddingBottom={FOOTER_HEIGHT}>
      <Container.Header height={HEADER_HEIGHT}>
        <PlayingRoomHeader>
          <SettingsButton onClick={() => navigate("/lang-settings")} />
          <TitleAndSubtitle>
            <Title onClick={() => navigate("/")}>{getString(interfaceLang, "ALIAS_ONLINE")}</Title>
            <SubTitle>{defaultRoom?.name || getString(interfaceLang, "PLAYING_ROOM")}</SubTitle>
          </TitleAndSubtitle>
          <MenuButton onClick={() => alert("TODO")} />
        </PlayingRoomHeader>
      </Container.Header>
      <Container.Content>
        {status === 0 && (
          <>
            <ContainerWithTitle title={getString(interfaceLang, "STATUS")}>
              {getString(interfaceLang,"GAME_IS_NOT_STARTED_PRESS_PLAY_BUTTON")}
            </ContainerWithTitle>
            <ContainerWithTitle title={getString(interfaceLang, "PLAYERS")}>
              {users.length ? <UserList users={users} uid={user?.uid} onUserClick={() => {}}/> : getString(interfaceLang,"LOADING")}
            </ContainerWithTitle>
          </>
        )}
        {status === 1 && (
          <>
            <ContainerWithTitle title={getString(interfaceLang, "STATUS")}>
              {`${leaderName} ${getString(interfaceLang,"ARE_EXPLAINING_THE_WORD")}`}
            </ContainerWithTitle>
            <ContainerWithTitle title={getString(interfaceLang, "PLAYERS")}>
              {users.length ? <UserList users={users} uid={user?.uid} onUserClick={onWinnerClick} /> : getString(interfaceLang,"LOADING")}
            </ContainerWithTitle>
          </>
        )}
        {status === 2 && isChooseWinner && (
          <>
            <ContainerWithTitle title={getString(interfaceLang, "STATUS")}>
              {getString(interfaceLang,"CHOOSE_THE_WINNER_OR_BACK_TO_PICTURE")}
            </ContainerWithTitle>
            <ContainerWithTitle title={getString(interfaceLang, "PLAYERS")}>
              {users.length ? <UserList users={users} uid={user?.uid} onUserClick={onWinnerClick} /> : getString(interfaceLang,"LOADING")}
            </ContainerWithTitle>
          </>
        )}
        {status === 2 && !isChooseWinner && (
          <>
            <ContainerWithTitle title={getString(interfaceLang, "STATUS")}>
              <StatusMessage>{getString(interfaceLang, "YOU_ARE_EXPLAINING_THE_WORD")}</StatusMessage>
            </ContainerWithTitle>
            <ContainerWithTitle title={getString(interfaceLang, "WORD")}>
              <EmojiImage>{imageToExplain}</EmojiImage>
              <StatusMessage>{wordToExplain}</StatusMessage>
            </ContainerWithTitle>
          </>
        )}
        {status === 3 && (
          <>
            <ContainerWithTitle title={getString(interfaceLang, "STATUS")}>
              <EmojiImage>{getIcon(defaultRoom?.word)}</EmojiImage>
              <StatusMessage>
                {`${defaultRoom?.winnerName} ${getString(interfaceLang, "HAS_GUESSED")} ${defaultRoom?.word}`}
              </StatusMessage>
            </ContainerWithTitle>
          </>
        )}
        {status === 4 && (
          <>
            <ContainerWithTitle title={getString(interfaceLang, "STATUS")}>
              <EmojiImage>🏆</EmojiImage>
              <StatusMessage>{getString(interfaceLang, "YOU_WIN_PRESS_GET_PRIZE")}</StatusMessage>
            </ContainerWithTitle>
          </>
        )}
      </Container.Content>
      <Container.Footer height={FOOTER_HEIGHT}>
        <PlayingRoomFooter>
          {status === 0 && (
            <>
              <Button onClick={onPlayClick}>
                {getString(interfaceLang, "PLAY")}
              </Button>
            </>
          )}
          {status === 1 && (
            <>
              <ResetButton onClick={onResetGameClick}>
                {getString(interfaceLang, "RESET_GAME")}
              </ResetButton>
            </>
          )}
          {status === 2 && isChooseWinner && (
            <>
              <Button onClick={() => setIsChooseWinner(false)}>
                {getString(interfaceLang, "SHOW_PICTURE")}
              </Button>
            </>
          )}
          {status === 2 && !isChooseWinner && (
            <>
              <Button onClick={() => setIsChooseWinner(true)}>
                {getString(interfaceLang, "CHOOSE_VINNER")}
              </Button>
            </>
          )}
          {status === 3 && (
            <>
              <ResetButton onClick={onResetGameClick}>
                {getString(interfaceLang, "RESET_GAME")}
              </ResetButton>
            </>
          )}
          {status === 4 && (
            <>
              <Button onClick={onGetPrizeClick}>
                {getString(interfaceLang, "GET_PRIZE")}
              </Button>
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

const PlayingRoomFooter = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  height: 100%;
  background-color: #222;
  padding: 0 20px;
  color: white;
`;

export default PlayingRoom;
