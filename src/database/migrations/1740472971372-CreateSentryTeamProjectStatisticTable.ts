import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateSentryTeamProjectStatisticTable1740472971372 implements MigrationInterface {
    name = 'CreateSentryTeamProjectStatisticTable1740472971372'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`sentry_team_project_statistics\` (\`id\` varchar(36) NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deletedAt\` datetime(6) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE \`sentry_team_project_statistics\``);
    }

}
