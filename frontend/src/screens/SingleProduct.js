import React, { useEffect, useState } from "react";
import Header from "./../components/Header";
import Rating from "../components/homeComponents/Rating";
import { Link } from "react-router-dom";
import Message from "./../components/LoadingError/Error";
import { useDispatch, useSelector } from 'react-redux'
import { detailProduct } from "../Redux/Actions/ProductAction";
import Loading from "../components/LoadingError/Loading";

const SingleProduct = ({ history, match }) => {
  // const product = products.find((p) => p._id === match.params.id);
  const [qty, setQty] = useState(1);
  const productId = match.params.id;
  const dispatch = useDispatch();

  const productDetail = useSelector((state) => state.productDetail);
  const { loading, error, product } = productDetail;


  useEffect(() => {
    dispatch(detailProduct(productId));
  }, [dispatch, productId]);

  const AddToCardHandle = (e) => {
    e.preventDefault();
    history.push(`/cart/${productId}?qty=${qty}`)
  }

  return (
    <>
      <Header />
      <div className="container single-product">
        {
          loading ? (
            <Loading />
          )
            : error ? (
              <Message variant="alert-danger">{error}</Message>
            )
              : (
                <>
                  <div className="row">
                    <div className="col-md-6">
                      <div className="single-image">
                        <img src={product.image} alt={product.name} />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="product-dtl">
                        <div className="product-info">
                          <div className="product-name">{product.name}</div>
                        </div>
                        <p>{product.description}</p>

                        <div className="product-count col-lg-7 ">
                          <div className="flex-box d-flex justify-content-between align-items-center">
                            <h6>Price</h6>
                            <span>${product.price}</span>
                          </div>
                          <div className="flex-box d-flex justify-content-between align-items-center">
                            <h6>Tình trạng</h6>
                            {product.countInStock > 0 ? (
                              <span>Còn hàng</span>
                            ) : (
                              <span>Hết hàng</span>
                            )}
                          </div>
                          <div className="flex-box d-flex justify-content-between align-items-center">
                            <h6>Đánh giá</h6>
                            <Rating
                              value={product.rating}
                              text={`${product.numReviews} reviews`}
                            />
                          </div>
                          {product.countInStock > 0 ? (
                            <>
                              <div className="flex-box d-flex justify-content-between align-items-center">
                                <h6>Số lượng</h6>
                                <select
                                  value={qty}
                                  onChange={(e) => setQty(e.target.value)}
                                >
                                  {[...Array(product.countInStock).keys()].map((x) => (
                                    <option key={x + 1} value={x + 1}>
                                      {x + 1}
                                    </option>
                                  ))}
                                </select>
                              </div>
                              <button onClick={AddToCardHandle} className="round-black-btn">Thêm giỏ hàng</button>
                            </>
                          ) : null}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* RATING */}
                  <div className="row my-5">
                    <div className="col-md-6">
                      <h6 className="mb-3">Đánh giá</h6>
                      <Message variant={"alert-info mt-3"}>Không có đánh giá</Message>
                      <div className="mb-5 mb-md-3 bg-light p-3 shadow-sm rounded">
                        <strong>Admin Doe</strong>
                        <Rating />
                        <span>Jan 12 2021</span>
                        <div className="alert alert-info mt-3">
                          Lorem Ipsum is simply dummy text of the printing and typesetting
                          industry. Lorem Ipsum has been the industry's standard dummy
                          text ever since the 1500s, when an unknown printer took a galley
                          of type and scrambled it to make a type specimen book
                        </div>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <h6>Để lại bình luận</h6>
                      <div className="my-4"></div>

                      <form>
                        <div className="my-4">
                          <strong>Xếp hạng</strong>
                          <select className="col-12 bg-light p-3 mt-2 border-0 rounded">
                            <option value="">Select...</option>
                            <option value="1">1 - 1 sao</option>
                            <option value="2">2 - 2 sao</option>
                            <option value="3">3 - 3 sao</option>
                            <option value="4">4 - 4 sao</option>
                            <option value="5">5 - 5 sao</option>
                          </select>
                        </div>
                        <div className="my-4">
                          <strong>Bình luận</strong>
                          <textarea
                            row="3"
                            className="col-12 bg-light p-3 mt-2 border-0 rounded"
                          ></textarea>
                        </div>
                        <div className="my-3">
                          <button className="col-12 bg-brown border-0 p-3 rounded text-white">
                            GỬI
                          </button>
                        </div>
                      </form>
                      <div className="my-3">
                        <Message variant={"alert-warning"}>
                          Mời{" "}
                          <Link to="/login">
                            " <strong>Đăng nhập</strong> "
                          </Link>{" "}
                          viết bình luận{" "}
                        </Message>
                      </div>
                    </div>
                  </div>
                </>
              )
        }

      </div>
    </>
  );
};

export default SingleProduct;
