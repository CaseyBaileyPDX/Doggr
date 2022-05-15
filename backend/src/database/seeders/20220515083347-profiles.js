const {Profile} = require("../models/index");

module.exports = {
  async up (queryInterface, Sequelize) {
    
    await Profile.bulkCreate([
      { id: 1, name: "Doggo", userId: 1, profileUrl: "profile1.jpg",createdAt: new Date(), updatedAt: new Date() },
      { id: 2, name: "Catte", userId: 2, profileUrl: "profile2.jpg" ,createdAt: new Date(), updatedAt: new Date()},
    ]);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Profiles', null, {});
  }
};
