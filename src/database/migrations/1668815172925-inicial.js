const { MigrationInterface, QueryRunner } = require("typeorm");

module.exports = class inicial1668815172925 {
    name = 'inicial1668815172925'

    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE \`comunicados\` (\`id\` int NOT NULL AUTO_INCREMENT, \`uuid\` varchar(36) NOT NULL, \`createdAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deletedAt\` datetime(6) NULL, \`version\` int NOT NULL, \`titulo\` varchar(100) NOT NULL, \`descripcion\` text NOT NULL, \`fecha\` datetime NOT NULL, \`ciudadanoId\` int NOT NULL, \`origenComunicado\` varchar(100) NOT NULL, \`fechaVigencia\` date NOT NULL, \`regiduriaOrigenId\` int NULL, \`calleOrigenId\` int NULL, \`coloniaOrigenId\` int NULL, INDEX \`IDX_5e4517957de777f79c0ae6e989\` (\`createdAt\`), INDEX \`IDX_7a5ea860534ab04396a5bcb6a5\` (\`updatedAt\`), UNIQUE INDEX \`IDX_49c094f338dc17b9296e8edb16\` (\`uuid\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`comunicados\` ADD CONSTRAINT \`FK_0df83028bd74d89b069c0416221\` FOREIGN KEY (\`ciudadanoId\`) REFERENCES \`ciudadanos\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`comunicados\` ADD CONSTRAINT \`FK_1e3600f23ae1b1472034d1e078a\` FOREIGN KEY (\`regiduriaOrigenId\`) REFERENCES \`regidurias\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`comunicados\` ADD CONSTRAINT \`FK_8fe53c223bba9e6615d1f8660df\` FOREIGN KEY (\`calleOrigenId\`) REFERENCES \`calles\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`comunicados\` ADD CONSTRAINT \`FK_7ff67e75191d13ce05cc67c6861\` FOREIGN KEY (\`coloniaOrigenId\`) REFERENCES \`colonias\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE \`comunicados\` DROP FOREIGN KEY \`FK_7ff67e75191d13ce05cc67c6861\``);
        await queryRunner.query(`ALTER TABLE \`comunicados\` DROP FOREIGN KEY \`FK_8fe53c223bba9e6615d1f8660df\``);
        await queryRunner.query(`ALTER TABLE \`comunicados\` DROP FOREIGN KEY \`FK_1e3600f23ae1b1472034d1e078a\``);
        await queryRunner.query(`ALTER TABLE \`comunicados\` DROP FOREIGN KEY \`FK_0df83028bd74d89b069c0416221\``);
        await queryRunner.query(`DROP INDEX \`IDX_49c094f338dc17b9296e8edb16\` ON \`comunicados\``);
        await queryRunner.query(`DROP INDEX \`IDX_7a5ea860534ab04396a5bcb6a5\` ON \`comunicados\``);
        await queryRunner.query(`DROP INDEX \`IDX_5e4517957de777f79c0ae6e989\` ON \`comunicados\``);
        await queryRunner.query(`DROP TABLE \`comunicados\``);
    }
}
