import { createBrowserRouter, RouteObject, Router } from "react-router-dom";
import ProductList from "../pages/admin/product/product";
import CreateProduct from "../pages/admin/product/createProduct";
import EditProduct from "../pages/admin/product/editProduct";
import AdminLayout from "../layout/admin/adminLayout";
import CategoryList from "../pages/admin/category/category";
import CreateCategory from "../pages/admin/category/createCategory";
import EditCategory from "../pages/admin/category/editCategory";


const adminRoutes: RouteObject[] = [
    {
        path: "/admin",
        element: <AdminLayout />,
        children: [
            { path: "", element: <ProductList /> },

            { path: "categories", element: <CategoryList /> },
            { path: "categories/new", element: <CreateCategory /> },
            { path: "categories/edit/:id", element: <EditCategory /> },

            { path: "products", element: <ProductList /> },
            { path: "products/new", element: <CreateProduct /> },
            { path: "products/edit/:id", element: <EditProduct /> },

        ],
    },
];
export default adminRoutes;
