import 'colors';
import path from 'path';
import exec from './exec';
import fsp from 'fs-promise';
import { buildFolder } from './buildBabel';

const repoRoot = path.resolve(__dirname, '../');
const srcRoot = path.join(repoRoot, 'src/');
const libRoot = path.join(repoRoot, 'lib/');


exec.exec(`rimraf ${libRoot}`)
    .then(() => fsp.mkdirs(libRoot))
    .then(() => buildFolder(srcRoot, libRoot))
    .then(() => console.log('Built: '.cyan + 'src copy to lib'.green));
