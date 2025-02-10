import { Link, useLocation } from "react-router-dom";
import { ShoppingCart, User } from "lucide-react";
import { useState } from "react";
import "./header.css"; // Import file CSS

function Header() {
  const location = useLocation();
  const currentPath = location.pathname.split("/").filter(Boolean);
  const [showUserMenu, setShowUserMenu] = useState(false);

  return (
    <>
      <div id="pre-header">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <span>
                Hãy đến với chúng tôi để trải nghiệm những sản phẩm tốt nhất!
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark static-top">
        <div className="container-fluid">
          {/* Vùng logo có nền xanh */}
          <div className="logo-container">
            <a className="navbar-brand" href="#">
              <img src="assets/images/header-logo.png" alt="Logo" />
            </a>
          </div>

          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarResponsive"
            aria-controls="navbarResponsive"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>

          <div
            className="collapse navbar-collapse justify-content-center"
            id="navbarResponsive"
          >
            <ul className="navbar-nav">
              <li
                className={`nav-item ${
                  currentPath.length === 0 ? "active" : ""
                }`}
              >
                <Link className="nav-link" to="/">
                  Trang chủ
                </Link>
              </li>
              <li
                className={`nav-item ${
                  currentPath[0] === "products" ? "active" : ""
                }`}
              >
                <Link className="nav-link" to="/products">
                  Sản phẩm
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/about">
                  Về chúng tôi
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/contact">
                  Liên hệ
                </Link>
              </li>
            </ul>
          </div>

          {/* Biểu tượng giỏ hàng và người dùng - Căn phải */}
          <div className="header-icons">
            <Link to="/cart" className="icon">
              <ShoppingCart size={24} />
            </Link>

            <div className="user-menu">
              <div
                className="icon"
                onMouseEnter={() => setShowUserMenu(true)}
                onMouseLeave={() => setShowUserMenu(false)}
              >
                <User size={24} />
                {showUserMenu && (
                  <div className="user-dropdown">
                    <Link to="/register">Đăng ký</Link>
                    <Link to="/login">Đăng nhập</Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Header;
