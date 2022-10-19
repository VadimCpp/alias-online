import {useEffect, useState} from 'react';
import {getAuth, onAuthStateChanged} from "firebase/auth";

const useUser = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const auth = getAuth()
    const unsubscribe = onAuthStateChanged(auth, authUser => {
      authUser ? setUser(authUser) : setUser(null)
    });
    return () => unsubscribe();
  }, []);

  return {
    user
  };
};

export default useUser;
