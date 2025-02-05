import { createBrowserRouter, RouteObject, Router } from "react-router-dom";
import Home from "../pages/client/home";
import About from "../pages/client/about";
import Contact from "../pages/client/contact";
import Products from "../pages/client/products";
import SingleProduct from "../pages/client/single-product";
import Login from "../pages/client/login";
import Register from "../pages/client/register";
import ClientLayout from "../layout/client/clientLayout";



const clientRoutes: RouteObject[] = [
    {
        path: "/",
        element: <ClientLayout />,
        children: [
            { path: "", element: <Home /> },
            { path: "/about", element: <About /> },
            { path: "/contact", element: <Contact /> },
            { path: "/products", element: <Products /> },
            { path: "/products/singleproduct/:id", element: <SingleProduct /> },
            { path: "/login", element: <Login /> },
            { path: "/register", element: <Register /> },
        ],
    },
];
export default clientRoutes;
