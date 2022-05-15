import {httpClient} from "./HttpService";
import React from "react";
import {useNavigate} from "react-router-dom";


export type AuthContextProps = {
  token: string | null,
  handleLogin: (email: string, password: string) => Promise<boolean>,
  handleLogout: () => void,
}

export const AuthContext = React.createContext<AuthContextProps | null >(null);

const initialToken: string | null = getTokenFromStorage();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();

  const [token, setToken] = React.useState(initialToken);

  const handleLogin = async (email, password) => {
    console.log("in handle login");
    try {
      let token = await getLoginTokenFromServer(email, password);
      console.log("Got token in handle login", token);
      saveToken(token);
      // logged in now, so we can go somewhere that requires auth!
      navigate("/match-history");
      return true;
    } catch (err) {
      console.log("Failed handle login", err);
      navigate("/login");
      return false;
    }


  }

  const handleLogout = () => {
    setToken(null);
    localStorage.removeItem("token");
    // Don't need a navigate here, as our Protected Route will defend us
  };

  const saveToken = (token) => {
    setToken(token);
    localStorage.setItem("token", JSON.stringify(token));
  }


  return (
    <AuthContext.Provider value={{token, handleLogin, handleLogout}}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return React.useContext(AuthContext);
}


export function getTokenFromStorage() {
  const tokenString = localStorage.getItem('token');
  // @ts-ignore
  const userToken = JSON.parse(tokenString);
  return userToken?.token
}

export async function getLoginTokenFromServer(email: string, password: string){
  let res = await httpClient.post("/login", {
    email,
    password
  });

  return res.data;
}

