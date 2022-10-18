import React from "react";
import { Route, Routes } from "react-router-dom";
import "./firebase";

import LanguageContext from "./contexts/languageContext";
import UserContext from "./contexts/userContext";
import useLang from "./hooks/useLang";
import useUser from "./hooks/useUser";

import Home from "./Containers/Home";
import Login from "./Containers/Login";
import Question from "./Containers/Question";
import Questions from "./Containers/Questions";
import Quiz from "./Containers/Quiz";
import Register from "./Containers/Register";
import Reset from "./Containers/Reset";
import Signin from "./Containers/Signin";
import LangSettings from "./Containers/LangSettings";
import PlayingRoom from "./Containers/PlayingRoom";

const App = () => {
  return (
    <LanguageContext.Provider value={useLang()}>
      <UserContext.Provider value={useUser()}>
        <div>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signin" element={<Signin />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/reset" element={<Reset />} />
            <Route path="/question" element={<Question />} />
            <Route path="/question/:id" element={<Question />} />
            <Route path="/questions" element={<Questions />} />
            <Route path="/quiz" element={<Quiz />} />
            <Route path="/lang-settings" element={<LangSettings />} />
            <Route path="/playing-room" element={<PlayingRoom />} />
          </Routes>
        </div>
      </UserContext.Provider>
    </LanguageContext.Provider>
  );
};
export default App;
