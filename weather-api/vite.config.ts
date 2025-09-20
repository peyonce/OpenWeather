import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'


const REPLIT_HOST = 'e9490233-6037-484e-9d11-f8facaf6d379-00-1j1mf2w39mlug.janeway.replit.dev'

export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    allowedHosts: [
      REPLIT_HOST,

    ],
  },
  preview: {
    allowedHosts: [
      REPLIT_HOST
    ]
  },
})
