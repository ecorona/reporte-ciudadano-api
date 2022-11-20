const { MigrationInterface, QueryRunner } = require("typeorm");

module.exports = class inicial1668904511145 {
    name = 'inicial1668904511145'

    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE \`ciudadanos\` (\`id\` int NOT NULL AUTO_INCREMENT, \`uuid\` varchar(36) NOT NULL, \`createdAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deletedAt\` datetime(6) NULL, \`version\` int NOT NULL, \`nombres\` varchar(150) NULL, \`apellidos\` varchar(150) NULL, \`alias\` varchar(50) NOT NULL, \`telefono\` varchar(10) NULL, \`prefijoTelefono\` varchar(5) NULL, \`email\` varchar(150) NOT NULL, \`password\` varchar(150) NULL, \`roles\` text NOT NULL, INDEX \`IDX_93fb5e9416143ee757f13e9d46\` (\`createdAt\`), INDEX \`IDX_7aeaac6908b3c28b157bed294b\` (\`updatedAt\`), UNIQUE INDEX \`IDX_3917923e6469f05d3eb7750211\` (\`uuid\`), UNIQUE INDEX \`IDX_f68aabf49487572eadec907f7b\` (\`email\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`calles\` (\`id\` int NOT NULL AUTO_INCREMENT, \`uuid\` varchar(36) NOT NULL, \`createdAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deletedAt\` datetime(6) NULL, \`version\` int NOT NULL, \`nombre\` varchar(100) NOT NULL, \`ciudadanoFundadorId\` int NOT NULL, \`ciudadanoAdministradorId\` int NOT NULL, \`activo\` tinyint NOT NULL DEFAULT 0, INDEX \`IDX_45970034bb3f9bcdd89e3fa99c\` (\`createdAt\`), INDEX \`IDX_b31a611b5f94b0e9d9b0ea2d93\` (\`updatedAt\`), UNIQUE INDEX \`IDX_11fb5cad7da6ec9a865e3c17ff\` (\`uuid\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`colonias\` (\`id\` int NOT NULL AUTO_INCREMENT, \`uuid\` varchar(36) NOT NULL, \`createdAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deletedAt\` datetime(6) NULL, \`version\` int NOT NULL, \`nombre\` varchar(100) NOT NULL, \`ciudadanoFundadorId\` int NOT NULL, \`ciudadanoAdministradorId\` int NOT NULL, \`activo\` tinyint NOT NULL DEFAULT 0, INDEX \`IDX_656d4d0c74e707619d7a69aec1\` (\`createdAt\`), INDEX \`IDX_5f76940385c9bd9f36728bf56b\` (\`updatedAt\`), UNIQUE INDEX \`IDX_ef21f1e2e31c1b709468ce1b19\` (\`uuid\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`regidurias\` (\`id\` int NOT NULL AUTO_INCREMENT, \`uuid\` varchar(36) NOT NULL, \`createdAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deletedAt\` datetime(6) NULL, \`version\` int NOT NULL, \`nombre\` varchar(100) NOT NULL, \`ciudadanoAdministradorId\` int NOT NULL, \`activo\` tinyint NOT NULL DEFAULT 0, INDEX \`IDX_9085e71b0c1a153b18a4cbe36e\` (\`createdAt\`), INDEX \`IDX_c14a2c912b7d891c75785a19ba\` (\`updatedAt\`), UNIQUE INDEX \`IDX_764fdd4a398c21ae4de45d3b24\` (\`uuid\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`tipos_reporte\` (\`id\` int NOT NULL AUTO_INCREMENT, \`uuid\` varchar(36) NOT NULL, \`createdAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deletedAt\` datetime(6) NULL, \`version\` int NOT NULL, \`nombre\` varchar(100) NOT NULL, \`regiduriaAtiendeId\` int NOT NULL, \`activo\` tinyint NOT NULL DEFAULT 0, INDEX \`IDX_6bce28c718cc56139e13482a32\` (\`createdAt\`), INDEX \`IDX_97836c553b6cfdc17b99f40e7c\` (\`updatedAt\`), UNIQUE INDEX \`IDX_8080093e18a88d6db0f80c1a28\` (\`uuid\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`reportes_ciudadanos\` (\`id\` int NOT NULL AUTO_INCREMENT, \`uuid\` varchar(36) NOT NULL, \`createdAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deletedAt\` datetime(6) NULL, \`version\` int NOT NULL, \`fecha\` datetime NOT NULL, \`descripcion\` text NOT NULL, \`direccion\` varchar(250) NULL, \`lat\` decimal(10,8) NULL, \`lng\` decimal(10,8) NULL, \`ciudadanoId\` int NULL, \`tipoReporteId\` int NOT NULL, INDEX \`IDX_a517a60a98559e76cda4ffd1ca\` (\`createdAt\`), INDEX \`IDX_6d02470faed2af3d9c4025722d\` (\`updatedAt\`), UNIQUE INDEX \`IDX_cb208b6c97373f25ccbb32822e\` (\`uuid\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`bitacora_reportes\` (\`id\` int NOT NULL AUTO_INCREMENT, \`uuid\` varchar(36) NOT NULL, \`createdAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deletedAt\` datetime(6) NULL, \`version\` int NOT NULL, \`fecha\` datetime NOT NULL, \`descripcion\` text NOT NULL, \`reporteId\` int NOT NULL, \`ciudadanoId\` int NOT NULL, INDEX \`IDX_078f5cfbbf0d3c45a4327baf9d\` (\`createdAt\`), INDEX \`IDX_0da6cc15391ba1d577b987e581\` (\`updatedAt\`), UNIQUE INDEX \`IDX_6a0fb0c45d5ad769408bef9e5d\` (\`uuid\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`comunicados\` (\`id\` int NOT NULL AUTO_INCREMENT, \`uuid\` varchar(36) NOT NULL, \`createdAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deletedAt\` datetime(6) NULL, \`version\` int NOT NULL, \`titulo\` varchar(100) NOT NULL, \`descripcion\` text NOT NULL, \`fecha\` datetime NOT NULL, \`ciudadanoId\` int NOT NULL, \`origenComunicado\` varchar(100) NOT NULL, \`fechaVigencia\` date NOT NULL, \`regiduriaOrigenId\` int NULL, \`calleOrigenId\` int NULL, \`coloniaOrigenId\` int NULL, INDEX \`IDX_5e4517957de777f79c0ae6e989\` (\`createdAt\`), INDEX \`IDX_7a5ea860534ab04396a5bcb6a5\` (\`updatedAt\`), UNIQUE INDEX \`IDX_49c094f338dc17b9296e8edb16\` (\`uuid\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`comentarios_reportes\` (\`id\` int NOT NULL AUTO_INCREMENT, \`uuid\` varchar(36) NOT NULL, \`createdAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deletedAt\` datetime(6) NULL, \`version\` int NOT NULL, \`fecha\` datetime NOT NULL, \`descripcion\` text NOT NULL, \`reporteId\` int NOT NULL, \`ciudadanoId\` int NULL, \`parentId\` int NULL, INDEX \`IDX_a7148e2bf6e847b82f16c8cba3\` (\`createdAt\`), INDEX \`IDX_fec13fb69b0ca6cbe2029ec745\` (\`updatedAt\`), UNIQUE INDEX \`IDX_92af7b39cec8a80e1cf368be71\` (\`uuid\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`comentarios_reportes_closure\` (\`id_ancestor\` int NOT NULL, \`id_descendant\` int NOT NULL, INDEX \`IDX_0a804deb7fa9d8c37895208484\` (\`id_ancestor\`), INDEX \`IDX_60cb00b0a23ed9e10be713701f\` (\`id_descendant\`), PRIMARY KEY (\`id_ancestor\`, \`id_descendant\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`calles\` ADD CONSTRAINT \`FK_111318449e3b1291c678d6d9d0a\` FOREIGN KEY (\`ciudadanoFundadorId\`) REFERENCES \`ciudadanos\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`calles\` ADD CONSTRAINT \`FK_acb7e5422053ee44781363d94f0\` FOREIGN KEY (\`ciudadanoAdministradorId\`) REFERENCES \`ciudadanos\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`colonias\` ADD CONSTRAINT \`FK_9f1d853997a133f7a4bf87fe7e4\` FOREIGN KEY (\`ciudadanoFundadorId\`) REFERENCES \`ciudadanos\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`colonias\` ADD CONSTRAINT \`FK_8fdf909ffd8a07c0cc01edabbee\` FOREIGN KEY (\`ciudadanoAdministradorId\`) REFERENCES \`ciudadanos\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`regidurias\` ADD CONSTRAINT \`FK_6214b47916fa26274fabc43f003\` FOREIGN KEY (\`ciudadanoAdministradorId\`) REFERENCES \`ciudadanos\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`tipos_reporte\` ADD CONSTRAINT \`FK_8fd2303005cd8fd8e6583f2b982\` FOREIGN KEY (\`regiduriaAtiendeId\`) REFERENCES \`regidurias\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`reportes_ciudadanos\` ADD CONSTRAINT \`FK_82a9e47d031f5882a3121fd7126\` FOREIGN KEY (\`ciudadanoId\`) REFERENCES \`ciudadanos\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`reportes_ciudadanos\` ADD CONSTRAINT \`FK_1cc2f1c574f7de81d309744ef75\` FOREIGN KEY (\`tipoReporteId\`) REFERENCES \`tipos_reporte\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`bitacora_reportes\` ADD CONSTRAINT \`FK_8ae32a2c17ea0f9fe634ca2ee80\` FOREIGN KEY (\`reporteId\`) REFERENCES \`reportes_ciudadanos\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`bitacora_reportes\` ADD CONSTRAINT \`FK_d096de6f783ed02fbf282dd311d\` FOREIGN KEY (\`ciudadanoId\`) REFERENCES \`ciudadanos\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`comunicados\` ADD CONSTRAINT \`FK_0df83028bd74d89b069c0416221\` FOREIGN KEY (\`ciudadanoId\`) REFERENCES \`ciudadanos\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`comunicados\` ADD CONSTRAINT \`FK_1e3600f23ae1b1472034d1e078a\` FOREIGN KEY (\`regiduriaOrigenId\`) REFERENCES \`regidurias\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`comunicados\` ADD CONSTRAINT \`FK_8fe53c223bba9e6615d1f8660df\` FOREIGN KEY (\`calleOrigenId\`) REFERENCES \`calles\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`comunicados\` ADD CONSTRAINT \`FK_7ff67e75191d13ce05cc67c6861\` FOREIGN KEY (\`coloniaOrigenId\`) REFERENCES \`colonias\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`comentarios_reportes\` ADD CONSTRAINT \`FK_51a4cd32280af81ae9779452012\` FOREIGN KEY (\`reporteId\`) REFERENCES \`reportes_ciudadanos\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`comentarios_reportes\` ADD CONSTRAINT \`FK_e3f2655b353cb9c5e9f97ef9548\` FOREIGN KEY (\`ciudadanoId\`) REFERENCES \`ciudadanos\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`comentarios_reportes\` ADD CONSTRAINT \`FK_d9d6c4ab12f4d8c756995b4e783\` FOREIGN KEY (\`parentId\`) REFERENCES \`comentarios_reportes\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`comentarios_reportes_closure\` ADD CONSTRAINT \`FK_0a804deb7fa9d8c378952084840\` FOREIGN KEY (\`id_ancestor\`) REFERENCES \`comentarios_reportes\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`comentarios_reportes_closure\` ADD CONSTRAINT \`FK_60cb00b0a23ed9e10be713701fc\` FOREIGN KEY (\`id_descendant\`) REFERENCES \`comentarios_reportes\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE \`comentarios_reportes_closure\` DROP FOREIGN KEY \`FK_60cb00b0a23ed9e10be713701fc\``);
        await queryRunner.query(`ALTER TABLE \`comentarios_reportes_closure\` DROP FOREIGN KEY \`FK_0a804deb7fa9d8c378952084840\``);
        await queryRunner.query(`ALTER TABLE \`comentarios_reportes\` DROP FOREIGN KEY \`FK_d9d6c4ab12f4d8c756995b4e783\``);
        await queryRunner.query(`ALTER TABLE \`comentarios_reportes\` DROP FOREIGN KEY \`FK_e3f2655b353cb9c5e9f97ef9548\``);
        await queryRunner.query(`ALTER TABLE \`comentarios_reportes\` DROP FOREIGN KEY \`FK_51a4cd32280af81ae9779452012\``);
        await queryRunner.query(`ALTER TABLE \`comunicados\` DROP FOREIGN KEY \`FK_7ff67e75191d13ce05cc67c6861\``);
        await queryRunner.query(`ALTER TABLE \`comunicados\` DROP FOREIGN KEY \`FK_8fe53c223bba9e6615d1f8660df\``);
        await queryRunner.query(`ALTER TABLE \`comunicados\` DROP FOREIGN KEY \`FK_1e3600f23ae1b1472034d1e078a\``);
        await queryRunner.query(`ALTER TABLE \`comunicados\` DROP FOREIGN KEY \`FK_0df83028bd74d89b069c0416221\``);
        await queryRunner.query(`ALTER TABLE \`bitacora_reportes\` DROP FOREIGN KEY \`FK_d096de6f783ed02fbf282dd311d\``);
        await queryRunner.query(`ALTER TABLE \`bitacora_reportes\` DROP FOREIGN KEY \`FK_8ae32a2c17ea0f9fe634ca2ee80\``);
        await queryRunner.query(`ALTER TABLE \`reportes_ciudadanos\` DROP FOREIGN KEY \`FK_1cc2f1c574f7de81d309744ef75\``);
        await queryRunner.query(`ALTER TABLE \`reportes_ciudadanos\` DROP FOREIGN KEY \`FK_82a9e47d031f5882a3121fd7126\``);
        await queryRunner.query(`ALTER TABLE \`tipos_reporte\` DROP FOREIGN KEY \`FK_8fd2303005cd8fd8e6583f2b982\``);
        await queryRunner.query(`ALTER TABLE \`regidurias\` DROP FOREIGN KEY \`FK_6214b47916fa26274fabc43f003\``);
        await queryRunner.query(`ALTER TABLE \`colonias\` DROP FOREIGN KEY \`FK_8fdf909ffd8a07c0cc01edabbee\``);
        await queryRunner.query(`ALTER TABLE \`colonias\` DROP FOREIGN KEY \`FK_9f1d853997a133f7a4bf87fe7e4\``);
        await queryRunner.query(`ALTER TABLE \`calles\` DROP FOREIGN KEY \`FK_acb7e5422053ee44781363d94f0\``);
        await queryRunner.query(`ALTER TABLE \`calles\` DROP FOREIGN KEY \`FK_111318449e3b1291c678d6d9d0a\``);
        await queryRunner.query(`DROP INDEX \`IDX_60cb00b0a23ed9e10be713701f\` ON \`comentarios_reportes_closure\``);
        await queryRunner.query(`DROP INDEX \`IDX_0a804deb7fa9d8c37895208484\` ON \`comentarios_reportes_closure\``);
        await queryRunner.query(`DROP TABLE \`comentarios_reportes_closure\``);
        await queryRunner.query(`DROP INDEX \`IDX_92af7b39cec8a80e1cf368be71\` ON \`comentarios_reportes\``);
        await queryRunner.query(`DROP INDEX \`IDX_fec13fb69b0ca6cbe2029ec745\` ON \`comentarios_reportes\``);
        await queryRunner.query(`DROP INDEX \`IDX_a7148e2bf6e847b82f16c8cba3\` ON \`comentarios_reportes\``);
        await queryRunner.query(`DROP TABLE \`comentarios_reportes\``);
        await queryRunner.query(`DROP INDEX \`IDX_49c094f338dc17b9296e8edb16\` ON \`comunicados\``);
        await queryRunner.query(`DROP INDEX \`IDX_7a5ea860534ab04396a5bcb6a5\` ON \`comunicados\``);
        await queryRunner.query(`DROP INDEX \`IDX_5e4517957de777f79c0ae6e989\` ON \`comunicados\``);
        await queryRunner.query(`DROP TABLE \`comunicados\``);
        await queryRunner.query(`DROP INDEX \`IDX_6a0fb0c45d5ad769408bef9e5d\` ON \`bitacora_reportes\``);
        await queryRunner.query(`DROP INDEX \`IDX_0da6cc15391ba1d577b987e581\` ON \`bitacora_reportes\``);
        await queryRunner.query(`DROP INDEX \`IDX_078f5cfbbf0d3c45a4327baf9d\` ON \`bitacora_reportes\``);
        await queryRunner.query(`DROP TABLE \`bitacora_reportes\``);
        await queryRunner.query(`DROP INDEX \`IDX_cb208b6c97373f25ccbb32822e\` ON \`reportes_ciudadanos\``);
        await queryRunner.query(`DROP INDEX \`IDX_6d02470faed2af3d9c4025722d\` ON \`reportes_ciudadanos\``);
        await queryRunner.query(`DROP INDEX \`IDX_a517a60a98559e76cda4ffd1ca\` ON \`reportes_ciudadanos\``);
        await queryRunner.query(`DROP TABLE \`reportes_ciudadanos\``);
        await queryRunner.query(`DROP INDEX \`IDX_8080093e18a88d6db0f80c1a28\` ON \`tipos_reporte\``);
        await queryRunner.query(`DROP INDEX \`IDX_97836c553b6cfdc17b99f40e7c\` ON \`tipos_reporte\``);
        await queryRunner.query(`DROP INDEX \`IDX_6bce28c718cc56139e13482a32\` ON \`tipos_reporte\``);
        await queryRunner.query(`DROP TABLE \`tipos_reporte\``);
        await queryRunner.query(`DROP INDEX \`IDX_764fdd4a398c21ae4de45d3b24\` ON \`regidurias\``);
        await queryRunner.query(`DROP INDEX \`IDX_c14a2c912b7d891c75785a19ba\` ON \`regidurias\``);
        await queryRunner.query(`DROP INDEX \`IDX_9085e71b0c1a153b18a4cbe36e\` ON \`regidurias\``);
        await queryRunner.query(`DROP TABLE \`regidurias\``);
        await queryRunner.query(`DROP INDEX \`IDX_ef21f1e2e31c1b709468ce1b19\` ON \`colonias\``);
        await queryRunner.query(`DROP INDEX \`IDX_5f76940385c9bd9f36728bf56b\` ON \`colonias\``);
        await queryRunner.query(`DROP INDEX \`IDX_656d4d0c74e707619d7a69aec1\` ON \`colonias\``);
        await queryRunner.query(`DROP TABLE \`colonias\``);
        await queryRunner.query(`DROP INDEX \`IDX_11fb5cad7da6ec9a865e3c17ff\` ON \`calles\``);
        await queryRunner.query(`DROP INDEX \`IDX_b31a611b5f94b0e9d9b0ea2d93\` ON \`calles\``);
        await queryRunner.query(`DROP INDEX \`IDX_45970034bb3f9bcdd89e3fa99c\` ON \`calles\``);
        await queryRunner.query(`DROP TABLE \`calles\``);
        await queryRunner.query(`DROP INDEX \`IDX_f68aabf49487572eadec907f7b\` ON \`ciudadanos\``);
        await queryRunner.query(`DROP INDEX \`IDX_3917923e6469f05d3eb7750211\` ON \`ciudadanos\``);
        await queryRunner.query(`DROP INDEX \`IDX_7aeaac6908b3c28b157bed294b\` ON \`ciudadanos\``);
        await queryRunner.query(`DROP INDEX \`IDX_93fb5e9416143ee757f13e9d46\` ON \`ciudadanos\``);
        await queryRunner.query(`DROP TABLE \`ciudadanos\``);
    }
}
