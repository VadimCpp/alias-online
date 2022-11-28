import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import Container from "../../components/constainer";
import Header from "../../components/header";
import UserContext from "../../contexts/userContext";
import vocabulary from "../../utils/vocabulary.json";
import PlayingCard from "./components/playingCard";
import Link from "./components/link";

const Word = () => {
  // TODO: how to pass parameter once to the top tag of compound component?
  const HEADER_HEIGHT = "80px";
  const FOOTER_HEIGHT = "50px";

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

  const { lang } = useContext(UserContext);

  return (
    <Container paddingTop={HEADER_HEIGHT} paddingBottom={FOOTER_HEIGHT}>
      <Container.Header height={HEADER_HEIGHT}>
        <Header
          title={decodedWord}
          backButton
          menuButton
        />
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
