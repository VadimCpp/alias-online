import { createContext } from "react";

const UserContext = createContext({
  user: null,
  users: [],
  defaultRoom: null,
  interfaceLang: "no",
  learningLang: "no",
});

export default UserContext;
