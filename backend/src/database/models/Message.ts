import {DataTypes, Model} from "sequelize";
import {db} from "../DBService";
import {User} from "./User";

interface MessageModelAttrs extends Model {
  message_text: string,
  sender_id: number,
  receiver_id: number,
  message_sent: string,
}

export const Message = db.define<MessageModelAttrs>('messages', {
  message_text: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  sender_id: {
    type: DataTypes.STRING,
    references: {
      model: User,
      key: "email",
    },
  },
  receiver_id: {
    type: DataTypes.STRING,
    references: {
      model: User,
      key: "email",
    },
  },
});
