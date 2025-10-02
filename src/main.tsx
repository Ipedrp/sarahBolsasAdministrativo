import { createRoot } from 'react-dom/client'
import { AppRouter } from './router/AppRouter'
import { BrowserRouter } from 'react-router'
import "./index.css";
import { ThemeProvider } from './context/ThemeContext';

createRoot(document.getElementById('root')!).render(
  <ThemeProvider>
    <BrowserRouter>
      <AppRouter />
    </BrowserRouter>
  </ThemeProvider>
) 
