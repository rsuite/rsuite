import 'colors';
import lib from './libBuild';

export default function Build(options) {
    return Promise.all([
        lib()
    ]);
}
