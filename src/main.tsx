import { createRoot } from 'react-dom/client'
import { AppRouter } from './router/AppRouter'
import { BrowserRouter } from 'react-router'
import "./index.css";
import { ThemeProvider } from './contexts/ThemeContext';
import { CategoriaProvider } from './contexts/CategoryContext';
import { SubCategoriaProvider } from './contexts/SubcategoryContext';
import { ProductProvider } from './contexts/ProductContext';
import { AuthProvider } from './contexts/AuthContext';
import "@/server/interceptors";

createRoot(document.getElementById('root')!).render(
  <ThemeProvider>
    <AuthProvider>
      <BrowserRouter>
        <ProductProvider>
          <CategoriaProvider>
            <SubCategoriaProvider>
              <AppRouter />
            </SubCategoriaProvider>
          </CategoriaProvider>
        </ProductProvider>
      </BrowserRouter>
    </AuthProvider>
  </ThemeProvider>
) 
