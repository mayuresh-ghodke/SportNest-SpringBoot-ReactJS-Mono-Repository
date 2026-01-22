import { createContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  
  const [token, setToken] = useState(() =>
    localStorage.getItem("token")
  );

  const [user, setUser] = useState(null);
  const isAuthenticated = Boolean(token);

  const login = (jwt) => {
    const decoded = jwtDecode(jwt);
    setToken(jwt);
    setUser(decoded);
    localStorage.setItem("token", jwt);
  }

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem("token");
  };

  // persist token
  useEffect(() => {
    if (token) {
      const decoded = jwtDecode(token);

      // auto logout if expired
      if(decoded.exp * 1000 < Date.now()){
        logout();
      }
      else{
        setUser(decoded);
      }
    }
  }, [token]);

  return (
    <AuthContext.Provider value={{token,user,isAuthenticated,login,logout}}>
      {children}
    </AuthContext.Provider>
  );
};
