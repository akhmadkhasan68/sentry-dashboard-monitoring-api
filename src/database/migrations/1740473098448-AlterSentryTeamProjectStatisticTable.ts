import { MigrationInterface, QueryRunner } from "typeorm";

export class AlterSentryTeamProjectStatisticTable1740473098448 implements MigrationInterface {
    name = 'AlterSentryTeamProjectStatisticTable1740473098448'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`sentry_team_project_statistics\` ADD \`sentryProjectId\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`sentry_team_project_statistics\` ADD \`sentryTeamId\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`sentry_team_project_statistics\` ADD \`totalIssueResolved\` int NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`sentry_team_project_statistics\` DROP COLUMN \`totalIssueResolved\``);
        await queryRunner.query(`ALTER TABLE \`sentry_team_project_statistics\` DROP COLUMN \`sentryTeamId\``);
        await queryRunner.query(`ALTER TABLE \`sentry_team_project_statistics\` DROP COLUMN \`sentryProjectId\``);
    }

}
