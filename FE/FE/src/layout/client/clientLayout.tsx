import { Outlet, Link } from "react-router-dom";
import Header from "./header";
import Footer from "./footer";

export default function ClientLayout() {

    return (
        <div className="flex min-h-screen">
            <Header />

            <main className="p-6">
                <Outlet />
            </main>

            <Footer />
        </div>
    );
}
