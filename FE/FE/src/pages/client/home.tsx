import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import requestApi from '../../helper/api'
import { formatCurrencyVND } from '../../util'
import { defaultPagination, ProductDocument } from '../../util/type/product'

function Home() {
  const [products, setProducts] = useState<ProductDocument[]>([])
  const [pagination, setPagination] = useState(defaultPagination)

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async (page = 1) => {
    try {
      const res = await requestApi(`products/paginate?page=${page}&limit=6&active=true`, 'GET', {});
      setProducts(res.data.data);
      setPagination(res.data.pagination)
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };
  return (
    <>

      {/* Page Content */}
      {/* Banner Starts Here */}
      <div className="banner">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="caption">
                <h2>Thời Trang 2025</h2>
                <div className="line-dec" />
                <p>
                 Với xu thế thời trang phong phú ,chúng tôi không ngừng ra mắt các sản phẩm mới <strong>5 website</strong>
                  của chúng tôi luôn luôn cập nhật những mẫu mới nhất 
                  <br />
                  <br />
                 Hãy dành thời gian để trải nghiệm sản phẩm của chúng tôi{" "}
                  <a rel="nofollow" href="https://www.facebook.com/tooplate/">
                    2025
                  </a>{" "}
                 Các mẫu đa dạng{" "}
                  <a rel="nofollow" href="https://www.pexels.com">
                    hãy trở thành khách hàng thân thiết của chúng tôi 
                  </a>
                  .
                </p>
                <div className="main-button">
                  <a href="#">Xem ngay</a>
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
                <h1>Sản phẩm nổi bật</h1>
              </div>
            </div>
            <div className="featured container no-gutter">
              <div className="row posts row-product">
                {
                  products.map((item) => {
                    return (
                      <div key={item.id} className="item new col-md-4">
                        <Link to={`/products/singleproduct/${item.id}`}>
                          <div className="featured-item">
                            <div style={{ minHeight: "300px" }}>
                              <img src={item.imageUrl} alt="" />
                            </div>
                            <h4>{item.name} </h4>
                            <h6>{formatCurrencyVND(item.price)} </h6>
                          </div>
                        </Link>
                      </div>
                    )
                  })
                }
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Featred Ends Here */}

    </>
  );
}

export default Home;
