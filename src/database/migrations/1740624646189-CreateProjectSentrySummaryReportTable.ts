import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateProjectSentrySummaryReportTable1740624646189 implements MigrationInterface {
    name = 'CreateProjectSentrySummaryReportTable1740624646189'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`project_sentry_summary_reports\` (\`id\` varchar(36) NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deletedAt\` datetime(6) NULL, \`projectId\` varchar(255) NOT NULL, \`sentryProjectId\` varchar(255) NOT NULL, \`serviceName\` varchar(255) NULL, \`totalIssueUnresolved\` int NOT NULL DEFAULT '0', PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`project_sentry_summary_reports\` ADD CONSTRAINT \`FK_8ef22280b24b6b195d010149fe0\` FOREIGN KEY (\`projectId\`) REFERENCES \`projects\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`project_sentry_summary_reports\` ADD CONSTRAINT \`FK_cab930c74efd60a87f6ba5ea656\` FOREIGN KEY (\`sentryProjectId\`) REFERENCES \`sentry_projects\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`project_sentry_summary_reports\` DROP FOREIGN KEY \`FK_cab930c74efd60a87f6ba5ea656\``);
        await queryRunner.query(`ALTER TABLE \`project_sentry_summary_reports\` DROP FOREIGN KEY \`FK_8ef22280b24b6b195d010149fe0\``);
        await queryRunner.query(`DROP TABLE \`project_sentry_summary_reports\``);
    }

}
