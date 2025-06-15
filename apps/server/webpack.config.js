const { NxAppWebpackPlugin } = require('@nx/webpack/app-plugin');
const { join } = require('path');

module.exports = {
    output: {
        path: join(__dirname, '../../dist/apps/server'),
    },
    externals: {
        rxjs: 'rxjs',
        'rxjs/operators': 'rxjs/operators',
    },
    plugins: [
        new NxAppWebpackPlugin({
            target: 'node',
            compiler: 'tsc',
            main: './main.ts',
            tsConfig: './tsconfig.app.json',
            assets: ['./assets'],
            optimization: false,
            outputHashing: 'none',
            generatePackageJson: false,
        }),
    ],
};
