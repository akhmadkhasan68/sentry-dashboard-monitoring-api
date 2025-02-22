import { MigrationInterface, QueryRunner } from "typeorm";

export class AlterSentryTeamTable1740249799526 implements MigrationInterface {
    name = 'AlterSentryTeamTable1740249799526'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`sentry_teams\` DROP FOREIGN KEY \`FK_859ccca56860bb351aa77683ba9\``);
        await queryRunner.query(`ALTER TABLE \`sentry_teams\` CHANGE \`projectId\` \`projectId\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`sentry_teams\` ADD CONSTRAINT \`FK_859ccca56860bb351aa77683ba9\` FOREIGN KEY (\`projectId\`) REFERENCES \`projects\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`sentry_teams\` DROP FOREIGN KEY \`FK_859ccca56860bb351aa77683ba9\``);
        await queryRunner.query(`ALTER TABLE \`sentry_teams\` CHANGE \`projectId\` \`projectId\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`sentry_teams\` ADD CONSTRAINT \`FK_859ccca56860bb351aa77683ba9\` FOREIGN KEY (\`projectId\`) REFERENCES \`projects\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
