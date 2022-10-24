import { createContext } from "react";

const UserContext = createContext({
  user: null,
  users: [],
  defaultRoom: null,
  interfaceLang: "EN",
  learningLang: "NO",
});

export default UserContext;
