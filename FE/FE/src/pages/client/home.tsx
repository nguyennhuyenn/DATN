import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import { Link } from "react-router-dom";

function Home() {
  const [count, setCount] = useState(0);

  return (
    <>

      {/* Nội dung trang */}
      {/* Banner Bắt Đầu Ở Đây */}
      <div className="banner">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="caption">
                <h2>Mẫu Giao Diện Ecommerce</h2>
                <div className="line-dec" />
                <p>
                  Mẫu HTML Pixie có thể được chuyển đổi thành giao diện CMS theo mong muốn của bạn.
                  Tổng cộng có <strong>5 trang</strong> được bao gồm. Bạn có thể sử dụng bố cục
                  Bootstrap v4.1.3 này cho bất kỳ hệ thống CMS nào.
                  <br />
                  <br />
                  Hãy giới thiệu trang web{" "}
                  <a rel="nofollow" href="https://www.facebook.com/tooplate/">
                    Tooplate
                  </a>{" "}
                  với bạn bè để có thêm nhiều mẫu miễn phí. Cảm ơn bạn. Ảnh được cung cấp bởi{" "}
                  <a rel="nofollow" href="https://www.pexels.com">
                    trang web Pexels
                  </a>
                  .
                </p>
                <div className="main-button">
                  <a href="#">Đặt Hàng Ngay!</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Banner Kết Thúc Ở Đây */}
      
      {/* Mục Nổi Bật Bắt Đầu */}
      <div className="featured-items">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="section-heading">
                <div className="line-dec" />
                <h1>Sản Phẩm Nổi Bật</h1>
              </div>
            </div>
            <div className="col-md-12">
              <div className="owl-carousel owl-theme">
                <a href="single-product.html">
                  <div className="featured-item">
                    <img src="assets/images/item-01.jpg" alt="Sản phẩm 1" />
                    <h4>Proin vel ligula</h4>
                    <h6>15,00$</h6>
                  </div>
                </a>
                <a href="single-product.html">
                  <div className="featured-item">
                    <img src="assets/images/item-02.jpg" alt="Sản phẩm 2" />
                    <h4>Erat odio rhoncus</h4>
                    <h6>25,00$</h6>
                  </div>
                </a>
                <a href="single-product.html">
                  <div className="featured-item">
                    <img src="assets/images/item-03.jpg" alt="Sản phẩm 3" />
                    <h4>Integer vel turpis</h4>
                    <h6>35,00$</h6>
                  </div>
                </a>
                <a href="single-product.html">
                  <div className="featured-item">
                    <img src="assets/images/item-04.jpg" alt="Sản phẩm 4" />
                    <h4>Sed purus quam</h4>
                    <h6>45,00$</h6>
                  </div>
                </a>
                <a href="single-product.html">
                  <div className="featured-item">
                    <img src="assets/images/item-05.jpg" alt="Sản phẩm 5" />
                    <h4>Morbi aliquet</h4>
                    <h6>55,00$</h6>
                  </div>
                </a>
                <a href="single-product.html">
                  <div className="featured-item">
                    <img src="assets/images/item-06.jpg" alt="Sản phẩm 6" />
                    <h4>Urna ac diam</h4>
                    <h6>65,00$</h6>
                  </div>
                </a>
                <a href="single-product.html">
                  <div className="featured-item">
                    <img src="assets/images/item-04.jpg" alt="Sản phẩm 7" />
                    <h4>Proin eget imperdiet</h4>
                    <h6>75,00$</h6>
                  </div>
                </a>
                <a href="single-product.html">
                  <div className="featured-item">
                    <img src="assets/images/item-05.jpg" alt="Sản phẩm 8" />
                    <h4>Nullam risus nisl</h4>
                    <h6>85,00$</h6>
                  </div>
                </a>
                <a href="single-product.html">
                  <div className="featured-item">
                    <img src="assets/images/item-06.jpg" alt="Sản phẩm 9" />
                    <h4>Cras tempus</h4>
                    <h6>95,00$</h6>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Mục Nổi Bật Kết Thúc */}

    </>
  );
}

export default Home;
