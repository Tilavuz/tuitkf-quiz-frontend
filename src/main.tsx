import React from 'react'
import ReactDOM from 'react-dom/client'
import App from '@/app'
import '@/index.css'
import { Provider } from 'react-redux'
import { store } from '@/app/store'
import { Toaster } from 'sonner'
import { ThemeProvider } from './components/theme-provider'

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Provider store={store}>
        <App />
        <Toaster richColors />
      </Provider>
    </ThemeProvider>
  </React.StrictMode>
);
