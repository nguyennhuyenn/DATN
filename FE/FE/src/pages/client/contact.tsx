function Contact() {
  

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
      <title>Pixie Template - Contact</title>
      {/* Bootstrap core CSS */}
      <link href="vendor/bootstrap/css/bootstrap.min.css" rel="stylesheet" />
      {/* Additional CSS Files */}
      <link rel="stylesheet" href="assets/css/fontawesome.css" />
      <link rel="stylesheet" href="assets/css/tooplate-main.css" />
      <link rel="stylesheet" href="assets/css/owl.css" />
      <link rel="stylesheet" href="assets/css/flex-slider.css" />
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
              <li className="nav-item">
                <a className="nav-link" href="index.html">
                  Home
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="products.html">
                  Products
                  <span className="sr-only">(current)</span>
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="about.html">
                  About Us
                </a>
              </li>
              <li className="nav-item active">
                <a className="nav-link" href="contact.html">
                  Contact Us
                </a>
                <span className="sr-only">(current)</span>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      {/* Page Content */}
      {/* About Page Starts Here */}
      <div className="contact-page">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="section-heading">
                <div className="line-dec" />
                <h1>Contact Us</h1>
              </div>
            </div>
            <div className="col-md-6">
              <div id="map">
                {/* How to change your own map point
                         1. Go to Google Maps
                         2. Click on your location point
                         3. Click "Share" and choose "Embed map" tab
                         4. Copy only URL and paste it within the src="" field below
                  */}
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1197183.8373802372!2d-1.9415093691103689!3d6.781986417238027!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xfdb96f349e85efd%3A0xb8d1e0b88af1f0f5!2sKumasi+Central+Market!5e0!3m2!1sen!2sth!4v1532967884907"
                  width="100%"
                  height="500px"
                  frameBorder={0}
                  style={{ border: 0 }}
                  allowFullScreen=""
                />
              </div>
            </div>
            <div className="col-md-6">
              <div className="right-content">
                <div className="container">
                  <form id="contact" action="" method="post">
                    <div className="row">
                      <div className="col-md-6">
                        <fieldset>
                          <input
                            name="name"
                            type="text"
                            className="form-control"
                            id="name"
                            placeholder="Your name..."
                            required=""
                          />
                        </fieldset>
                      </div>
                      <div className="col-md-6">
                        <fieldset>
                          <input
                            name="email"
                            type="text"
                            className="form-control"
                            id="email"
                            placeholder="Your email..."
                            required=""
                          />
                        </fieldset>
                      </div>
                      <div className="col-md-12">
                        <fieldset>
                          <input
                            name="subject"
                            type="text"
                            className="form-control"
                            id="subject"
                            placeholder="Subject..."
                            required=""
                          />
                        </fieldset>
                      </div>
                      <div className="col-md-12">
                        <fieldset>
                          <textarea
                            name="message"
                            rows={6}
                            className="form-control"
                            id="message"
                            placeholder="Your message..."
                            required=""
                            defaultValue={""}
                          />
                        </fieldset>
                      </div>
                      <div className="col-md-12">
                        <fieldset>
                          <button type="submit" id="form-submit" className="button">
                            Send Message
                          </button>
                        </fieldset>
                      </div>
                      <div className="col-md-12">
                        <div className="share">
                          <h6>
                            You can also keep in touch on:{" "}
                            <span>
                              <a href="#">
                                <i className="fa fa-facebook" />
                              </a>
                              <a href="#">
                                <i className="fa fa-linkedin" />
                              </a>
                              <a href="#">
                                <i className="fa fa-twitter" />
                              </a>
                            </span>
                          </h6>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* About Page Ends Here */}
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
                  Godard four dollar toast prism, authentic heirloom raw denim
                  messenger bag gochujang put a bird on it celiac readymade vice.
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
                          <button type="submit" id="form-submit" className="button">
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

export default Contact;