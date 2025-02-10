import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import requestApi from '../../helper/api'
import { formatCurrencyVND } from '../../util'
import { defaultPagination, ProductDocument } from '../../util/type/product'

const Products = () => {
  const [products, setProducts] = useState<ProductDocument[]>([])
  const [pagination, setPagination] = useState(defaultPagination)
  const [filter, setFilter] = useState("")

  useEffect(() => {
    fetchData();
  }, [filter]);

  const fetchData = async (page = 1) => {
    try {
      const res = await requestApi(`products/paginate?page=${page}&limit=6&active=true${filter}`, 'GET', {});
      setProducts(res.data.data);
      setPagination(res.data.pagination)
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  return (
    <>

      {/* Page Content */}
      {/* Items Starts Here */}
      <div className="featured-page">
        <div className="container">
          <div className="row">
            <div className="col-md-4 col-sm-12">
              <div className="section-heading">
                <div className="line-dec" />
                <h1>Danh sách sản phẩm</h1>
              </div>
            </div>
            <div className="col-md-8 col-sm-12">
              <div id="`filters" className="button-group">
                <button onClick={() => setFilter("")} className="btn btn-primary mx-2" data-filter="*">
                  Tất cả sản phẩm
                </button>
                <button onClick={() => setFilter("&sort=-createdAt")} className="btn btn-primary mx-2" data-filter=".new">
                  Sản phẩm mới
                </button>
                <button onClick={() => setFilter("&sort=price")} className="btn btn-primary mx-2" data-filter=".low">
                  Giá thấp đến cao
                </button>
                <button onClick={() => setFilter("&sort=-price")} className="btn btn-primary mx-2" data-filter=".high">
                  Giá cao đến thấp
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="featured container no-gutter">
        <div className="row posts row-product">
          {
            products.map((item) => {
              return (
                <div key={item.id} className="item new col-md-4">
                  <Link to={`singleproduct/${item.id}`}>
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
      <div className="page-navigation">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <ul>
                {Array.from({ length: pagination.totalPages }, (_, index) => (
                  <li key={index} className={pagination.currentPage === index + 1 ? "current-page mx-2" : " mx-2"}>
                    <a onClick={() => fetchData(index + 1)}>{index + 1}</a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
      {/* Featred Page Ends Here */}


    </>

  )
}

export default Products