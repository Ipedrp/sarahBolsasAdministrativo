import { createRoot } from 'react-dom/client'
import { AppRouter } from './router/AppRouter'
import { BrowserRouter } from 'react-router'
import "./index.css";
import { ThemeProvider } from './context/ThemeContext';
import { CategoriaProvider } from './context/CategoryContext';

createRoot(document.getElementById('root')!).render(
  <ThemeProvider>
    <BrowserRouter>
      <CategoriaProvider>
        <AppRouter />
      </CategoriaProvider>
    </BrowserRouter>
  </ThemeProvider>
) 
