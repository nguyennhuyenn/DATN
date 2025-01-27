import { createBrowserRouter, Router } from "react-router-dom";
import Home from "../pages/client/home";
import About from "../pages/client/about";
import Contact from "../pages/client/contact";
import Products from "../pages/client/products";
import SingleProduct from "../pages/client/single-product";

const router = createBrowserRouter([
    { path: "", element: <Home /> },
    {path:"/about",element:<About />},
    {path:"/contact",element:<Contact />},
    {path:"/product",element:<Products />},
    {path:"/singleproduct",element:<SingleProduct />},



]);
export default router;
