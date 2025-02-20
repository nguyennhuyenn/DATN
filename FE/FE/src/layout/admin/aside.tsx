import { Link } from "react-router-dom";
import { Home, Settings, Package, Paintbrush, Move3D } from "lucide-react";
import "./aside.css"; // Import custom styles for Aside

export default function Aside() {
  return (
    <aside className="custom-sidebar aside-admin">
      <div className="fixed">
        <h2 className="sidebar-title">
          {" "}
          <a className="navbar-brand" href="#">
            <img src="assets/images/header-logo.png" alt="" />
          </a>
        </h2>
        <nav className="nav flex-column">
          <Link to="/admin" className="nav-link">
            <Home className="icon" size={20} /> Thống kê
          </Link>
          <Link to="/admin/categories" className="nav-link">
            <Package className="icon" size={20} /> Danh mục
          </Link>
          <Link to="/admin/products" className="nav-link">
            <Package className="icon" size={20} /> Sản phẩm
          </Link>
          <Link to="/admin/sizes" className="nav-link">
            <Move3D className="icon" size={20} /> Sizes
          </Link>
          <Link to="/admin/colors" className="nav-link">
            <Paintbrush className="icon" size={20} /> Màu
          </Link>
          <Link to="/admin/colors" className="nav-link">
            <Paintbrush className="icon" size={20} /> voucher
          </Link>
          <Link to="/admin/colors" className="nav-link">
            <Paintbrush className="icon" size={20} /> Người dùng
          </Link>
          <Link to="/admin/settings" className="nav-link">
            <Settings className="icon" size={20} /> Cài đặt
          </Link>
        </nav>
      </div>
    </aside>
  );
}
