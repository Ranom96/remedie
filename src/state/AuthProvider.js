import { createContext, useState } from "react";
import { login, logout, register } from "../services/AuthService";

const AuthContext = createContext({
  userIdd: null,
  logado: false,
  handleLogin: () => {},
  handdleLogout: () => {},
  handleRegister: () => {},
});

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState({
    userId: null,
    logado: false,
  });

  const handleLogin = async (email, password) => {
    try {
      const res = await login(email, password);
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  const handleLogout = async () => {
    await logout().then(setCurrentUser({ userId: null, logado: false }));
  };
  const handleRegister = async (email, password) => {
    try {
      const res = await register(email, password);
      console.log(res);
      setCurrentUser({ userId: res.user.id, logado: true });
    } catch (error) {
      console.log(error);
    }
  };

  const context = {
    userId: currentUser.userId,
    logado: currentUser.logado,
    handleLogin,
    handleLogout,
    handleRegister,
  };

  return (
    <AuthContext.Provider value={context}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
export { AuthContext };
