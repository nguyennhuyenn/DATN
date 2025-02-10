import { Link, useLocation } from "react-router-dom";


function Header() {
    const location = useLocation();
    const currentPath = location.pathname.split("/").filter(Boolean); // Loại bỏ chuỗi rỗng

    return (
        <>
            <meta charSet="utf-8" />
            <meta
                name="viewport"
                content="width=device-width, initial-scale=1, shrink-to-fit=no"
            />
            <meta name="description" content="" />
            <meta name="author" content="" />
            <link
                href="https://fonts.googleapis.com/css?family=Roboto:100,300,400,500,700"
                rel="stylesheet"
            />
            <title>Pixie - Ecommerce HTML5 Template</title>
            {/* Bootstrap core CSS */}
            <link href="vendor/bootstrap/css/bootstrap.min.css" rel="stylesheet" />
            {/* Additional CSS Files */}
            <link rel="stylesheet" href="assets/css/fontawesome.css" />
            <link rel="stylesheet" href="assets/css/tooplate-main.css" />
            <link rel="stylesheet" href="assets/css/owl.css" />
            {/*
Tooplate 2114 Pixie
https://www.tooplate.com/view/2114-pixie
*/}
            {/* Pre Header */}
            <div id="pre-header">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <span>Suspendisse laoreet magna vel diam lobortis imperdiet</span>
                        </div>
                    </div>
                </div>
            </div>
            {/* Navigation */}
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark static-top">
                <div className="container">
                    <a className="navbar-brand" href="#">
                        <img src="assets/images/header-logo.png" alt="" />
                    </a>
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
                    <div className="collapse navbar-collapse" id="navbarResponsive">
                        <ul className="navbar-nav ml-auto">
                            <li className={`nav-item ${currentPath.length == 0 && " active"}`}>
                                <Link className="nav-link" to="/">
                                    Trang chủ
                                    <span className="sr-only">(current)</span>
                                </Link>
                            </li>
                            <li className={`nav-item ${currentPath[0] == "products" && " active"}`}>
                                <Link className="nav-link" to="/products">
                                    Sản phẩm
                                </Link>
                            </li>

                            <li className={`nav-item ${currentPath[0] == "login" && " active"}`}>
                                <Link className="nav-link" to="/login">
                                    Đăng nhập
                                </Link>
                            </li>
                            <li className={`nav-item ${currentPath[0] == "register" && " active"}`}>
                                <Link className="nav-link" to="/register">
                                    Đăng kí
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav ></>

    );
}

export default Header;