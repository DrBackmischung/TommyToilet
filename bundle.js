const esbuild = require('esbuild');

const watch = process.argv.includes('--watch');

esbuild.build({
  entryPoints: ['src/index.jsx'],
  bundle: true,
  outfile: 'public/bundle.js',
  minify: true,
  sourcemap: true,
  define: { 'process.env.NODE_ENV': '"production"' },
  watch: watch && {
    onRebuild(error) {
      if (error) console.error('Build failed:', error);
      else console.log('Build succeeded');
    }
  }
}).then(() => {
  if (watch) {
    console.log('Watching for changes...');
  } else {
    console.log('Built public/bundle.js');
  }
}).catch(() => process.exit(1));
