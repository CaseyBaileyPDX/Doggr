import {Table, Column, Model, HasMany, ForeignKey} from 'sequelize-typescript';

import {User} from "./User";


@Table
export class Profile extends Model {
  @Column
  name!: string

  @Column
  profileUrl!: string

  @ForeignKey(() => User)
  @Column
  userId!: number

}





// import {DataTypes, Model} from "sequelize";
// import { db} from "../../services/DBService";
//
//   export class Profile extends Model {
//     declare name: string;
//     declare userId: number;
//     declare profileUrl: string;
//   }
//
//   Profile.init({
//     name: DataTypes.STRING,
//     userId: DataTypes.NUMBER,
//     profileUrl: DataTypes.STRING
//   }, {
//     sequelize: db,
//     modelName: 'Profile',
//   });
//
//
