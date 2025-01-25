import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import axios from 'axios'
import DocumentsContext from './components/context API/DocumentsContext.jsx'
const root = createRoot(document.getElementById('root'))
axios.defaults.baseURL = "http://localhost:3000"
root.render(
  <BrowserRouter>
    <DocumentsContext>
      <App />
    </DocumentsContext>
  </BrowserRouter>
);
