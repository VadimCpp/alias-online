import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import UserContext from "../../contexts/userContext";
import Button from "../../components/button";
import { signInWithGoogle, logOut } from "../../firebase";
import Container from "../../components/constainer";
import { ReactComponent as SettingsIcon } from "../../icons/settings.svg";
import { ReactComponent as MenuIcon } from "../../icons/menu.svg";
import vocabulary from "../../utils/vocabulary.json";
import PlayingCardMini from "./components/playingCardMini";

const Home = () => {
  // TODO: how to pass parameter once to the top tag of compound component?
  const HEADER_HEIGHT = "120px";
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

  const onClickWord = async (word) => {
    navigate(`/vokabular/${word}`);
  }

  return (
    <Container paddingTop={HEADER_HEIGHT} paddingBottom={FOOTER_HEIGHT}>
      <Container.Header height={HEADER_HEIGHT}>
        <HomeHeader>
          <SettingsButton onClick={() => navigate("/lang-settings")} />
          <Title onClick={() => navigate("/")}>{lang("ALIAS_ONLINE")}</Title>
          <MenuButton onClick={() => null} />
        </HomeHeader>
      </Container.Header>
      <Container.Content>
        <HomeContent>
          <SectionTitle>
            {
              !!user ?
              `${lang("WELCOME")}, ${user.displayName}` :
              lang("PLAY_WITH_FRIENDS")
            }
          </SectionTitle>
          <SectionFooter>
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
          </SectionFooter>
        </HomeContent>
        <HomeContent background={"lightgray"}>
          <SectionTitle>{"Vocabulary"}</SectionTitle>
          <VocabularyContent>
            {randomIcons.map((word) => {
              return <PlayingCardMini wordObject={word} margin={"0 10px 15px"} onClick={onClickWord} />
            })}
          </VocabularyContent>
          <p>
            { lang("THERE_ARE_X_WORDS_IN_VOCABULAR", filteredVocabulary.length) }
          </p>
          <SectionFooter>
            <Button onClick={() => navigate("/vokabular")}>
              {"See all"}
            </Button>
          </SectionFooter>
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
const VocabularyContent = styled.div`
  padding: 10px 20px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`

export default Home;
