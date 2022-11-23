import { config } from 'dotenv';
config();

import DataSource from './ormconfig';

DataSource.initialize().then(async (ds) => {
  await ds.query(`DROP PROCEDURE IF EXISTS \`drop_tables\``);
  await ds.query(`
  CREATE PROCEDURE \`drop_tables\`()
    BEGIN
      SET FOREIGN_KEY_CHECKS = 0;
      SET GROUP_CONCAT_MAX_LEN=32768;
      SET @tables = NULL;
      SELECT GROUP_CONCAT('\`', table_name, '\`') INTO @tables
      FROM information_schema.tables
      WHERE table_schema = (SELECT DATABASE());
      SELECT IFNULL(@tables,'dummy') INTO @tables;
      SET @tables = CONCAT('DROP TABLE IF EXISTS ', @tables);
      PREPARE stmt FROM @tables;
      EXECUTE stmt;
      DEALLOCATE PREPARE stmt;
      SET FOREIGN_KEY_CHECKS = 1;
    END
  `);
  const result = await ds.query(`call drop_tables()`);
  await ds.query(`DROP PROCEDURE IF EXISTS \`drop_tables\``);
  console.log('DROP TABLES: ', result);
  process.exit(0);
});
