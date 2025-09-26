import DefaultLayout from "@/layouts/DesfaultLayout";
import Login from "@/pages/login/Login";
import { AddCategory } from "@/pages/category/AddCategory";
import { ListCategory } from "@/pages/category/ListCategory";
import { Initial } from "@/pages/initial/Initial";
import { AddProduct } from "@/pages/product/AddProduct";
import { ListProduct } from "@/pages/product/ListProduct";
import { UpdateProduct } from "@/pages/product/UpdateProduct";
import { Routes, Route } from "react-router";
import { UpdateCategory } from "@/pages/category/UpdateCategory";
import { ListSubcategory } from "@/pages/subcategory/ListSubcategory";
import { AddSubcategory } from "@/pages/subcategory/AddSubcategory";
import { UpdateSubcategory } from "@/pages/subcategory/UpdateSubcategort";


export function AppRouter() {
    return (
        <Routes>
            <Route path="/" element={<Login />} />
            <Route element={<DefaultLayout />}>
                <Route path="/inicio" element={<Initial />} />
                <Route path="/produtos" element={<ListProduct />} />
                <Route path="/produtos/adicionar" element={<AddProduct />} />
                <Route path="/produtos/atualizar" element={<UpdateProduct />} />
                <Route path="/categorias" element={<ListCategory />} />
                <Route path="/categorias/adicionar" element={<AddCategory />} />
                <Route path="/categorias/atualizar" element={<UpdateCategory />} />
                <Route path="/subcategorias" element={<ListSubcategory />} />
                <Route path="/subcategorias/adicionar" element={<AddSubcategory />} />
                <Route path="/subcategorias/atualizar" element={<UpdateSubcategory />} />
            </Route>
        </Routes>
    )
}