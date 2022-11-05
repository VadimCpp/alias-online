import React from "react";
import { Route, Routes } from "react-router-dom";
import "./firebase";

import UserContext from "./contexts/userContext";
import useUser from "./hooks/useUser";

import Home from "./Containers/Home";
import Rooms from "./Containers/Rooms";
import LangSettings from "./Containers/LangSettings";
import PlayingRoom from "./Containers/PlayingRoom";

const App = () => {
  return (
    <UserContext.Provider value={useUser()}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/lang-settings" element={<LangSettings />} />
        <Route path="/rooms" element={<Rooms />} />
        <Route path="/playing-room" element={<PlayingRoom />} />
      </Routes>
    </UserContext.Provider>
  );
};
export default App;
