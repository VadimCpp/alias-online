import React from "react";
import { Route, Routes } from "react-router-dom";
import "./firebase";

import UserContext from "./contexts/userContext";
import useUser from "./hooks/useUser";

import Home from "./screens/home";
import Rooms from "./screens/rooms";
import LangSettings from "./screens/langSettings";
import PlayingRoom from "./screens/playingRoom";
import Vocabulary from "./screens/vocabulary";

const App = () => {
  return (
    <UserContext.Provider value={useUser()}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/lang-settings" element={<LangSettings />} />
        <Route path="/rooms" element={<Rooms />} />
        <Route path="/rooms/:slug" element={<PlayingRoom />} />
        <Route path="/vokabular" element={<Vocabulary />} />
        {/*<Route path="/vokabular/:word" element={<Word />} />*/}
      </Routes>
    </UserContext.Provider>
  );
};
export default App;
