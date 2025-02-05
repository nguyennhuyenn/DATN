import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import requestApi from '../../helper/api'


const Products = () => {

  const [products, setProducts] = useState<any[]>([])


  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await requestApi('products', 'GET', {});
        console.log(res);
        setProducts(res.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchData();
  }, []);

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
                <h1>Featured Items</h1>
              </div>
            </div>
            <div className="col-md-8 col-sm-12">
              <div id="`f`ilters" className="button-group">
                <button className="btn btn-primary" data-filter="*">
                  All Products
                </button>
                <button className="btn btn-primary" data-filter=".new">
                  Newest
                </button>
                <button className="btn btn-primary" data-filter=".low">
                  Low Price
                </button>
                <button className="btn btn-primary" data-filter=".high">
                  Hight Price
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="featured container no-gutter">
        <div className="row posts">
          {
            products.map((item) => {
              return <div key={item.id} className="item new col-md-4">
                <Link to={`singleproduct/${item.id}`}>
                  <div className="featured-item">
                    <img src={item.imageUrl} alt="" />
                    <h4>{item.name} </h4>
                    <h6>${item.price} </h6>
                  </div>
                </Link>
              </div>
            })
          }

        </div>
      </div>
      <div className="page-navigation">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <ul>
                <li className="current-page">
                  <a href="#">1</a>
                </li>
                <li>
                  <a href="#">2</a>
                </li>
                <li>
                  <a href="#">3</a>
                </li>
                <li>
                  <a href="#">
                    <i className="fa fa-angle-right" />
                  </a>
                </li>
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