import { Link } from "react-router-dom";
import { Home, Settings, Users, Package } from "lucide-react";
import "./aside.css"; // Import custom styles for Aside

export default function Aside() {
    return (
        <aside className="custom-sidebar">
            <h2 className="sidebar-title"><img src="" alt="" /></h2>
            <nav className="nav flex-column">
                <Link to="/admin" className="nav-link">
                    <Home className="icon" size={20} /> Thống kê
                </Link>
                <Link to="/admin" className="nav-link">
                    <Home className="icon" size={20} /> Đơn hàng
                </Link>
                <Link to="/admin/categories" className="nav-link">
                    <Package className="icon" size={20} /> Danh mục 
                </Link>
                <Link to="/admin/products" className="nav-link">
                    <Package className="icon" size={20} /> Sản phẩm
                </Link>
                <Link to="/admin" className="nav-link">
                    <Package className="icon" size={20} /> Khuyễn mãi
                </Link>
                <Link to="/admin" className="nav-link">
                    <Package className="icon" size={20} /> Người dùng
                </Link>
                <Link to="/admin/settings" className="nav-link">
                    <Settings className="icon" size={20} />Cài đặt
                </Link>
            </nav>
        </aside>
    );
}