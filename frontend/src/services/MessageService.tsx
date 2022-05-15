import {httpClient} from "./HttpService";

export const Message = {
  async send(message_text, sender_id, receiver_id) {
    // This requests to localhost:9000/api/v1/messages with the 3 pieces of data
    return httpClient.post("/messages", { message_text, sender_id, receiver_id });
  }
}



