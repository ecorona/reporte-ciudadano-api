const { MigrationInterface, QueryRunner } = require("typeorm");

module.exports = class comentariosComunicados1669229401516 {
    name = 'comentariosComunicados1669229401516'

    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE \`comentarios_comunicados\` (\`id\` int NOT NULL AUTO_INCREMENT, \`comentario\` text NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`deletedAt\` datetime(6) NULL, \`reporteId\` int NOT NULL, \`ciudadanoId\` int NOT NULL, \`ciudadanoBaneaId\` int NULL, \`fechaBaneo\` datetime NULL, \`padreId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`comentarios_comunicados_closure\` (\`id_ancestor\` int NOT NULL, \`id_descendant\` int NOT NULL, INDEX \`IDX_8196503f5121ee3a8d3bd1213b\` (\`id_ancestor\`), INDEX \`IDX_338d600d16534d152a7af807ab\` (\`id_descendant\`), PRIMARY KEY (\`id_ancestor\`, \`id_descendant\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`comentarios_comunicados\` ADD CONSTRAINT \`FK_7e25e41398122161a84ff95ec87\` FOREIGN KEY (\`padreId\`) REFERENCES \`comentarios_comunicados\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`comentarios_comunicados\` ADD CONSTRAINT \`FK_72f3390c28f4254100ba2e4dc8e\` FOREIGN KEY (\`reporteId\`) REFERENCES \`reportes_ciudadanos\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`comentarios_comunicados\` ADD CONSTRAINT \`FK_d1fc80c4dc2c91097b6a24180b4\` FOREIGN KEY (\`ciudadanoId\`) REFERENCES \`ciudadanos\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`comentarios_comunicados\` ADD CONSTRAINT \`FK_97618dc4d317d6247f7f0baef21\` FOREIGN KEY (\`ciudadanoBaneaId\`) REFERENCES \`ciudadanos\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`comentarios_comunicados_closure\` ADD CONSTRAINT \`FK_8196503f5121ee3a8d3bd1213bc\` FOREIGN KEY (\`id_ancestor\`) REFERENCES \`comentarios_comunicados\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`comentarios_comunicados_closure\` ADD CONSTRAINT \`FK_338d600d16534d152a7af807ab6\` FOREIGN KEY (\`id_descendant\`) REFERENCES \`comentarios_comunicados\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE \`comentarios_comunicados_closure\` DROP FOREIGN KEY \`FK_338d600d16534d152a7af807ab6\``);
        await queryRunner.query(`ALTER TABLE \`comentarios_comunicados_closure\` DROP FOREIGN KEY \`FK_8196503f5121ee3a8d3bd1213bc\``);
        await queryRunner.query(`ALTER TABLE \`comentarios_comunicados\` DROP FOREIGN KEY \`FK_97618dc4d317d6247f7f0baef21\``);
        await queryRunner.query(`ALTER TABLE \`comentarios_comunicados\` DROP FOREIGN KEY \`FK_d1fc80c4dc2c91097b6a24180b4\``);
        await queryRunner.query(`ALTER TABLE \`comentarios_comunicados\` DROP FOREIGN KEY \`FK_72f3390c28f4254100ba2e4dc8e\``);
        await queryRunner.query(`ALTER TABLE \`comentarios_comunicados\` DROP FOREIGN KEY \`FK_7e25e41398122161a84ff95ec87\``);
        await queryRunner.query(`DROP INDEX \`IDX_338d600d16534d152a7af807ab\` ON \`comentarios_comunicados_closure\``);
        await queryRunner.query(`DROP INDEX \`IDX_8196503f5121ee3a8d3bd1213b\` ON \`comentarios_comunicados_closure\``);
        await queryRunner.query(`DROP TABLE \`comentarios_comunicados_closure\``);
        await queryRunner.query(`DROP TABLE \`comentarios_comunicados\``);
    }
}
