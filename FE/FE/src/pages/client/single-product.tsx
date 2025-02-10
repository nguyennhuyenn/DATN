import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import requestApi from '../../helper/api';
import { ProductDocument, SKU, defaultValueProduct } from '../../util/type/product';
import { formatCurrencyVND } from '../../util';
import "../../../public/assets/css/client/detail-product.css"
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { LoaderContext } from '../../hook/admin/contexts/loader';

const SingleProduct = () => {
  const { id } = useParams();
  const [product, setProduct] = useState<ProductDocument>(defaultValueProduct);
  const [moreDescription, setMoreDescription] = useState(false)
  const [listImage, setListImage] = useState([""])
  const [currentIndexImage, setCurrentIndexImage] = useState(0);
  const { setLoader } = useContext(LoaderContext);

  const [sku, setSku] = useState<SKU>({
    size: "",
    color: "",
    quantity: 0
  })

  useEffect(() => {
    const fetchProductDetails = async () => {
      setLoader(true)
      try {
        const listThumbnail = []
        const response = await requestApi(`products/${id}`, 'GET', {});

        const product: ProductDocument = response.data

        listThumbnail.push(response.data.imageUrl)
        product.colors.map(item => {
          listThumbnail.push(item.image)
        })

        setListImage(listThumbnail)
        setProduct(product);
      } catch (error) {
        console.error('Error fetching product details:', error);
      }
      setLoader(false)
    };

    if (id) {
      fetchProductDetails();
    }
  }, [id]);


  const handleChange = (name: string, value: string) => {

    const updatedSku = {
      ...sku,
      [name]: value
    };


    const skuProduct = product.sku.find(
      (item) => item.color === updatedSku.color && item.size === updatedSku.size
    );

    if (name == "color") {
      const index = product.colors.findIndex(item => item.name === value)
      console.log(index);

      if (index >= 0) setCurrentIndexImage(index + 1)
    }

    setSku(skuProduct || updatedSku);
  };

  const handlePrev = () => {
    setCurrentIndexImage((prev) => (prev === 0 ? listImage.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndexImage((prev) => (prev === listImage.length - 1 ? 0 : prev + 1));
  };

  const checkQuantitySku = (name: "size" | "color", value: string) => {
    if (sku.size) {
      if (name === "color") {
        const check = product.sku.find(item => item.color === value && item.size === sku.size)
        return check?.quantity
      }
    }

    if (sku.color) {
      if (name === "size") {
        const check = product.sku.find(item => item.color === sku.color && item.size === value)
        return check?.quantity
      }
    }
  }

  return (
    <>

      {/* Page Content */}
      {/* Single Starts Here */}
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
              <div className="position-relative">
                <div className="product-slider text-center">
                  <button className="prev-btn" onClick={handlePrev}><ChevronLeft /></button>
                  <img src={listImage[currentIndexImage]} alt="Product" className="w-100" style={{ maxWidth: "100%" }} />
                  <button className="next-btn" onClick={handleNext}>  <ChevronRight /> </button>

                </div>
              </div>

            </div>
            <div className="col-md-6">
              <div className="right-content">
                <h4>{product.name}</h4>
                <h6>{formatCurrencyVND(product.price)}</h6>


                <div className="d-flex align-items-center py-2">
                  <p className="text-dark font-weight-medium mb-0 mr-3 pb-3">Màu sắc:</p>
                  <form className="d-flex flex-wrap">
                    {
                      product.colors.map((item, index) => {
                        if (checkQuantitySku("color", item.name) == 0)
                          return <div key={index} className="custom-control custom-radio custom-control-inline">
                            <div className="btn btn-secondary">{item.name}</div>
                          </div>
                        return <>
                          {
                            sku.color == item.name ?
                              <div key={index} className="custom-control custom-radio custom-control-inline">
                                <button type="button" className="btn btn-info" onClick={() => handleChange("color", item.name)}>{item.name}</button>
                              </div> :
                              <div key={index} className="custom-control custom-radio custom-control-inline">
                                <button type="button" className="btn btn-outline-info" onClick={() => handleChange("color", item.name)}>{item.name}</button>
                              </div>
                          }
                        </>
                      })
                    }
                  </form>
                </div>

                <div className="d-flex align-items-center">
                  <p className="text-dark font-weight-medium mb-0 mr-3 pb-3">Sizes:</p>
                  <form>
                    {
                      product.sizes.map((item, index) => {
                        if (checkQuantitySku("size", item) == 0)
                          return <div key={index} className="custom-control custom-radio custom-control-inline">
                            <div className="btn btn-secondary">{item}</div>
                          </div>
                        return <>
                          {
                            sku.size == item ?
                              <div key={index} className="custom-control custom-radio custom-control-inline">
                                <button type="button" className="btn btn-info" onClick={() => handleChange("size", item)}>{item}</button>
                              </div> :
                              <div key={index} className="custom-control custom-radio custom-control-inline">
                                <button type="button" className="btn btn-outline-info" onClick={() => handleChange("size", item)}>{item}</button>
                              </div>
                          }
                        </>
                      })
                    }
                  </form>
                </div>

                <span>{sku.quantity} left on stock</span>
                <form action="" method="get">
                  <label htmlFor="quantity">Quantity:</label>
                  <input
                    name="quantity"
                    type="quantity"
                    className="quantity-text"
                    id="quantity"
                    defaultValue={1}
                  />
                  <input
                    type="submit"
                    className="button"
                    defaultValue="Order Now!"
                  />
                </form>
                <div className="down-content">
                  <div className="categories">
                    <h6>
                      Category:{" "}
                      <span>
                        <a href="#">Pants</a>,<a href="#">Women</a>,
                        <a href="#">Lifestyle</a>
                      </span>
                    </h6>
                  </div>
                  <div className="share">
                    <h6>
                      Share:{" "}
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
            </div>
          </div>
        </div>
      </div>

      <div className="featured-items">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="section-heading">
                <div className="line-dec" />
                <h1>Mô tả</h1>
              </div>
            </div>
            <div className="col-md-12">
              {
                product.description.length > 1000 ?

                  !moreDescription ?
                    <>
                      <div
                        dangerouslySetInnerHTML={{ __html: product.description.slice(0, 1000) }}
                      />

                      <div className='d-flex justify-content-center'>
                        <button onClick={() => setMoreDescription(true)} type="button" className="btn btn-secondary">Xem thêm</button>
                      </div>
                    </> :
                    <>
                      <div
                        dangerouslySetInnerHTML={{ __html: product.description }}
                      />

                      <div className='d-flex justify-content-center'>
                        <button onClick={() => setMoreDescription(false)} type="button" className="btn btn-secondary">Rút gọn</button>
                      </div>
                    </>
                  : <div
                    dangerouslySetInnerHTML={{ __html: product.description }}
                  />
              }
            </div>
          </div>
        </div>
      </div>

      {/* Single Page Ends Here */}
      {/* Similar Starts Here */}
      <div className="featured-items">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="section-heading">
                <div className="line-dec" />
                <h1>You May Also Like</h1>
              </div>
            </div>
            <div className="col-md-12">
              <div className="owl-carousel owl-theme">
                <a href="single-product.html">
                  <div className="featured-item">
                    <img src={product.imageUrl} alt="Item 1" />
                    <h4>Proin vel ligula</h4>
                    <h6>$15.00</h6>
                  </div>
                </a>
                <a href="single-product.html">
                  <div className="featured-item">
                    <img src={product.imageUrl} alt="Item 2" />
                    <h4>Erat odio rhoncus</h4>
                    <h6>$25.00</h6>
                  </div>
                </a>
                <a href="single-product.html">
                  <div className="featured-item">
                    <img src={product.imageUrl} alt="Item 3" />
                    <h4>Integer vel turpis</h4>
                    <h6>$35.00</h6>
                  </div>
                </a>
                <a href="single-product.html">
                  <div className="featured-item">
                    <img src={product.imageUrl} alt="Item 4" />
                    <h4>Sed purus quam</h4>
                    <h6>$45.00</h6>
                  </div>
                </a>
                <a href="single-product.html">
                  <div className="featured-item">
                    <img src={product.imageUrl} alt="Item 5" />
                    <h4>Morbi aliquet</h4>
                    <h6>$55.00</h6>
                  </div>
                </a>
                <a href="single-product.html">
                  <div className="featured-item">
                    <img src={product.imageUrl} alt="Item 6" />
                    <h4>Urna ac diam</h4>
                    <h6>$65.00</h6>
                  </div>
                </a>
                <a href="single-product.html">
                  <div className="featured-item">
                    <img src={product.imageUrl} alt="Item 7" />
                    <h4>Proin eget imperdiet</h4>
                    <h6>$75.00</h6>
                  </div>
                </a>
                <a href="single-product.html">
                  <div className="featured-item">
                    <img src={product.imageUrl} alt="Item 8" />
                    <h4>Nullam risus nisl</h4>
                    <h6>$85.00</h6>
                  </div>
                </a>
                <a href="single-product.html">
                  <div className="featured-item">
                    <img src={product.imageUrl} alt="Item 9" />
                    <h4>Cras tempus</h4>
                    <h6>$95.00</h6>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Similar Ends Here */}

    </>

  )
}

export default SingleProduct