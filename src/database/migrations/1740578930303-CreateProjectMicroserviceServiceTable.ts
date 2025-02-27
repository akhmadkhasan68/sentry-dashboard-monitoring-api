import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateProjectMicroserviceServiceTable1740578930303 implements MigrationInterface {
    name = 'CreateProjectMicroserviceServiceTable1740578930303'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`project_microservice_services\` (\`id\` varchar(36) NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deletedAt\` datetime(6) NULL, \`projectId\` varchar(255) NOT NULL, \`name\` varchar(255) NOT NULL, \`isActive\` tinyint NOT NULL DEFAULT 1, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`projects\` ADD \`isActive\` tinyint NOT NULL DEFAULT 1`);
        await queryRunner.query(`ALTER TABLE \`projects\` ADD \`isMicroservices\` tinyint NOT NULL DEFAULT 0`);
        await queryRunner.query(`ALTER TABLE \`project_microservice_services\` ADD CONSTRAINT \`FK_a95445ea48232a707bc5ed1c195\` FOREIGN KEY (\`projectId\`) REFERENCES \`projects\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`project_microservice_services\` DROP FOREIGN KEY \`FK_a95445ea48232a707bc5ed1c195\``);
        await queryRunner.query(`ALTER TABLE \`projects\` DROP COLUMN \`isMicroservices\``);
        await queryRunner.query(`ALTER TABLE \`projects\` DROP COLUMN \`isActive\``);
        await queryRunner.query(`DROP TABLE \`project_microservice_services\``);
    }

}
