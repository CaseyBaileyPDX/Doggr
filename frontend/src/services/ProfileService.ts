import {httpClient} from "./HttpService";


export async function getRandomProfile(){
  let res = await httpClient.get("/randomProfile");

  let data = await res.data;
  console.log(data);
  return data;
}
