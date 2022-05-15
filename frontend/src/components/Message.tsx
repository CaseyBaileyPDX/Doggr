import {useLocation} from "react-router-dom";
import {MsgBoxState} from "./MatchHistory";
import React, {useState} from "react";
import {Message} from "../services/MessageService";
import {getPayloadFromToken, useAuth} from "../services/AuthService";

export const MessageBox = () => {

  //useNavigate("/messages") lands here
  const state = useLocation().state as MsgBoxState;
  const context = useAuth();

  const [message, setMessage] = useState("");


  function handleMessageChange(event) {
    console.log("Message changed");
    setMessage(event.target.value);
  }

  async function onSubmitButtonClick() {
    if (state !== null) {
      console.log("Submitting message: ", message);
      let payload = getPayloadFromToken(context?.token);
      let senderId = payload.id;
      console.log("SENDER ID FROM PAYLOAD IS", senderId);
      const result = await Message.send(message, senderId, "b");
      console.log(result);
    }
  }

  return (
    <div>
      <label htmlFor="message">Message</label>
      <input
        type="text"
        id="message"
        required
        value={message}
        onChange={handleMessageChange}
        name="message"
      />
      <br/>
      <button onClick={onSubmitButtonClick}>
        Submit
      </button>
    </div>
  );
};
