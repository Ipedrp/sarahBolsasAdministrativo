import { createRoot } from 'react-dom/client'
import { AppRouter } from './router/AppRouter'
import { BrowserRouter } from 'react-router'
import "./index.css";
import { ThemeProvider } from './contexts/ThemeContext';
import { CategoriaProvider } from './contexts/CategoryContext';
import { SubCategoriaProvider } from './contexts/SubcategoryContext';
import { AuthProvider } from './contexts/AuthContext';
import "@/server/interceptors";

createRoot(document.getElementById('root')!).render(
  <ThemeProvider>
    <AuthProvider>
      <BrowserRouter>
        <CategoriaProvider>
          <SubCategoriaProvider>
            <AppRouter />
          </SubCategoriaProvider>
        </CategoriaProvider>
      </BrowserRouter>
    </AuthProvider>
  </ThemeProvider>
) 
