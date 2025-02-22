'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('sentry_organization_users', {
      // From BaseModel
      id: {
        type: Sequelize.UUID,
        allowNull: false,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false
      },
      deletedAt: {
        type: Sequelize.DATE,
        allowNull: true
      },

      // From SentryOrganizationUserModel
      sentryUserId: {
        type: Sequelize.STRING,
        allowNull: false
      },
      sentryUserEmail: {
        type: Sequelize.STRING,
        allowNull: false
      },
      sentryUserName: {
        type: Sequelize.STRING,
        allowNull: false
      }
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('sentry_organization_users');
  }
};
