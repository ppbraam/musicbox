const Sentry = require("@sentry/node");
const ts = require('typescript');
const path = require('path');
const fs = require('fs');
require('dotenv').config();
const sass = require('node-sass');
const { exec } = require('child_process');
const chalk = require('chalk');
const zlib = require('zlib');
const zopfli = require('@gfx/zopfli');
const tsconfig = require('../tsconfig.json');

if(process.env.REACT_APP_APP_ENV === 'production' && process.env.REACT_APP_SENTRY_DSN) {
  Sentry.init({
    dsn: process.env.REACT_APP_SENTRY_DSN,
  });
}

console.log(
  chalk.yellow('Creating production build\n'),
);

// Build react-script production build
exec('react-scripts build').on('exit', async () => {
  console.log(
    chalk.green('Finished\n'),
  );

  const sourceDir = path.resolve(__dirname, '..', 'src');
  const targetDir = path.resolve(__dirname, 'compiled');

  const compilerOptions = {
    ...tsconfig.compilerOptions,
    moduleResolution: ts.ModuleResolutionKind.NodeJs,
    jsx: ts.JsxEmit.React,
    noEmit: false,
    module: ts.ModuleKind.CommonJS,
    outDir: targetDir,
  };

  console.log(
    chalk.yellow('Emitting typescript compiler\n'),
  );
  const host = ts.createCompilerHost(compilerOptions);

  const tsFiles = host.readDirectory(sourceDir, [
    'ts', 'tsx',
  ], undefined, undefined);

  // Compile typescript
  ts.createProgram(tsFiles, compilerOptions).emit();

  console.log(
    chalk.green('Finished\n'),
  );

  console.log(
    chalk.yellow('Transpiling scss files into destiniation directory\n'),
  );
  const scssFiles = host.readDirectory(sourceDir, [
    'scss',
  ], undefined, undefined);

  const createTargetPath = (file) => targetDir + file.replace(sourceDir, '');
  const ensureDirectoryExist = (file) => {
    const directoryPath = file.split('/');
    directoryPath.pop();
    const directory = directoryPath.join('/');

    if (!fs.existsSync(directory)) {
      fs.mkdirSync(directory);
    }
  };

  // Compile SCSS
  for (let i = 0; i < scssFiles.length; i += 1) {
    const iterateFile = scssFiles[i];
    const targetFile = createTargetPath(iterateFile);

    ensureDirectoryExist(targetFile);

    const result = sass.renderSync({
      file: iterateFile,
      outputStyle: 'compressed',
    });

    fs.writeFile(targetFile, result.css, (err) => {
      if (err) throw err;
    });
  }

  console.log(
    chalk.green('Finished\n'),
  );

  console.log(
    chalk.yellow('Compressing static files\n'),
  );

  const buildDir = path.resolve(__dirname, '..', 'build');

  const compressFiles = host.readDirectory(buildDir, undefined, undefined, undefined);

  const decideNumiterations = (size) => {
    switch (size) {
      case size > (10 ** 6) * 10:
        return 5;
      case size > (10 ** 6) * 5:
        return 10;
      default:
        return 15;
    }
  };

  for (let i = 0; i < compressFiles.length; i += 1) {
    const iterateFile = compressFiles[i];
    const iterateFileBuffer = fs.readFileSync(iterateFile);

    // Gzip using zopfli
    zopfli.gzip(iterateFileBuffer, {
      numiterations: decideNumiterations(iterateFileBuffer.length),
    }, (err, output) => {
      if (output.length < iterateFileBuffer.length) {
        fs.writeFileSync(`${iterateFile}.gz`, output);
      }

      // brotli
      const brotliCompress = zlib.brotliCompressSync(iterateFileBuffer);

      // Do not write file if either gzip is smaller or the original file is smaller
      if (brotliCompress.length < output.length && brotliCompress.length < iterateFileBuffer.length) {
        fs.writeFileSync(`${iterateFile}.br`, brotliCompress);
      }
    });
  }

  console.log(
    chalk.green('Finished\n'),
  );

  /**
   * Start Server
   * Should exist after compiling
   */
  const server = require('./compiled/_httpserver/index');

  console.log(
    chalk.blue(`Attempting to start http server on port ${process.env.PORT}...\n`),
  );
  try {
    server.default(process.env.PORT);
  } catch (e) {
    console.log(
      chalk.red('Failed to start http server'),
    );
    throw e;
  }
});
