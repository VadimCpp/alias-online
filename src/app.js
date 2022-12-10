import React from "react";
import { Route, Routes } from "react-router-dom";
import "./firebase";

import UserContext from "./contexts/userContext";
import useUser from "./hooks/useUser";

import Home from "./screens/home";
import Rooms from "./screens/rooms";
import Room from "./screens/room";
import Vocabulary from "./screens/vocabulary";
import Word from "./screens/word";
import Menu from "./components/menu";

const App = () => {
  return (
    <UserContext.Provider value={useUser()}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/rooms" element={<Rooms />} />
        <Route path="/rooms/:slug" element={<Room />} />
        <Route path="/vokabular" element={<Vocabulary />} />
        <Route path="/vokabular/:word" element={<Word />} />
      </Routes>
      <Menu />
    </UserContext.Provider>
  );
};

export default App;
