import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Import the methods you need from Firebase

import { setDoc, addDoc, collection, getDoc, doc, updateDoc, deleteDoc, getDocs, onSnapshot } from 'firebase/firestore'
import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, signOut, signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
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

const setLeader = async (uid, name) => {
  const roomRef = doc(db, "rooms", "norsk-room");
  await updateDoc(roomRef, {
    leaderUid: uid,
    leaderName: name,
    winnerUid: null,
    winnerName: null,
    word: null,
  });
}

const setWinner = async (uid, name, word) => {
  const roomRef = doc(db, "rooms", "norsk-room");
  await updateDoc(roomRef, {
    winnerUid: uid,
    winnerName: name,
    leaderUid: null,
    leaderName: null,
    word,
  });
}

const resetGame = async () => {
  const roomRef = doc(db, "rooms", "norsk-room");
  await updateDoc(roomRef, {
    leaderUid: null,
    leaderName: null,
    winnerUid: null,
    winnerName: null,
    word: null,
  });
}

const resetScore = async (uid) => {
  const userRef = doc(db, "users", uid);
  await updateDoc(userRef, {
    score: 0,
  });
}

const updateScore = async (uid, score) => {
  const userRef = doc(db, "users", uid);
  await updateDoc(userRef, {
    score,
    lastActiveAt: (new Date()).toISOString(),
  });
}

const updateRoom = async (uid, room) => {
  const userRef = doc(db, "users", uid);
  await updateDoc(userRef, {
    room,
    lastActiveAt: (new Date()).toISOString(),
  });
}

const updateLang = async (uid, lang) => {
  const userRef = doc(db, "users", uid);
  await updateDoc(userRef, {
    lang,
    lastActiveAt: (new Date()).toISOString(),
  });
};

const createQuestion = (question) => {
  // Add questions to Firestore. This method is called from the component src/Containers/Question.js
  /*
        Either follow the documentation here: https://firebase.google.com/docs/firestore/manage-data/add-data#add_a_document
        or see the propoesd solution: https://github.com/bekk/firebase-workshop/blob/main/_L%C3%B8sningsforslag_/Del%202%20-%20Firestore/README.md#legge-til-et-dokument-i-databasen

        After you have written your code for adding a question to Firestore,
        check if you can see it appear in the Firestore Console.
    */
};

// Fetch a question document from Firestore here
const getQuestion = (id) => {
  // https://firebase.google.com/docs/firestore/query-data/get-data#get_a_document
};

// Update a question in Firestore
const updateQuestion = (question, id) => {
  // https://firebase.google.com/docs/firestore/manage-data/add-data#update-data
};

// Delete a question by ID
const deleteQuestion = (id) => {
  // https://firebase.google.com/docs/firestore/manage-data/delete-data#delete_documents
};

// Fetch all questions
const getQuestions = () => {
  // https://firebase.google.com/docs/firestore/query-data/get-data#get_multiple_documents_from_a_collection
};

const createQuiz = () => {
  // Create a quiz with questions from Firestore.
};

const registerWithEmailAndPassword = async (name, email, password) => {
  // Register a user with email and password
  // https://firebase.google.com/docs/auth/web/password-auth#create_a_password-based_account
  try {
    console.log("Registration was a success!");
  } catch (err) {
    console.error(err);
  }
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
        lastActiveAt: (new Date()).toISOString(),
        role: 'spiller',
        isActive: true
      };
      await setDoc(doc(db, "users", user.uid), userDoc);
    } catch (err) {
      console.error("Error setting the document for signed in used.", err);
    }
  }
};

const logInWithEmailAndPassword = async (email, password) => {
  // https://firebase.google.com/docs/auth/web/password-auth#sign_in_a_user_with_an_email_address_and_password
  try {
    console.log("Logged in using email and password");
  } catch (err) {
    console.error(err);
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

const sendPasswordReset = async (email) => {
  // https://firebase.google.com/docs/auth/web/manage-users#send_a_password_reset_email
  try {
    console.log("Password reset email sent!");
  } catch (err) {
    console.error(err);
  }
};



export {
  createQuestion,
  getQuestion,
  updateQuestion,
  deleteQuestion,
  getQuestions,
  createQuiz,
  registerWithEmailAndPassword,
  signInWithGoogle,
  logInWithEmailAndPassword,
  logOut,
  sendPasswordReset,
  subscribeForUsersUpdates,
  subscribeForRoomsUpdates,
  setLeader,
  setWinner,
  resetGame,
  resetScore,
  updateScore,
  updateRoom,
  updateLang
};
