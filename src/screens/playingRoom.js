import React, { useContext, useEffect, useState, useCallback } from "react";
import styled from "styled-components";
import { useNavigate, useParams } from "react-router-dom";
import UserList from "../components/userList";
import UserContext from "../contexts/userContext";
import { setLeader, setWinner, resetGame, updateScore } from "../firebase";
import VOCABULARY from "../utils/vocabulary.json";
import Button from "../components/button";
import ResetButton from "../components/resetButton";
import Container from "../components/constainer";
import { ReactComponent as SettingsIcon } from "../icons/settings.svg";
import { ReactComponent as MenuIcon } from "../icons/menu.svg";
import { isUserActive } from "../utils/helpers";

const PlayingRoom = () => {
  // TODO: how to pass parameter once to the top tag of compound component?
  const HEADER_HEIGHT = "120px";
  const FOOTER_HEIGHT = "130px";

  const navigate = useNavigate();

  let { slug } = useParams();
  const { user, users, rooms, lang } = useContext(UserContext);

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
  let leaderTimestamp = 0;
  let winnerUid = "";
  let winnerTimestamp = 0;
  let word = "";
  if (room) {
    leaderUid = room.leaderUid;
    leaderName = room.leaderName;
    leaderTimestamp = room.leaderTimestamp;
    winnerUid = room.winnerUid;
    winnerTimestamp = room.winnerTimestamp;
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

  const [ countDown, setCountDown ] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      if (status === 2 || status === 1) {
        const today = +(new Date());
        const diff = (today - leaderTimestamp) / 1000; // in seconds
        setCountDown(diff < 60 ? Math.ceil(60 - diff) : 0);
      } else if (status === 3 || status === 4) {
        const today = +(new Date());
        const diff = (today - winnerTimestamp) / 1000; // in seconds
        setCountDown(diff < 30 ? Math.ceil(30 - diff) : 0);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [room]);

  const getIcon = (word) => {
    const w = VOCABULARY.find(w => word === w[room?.lang]);
    return (w && !!w['EMOJI'] ? w['EMOJI'] : '😵');
  };

  const getWordWithArticle = (room) => {
    let result = "";
    if (room) {
      const w = VOCABULARY.find(w => word === w[room.lang]);
      if (w) {
        if (room.lang === "no" || room.lang === "NO") {
          result = `${w['ART']} ${w['NO'].toLowerCase()}`;
        } else {
          result = w[room.lang];
        }
      }
    }
    return result;
  };

  const getRandomCard = useCallback(() => {
    const wordsWithEmoji = VOCABULARY.filter(w => !!w['EMOJI']);
    const randomIndex = Math.ceil(Math.random() * (wordsWithEmoji.length-1));
    return wordsWithEmoji[randomIndex];
    }, []);

  const onPlayClick = async () => {
    const activeUsers = users.filter(u => isUserActive(u.lastActiveAt));

    if (activeUsers.length >= 2) {
      setIsChooseWinner(false);
      const w = getRandomCard();
      await setLeader(user.uid, room.uid, user.displayName, w[room.lang]);
    } else {
      alert("To start a game you need at least two active players.");
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
    if (window.confirm(lang('ARE_YOU_SURE_YOU_WANT_TO_RESET_GAME'))) {
      await resetGame(room.uid);
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
            <Title onClick={() => navigate("/")}>{lang("ALIAS_ONLINE")}</Title>
            <SubTitle>{room.name}</SubTitle>
          </TitleAndSubtitle>
          <MenuButton onClick={() => null} />
        </PlayingRoomHeader>
      </Container.Header>
      <Container.Content>
        {status === 0 && (
          <Center>
            <Border title={lang("PLAYERS")}>
              {users.length ? <UserList users={users} uid={user?.uid} room={room} onUserClick={() => {}}/> : lang("LOADING")}
            </Border>
          </Center>
        )}
        {status === 1 && (
          <Center>
            <Border title={lang("PLAYERS")}>
              {users.length ? <UserList users={users} uid={user?.uid} room={room} onUserClick={() => {}} /> : lang("LOADING")}
            </Border>
          </Center>
        )}
        {status === 2 && isChooseWinner && (
          <Center>
            <Border title={lang("PLAYERS")}>
              {users.length ? <UserList users={users} uid={user?.uid} room={room} onUserClick={onWinnerClick} /> : lang("LOADING")}
            </Border>
          </Center>
        )}
        {status === 2 && !isChooseWinner && (
          <Center>
            <Border title={lang("WORD")}>
              <EmojiImage>{getIcon(room?.word)}</EmojiImage>
              <StatusMessage>{getWordWithArticle(room)}</StatusMessage>
            </Border>
          </Center>
        )}
        {status === 3 && (
          <Center>
            <Border title={lang("STATUS")}>
              <EmojiImage>{getIcon(room?.word)}</EmojiImage>
              <StatusMessage>
                {getWordWithArticle(room)}
              </StatusMessage>
              <SubStatusMessage>
                {`${room?.winnerName} ${lang("HAS_GUESSED_THE_WORD")}`}
              </SubStatusMessage>
            </Border>
          </Center>
        )}
        {status === 4 && (
          <Center>
            <Border title={lang("STATUS")}>
              <EmojiImage>🥳</EmojiImage>
            </Border>
          </Center>
        )}
      </Container.Content>
      <Container.Footer height={FOOTER_HEIGHT}>
        <PlayingRoomControlFooter>
          {status === 0 && (
            <Button onClick={onPlayClick}>
              {lang("PLAY")}
            </Button>
          )}
          {status === 1 && countDown === 0 && (
            <ResetButton onClick={onResetGameClick}>
              {lang("RESET_GAME")}
            </ResetButton>
          )}
          {status === 2 && isChooseWinner && (
            <Button onClick={() => setIsChooseWinner(false)}>
              {lang("SHOW_PICTURE")}
            </Button>
          )}
          {status === 2 && !isChooseWinner && (
            <Button onClick={() => setIsChooseWinner(true)}>
              {lang("CHOOSE_VINNER")}
            </Button>
          )}
          {status === 3 && countDown === 0 && (
            <ResetButton onClick={onResetGameClick}>
              {lang("RESET_GAME")}
            </ResetButton>
          )}
          {status === 4 && (
            <Button onClick={onGetPrizeClick}>
              {lang("GET_PRIZE")}
            </Button>
          )}
        </PlayingRoomControlFooter>
        <PlayingRoomFooter>
          {status === 0 && (
            <>
              {lang("GAME_IS_NOT_STARTED_PRESS_PLAY_BUTTON")}
            </>
          )}
          {status === 1 && (
            <>
              {`${leaderName} ${lang("ARE_EXPLAINING_THE_WORD")}`}
              {countDown > 0 ? ` (${countDown})` : ""}
            </>
          )}
          {status === 2 && isChooseWinner && (
            <>
              {lang("CHOOSE_THE_WINNER_OR_BACK_TO_PICTURE")}
            </>
          )}
          {status === 2 && !isChooseWinner && (
            <>
              {lang("YOU_ARE_EXPLAINING_THE_WORD")}
              {countDown > 0 ? ` (${countDown})` : ""}
            </>
          )}
          {status === 3 && (
            <>
              {lang("WAIT_FOR_WINNER")}
              {countDown > 0 ? ` (${countDown})` : ""}
            </>
          )}
          {status === 4 && (
            <>
              {lang("YOU_WIN_PRESS_GET_PRIZE")}
              {countDown > 0 ? ` (${countDown})` : ""}
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

const SubStatusMessage = styled.p`
  margin-top: 10px;
  text-align: center;
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
