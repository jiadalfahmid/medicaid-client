import axios from "axios";
import { createContext, useEffect, useState } from "react";
import app from "../../Firebase/firebase.config";

import {
  createUserWithEmailAndPassword,
  getAuth,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import useAxiosPublic from "../../Hooks/useAxiosPublic";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const auth = getAuth(app);
  const googleProvider = new GoogleAuthProvider();

  // Sign-Up Function
  const signUp = async (name, email, password, photo) => {
    setLoading(true);
    setError(null);
    setSuccess(null);
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      // Update profile with name and photo
      await updateProfile(user, {
        displayName: name,
        photoURL: photo,
      });

      setUser(user);
      setSuccess("Registration successful!");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Google Sign-Up/Login
  const signUpWithGoogle = async () => {
    setLoading(true);
    setError(null);
    setSuccess(null);
    try {
      const result = await signInWithPopup(auth, googleProvider);
      setUser(result.user);
      const userInfo = {
        email: result.user?.email,
        name: result.user?.displayName,
        role: "user",
      };
      const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:5000";
      await axios.post(`${apiUrl}/users`, userInfo).then((result) => {
        setSuccess("Google sign-in successful!");
      });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Login Function
  const login = async (email, password) => {
    setLoading(true);
    setError(null);
    setSuccess(null);
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      setUser(userCredential.user);
      setSuccess("Login successful!");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Logout Function (Also Clears JWT)
  const logout = async () => {
    setLoading(true);
    setError(null);
    setSuccess(null);
    try {
      await signOut(auth);
      localStorage.removeItem("accessToken");
      setUser(null);
      setSuccess("Logout successful!");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Observe Auth State Changes & Handle JWT Token
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      setLoading(false);

      if (currentUser) {
        try {
          const { email } = currentUser;

          // Request JWT Token from Backend
          const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:5000";
          const { data } = await axios.post(
            `${apiUrl}/jwt`,
            { email }
          );

          // Store Token in Local Storage
          localStorage.setItem("accessToken", data.token);
        } catch (error) {
          console.error("Error getting JWT token:", error);
        }
      } else {
        // Clear Token on Logout
        localStorage.removeItem("accessToken");
      }
    });

    return () => unsubscribe();
  }, [auth]);

  // Provide Auth Context
  const authInfo = {
    user,
    setUser,
    signUp,
    signUpWithGoogle,
    login,
    logout,
    loading,
    error,
    setError,
    success,
    setSuccess,
  };

  return (
    <AuthContext.Provider value={authInfo}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
