import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import requestApi from '../../helper/api';
import { ProductFormData, SKU } from '../../util';

const SingleProduct = () => {
  const { id } = useParams();  // Lấy product._id từ URL params
  const [product, setProduct] = useState<ProductFormData>();

  const [sku, setSku] = useState<SKU>({
    size: "",
    color: "",
    quantity: 0
  })

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await requestApi(`products/${id}`, 'GET', {});
        setProduct(response.data);
      } catch (error) {
        console.error('Lỗi khi lấy thông tin sản phẩm:', error);
      }
    };

    if (id) {
      fetchProductDetails();
    }
  }, [id]);


  if (!product) {
    return <div>Đang tải...</div>;
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    console.log(e);

    const updatedSku = {
      ...sku,
      [e.target.name]: e.target.id
    };

    const skuProduct = product.sku.find(
      (item) => item.color === updatedSku.color && item.size === updatedSku.size
    );

    setSku(skuProduct || updatedSku);
  };



  return (
    <>
      {/* Nội dung trang */}
      {/* Sản phẩm đơn */}
      <div className="single-product">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="section-heading">
                <div className="line-dec" />
                <h1>Chi tiết sản phẩm</h1>
              </div>
            </div>
            <div className="col-md-6">
              <div className="product-slider">
                <img src={product.imageUrl} style={{ "maxWidth": "100%" }} />
              </div>
            </div>
            <div className="col-md-6">
              <div className="right-content">
                <h4>{product.name}</h4>
                <h6>{product.price} VND</h6>
                <p>{product.description}</p>
                <div className="d-flex align-items-center">
                  <p className="text-dark font-weight-medium mb-0 mr-3 pb-3">Kích thước:</p>
                  <form>
                    {
                      product.sizes.map((item: string, index: number) => {
                        return <div key={index} className="custom-control custom-radio custom-control-inline">
                          <input type="radio" className="custom-control-input" id={item} name="size" onChange={handleChange} />
                          <label className="custom-control-label" style={{ "marginLeft": "5px" }} htmlFor={item}>{item}</label>
                        </div>
                      })
                    }
                  </form>
                </div>
                <div className="d-flex align-items-center">
                  <p className="text-dark font-weight-medium mb-0 mr-3 pb-3">Màu sắc:</p>
                  <form className="d-flex flex-wrap">
                    {
                      product.colors.map((item: string, index: number) => {
                        return (
                          <div key={index} className="custom-control custom-radio custom-control-inline mr-3">
                            <input type="radio" className="custom-control-input" id={item} name="color" onChange={handleChange} />
                            <label className="custom-control-label" htmlFor={item}>{item}</label>
                          </div>
                        )
                      })
                    }
                  </form>
                </div>
                <span>{sku.quantity} sản phẩm có sẵn</span>
                <form action="" method="get">
                  <label htmlFor="quantity">Số lượng:</label>
                  <input
                    name="quantity"
                    type="quantity"
                    className="quantity-text"
                    id="quantity"
                    defaultValue={1}
                  />
                  <input
                    type=""
                    className="button"
                    defaultValue="Đặt hàng ngay!"
                  />
                </form>
                <div className="down-content">
                  <div className="categories">
                    <h6>
                      Danh mục: <span>
                        <a href="#">Quần</a>, <a href="#">Nữ</a>, <a href="#">Thời trang</a>
                      </span>
                    </h6>
                  </div>
                  <div className="share">
                    <h6>
                      Chia sẻ: <span>
                        <a href="#"><i className="fa fa-facebook" /></a>
                        <a href="#"><i className="fa fa-linkedin" /></a>
                        <a href="#"><i className="fa fa-twitter" /></a>
                      </span>
                    </h6>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Kết thúc trang sản phẩm */}
      {/* Sản phẩm tương tự */}
      <div className="featured-items">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="section-heading">
                <div className="line-dec" />
                <h1>Bạn có thể thích</h1>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Kết thúc phần sản phẩm tương tự */}
    </>
  )
}

export default SingleProduct;
