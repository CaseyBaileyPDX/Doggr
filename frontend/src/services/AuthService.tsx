import {httpClient} from "./HttpService";
import React from "react";
import {useLocation, useNavigate} from "react-router-dom";
import {Location} from "react-router";

export type AuthContextProps = {
  token: string | null,
  handleLogin: (email: string, password: string) => Promise<boolean>,
  handleLogout: () => void,
}

export const AuthContext = React.createContext<AuthContextProps | null>(null);

const updateAxios = async(token) => {
  console.log("In update axios");
  httpClient.interceptors.request.use(
    async config => {


      config.headers = {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded'
      };

      return config;
    },
    error => {
      console.log("REJECTED PROMISE");
      Promise.reject(error);
    });

}

const initialToken: string | null = getTokenFromStorage();

if (initialToken) {
  updateAxios(initialToken);
}

export const AuthProvider = ({children}) => {
  const navigate = useNavigate();
  const location = useLocation();

  const [token, setToken] = React.useState(initialToken);

  const handleLogin = async (email, password) => {
    console.log("in handle login with email: {} and pw {}", email, password);
    try {
      let token = await getLoginTokenFromServer(email, password);
      console.log("Got token in handle login", token);
      saveToken(token);
      console.log("After saving token");
      await updateAxios(token);
      console.log("After updating axios");
      /* logged in now, so we can go somewhere that requires auth!
       we'll either go back to wherever the user was before being
       redirected to login, or default to match-history
       */
      //const origin = location.state?.from?.pathname || "/match-history";
      const origin = getPathname(location) || "/match-history";
      navigate(origin);
      return true;
    } catch (err) {
      console.log("Failed handle login", err);
      navigate("/login");
      return false;
    }
  };

  const handleLogout = () => {
    setToken(null);
    localStorage.removeItem("token");
    // Don't need a navigate here, as our Protected Route will defend us
  };

  const saveToken =  (token) => {
    console.log("Saving token");
    setToken(token);
    localStorage.setItem("token", JSON.stringify(token));
    //add to axios as header
    //httpClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    //let defheaders = httpClient.defaults.headers.common['Authorization'];



//    console.log("Default headers are: ", defheaders);
  };




  return (
    <AuthContext.Provider value={{
      token,
      handleLogin,
      handleLogout
    }}>
      {children}
    </AuthContext.Provider>
  );
};



export const useAuth = () => {
  return React.useContext(AuthContext);
};


export function getTokenFromStorage() {
  const tokenString = localStorage.getItem('token');
  // @ts-ignore
  const userToken = JSON.parse(tokenString);
  return userToken?.token;
}

export async function getLoginTokenFromServer(email: string, password: string) {
  console.log("In get login token from server", email, password);
  let res = await httpClient.post("/login", {
    email,
    password
  });

  return res.data;
}


// See: https://github.com/remix-run/react-router/pull/8706

const isObjectWithKey = <T extends string>(
  given: unknown,
  key: T
): given is Partial<Record<T, unknown>> =>
  typeof given === 'object' && given !== null && key in given;

export const getPathname = (location: Location): string | undefined => {
  const {state} = location;
  // Note that doing e.g.: const state = location.state as { from: Location }
  // as suggested elsewhere isn't type safe and you risk runtime errors when doing it that way.
  return isObjectWithKey(state, 'from') &&
  isObjectWithKey(state.from, 'pathname') &&
  typeof state.from.pathname === 'string'
    ? state.from.pathname
    : undefined;
};
