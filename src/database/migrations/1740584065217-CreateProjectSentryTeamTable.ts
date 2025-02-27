import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateProjectSentryTeamTable1740584065217 implements MigrationInterface {
    name = 'CreateProjectSentryTeamTable1740584065217'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`sentry_teams\` DROP FOREIGN KEY \`FK_859ccca56860bb351aa77683ba9\``);
        await queryRunner.query(`CREATE TABLE \`project_sentry_teams\` (\`id\` varchar(36) NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deletedAt\` datetime(6) NULL, \`projectId\` varchar(255) NOT NULL, \`sentryTeamId\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`sentry_teams\` DROP COLUMN \`projectId\``);
        await queryRunner.query(`ALTER TABLE \`project_sentry_teams\` ADD CONSTRAINT \`FK_0848f153fa7671cdf161384370f\` FOREIGN KEY (\`projectId\`) REFERENCES \`projects\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`project_sentry_teams\` ADD CONSTRAINT \`FK_c1998a4816351f9bb946ed0516a\` FOREIGN KEY (\`sentryTeamId\`) REFERENCES \`sentry_teams\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`project_sentry_teams\` DROP FOREIGN KEY \`FK_c1998a4816351f9bb946ed0516a\``);
        await queryRunner.query(`ALTER TABLE \`project_sentry_teams\` DROP FOREIGN KEY \`FK_0848f153fa7671cdf161384370f\``);
        await queryRunner.query(`ALTER TABLE \`sentry_teams\` ADD \`projectId\` varchar(255) NULL`);
        await queryRunner.query(`DROP TABLE \`project_sentry_teams\``);
        await queryRunner.query(`ALTER TABLE \`sentry_teams\` ADD CONSTRAINT \`FK_859ccca56860bb351aa77683ba9\` FOREIGN KEY (\`projectId\`) REFERENCES \`projects\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
