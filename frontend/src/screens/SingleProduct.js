import React, { useEffect, useState } from "react";
import moment from "moment";
import Header from "./../components/Header";
import Rating from "../components/homeComponents/Rating";
import { Link } from "react-router-dom";
import Message from "./../components/LoadingError/Error";
import { useDispatch, useSelector } from 'react-redux'
import { createProductReview, detailProduct } from "../Redux/Actions/ProductAction";
import Loading from "../components/LoadingError/Loading";
import { PRODUCT_CREATE_REVIEW_RESET } from "../Redux/Constants/ProductConstant";

const SingleProduct = ({ history, match }) => {
  // const product = products.find((p) => p._id === match.params.id);
  const [qty, setQty] = useState(1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const productId = match.params.id;
  const dispatch = useDispatch();

  const productDetail = useSelector((state) => state.productDetail);
  const { loading, error, product } = productDetail;
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const productCreateReview = useSelector((state) => state.productCreateReview);
  const {
    loading: loadingCreateReview,
    error: errorCreateReview,
    success: successCreateReview
  } = productCreateReview;

  useEffect(() => {
    if (successCreateReview) {
      alert("Đánh giá đa được gửi đi")
      setRating(0)
      setComment("")
      dispatch({ type: PRODUCT_CREATE_REVIEW_RESET })
    };
    dispatch(detailProduct(productId));
  }, [dispatch, productId, successCreateReview]);

  const AddToCardHandle = (e) => {
    e.preventDefault();
    history.push(`/cart/${productId}?qty=${qty}`)
  };

  const submtHandle = (e) => {
    e.preventDefault();
    dispatch(createProductReview(productId, {
      rating,
      comment,
    }))
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
                      <div className="product-name">{product.name}</div>
                      <div className="single-image">
                        <img src={product.image} alt={product.name} />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="product-price-title">
                        <span style={{ color: "red" }}>${product.price} </span>
                        <span style={{ color: "grey" }}><del>${product.price * 0.9}</del></span>
                      </div>
                      <div className="product-dtl">
                        <div className="product-info">
                        </div>
                        <p>{product.description}</p>
                        <div className="product-count col-lg-9 ">
                          <div className="flex-box d-flex justify-content-between align-items-center">
                            <h4 style={{ color: "brown" }}>Giá</h4>
                          </div>
                          <div className="flex-box d-flex justify-content-between align-items-center">
                            <h6 style={{ color: "brown" }}>Tình trạng</h6>
                            {product.countInStock > 0 ? (
                              <span><h3 style={{ color: "green" }}>Còn hàng</h3></span>
                            ) : (
                              <span><h3 style={{ color: "red" }}>Hết hàng</h3></span>
                            )}
                          </div>
                          <div className="flex-box d-flex justify-content-between align-items-center">
                            <h6 style={{ color: "brown" }}>Đánh giá</h6>
                            <Rating
                              value={product.rating}
                              text={`${product.numReviews} reviews`}
                            />
                          </div>
                          {product.countInStock > 0 ? (
                            <>
                              <div className="flex-box d-flex justify-content-between align-items-center">
                                <h6 style={{ color: "brown" }}>Số lượng</h6>
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

                  {
                    console.log(product.reviews)
                  }
                  {/* RATING */}
                  <div className="row my-5">
                    <div className="col-md-6">
                      <h3 className="mb-3">Đánh giá và nhận xét</h3>
                      {
                        product.reviews.length === 0 && (
                          <Message variant={"alert-info mt-3"}>Không có đánh giá</Message>
                        )
                      }
                      {
                        product.reviews.map((review) => (
                          <div
                            className="mb-5 mb-md-3 bg-light p-3 shadow-sm rounded"
                            key={review._id}
                          >
                            <strong>{review.name}</strong>
                            <Rating
                              value={review.rating}
                            />
                            <span>{moment(review.createdAt).calendar()}</span>
                            <div className="alert alert-info mt-3">{review.comment}</div>
                          </div>
                        ))
                      }
                    </div>
                    <div className="col-md-6">
                      <h3>Để lại bình luận</h3>
                      <div className="my-4">
                        {loadingCreateReview && <Loading />}
                        {errorCreateReview && (
                          <Message variant="alert-danger">
                            {errorCreateReview}
                          </Message>)}
                      </div>
                      {
                        userInfo ? (
                          <form onSubmit={submtHandle}>
                            <div className="my-4">
                              <strong>Xếp hạng</strong>
                              <select value={rating} onChange={(e) => setRating(e.target.value)} className="col-12 bg-light p-3 mt-2 border-0 rounded">
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
                                value={comment}
                                onChange={(e) => setComment(e.target.value)}
                                className="col-12 bg-light p-3 mt-2 border-0 rounded"
                              ></textarea>
                            </div>
                            <div className="my-3">
                              <button disabled={loadingCreateReview} className="col-12 bg-brown border-0 p-3 rounded text-white">
                                GỬI
                              </button>
                            </div>
                          </form>
                        ) : (
                          <div className="my-3">
                            <Message variant={"alert-warning"}>
                              Mời{" "}
                              <Link to="/login">
                                " <strong>Đăng nhập</strong> "
                              </Link>{" "}
                              Viết bình luận{" "}
                            </Message>
                          </div>
                        )
                      }
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
