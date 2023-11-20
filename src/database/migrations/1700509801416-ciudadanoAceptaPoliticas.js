const { MigrationInterface, QueryRunner } = require("typeorm");

module.exports = class CiudadanoAceptaPoliticas1700509801416 {
    name = 'CiudadanoAceptaPoliticas1700509801416'

    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE \`ciudadanos\` ADD \`aceptaPoliticas\` tinyint NOT NULL DEFAULT 0`);
    }

    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE \`ciudadanos\` DROP COLUMN \`aceptaPoliticas\``);
    }
}
