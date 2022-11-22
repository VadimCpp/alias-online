import { useCallback, useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { subscribeForRoomsUpdates, subscribeForUsersUpdates } from "../firebase";
import getString from "../utils/getString";

const useUser = () => {
  const [isLoading, setIsLoading] = useState(true);

  // User
  const [user, setUser] = useState(null);
  const [users, setUsers] = useState([]);

  // Rooms
  const [rooms, setRooms] = useState([]);

  // Lang
  const [interfaceLang, setInterfaceLang] = useState("NO");
  const lang = useCallback((key, optParam) => {
    let result = getString(interfaceLang, key);
    if (optParam) {
      result = result.replace("{x}", optParam);
    }
    return result;
  }, [interfaceLang]);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, authUser => {
      console.log("Auth state changed. Updating user: ", authUser);
      setIsLoading(false);
      authUser ? setUser(authUser) : setUser(null);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    let unsubscribe = null;
    try {
      if (user) {
        unsubscribe = subscribeForUsersUpdates((collection) => {
          setUsers(collection.docs.map((doc) => doc.data()));
        });
      } else {
        setUsers([]);
      }
    }
    catch (err) {
      console.error("Error while subscribe for users updates.", err);
      setUsers([]);
    }

    return () => { if (unsubscribe) { unsubscribe() } };
  }, [user]);

  useEffect(() => {
    let unsubscribe = null;
    try {
      if (user) {
        unsubscribe = subscribeForRoomsUpdates((collection) => {
          setRooms(collection.docs.map((doc) => doc.data()));
        });
      } else {
        setRooms([]);
      }
    }
    catch (err) {
      console.error("Error while subscribe for rooms updates.", err);
      setRooms([]);
    }

    return () => { if (unsubscribe) { unsubscribe() } };
  }, [user]);

  useEffect(() => {
    if (!!user && users.length) {
      let profile = users.find(u => u.uid === user.uid)
      setInterfaceLang(profile.lang || "NO");
    } else {
      setInterfaceLang("NO");
    }
  }, [users, user]);

  return {
    isLoading,
    user,
    users,
    rooms,
    interfaceLang,
    setInterfaceLang,
    lang
  };
};

export default useUser;
