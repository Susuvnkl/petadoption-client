import axios from "axios";
import React, { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export default function AuthContextProvider({ children }) {
  const [token, setToken] = useState(``);
  const [loggedUser, setLoggedUser] = useState(``);
  const [loggedUserId, setLoggedUserId] = useState(``);
  const [admin, setAdmin] = useState(false);

  const getStates = async () => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_BASE_URL}/users`, { withCredentials: true });
      console.log(res.data);
      if (res.data.role === "admin") {
        setAdmin(true);
      }
      setLoggedUser(res.data.userName);
      setLoggedUserId(res.data.id);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getStates();
  }, []);

  return (
    <AuthContext.Provider value={{ token, setToken, loggedUser, setLoggedUser, admin, setAdmin, loggedUserId, setLoggedUserId }}>
      {children}
    </AuthContext.Provider>
  );
}
