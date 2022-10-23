import React, {useContext, useEffect, useState} from "react";
import styled from "styled-components";
import getString from "../utils/getString";
import AliasHeader from "../components/aliasHeader";
import LanguageContext from "../contexts/languageContext";
import ContainerWithTitle from "../components/containerWithTitle";
import UserList from "../components/userList";
import UserContext from "../contexts/userContext";
import { setLeader, setWinner, resetGame, resetScore, updateScore } from "../firebase";
import VOCABULARY from "../utils/vocabulary.json";

const PlayingRoom = () => {

  const { interfaceLang } = useContext(LanguageContext);
  const { user, users, defaultRoom } = useContext(UserContext);

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
    await resetGame();
    await resetScore(user.uid);
  }

  return (
    <Container>
      <AliasHeader color={"black"}>{getString(interfaceLang, "ALIAS_ONLINE")}</AliasHeader>
      <HomeSubHeader>{defaultRoom?.name || getString(interfaceLang, "PLAYING_ROOM")}</HomeSubHeader>
      {status === 0 && (
        <>
          <ContainerWithTitle title={"Players"}>
            {users.length ? <UserList users={users} uid={user?.uid} onUserClick={() => {}}/> : "Loading..."}
          </ContainerWithTitle>
          <ContainerWithTitle title={"Status"}>
            {"Game is not started. Press «Play» button."}
          </ContainerWithTitle>
          <CreateQuizButton onClick={onPlayClick}>
            {"Play"}
          </CreateQuizButton>
        </>
      )}
      {status === 1 && (
        <>
          <ContainerWithTitle title={"Status"}>
            {"You are guessing the word"}
          </ContainerWithTitle>
          <CreateQuizButton onClick={onResetGameClick}>
            {"Reset game"}
          </CreateQuizButton>
        </>
      )}
      {status === 2 && isChooseWinner && (
        <>
          <ContainerWithTitle title={"Players"}>
            {users.length ? <UserList users={users} uid={user?.uid} onUserClick={onWinnerClick} /> : "Loading..."}
          </ContainerWithTitle>
          <ContainerWithTitle title={"Status"}>
            {"Choose the winner or back to picture"}
          </ContainerWithTitle>
          <CreateQuizButton onClick={() => setIsChooseWinner(false)}>
            {"Back to picture"}
          </CreateQuizButton>
        </>
      )}
      {status === 2 && !isChooseWinner && (
        <>
          <ContainerWithTitle title={"Word"}>
            <EmojiImage>{imageToExplain}</EmojiImage>
            <StatusMessage>{wordToExplain}</StatusMessage>
          </ContainerWithTitle>
          <ContainerWithTitle title={"Status"}>
            {"You are explaing the word now."}
          </ContainerWithTitle>
          <CreateQuizButton onClick={() => setIsChooseWinner(true)}>
            {"Choose vinner"}
          </CreateQuizButton>
        </>
      )}
      {status === 3 && (
        <>
          <ContainerWithTitle title={"Status"}>
            <EmojiImage>⏳</EmojiImage>
            <StatusMessage>{"The match is over. Wait a moment..."}</StatusMessage>
          </ContainerWithTitle>
          <CreateQuizButton onClick={onResetGameClick}>
            {"Reset game"}
          </CreateQuizButton>
        </>
      )}
      {status === 4 && (
        <>
          <ContainerWithTitle title={"Status"}>
            <EmojiImage>🏆</EmojiImage>
            <StatusMessage>{"You win! Press «Get Prize» button."}</StatusMessage>
          </ContainerWithTitle>
          <CreateQuizButton onClick={onGetPrizeClick}>
            {"Get prize"}
          </CreateQuizButton>
        </>
      )}
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

const EmojiImage = styled.h2`
  font-size: 96px;
  text-align: center;
`;

const StatusMessage = styled.p`
  margin-top: 10px;
  text-align: center;
`;


export default PlayingRoom;
