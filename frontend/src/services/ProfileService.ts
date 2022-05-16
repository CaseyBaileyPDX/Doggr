import {httpClient} from "./HttpService";


export async function GetRandomProfile(){
  const profile: any = await httpClient.get("/randomProfile");

}
