import { createContext } from "react";

const UserContext = createContext({
  user: null,
  users: [],
  defaultRoom: null,
  interfaceLang: "NO",
  learningLang: "NO",
});

export default UserContext;
