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
