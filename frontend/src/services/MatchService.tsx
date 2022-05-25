import {httpClient} from "./HttpService";

export const Match = {
  async send(sender_id: string, receiver_id: number) {
    // This requests to localhost:9000/api/v1/messages with the 3 pieces of data
    console.log("Posting to /match with: ", sender_id, receiver_id)
    return httpClient.post("/match", { sender_id, receiver_id });
  },

  async getMatchesForUser(sender_id){
    let matches = await httpClient.post("/mymatches",{ sender_id});

    //let matches_obj = JSON.parse(matches.data);
    console.log("Got matches for user: ", matches.data);
    return matches.data;
  },

  async unmatch(sender_id, receiver_id) {
    try {
      console.log("Trying to unmatch: ", sender_id, receiver_id);
      let unmatch = await httpClient.delete("/match",
        {
          data: {
            sender_id,
            receiver_id
          }
        });
      console.log("Unmatched");
      return unmatch;
    } catch (err) {
      console.log("Err unmatch: ", err);
    }
  }

}



