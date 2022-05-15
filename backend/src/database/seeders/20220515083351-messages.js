const {Message} = require("../models/index");


module.exports = {
  async up (queryInterface, Sequelize) {
    
    await Message.bulkCreate( [
      { id: 1, message_text: "hi from first seed message", sender_id: 1, receiver_id: 2,createdAt: new Date(), updatedAt: new Date() },
      { id: 2, message_text: "hi from second seed message", sender_id: 2, receiver_id: 1,createdAt: new Date(), updatedAt: new Date() },
      { id: 3, message_text: "hi from third seed message", sender_id: 1, receiver_id: 2,createdAt: new Date(), updatedAt: new Date() },
    ]);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Messages', null, {});
  }
};
