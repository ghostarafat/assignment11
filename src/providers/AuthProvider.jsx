import { useEffect, useState } from "react";
import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
// import { app } from "../firebase/firebase.config";
import { AuthContext } from "./AuthContext";
import { auth } from "../../firebase.config";

// const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const createUserFunc = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const signInFunc = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  const signInWithGoogleFunc = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider);
  };

  const logOutFunc = async () => {
    setLoading(true);
    return signOut(auth);
  };

  const updateUserProfileFunc = (name, photo) => {
    return updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: photo,
    });
  };
  // console.log(user);

  // onAuthStateChange
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => {
      return unsubscribe();
    };
  }, []);

  const authInfo = {
    user,
    setUser,
    loading,
    setLoading,
    createUserFunc,
    signInFunc,
    signInWithGoogleFunc,
    logOutFunc,
    updateUserProfileFunc,
  };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
