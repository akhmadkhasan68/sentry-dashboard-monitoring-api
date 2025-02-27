import { MigrationInterface, QueryRunner } from "typeorm";

export class AlterTableSentryProjectTable1740591774940 implements MigrationInterface {
    name = 'AlterTableSentryProjectTable1740591774940'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`sentry_projects\` ADD \`type\` varchar(255) NOT NULL DEFAULT 'OTHER'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`sentry_projects\` DROP COLUMN \`type\``);
    }

}
