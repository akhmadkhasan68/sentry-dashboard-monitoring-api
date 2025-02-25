import { MigrationInterface, QueryRunner } from "typeorm";

export class AlterTableSentryProjectAddColumn1740455447705 implements MigrationInterface {
    name = 'AlterTableSentryProjectAddColumn1740455447705'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`sentry_projects\` ADD \`sentryProjectPlatform\` varchar(255) NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`sentry_projects\` DROP COLUMN \`sentryProjectPlatform\``);
    }

}
