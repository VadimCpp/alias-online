import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Import the methods you need from Firebase

import { setDoc, collection, doc, updateDoc, onSnapshot } from 'firebase/firestore'
import { GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
const googleProvider = new GoogleAuthProvider();

// Fill in the config values of your Firebase project below
const firebaseConfig = {
  apiKey: "AIzaSyCIXUBQgGrUu6DPyzirXzCOsB_mjA9EIzM",
  authDomain: "alias-online-13de4.firebaseapp.com",
  projectId: "alias-online-13de4",
  storageBucket: "alias-online-13de4.appspot.com",
  messagingSenderId: "513511160334",
  appId: "1:513511160334:web:f856fc3504d446d6595a5f"
};

/* Uncomment the lines below when your Firebase config is good. */
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

/**
 * @param updatesHandler - callback function which is fired on update
 * @return unsubscribe function, call it to stop subscription
 */
const subscribeForUsersUpdates = (updatesHandler) => {
  const usersRef = collection(db, "users");
  return onSnapshot(usersRef, updatesHandler);
}

/**
 * @param updatesHandler - callback function which is fired on update
 * @return unsubscribe function, call it to stop subscription
 */
const subscribeForRoomsUpdates = (updatesHandler) => {
  const roomsRef = collection(db, "rooms");
  return onSnapshot(roomsRef, updatesHandler);
}

const setLeader = async (uid, room, name, word) => {
  const roomRef = doc(db, "rooms", room);
  await updateDoc(roomRef, {
    leaderUid: uid,
    leaderName: name,
    leaderTimestamp: Date.now(),
    winnerUid: null,
    winnerName: null,
    winnerTimestamp: null,
    word: word,
  });
}

const setWinner = async (uid, room, name, word) => {
  const roomRef = doc(db, "rooms", room);
  await updateDoc(roomRef, {
    winnerUid: uid,
    winnerName: name,
    winnerTimestamp: Date.now(),
    leaderUid: null,
    leaderName: null,
    leaderTimestamp: null,
    word,
  });
}

const resetGame = async (room) => {
  const roomRef = doc(db, "rooms", room);
  await updateDoc(roomRef, {
    leaderUid: null,
    leaderName: null,
    leaderTimestamp: null,
    winnerUid: null,
    winnerName: null,
    winnerTimestamp: null,
    word: null,
  });
}

const resetScore = async (uid) => {
  const userRef = doc(db, "users", uid);
  await updateDoc(userRef, {
    score: 0,
    greeting: false,
  });
}

const updateScore = async (uid, score) => {
  const userRef = doc(db, "users", uid);
  await updateDoc(userRef, {
    score,
    lastActiveAt: Date.now(),
    greeting: false,
  });
}

const updateGreeting = async (uid, greeting) => {
  const userRef = doc(db, "users", uid);
  await updateDoc(userRef, {
    greeting,
  });
}

const updateRoom = async (uid, room) => {
  const userRef = doc(db, "users", uid);
  await updateDoc(userRef, {
    room,
    lastActiveAt: Date.now(),
    greeting: false,
  });
}

const updateLang = async (uid, lang) => {
  const userRef = doc(db, "users", uid);
  await updateDoc(userRef, {
    lang,
    lastActiveAt: Date.now(),
    greeting: false,
  });
};

const signInWithGoogle = async () => {
  let signInSuccess = false;
  let signInResult;
  try {
    signInResult = await signInWithPopup(auth, googleProvider);
    signInSuccess = true;
  } catch (err) {
    console.error("Error while signing in.", err);
  }

  if (signInSuccess) {
    try {
      const user = signInResult.user;
      const userDoc = {
        uid: user.uid,
        displayName: user.displayName,
        photoURL: user.photoURL,
        score: 0,
        lastActiveAt: Date.now(),
        role: 'spiller',
        isActive: true
      };
      await setDoc(doc(db, "users", user.uid), userDoc);
    } catch (err) {
      console.error("Error setting the document for signed in used.", err);
    }
  }
};

const logOut = async (userUid) => {
  try {
    const questionRef = doc(db, "users", userUid);
    await updateDoc(questionRef, { isActive: false });
  } catch (err) {
    console.error("Error while updating user doc.", err);
  }

  try {
    await signOut(auth);
  } catch (err) {
    console.error("Error while signing user out.", err);
  }
};

const updateWord = async (room, word) => {
  const roomRef = doc(db, "rooms", room);
  await updateDoc(roomRef, {
    word: word,
  });
}

export {
  signInWithGoogle,
  logOut,
  subscribeForUsersUpdates,
  subscribeForRoomsUpdates,
  setLeader,
  setWinner,
  resetGame,
  resetScore,
  updateScore,
  updateGreeting,
  updateRoom,
  updateLang,
  updateWord,
};
