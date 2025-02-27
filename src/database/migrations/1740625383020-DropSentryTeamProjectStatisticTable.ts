import { MigrationInterface, QueryRunner } from "typeorm";

export class DropSentryTeamProjectStatisticTable1740625383020 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE IF EXISTS sentry_team_project_statistics`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE sentry_team_project_statistics (
            \`id\` varchar(36) NOT NULL,
            \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
            \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
            \`deletedAt\` datetime(6) DEFAULT NULL,
            \`sentryProjectId\` varchar(255) NOT NULL,
            \`totalIssueResolved\` int NOT NULL DEFAULT '0',
            \`totalIssueUnresolved\` int NOT NULL DEFAULT '0',
            PRIMARY KEY (\`id\`)
            ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;    
        `);
    }

}
