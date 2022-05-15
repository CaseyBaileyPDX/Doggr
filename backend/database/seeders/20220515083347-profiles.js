const {Profile} = require("../../dist/database/models/Profile");


module.exports = {
  async up (queryInterface, Sequelize) {

    await queryInterface.bulkInsert( "Profiles", [
      { id: 1, name: "Doggo", userId: 1, profileUrl: "profile1.jpg",createdAt: new Date(), updatedAt: new Date() },
      { id: 2, name: "Catte", userId: 2, profileUrl: "profile2.jpg" ,createdAt: new Date(), updatedAt: new Date()},
    ]);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Profiles', null, {});
  }
};
