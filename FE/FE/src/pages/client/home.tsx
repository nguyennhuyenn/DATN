import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";

function Home() {
  const [count, setCount] = useState(0);

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
                <a className="nav-link" href="index.html">
                  Home
                  <span className="sr-only">(current)</span>
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="products.html">
                  Products
                </a>
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
      </nav>
      {/* Page Content */}
      {/* Banner Starts Here */}
      <div className="banner">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="caption">
                <h2>Ecommerce HTML Template</h2>
                <div className="line-dec" />
                <p>
                  Pixie HTML Template can be converted into your desired CMS
                  theme. Total <strong>5 pages</strong> included. You can use
                  this Bootstrap v4.1.3 layout for any CMS.
                  <br />
                  <br />
                  Please tell your friends about{" "}
                  <a rel="nofollow" href="https://www.facebook.com/tooplate/">
                    Tooplate
                  </a>{" "}
                  free template site. Thank you. Photo credit goes to{" "}
                  <a rel="nofollow" href="https://www.pexels.com">
                    Pexels website
                  </a>
                  .
                </p>
                <div className="main-button">
                  <a href="#">Order Now!</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Banner Ends Here */}
      {/* Featured Starts Here */}
      <div className="featured-items">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="section-heading">
                <div className="line-dec" />
                <h1>Featured Items</h1>
              </div>
            </div>
            <div className="col-md-12">
              <div className="owl-carousel owl-theme">
                <a href="single-product.html">
                  <div className="featured-item">
                    <img src="assets/images/item-01.jpg" alt="Item 1" />
                    <h4>Proin vel ligula</h4>
                    <h6>$15.00</h6>
                  </div>
                </a>
                <a href="single-product.html">
                  <div className="featured-item">
                    <img src="assets/images/item-02.jpg" alt="Item 2" />
                    <h4>Erat odio rhoncus</h4>
                    <h6>$25.00</h6>
                  </div>
                </a>
                <a href="single-product.html">
                  <div className="featured-item">
                    <img src="assets/images/item-03.jpg" alt="Item 3" />
                    <h4>Integer vel turpis</h4>
                    <h6>$35.00</h6>
                  </div>
                </a>
                <a href="single-product.html">
                  <div className="featured-item">
                    <img src="assets/images/item-04.jpg" alt="Item 4" />
                    <h4>Sed purus quam</h4>
                    <h6>$45.00</h6>
                  </div>
                </a>
                <a href="single-product.html">
                  <div className="featured-item">
                    <img src="assets/images/item-05.jpg" alt="Item 5" />
                    <h4>Morbi aliquet</h4>
                    <h6>$55.00</h6>
                  </div>
                </a>
                <a href="single-product.html">
                  <div className="featured-item">
                    <img src="assets/images/item-06.jpg" alt="Item 6" />
                    <h4>Urna ac diam</h4>
                    <h6>$65.00</h6>
                  </div>
                </a>
                <a href="single-product.html">
                  <div className="featured-item">
                    <img src="assets/images/item-04.jpg" alt="Item 7" />
                    <h4>Proin eget imperdiet</h4>
                    <h6>$75.00</h6>
                  </div>
                </a>
                <a href="single-product.html">
                  <div className="featured-item">
                    <img src="assets/images/item-05.jpg" alt="Item 8" />
                    <h4>Nullam risus nisl</h4>
                    <h6>$85.00</h6>
                  </div>
                </a>
                <a href="single-product.html">
                  <div className="featured-item">
                    <img src="assets/images/item-06.jpg" alt="Item 9" />
                    <h4>Cras tempus</h4>
                    <h6>$95.00</h6>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Featred Ends Here */}
      {/* Subscribe Form Starts Here */}
      <div className="subscribe-form">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="section-heading">
                <div className="line-dec" />
                <h1>Subscribe on PIXIE now!</h1>
              </div>
            </div>
            <div className="col-md-8 offset-md-2">
              <div className="main-content">
                <p>
                  Integer vel turpis ultricies, lacinia ligula id, lobortis
                  augue. Vivamus porttitor dui id dictum efficitur. Phasellus
                  vel interdum elit.
                </p>
                <div className="container">
                  <form id="subscribe" action="" method="get">
                    <div className="row">
                      <div className="col-md-7">
                        <fieldset>
                          <input
                            name="email"
                            type="text"
                            className="form-control"
                            id="email"
                            onfocus="if(this.value == 'Your Email...') { this.value = ''; }"
                            onblur="if(this.value == '') { this.value = 'Your Email...';}"
                            defaultValue="Your Email..."
                            required=""
                          />
                        </fieldset>
                      </div>
                      <div className="col-md-5">
                        <fieldset>
                          <button
                            type="submit"
                            id="form-submit"
                            className="button"
                          >
                            Subscribe Now!
                          </button>
                        </fieldset>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Subscribe Form Ends Here */}
      {/* Footer Starts Here */}
      <div className="footer">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="logo">
                <img src="assets/images/header-logo.png" alt="" />
              </div>
            </div>
            <div className="col-md-12">
              <div className="footer-menu">
                <ul>
                  <li>
                    <a href="#">Home</a>
                  </li>
                  <li>
                    <a href="#">Help</a>
                  </li>
                  <li>
                    <a href="#">Privacy Policy</a>
                  </li>
                  <li>
                    <a href="#">How It Works ?</a>
                  </li>
                  <li>
                    <a href="#">Contact Us</a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-md-12">
              <div className="social-icons">
                <ul>
                  <li>
                    <a href="#">
                      <i className="fa fa-facebook" />
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <i className="fa fa-twitter" />
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <i className="fa fa-linkedin" />
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <i className="fa fa-rss" />
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Footer Ends Here */}
      {/* Sub Footer Starts Here */}
      <div className="sub-footer">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="copyright-text">
                <p>
                  Copyright © 2019 Company Name - Design:{" "}
                  <a rel="nofollow" href="https://www.facebook.com/tooplate">
                    Tooplate
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Sub Footer Ends Here */}
      {/* Bootstrap core JavaScript */}
      {/* Additional Scripts */}
    </>
  );
}

export default Home;
