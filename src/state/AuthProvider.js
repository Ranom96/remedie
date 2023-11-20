import { createContext, useState } from "react";
import { login, logout, register } from "../services/AuthService";

const AuthContext = createContext({
  userIdd: null,
  logado: false,
  handleLogin: (data) => {},
  handleLogout: () => {},
  handleRegister: (data) => {},
});

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState({
    userId: null,
    logado: false,
  });

  const handleLogin = async (data) => {
    try {
      const res = await login(data.email, data.senha);
      setCurrentUser({ userId: res.user.uid, logado: true });
    } catch (error) {
      throw error;
    }
  };

  const handleLogout = async () => {
    await logout().then(setCurrentUser({ userId: null, logado: false }));
  };

  const handleRegister = async (data) => {
    try {
      const res = await register(data.email, data.senha);
      setCurrentUser({ userId: res.user.uid, logado: false });
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
