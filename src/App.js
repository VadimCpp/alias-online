import React from "react";
import { Route, Routes } from "react-router-dom";
import "./firebase";

import UserContext from "./contexts/userContext";
import useUser from "./hooks/useUser";

import Home from "./Containers/Home";
import Questions from "./Containers/Questions";
import Register from "./Containers/Register";
import LangSettings from "./Containers/LangSettings";
import PlayingRoom from "./Containers/PlayingRoom";

const App = () => {
  return (
      <UserContext.Provider value={useUser()}>
        <div>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<Register />} />
            <Route path="/questions" element={<Questions />} />
            <Route path="/lang-settings" element={<LangSettings />} />
            <Route path="/playing-room" element={<PlayingRoom />} />
          </Routes>
        </div>
      </UserContext.Provider>
  );
};
export default App;
