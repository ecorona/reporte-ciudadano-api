import { config } from 'dotenv';
config();

import DataSource from '../ormconfig';

DataSource.initialize().then(async (ds) => {
  await ds.query(`
  INSERT INTO \`reporteCiudadano\`.\`ciudadanos\`
    (
      \`uuid\`,
      \`createdAt\`,
      \`updatedAt\`,
      \`deletedAt\`,
      \`version\`,
      \`nombres\`,
      \`apellidos\`,
      \`alias\`,
      \`telefono\`,
      \`prefijoTelefono\`,
      \`email\`,
      \`password\`,
      \`roles\`
    )
    VALUES
    ('f1ee936e-9022-4f3e-a741-09280745b4c0',
      CURRENT_TIMESTAMP,
      CURRENT_TIMESTAMP,
      null,
      1,
      'Administrador',
      'Municipal',
      'Admin',
      '',
      '',
      'admin@xst.mx',
      '$2a$10$o1dj75agUMdKdcUrH1EX4O9.q6TrEczq2P86bB7FZjQTEcHaDM3q.',
      'administrador,ciudadano'
    )
  ;`);

  process.exit(0);
});
