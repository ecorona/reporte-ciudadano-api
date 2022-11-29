const { MigrationInterface, QueryRunner } = require("typeorm");

module.exports = class syslog1669764340791 {
    name = 'syslog1669764340791'

    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE \`syslog\` (\`id\` int NOT NULL AUTO_INCREMENT, \`uuid\` varchar(36) NOT NULL, \`createdAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deletedAt\` datetime(6) NULL, \`version\` int NOT NULL, \`ciudadanoId\` int NULL, \`method\` varchar(10) NOT NULL, \`baseUrl\` varchar(150) NOT NULL, \`statusCode\` int NOT NULL DEFAULT '0', \`contentLength\` int NOT NULL DEFAULT '0', \`userAgent\` varchar(250) NOT NULL, \`ip\` varchar(39) NOT NULL, \`body\` json NULL, \`params\` json NULL, \`query\` json NULL, \`referrer\` tinytext NULL, \`responseTime\` tinytext NULL, \`responseData\` json NULL, \`eventName\` varchar(250) NULL, INDEX \`IDX_26b989dfb110ea693aa54d1951\` (\`createdAt\`), INDEX \`IDX_fab576816ea21d5278d1cae5c8\` (\`updatedAt\`), UNIQUE INDEX \`IDX_9045647970ab3d6aa8d0c97c40\` (\`uuid\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`calles\` DROP FOREIGN KEY \`FK_111318449e3b1291c678d6d9d0a\``);
        await queryRunner.query(`ALTER TABLE \`calles\` DROP FOREIGN KEY \`FK_acb7e5422053ee44781363d94f0\``);
        await queryRunner.query(`ALTER TABLE \`calles\` CHANGE \`ciudadanoFundadorId\` \`ciudadanoFundadorId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`calles\` CHANGE \`ciudadanoAdministradorId\` \`ciudadanoAdministradorId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`syslog\` ADD CONSTRAINT \`FK_fedd6d8f32aa06bcd2974740f08\` FOREIGN KEY (\`ciudadanoId\`) REFERENCES \`ciudadanos\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`calles\` ADD CONSTRAINT \`FK_111318449e3b1291c678d6d9d0a\` FOREIGN KEY (\`ciudadanoFundadorId\`) REFERENCES \`ciudadanos\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`calles\` ADD CONSTRAINT \`FK_acb7e5422053ee44781363d94f0\` FOREIGN KEY (\`ciudadanoAdministradorId\`) REFERENCES \`ciudadanos\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE \`calles\` DROP FOREIGN KEY \`FK_acb7e5422053ee44781363d94f0\``);
        await queryRunner.query(`ALTER TABLE \`calles\` DROP FOREIGN KEY \`FK_111318449e3b1291c678d6d9d0a\``);
        await queryRunner.query(`ALTER TABLE \`syslog\` DROP FOREIGN KEY \`FK_fedd6d8f32aa06bcd2974740f08\``);
        await queryRunner.query(`ALTER TABLE \`calles\` CHANGE \`ciudadanoAdministradorId\` \`ciudadanoAdministradorId\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`calles\` CHANGE \`ciudadanoFundadorId\` \`ciudadanoFundadorId\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`calles\` ADD CONSTRAINT \`FK_acb7e5422053ee44781363d94f0\` FOREIGN KEY (\`ciudadanoAdministradorId\`) REFERENCES \`ciudadanos\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`calles\` ADD CONSTRAINT \`FK_111318449e3b1291c678d6d9d0a\` FOREIGN KEY (\`ciudadanoFundadorId\`) REFERENCES \`ciudadanos\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`DROP INDEX \`IDX_9045647970ab3d6aa8d0c97c40\` ON \`syslog\``);
        await queryRunner.query(`DROP INDEX \`IDX_fab576816ea21d5278d1cae5c8\` ON \`syslog\``);
        await queryRunner.query(`DROP INDEX \`IDX_26b989dfb110ea693aa54d1951\` ON \`syslog\``);
        await queryRunner.query(`DROP TABLE \`syslog\``);
    }
}
