import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import Rating from "./Rating";
import Pagination from "./pagination";
import { listProduct } from "../../Redux/Actions/ProductAction.js"
import { useDispatch, useSelector } from 'react-redux'
import Loading from "../LoadingError/Loading";
import Message from "../LoadingError/Error";

const ShopSection = (props) => {

  const { keyword, pagenumber } = props;

  const dispatch = useDispatch();

  const productList = useSelector((state) => state.productList);

  const { loading, error, products } = productList;

  useEffect(() => {
    dispatch(listProduct(keyword, pagenumber))
  }, [dispatch, keyword, pagenumber]);

  return (
    <>
      <div className="container">
        <div className="section">
          <div className="section-title">
            <h1 >Sản phẩm bán chạy </h1>
          </div>
          <div className="row">
            <div className="col-lg-12 col-md-12 article">
              <div className="shopcontainer row">
                {
                  loading ? (
                    <div className="mb-5">
                      <Loading />
                    </div>
                  ) : error ? (
                    <Message variant="alert-danger" >{error}</Message>
                  )
                    : (
                      <>
                        {products.map((product) => (
                          <div
                            className="shop col-lg-3 col-md-6 col-sm-6"
                            key={product._id}
                          >
                            <div className="border-product">
                              <Link to={`/products/${product._id}`}>
                                <div className="shopBack">
                                  <img src={product.image} alt={product.name} />
                                </div>
                              </Link>

                              <div className="shoptext">
                                <p>
                                  <Link to={`/products/${product._id}`}>
                                    {product.name}
                                  </Link>
                                </p>

                                <Rating
                                  value={product.rating}
                                  text={`${product.numReviews} reviews`}
                                />
                                <h3>${product.price}</h3>
                              </div>
                            </div>
                          </div>
                        ))}
                      </>
                    )
                }
                {/* Pagination */}
                <Pagination />
              </div>
            </div>
          </div>
        </div>
        <div className="section">
          <div className="section-title">
            <h1 >Sản phẩm nổi bật </h1>
          </div>
          <div className="row">
            <div className="col-lg-12 col-md-12 article">
              <div className="shopcontainer row">
                {
                  loading ? (
                    <div className="mb-5">
                      <Loading />
                    </div>
                  ) : error ? (
                    <Message variant="alert-danger" >{error}</Message>
                  )
                    : (
                      <>
                        {products.map((product) => (
                          <div
                            className="shop col-lg-3 col-md-6 col-sm-6"
                            key={product._id}
                          >
                            <div className="border-product">
                              <Link to={`/products/${product._id}`}>
                                <div className="shopBack">
                                  <img src={product.image} alt={product.name} />
                                </div>
                              </Link>

                              <div className="shoptext">
                                <p>
                                  <Link to={`/products/${product._id}`}>
                                    {product.name}
                                  </Link>
                                </p>

                                <Rating
                                  value={product.rating}
                                  text={`${product.numReviews} reviews`}
                                />
                                <h3>${product.price}</h3>
                              </div>
                            </div>
                          </div>
                        ))}
                      </>
                    )
                }
                {/* Pagination */}
                <Pagination />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ShopSection;
