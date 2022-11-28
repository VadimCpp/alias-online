import React, {useContext, useEffect, useState} from "react";
import styled from "styled-components";
import {useNavigate, useParams} from "react-router-dom";
import Container from "../../components/constainer";
import UserContext from "../../contexts/userContext";
import vocabulary from "../../utils/vocabulary.json";
import PlayingCard from "./components/playingCard";
import Link from "./components/link";
import { ReactComponent as MenuIcon } from "../../icons/menu.svg";
import { ReactComponent as BackIcon } from "../../icons/back.svg";

const BACK = -1;

const Word = () => {
  // TODO: how to pass parameter once to the top tag of compound component?
  const HEADER_HEIGHT = "80px";
  const FOOTER_HEIGHT = "50px";

  const navigate = useNavigate();

  let { word } = useParams();

  const [decodedWord, setDecodedWord] = useState("");
  const [vocabularyRecord, setVocabularyRecord] = useState(null);

  useEffect(() => setDecodedWord(decodeURI(word)), [ word ]);
  useEffect(() => {
    const record = vocabulary.find(o => o['no'] === decodedWord);
    if (record) {
      setVocabularyRecord(record);
    }
  }, [decodedWord])

  const { lang, showModal } = useContext(UserContext);

  return (
    <Container paddingTop={HEADER_HEIGHT} paddingBottom={FOOTER_HEIGHT}>
      <Container.Header height={HEADER_HEIGHT}>
        <WordHeader>
          <BackButton onClick={() => navigate(BACK)} />
          <Title>{decodedWord}</Title>
          <MenuButton onClick={() => showModal()} />
        </WordHeader>
      </Container.Header>
      <Container.Content>
        <WordContent>
          <PlayingCard wordObject={vocabularyRecord} margin={"0 0 25px 0"}/>
          {
            [
              { slug: 'ordbokene', label: "Ordbøkene", backgroundColor: "rgb(252, 241, 242)" },
              { slug: 'naob', label: "Naob", backgroundColor: "white" },
              { slug: 'snl', label: "Store norske leksikon", backgroundColor: "rgb(240, 241, 241)" }
            ].map(v => {
              if (vocabularyRecord && vocabularyRecord[v.slug]) {
                return <Link
                  key={v.slug}
                  link={vocabularyRecord[v.slug]}
                  label={v.label}
                  icon={v.slug}
                  margin={"0 0 10px 0"}
                  backgroundColor={v.backgroundColor}
                />
              }
              return null;
            })
          }
        </WordContent>
      </Container.Content>
      <Container.Footer height={FOOTER_HEIGHT}>
        <WordFooter>
          { lang("use_links_to_get_more_information") }
        </WordFooter>
      </Container.Footer>
    </Container>
  );
};

const BackButton = styled(BackIcon)`
  transition: all .5s;
  width: 36px;
  height: 36px;
  &:hover {
    transform: scale(1.25);
  }
  cursor: pointer;
`;

const Title = styled.h1`
  text-align: center;
  font-size: 36px;
  color: #ffffff;
  font-style: normal;
  font-weight: 700;
  cursor: pointer;
`;

const MenuButton = styled(MenuIcon)`
  transition: all .5s;
  width: 36px;
  height: 36px;
  &:hover {
    transform: scale(1.25);
  }
  cursor: pointer;
`;

const WordHeader = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  height: 100%;
  background-color: #2BC48A;
  padding: 0 20px;
`;

const WordContent = styled.div`
  padding: 10px 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const WordFooter = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  height: 100%;
  background-color: #222;
  padding: 0 20px;
  color: white;
`;

export default Word;
