import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'


export default defineConfig({
  plugins: [react()],

  server: {
    host: true,
    allowedHosts: [
      '2087bb8d-ed0d-40c4-8ddc-1dffe5b2efde-00-w0bu0uuggnu7.spock.replit.dev'
    ],
  },

  preview: {
    allowedHosts: [
      '2087bb8d-ed0d-40c4-8ddc-1dffe5b2efde-00-w0bu0uuggnu7.spock.replit.dev'
    ]
  }
})
