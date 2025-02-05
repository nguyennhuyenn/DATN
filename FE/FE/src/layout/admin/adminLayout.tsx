import { Outlet, Link } from "react-router-dom";
import Aside from "./aside";

export default function AdminLayout() {

    return (
        <div className="d-flex min-vh-100 bg-gray-200">
            {/* Sidebar */}
            <Aside />

            {/* Main Content */}
            <main className="main-content position-relative w-100 h-100 border-radius-lg">
                <div className="container-fluid py-4">
                    <Outlet />
                </div>
            </main>
        </div>
    );
}
