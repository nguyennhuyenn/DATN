import { createBrowserRouter, RouterProvider } from "react-router-dom";
import clientRouter from "./routes/ClientRouter";
import adminRoutes from "./routes/AdminRouter";

const router = createBrowserRouter([...clientRouter, ...adminRoutes]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
