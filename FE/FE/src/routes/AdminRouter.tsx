import { createBrowserRouter, RouteObject, Router } from "react-router-dom";
import ProductList from "../pages/admin/product/product";
import CreateProduct from "../pages/admin/product/createProduct";
import EditProduct from "../pages/admin/product/editProduct";
import AdminLayout from "../layout/admin/adminLayout";
import CategoryList from "../pages/admin/category/category";
import CreateCategory from "../pages/admin/category/createCategory";
import EditCategory from "../pages/admin/category/editCategory";
import SizeList from "../pages/admin/size/size";
import CreateSize from "../pages/admin/size/createSize";
import EditSize from "../pages/admin/size/eidtSize";
import ColorList from "../pages/admin/color/color";
import CreateColor from "../pages/admin/color/createColor";
import EditColor from "../pages/admin/color/eidtColor";
import Alert from "../pages/admin/alert";


const adminRoutes: RouteObject[] = [
    {
        path: "/admin",
        element: <AdminLayout />,
        children: [
            {
                element: <Alert />,
                children: [
                    { path: "", element: <ProductList /> },

                    { path: "categories", element: <CategoryList /> },
                    { path: "categories/new", element: <CreateCategory /> },
                    { path: "categories/edit/:id", element: <EditCategory /> },

                    { path: "products", element: <ProductList /> },
                    { path: "products/new", element: <CreateProduct /> },
                    { path: "products/edit/:id", element: <EditProduct /> },



                    { path: "sizes", element: <SizeList /> },
                    { path: "sizes/new", element: <CreateSize /> },
                    { path: "sizes/edit/:id", element: <EditSize /> },


                    { path: "colors", element: <ColorList /> },
                    { path: "colors/new", element: <CreateColor /> },
                    { path: "colors/edit/:id", element: <EditColor /> },
                ]
            }

        ],
    },
];
export default adminRoutes;
