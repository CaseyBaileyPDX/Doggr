
const {
  Model
} = require('sequelize');

const bcrypt = require('bcrypt');

const { DataTypes } = require('sequelize');


module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init({
    email: DataTypes.STRING,
    password: DataTypes.STRING
  }, {
    logging: console.log,
    sequelize,
    modelName: 'User',
    
  });
  
  const hashPassword = async (password) => {
    console.log("Hashing user pw: ", password);
    let newPassword = await bcrypt.hash(password, 10);
    console.log("Hashed pw: ", newPassword);
    return newPassword;
  }
  
  User.beforeCreate(async (user, options) => {
    console.log(user);
    let newPass = await hashPassword(user.password);
    console.log("New password before bulk create is: ", newPass)
    user.password = newPass;
  });
  
  User.beforeBulkCreate(async (user, options) => {
    // Need oldschool for loop bc of how migrations interact with async
    for (let i = 0; i < user.length; i++) {
      let newPass = await hashPassword(user[i].password);
      console.log("New password before bulk create is: ", newPass)
      user[i].password = newPass;
    }
  });
  
  return User;
};
