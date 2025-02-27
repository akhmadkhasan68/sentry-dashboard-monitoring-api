import { MigrationInterface, QueryRunner } from "typeorm";

export class AlterSentryTeamProjectStatisticTable1740532945408 implements MigrationInterface {
    name = 'AlterSentryTeamProjectStatisticTable1740532945408'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`sentry_team_project_statistics\` ADD \`totalIssueUnresolved\` int NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE \`sentry_team_project_statistics\` CHANGE \`totalIssueResolved\` \`totalIssueResolved\` int NOT NULL DEFAULT '0'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`sentry_team_project_statistics\` CHANGE \`totalIssueResolved\` \`totalIssueResolved\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`sentry_team_project_statistics\` DROP COLUMN \`totalIssueUnresolved\``);
    }

}
