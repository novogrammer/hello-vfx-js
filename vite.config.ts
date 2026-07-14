import { resolve } from 'path'
import { defineConfig } from 'vite'

const root = resolve(__dirname, 'src');
const outDir = resolve(__dirname, 'dist');

export default defineConfig({
  base: "./",
	root,
  publicDir: resolve(__dirname, 'public'),
  build:{
    outDir,
    rolldownOptions:{
      input:{
        "home":resolve(root,"index.html"),
      }
    },
  },
});
