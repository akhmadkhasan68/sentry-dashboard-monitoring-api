import { MigrationInterface, QueryRunner } from "typeorm";

export class AlterSentryTeamProjectStatisticTable1740474669573 implements MigrationInterface {
    name = 'AlterSentryTeamProjectStatisticTable1740474669573'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`sentry_team_project_statistics\` DROP COLUMN \`sentryTeamId\``);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`sentry_team_project_statistics\` ADD \`sentryTeamId\` varchar(255) NOT NULL`);
    }

}
