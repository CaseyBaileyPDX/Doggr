import {Table, Column, Model, HasMany, BeforeCreate, BeforeBulkCreate} from 'sequelize-typescript';
import bcrypt from "bcrypt";
import {Profile} from "./profile";
import {Message} from "./message";


@Table
export class User extends Model {
  @Column
  email!: string;

  @Column
  password!: string;

  @HasMany(() => Profile)
  profiles: Profile[];

  @HasMany(() => Message)
  messages: Message[];

  @BeforeCreate
  static async hashPassword(user: User) {
    console.log("Hashing single pw: ", user);
    user.password = await bcrypt.hash(user.password, 10);
  }

  @BeforeBulkCreate
  static async bulkHashPassword(users: User[]) {
    console.log("Bulk hash", users);
    for (let i = 0; i < users.length; i++) {
      users[i].password = await bcrypt.hash(users[i].password, 10);
    }
  }

}


//
// import {Model } from "sequelize";
//
// const bcrypt = require('bcrypt');
//
// const { DataTypes } = require('sequelize');
// import { db} from "../../services/DBService";
//
//
//   export class User extends Model {
//     // This 'declare' keyword lets us create TypeScript typings without affecting the User itself
//     declare email: string;
//     declare password: string;
//   }
//   User.init({
//     email: DataTypes.STRING,
//     password: DataTypes.STRING
//   }, {
//     sequelize: db,
//     modelName: 'User',
//   });
//
//   const hashPassword = async (password) => {
//     console.log("Hashing user pw: ", password);
//     let newPassword = await bcrypt.hash(password, 10);
//     console.log("Hashed pw: ", newPassword);
//     return newPassword;
//   }
//
//   User.beforeCreate(async (user, options) => {
//     console.log(user);
//     let newPass = await hashPassword(user.password);
//     console.log("New password before bulk create is: ", newPass)
//     user.password = newPass;
//   });
//
//   User.beforeBulkCreate(async (user, options) => {
//     // Need oldschool for loop bc of how migrations interact with async
//     for (let i = 0; i < user.length; i++) {
//       let newPass = await hashPassword(user[i].password);
//       console.log("New password before bulk create is: ", newPass)
//       user[i].password = newPass;
//     }
//   });
//
//
//
