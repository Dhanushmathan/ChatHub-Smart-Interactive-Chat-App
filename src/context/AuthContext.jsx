import { onAuthStateChanged } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import { auth, db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";

const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const userRef = doc(db, "users", user.uid);
        const userSnap = await getDoc(userRef);
        if (userSnap.exists()) {
          const userData = userSnap.data();
          setCurrentUser({
            uid: user.uid,
            email: user.email,
            displayName: userData.displayName || "Unknown User",
            photoURL: userData.profilePic || "https://static-00.iconduck.com/assets.00/profile-circle-icon-512x512-zxne30hp.png",
          });
        } else {
          setCurrentUser({
            uid: user.uid,
            email: user.email,
            displayName: user.displayName || "Unknown User",
            photoURL: user.profilePic || "https://static-00.iconduck.com/assets.00/profile-circle-icon-512x512-zxne30hp.png",
          })
        }
        localStorage.setItem("userId", user.uid);
      } else {
        setCurrentUser(null);
        localStorage.removeItem("userId");
      }
      setLoading(false);
    });

    return () => { unsub(); }
  }, [])

  console.log(currentUser);

  return (
    <AuthContext.Provider value={{ currentUser, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );

};

export { AuthContext, AuthContextProvider };