import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled, { keyframes } from "styled-components";
import { signInWithGoogle, logOut } from "../../firebase";
import UserContext from "../../contexts/userContext";
import Button from "../../components/button";
import Header from "../../components/header";
import Container from "../../components/constainer";
import vocabulary from "../../utils/vocabulary.json";
import PlayingCardMini from "./components/playingCardMini";
import LangButtons from "./components/langButtons";

const Home = () => {
  // TODO: how to pass parameter once to the top tag of compound component?
  const HEADER_HEIGHT = "80px";
  const FOOTER_HEIGHT = "50px";

  const navigate = useNavigate();
  const { user, isLoading, lang } = useContext(UserContext);

  const [ filteredVocabulary, setFilteredVocabulary ] = useState([]);
  const [ randomIcons, setRandomIcons ] = useState([]);

  useEffect(() => setFilteredVocabulary(vocabulary.filter(w => !!w['emoji'])), []);
  useEffect(() => {
    if (filteredVocabulary.length) {
      const getRandomIndex = (min, max) => Math.floor(Math.random() * (max-min) + min);
      const randomIndex = getRandomIndex(0, filteredVocabulary.length - 3);
      setRandomIcons(filteredVocabulary.slice(randomIndex, randomIndex + 3));
    }
  }, [filteredVocabulary]);

  // https://stackoverflow.com/a/8745829/1775459
  useEffect(() => {
    window.scrollTo(1, 0);
  }, []);

  const onClickWord = async (word) => {
    navigate(`/vokabular/${word}`);
  }

  return (
    <Container paddingTop={HEADER_HEIGHT} paddingBottom={FOOTER_HEIGHT}>
      <Container.Header height={HEADER_HEIGHT}>
        <Header title={lang("alias_online")} />
      </Container.Header>
      <Container.Content>
        <HomeContent>
          <SectionTitle>
            {lang("we_speak_your_language")}
          </SectionTitle>
          <SectionFooter>
            <LangButtons />
          </SectionFooter>
        </HomeContent>
        <HomeContent background={"lightgray"}>
          <SectionTitle>{lang("vocabulary")}</SectionTitle>
          <VocabularyContent>
            {randomIcons.map((word) => {
              return <PlayingCardMini key={word['no']} wordObject={word} margin={"0 10px 15px"} onClick={onClickWord} />
            })}
          </VocabularyContent>
          <p>
            { lang("there_are_x_words_in_vocabular", filteredVocabulary.length) }
          </p>
          <SectionFooter>
            <Button onClick={() => navigate("/vokabular")}>
              {lang("see_all")}
            </Button>
          </SectionFooter>
        </HomeContent>
        <HomeContent>
          <SectionTitle>
            {
              !!user ?
              `${lang("welcome")}, ${user.displayName}` :
              lang("play_with_friends")
            }
          </SectionTitle>
          <SectionFooter>
            {user && (
              <Row>
                <Left>
                  ➡️
                </Left>
                <Button onClick={() => navigate("/rooms")}>
                  {lang("play")}
                </Button>
                <Right>
                  ⬅️
                </Right>
              </Row>
            )}
            {!user &&
            <Button onClick={() => signInWithGoogle()}>
              {lang("sign_in_with_google")}
            </Button>
            }
            {user && (
              <Button onClick={() => logOut(user.uid)}>
                {lang("log_out")}
              </Button>
            )}
          </SectionFooter>
          <BlankSpace />
        </HomeContent>
      </Container.Content>
      <Container.Footer height={FOOTER_HEIGHT}>
        <HomeFooter>
          { lang(isLoading ? "loading" : "welcome" )}
        </HomeFooter>
      </Container.Footer>
    </Container>
  );
};

const HomeContent = styled.div`
  padding: 10px 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: ${props => (props.background ? props.background : "transparent")};
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

const SectionTitle = styled.h2`
  padding-top: 15px;
  padding-bottom: 10px;
  font-size: 24px;
  text-align: center;
`

const SectionFooter = styled.div`
  padding-top: 10px;
  padding-bottom: 15px;
  justify-content: center;
  display: flex;
  flex-direction: column;
`

const BlankSpace = styled.div`
  height: 100px;
`;

const VocabularyContent = styled.div`
  padding: 10px 20px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

const Row = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const leftAnimation = keyframes`
  0% {
    transform: translate(0);
  }
  50% {
    transform: translate(10px);
  }
  100% {
    transform: translate(0);
  }
`;

const Left = styled.div`
  display: block;
  font-size: 24px;
  animation: ${leftAnimation} 1s linear infinite;
  margin-right: 20px;
`;

const rightAnimation = keyframes`
  0% {
    transform: translate(0);
  }
  50% {
    transform: translate(-10px);
  }
  100% {
    transform: translate(0);
  }
`;

const Right = styled.div`
  display: block;
  font-size: 24px;
  animation: ${rightAnimation} 1s linear infinite;
  margin-left: 20px;
`;

export default Home;
