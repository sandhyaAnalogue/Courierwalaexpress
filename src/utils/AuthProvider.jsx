// import AsyncStorage from "@react-native-async-storage/async-storage"
// import { useState,createContext } from "react"

// export const AuthContext = createContext()

// const AuthProvider = ({children}) => {
//     const [isLoggedIn,setIsLoggedIn] = useState(false)

//     const login=()=>{
//         setIsLoggedIn(true)
//     }

//     async function StorageToken(token)
//     {
//       await AsyncStorage.setItem("token",token)
//     }

//     const logout = ()=>{
//         setIsLoggedIn(false)
//     }
//   return (
//     <AuthContext.Provider value={{isLoggedIn,login,logout}}>
//         {children}
//     </AuthContext.Provider>
//   )
// }

// export default AuthProvider

import { useState, useEffect, createContext } from "react";
import HybridStorage from "./helpers/HybridStorage"; // path to your HybridStorage file

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, setToken] = useState(null);

  // Load token on app start
  useEffect(() => {
    const loadToken = async () => {
      const storedToken = await HybridStorage.getItem("token");
      if (storedToken) {
        setToken(storedToken);
        setIsLoggedIn(true);
      }
    };
    loadToken();
  }, []);

  // Login function
  const login = async (newToken) => {
    setToken(newToken);
    setIsLoggedIn(true);
    await HybridStorage.setItem("token", newToken);
  };

  // Logout function
  const logout = async () => {
    setToken(null);
    setIsLoggedIn(false);
    await HybridStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;


