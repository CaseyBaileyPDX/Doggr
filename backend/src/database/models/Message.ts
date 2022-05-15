import {Table, Column, Model, HasMany, ForeignKey} from 'sequelize-typescript';

import {User} from "./User";


@Table
export class Message extends Model {
  @Column
  message_text!: string

  @ForeignKey(() => User)
  @Column
  sender_id!: number

  @ForeignKey(() => User)
  @Column
  receiver_id!: number
}





// import {DataTypes, Model} from "sequelize";
// import { db} from "../../services/DBService";
//
//   export class Message extends Model {
//     declare message_text: string;
//     declare sender_id: number;
//     declare receiver_id: number;
//   }
//   Message.init({
//     message_text: DataTypes.STRING,
//     sender_id: DataTypes.NUMBER,
//     receiver_id: DataTypes.NUMBER
//   }, {
//     sequelize: db,
//     modelName: 'Message',
//   });
