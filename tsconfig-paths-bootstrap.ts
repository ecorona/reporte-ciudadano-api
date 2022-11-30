import * as path from 'path';
import * as moduleAlias from 'module-alias';

moduleAlias.addAliases({
  '@root': path.resolve(__dirname + '/src'),
});
