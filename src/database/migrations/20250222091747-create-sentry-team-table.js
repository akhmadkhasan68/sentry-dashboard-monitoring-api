'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('sentry_teams', {
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

      // From SentryTeamModel
      projectId: {
        type: Sequelize.UUID,
        allowNull: true
      },
      sentryTeamId: {
        type: Sequelize.STRING,
        allowNull: false
      },
      sentryTeamSlug: {
        type: Sequelize.STRING,
        allowNull: false
      },
      sentryTeamName: {
        type: Sequelize.STRING,
        allowNull: false
      },
      sentryMemberCount: {
        type: Sequelize.INTEGER,
        allowNull: false
      }
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('sentry_teams');
  }
};
