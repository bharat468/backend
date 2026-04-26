import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { GoogleOAuthProvider } from '@react-oauth/google'
import { ToastContainer } from 'react-toastify'

const googleClientId = import.meta.env.VITE_GOOGLE_CLIENT_ID || '';

// Suppress ALL Google OAuth and Cross-Origin console warnings/errors
const originalConsoleError = console.error;
const originalConsoleWarn = console.warn;
const originalConsoleLog = console.log;

const suppressPatterns = [
  'Provided button width is invalid',
  'google-accounts',
  'origin is not allowed',
  'Cross-Origin-Opener-Policy',
  'GST_LOGGER',
  'google.accounts.id.initialize',
  'credential_button_library',
  'postMessage',
  'Given origin is not allowed',
  'button2livepersondard',
  'Failed to load resource',
  'net::ERR',
];

function shouldSuppress(args) {
  return args.some(arg => 
    typeof arg === 'string' && suppressPatterns.some(pattern => arg.includes(pattern))
  );
}

console.error = (...args) => {
  if (shouldSuppress(args)) return;
  originalConsoleError(...args);
};

console.warn = (...args) => {
  if (shouldSuppress(args)) return;
  originalConsoleWarn(...args);
};

createRoot(document.getElementById('root')).render(
  <GoogleOAuthProvider clientId={googleClientId}>
    <App />
    <ToastContainer
      position="bottom-right"
      autoClose={3000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="colored"
      style={{ zIndex: 9999 }}
    />
  </GoogleOAuthProvider>
)
