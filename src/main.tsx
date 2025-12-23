import { createRoot } from 'react-dom/client'
import { AppRouter } from './router/AppRouter'
import { BrowserRouter } from 'react-router'
import "./index.css";
import { ThemeProvider } from './context/ThemeContext';
import { CategoriaProvider } from './context/CategoryContext';
import { SubCategoriaProvider } from './context/SubcategoryContext';

createRoot(document.getElementById('root')!).render(
  <ThemeProvider>
    <BrowserRouter>
      <CategoriaProvider>
        <SubCategoriaProvider>
          <AppRouter />
        </SubCategoriaProvider>
      </CategoriaProvider>
    </BrowserRouter>
  </ThemeProvider>
) 
