"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "Users",
      [
        {
          name: "Bob",
          photo: null,
          pass: "12345",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "Larry",
          photo: null,
          pass: "12345",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "Jill",
          photo: null,
          pass: "12345",
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ],
      {}
    );
  },

  /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('People', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
  }
};
