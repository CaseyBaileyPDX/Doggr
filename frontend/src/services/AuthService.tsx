import {httpClient} from "./HttpService";

export function setToken(userToken) {
  localStorage.setItem("token", JSON.stringify(userToken));
}

export function getTokenFromStorage() {
  const tokenString = localStorage.getItem('token');
  // @ts-ignore
  const userToken = JSON.parse(tokenString);
  return userToken?.token
}

export function deleteToken(setToken) {
  localStorage.removeItem("token");
  setToken(null);
}

export async function getLoginToken(email: string, password: string){
  let res = await httpClient.post("/login", {
    email,
    password
  });

  let token = res.data;

  console.log("Got result token:", token);
  setToken( token);
  return token;
}
