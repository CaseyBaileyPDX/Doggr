
const {User} = require("../models/index");

module.exports = {
  async up (queryInterface, Sequelize) {
   
    await User.create(
      { id: 1, email: "test@gmail.com", password: "123456",createdAt: new Date(), updatedAt: new Date() },
    );
    
    await User.create(
      { id: 2, email: "test2@email.com", password: "password",createdAt: new Date(), updatedAt: new Date() },
    );
    
    await User.bulkCreate([
      { id: 3, email: "test3333@email.com", password: "3password",createdAt: new Date(), updatedAt: new Date() },
      { id: 4, email: "44444@email.com", password: "4password",createdAt: new Date(), updatedAt: new Date() },
    ])
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, {});
  }
};
