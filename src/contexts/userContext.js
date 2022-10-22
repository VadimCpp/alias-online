import { createContext } from "react";

const UserContext = createContext({
  user: null,
  users: [],
  defaultRoom: null,
});

export default UserContext;
