import { defineConfig } from 'vitest/config';
import vue from '@vitejs/plugin-vue'
const path = require('path')

export default defineConfig({
  plugins:[vue()],
  resolve:{
    alias:{
      '@': path.resolve(__dirname,'./src')
    }
  },
  test: {
    globals:true,
    environment:'jsdom',
    include: ["./tests/**/*.test.js"],
    setupFiles:'./setup.js',
    coverage:{
      provider:'v8',
      enabled: true,
    }
  },
})