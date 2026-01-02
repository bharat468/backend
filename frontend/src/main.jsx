import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { GoogleOAuthProvider } from '@react-oauth/google';
import { ToastContainer } from 'react-toastify';

createRoot(document.getElementById('root')).render(
  <GoogleOAuthProvider clientId="557006482314-11d7656rop0n2tebn0cclr7spo0u5u0a.apps.googleusercontent.com">
  <App />
  <ToastContainer
  position="top-right"
  autoClose={2000}
  hideProgressBar={false}
  newestOnTop
  closeOnClick
  pauseOnHover
  theme="colored"
/>
</GoogleOAuthProvider>

)
