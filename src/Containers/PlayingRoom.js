import React, {useContext, useEffect, useState} from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import getString from "../utils/getString";
import AliasHeader from "../components/aliasHeader";
import ContainerWithTitle from "../components/containerWithTitle";
import UserList from "../components/userList";
import UserContext from "../contexts/userContext";
import { setLeader, setWinner, resetGame, resetScore, updateScore } from "../firebase";
import VOCABULARY from "../utils/vocabulary.json";
import Header from "../components/header";
import Wrapper from "../components/wrapper";
import Button from "../components/button";
import Main from "../components/main";
import ResetButton from "../components/resetButton";

const PlayingRoom = () => {
  const navigate = useNavigate();
  const { user, users, defaultRoom, interfaceLang } = useContext(UserContext);

  const leaderUid = defaultRoom?.leaderUid;
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
      await setLeader(user.uid);
      getRandomCard();
    } else {
      alert("To start a game you need at least three active players.");
    }
  }

  const onWinnerClick = async (user) => {
    await setWinner(user.uid, wordToExplain);
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
    await setLeader(user.uid);
    getRandomCard();
  }

  const onResetGameClick = async () => {
    if (window.confirm(getString(interfaceLang,'ARE_YOU_SURE_YOU_WANT_TO_RESET_GAME'))) {
      await resetGame();
      await resetScore(user.uid);
    }
  }

  return (
    <Wrapper>
      <Header isPrimary={false} isSign={false} onClick={() => navigate("/lang-settings")} isPlayingRoom>
        <AliasHeader onClick={() => navigate("/")} isPlayingRoom >
          {getString(interfaceLang, "ALIAS_ONLINE")}
        </AliasHeader>
        {user && (
          <HomeSubHeader>{defaultRoom?.name || getString(interfaceLang, "PLAYING_ROOM")}</HomeSubHeader>        )}
      </Header>
      <Main isPlayingRoom>
        {status === 0 && (
          <>
            <ContainerWithTitle title={getString(interfaceLang, "PLAYERS")}>
              {users.length ? <UserList users={users} uid={user?.uid} onUserClick={() => {}}/> : getString(interfaceLang,"LOADING")}
            </ContainerWithTitle>
            <ContainerWithTitle title={getString(interfaceLang, "STATUS")}>
              {getString(interfaceLang,"GAME_IS_NOT_STARTED_PRESS_PLAY_BUTTON")}
            </ContainerWithTitle>
            <Button onClick={onPlayClick}>
              {getString(interfaceLang, "PLAY")}
            </Button>
          </>
        )}
        {status === 1 && (
          <>
            <ContainerWithTitle title={getString(interfaceLang, "PLAYERS")}>
              {users.length ? <UserList users={users} uid={user?.uid} onUserClick={onWinnerClick} /> : getString(interfaceLang,"LOADING")}
            </ContainerWithTitle>
            <ContainerWithTitle title={getString(interfaceLang, "STATUS")}>
              {"You are guessing the word"}
            </ContainerWithTitle>
            <ResetButton onClick={onResetGameClick}>
              {getString(interfaceLang, "RESET_GAME")}
            </ResetButton>
          </>
        )}
        {status === 2 && isChooseWinner && (
          <>
            <ContainerWithTitle title={getString(interfaceLang, "PLAYERS")}>
              {users.length ? <UserList users={users} uid={user?.uid} onUserClick={onWinnerClick} /> : getString(interfaceLang,"LOADING")}
            </ContainerWithTitle>
            <ContainerWithTitle title={getString(interfaceLang, "STATUS")}>
              {"Choose the winner or back to picture"}
            </ContainerWithTitle>
            <Button onClick={() => setIsChooseWinner(false)}>
              {getString(interfaceLang, "SHOW_PICTURE")}
            </Button>
          </>
        )}
        {status === 2 && !isChooseWinner && (
          <>
            <ContainerWithTitle title={getString(interfaceLang, "WORD")}>
              <EmojiImage>{imageToExplain}</EmojiImage>
              <StatusMessage>{wordToExplain}</StatusMessage>
            </ContainerWithTitle>
            <ContainerWithTitle title={getString(interfaceLang, "STATUS")}>
              <StatusMessage>{getString(interfaceLang, "YOU_ARE_EXPLAINING_THE_WORD")}</StatusMessage>
            </ContainerWithTitle>
            <Button onClick={() => setIsChooseWinner(true)}>
              {getString(interfaceLang, "CHOOSE_VINNER")}
            </Button>
          </>
        )}
        {status === 3 && (
          <>
            <ContainerWithTitle title={getString(interfaceLang, "STATUS")}>
              <EmojiImage>⏳</EmojiImage>
              <StatusMessage>{getString(interfaceLang,"THE_MATCH_IS_OVER_WAIT_A_MOMENT")}</StatusMessage>
            </ContainerWithTitle>
            <ResetButton onClick={onResetGameClick}>
              {getString(interfaceLang, "RESET_GAME")}
            </ResetButton>
          </>
        )}
        {status === 4 && (
          <>
            <ContainerWithTitle title={getString(interfaceLang, "STATUS")}>
              <EmojiImage>🏆</EmojiImage>
              <StatusMessage>{getString(interfaceLang, "YOU_WIN_PRESS_GET_PRIZE")}</StatusMessage>
            </ContainerWithTitle>
            <Button onClick={onGetPrizeClick}>
              {getString(interfaceLang, "GET_PRIZE")}
            </Button>
          </>
        )}
      </Main>
    </Wrapper>
  );
};

const HomeSubHeader = styled.p`
  text-align: center;
  margin-bottom: 1em;
`;

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

export default PlayingRoom;
