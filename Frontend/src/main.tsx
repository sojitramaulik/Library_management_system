import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { cognitoAuthConfig } from "./auth";
import { AuthProvider } from "react-oidc-context";

import { Provider } from 'react-redux'
import "antd/dist/reset.css";

import { store } from './redux/store'

// Roboto fonts
import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'

createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
       <AuthProvider {...cognitoAuthConfig}>
           <App />
       </AuthProvider>
  </Provider>,
);
