

function Footer() {


    return (
        <>
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
            {/* Additional Scripts */}</>

    );
}

export default Footer;