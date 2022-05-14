import {useLocation} from "react-router-dom";
import {MsgBoxState} from "./MatchHistory";
import React, {useState} from "react";
import {Message} from "../services/MessageService";

export const MessageBox = () => {

  //useNavigate("/messages") lands here
  const state = useLocation().state as MsgBoxState;

  const [message, setMessage] = useState("");


  function handleMessageChange(event) {
    console.log("Message changed");
    setMessage(event.target.value);
  }

  async function onSubmitButtonClick() {
    if (state !== null) {
      const result = await Message.send(message, state.sender_id, state.receiver_id);
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
