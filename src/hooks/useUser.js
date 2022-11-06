import { useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { subscribeForRoomsUpdates, subscribeForUsersUpdates } from "../firebase";

const useUser = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [users, setUsers] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [interfaceLang, setInterfaceLang] = useState("EN");
  const learningLang = useState("NO");

  //NOTE! Use only one room for the first release
  //TODO: implement multiple rooms in future
  const [defaultRoom, setDefaultRoom] = useState(null);

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
    setDefaultRoom(rooms.find(r => r.uid === "norsk-room") || null);
  }, [rooms]);

  useEffect(() => {
    if (!!user && users.length) {
      let profile = users.find(u => u.uid === user.uid)
      setInterfaceLang(profile.lang || "EN");
    } else {
      setInterfaceLang("EN");
    }
  }, [users, user]);

  return {
    isLoading,
    user,
    users,
    rooms,
    defaultRoom,
    interfaceLang,
    setInterfaceLang,
    learningLang
  };
};

export default useUser;
