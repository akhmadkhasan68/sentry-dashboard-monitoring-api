import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1740246833021 implements MigrationInterface {
    name = 'Init1740246833021'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`sentry_projects\` (\`id\` varchar(36) NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deletedAt\` datetime(6) NULL, \`sentryTeamId\` varchar(255) NOT NULL, \`sentryProjectId\` varchar(255) NOT NULL, \`sentryProjectName\` varchar(255) NOT NULL, \`sentryProjectSlug\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`projects\` (\`id\` varchar(36) NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deletedAt\` datetime(6) NULL, \`name\` varchar(255) NOT NULL, \`description\` text NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`sentry_teams\` (\`id\` varchar(36) NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deletedAt\` datetime(6) NULL, \`projectId\` varchar(255) NOT NULL, \`sentryTeamId\` varchar(255) NOT NULL, \`sentryTeamSlug\` varchar(255) NOT NULL, \`sentryTeamName\` varchar(255) NOT NULL, \`sentryMemberCount\` int NOT NULL DEFAULT '0', PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`sentry_organization_users\` (\`id\` varchar(36) NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deletedAt\` datetime(6) NULL, \`sentryUserId\` varchar(255) NOT NULL, \`sentryUserEmail\` varchar(255) NOT NULL, \`sentryUserName\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`sentry_projects\` ADD CONSTRAINT \`FK_86758bb285fc92432d34fa30a94\` FOREIGN KEY (\`sentryTeamId\`) REFERENCES \`sentry_teams\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`sentry_teams\` ADD CONSTRAINT \`FK_859ccca56860bb351aa77683ba9\` FOREIGN KEY (\`projectId\`) REFERENCES \`projects\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`sentry_teams\` DROP FOREIGN KEY \`FK_859ccca56860bb351aa77683ba9\``);
        await queryRunner.query(`ALTER TABLE \`sentry_projects\` DROP FOREIGN KEY \`FK_86758bb285fc92432d34fa30a94\``);
        await queryRunner.query(`DROP TABLE \`sentry_organization_users\``);
        await queryRunner.query(`DROP TABLE \`sentry_teams\``);
        await queryRunner.query(`DROP TABLE \`projects\``);
        await queryRunner.query(`DROP TABLE \`sentry_projects\``);
    }

}
