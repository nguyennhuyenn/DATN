import { Link } from "react-router-dom";


function Header() {


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
                            <li className="nav-item active">
                                <Link className="nav-link" to="/">
                                    Home
                                    <span className="sr-only">(current)</span>
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/products">
                                    Products
                                </Link>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="about.html">
                                    About Us
                                </a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="contact.html">
                                    Contact Us
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav></>

    );
}

export default Header;