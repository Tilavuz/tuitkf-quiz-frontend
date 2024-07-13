import React from 'react'
import ReactDOM from 'react-dom/client'
import App from '@/app'
import '@/index.css'
import { Provider } from 'react-redux'
import { store } from '@/app/store'
import { Toaster } from 'sonner'

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
      <Toaster richColors/>
    </Provider>
  </React.StrictMode>
);
