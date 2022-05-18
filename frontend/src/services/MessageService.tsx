import {httpClient} from "./HttpService";

export const Message = {
  async send(message_text: string, sender_id: string, receiver_id: string) {
    // This requests to localhost:9000/api/v1/messages with the 3 pieces of data
    console.log("Posting to /messages with: ", message_text, sender_id, receiver_id)
    return httpClient.post("/messages", { message_text, sender_id, receiver_id });
  }
}



