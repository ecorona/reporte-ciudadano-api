const { MigrationInterface, QueryRunner } = require("typeorm");

module.exports = class regiduriasSinAdministrador1669394893572 {
    name = 'regiduriasSinAdministrador1669394893572'

    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE \`regidurias\` DROP FOREIGN KEY \`FK_6214b47916fa26274fabc43f003\``);
        await queryRunner.query(`ALTER TABLE \`regidurias\` CHANGE \`ciudadanoAdministradorId\` \`ciudadanoAdministradorId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`regidurias\` ADD CONSTRAINT \`FK_6214b47916fa26274fabc43f003\` FOREIGN KEY (\`ciudadanoAdministradorId\`) REFERENCES \`ciudadanos\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE \`regidurias\` DROP FOREIGN KEY \`FK_6214b47916fa26274fabc43f003\``);
        await queryRunner.query(`ALTER TABLE \`regidurias\` CHANGE \`ciudadanoAdministradorId\` \`ciudadanoAdministradorId\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`regidurias\` ADD CONSTRAINT \`FK_6214b47916fa26274fabc43f003\` FOREIGN KEY (\`ciudadanoAdministradorId\`) REFERENCES \`ciudadanos\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }
}
