import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import DocumentsContext from './components/context API/DocumentsContext.jsx'
import axios from 'axios'
const root = createRoot(document.getElementById('root'))
axios.defaults.baseURL = "https://back-end-mysql-task-loanwiser.onrender.com";
root.render(
  <BrowserRouter>
    <DocumentsContext>
      <App />
    </DocumentsContext>
  </BrowserRouter>
);
