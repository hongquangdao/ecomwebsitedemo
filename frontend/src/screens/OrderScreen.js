import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "./../components/Header";
import { PayPalButton } from "react-paypal-button-v2";
import { useDispatch, useSelector } from "react-redux";
import { getOrderDetails } from "../Redux/Actions/OrderActions";
import Loading from "../components/LoadingError/Loading";
import Message from "../components/LoadingError/Error";
import moment from "moment";
import 'moment/locale/vi';

const OrderScreen = ({ match }) => {
  window.scrollTo(0, 0);

  const orderId = match.params.id;
  const dispatch = useDispatch();
  const orderDetails = useSelector((state) => state.orderDetails);
  const { order, loading, error } = orderDetails;

  useEffect(() => {
    dispatch(getOrderDetails(orderId))
  }, [dispatch, orderId])

  return (
    <>
      <Header />
      {
        loading ? (<Loading />) : error ? (<Message> {error}</Message>) :
          (
            <>
              <div className="container">
                <div className="row  order-detail">
                  <div className="col-lg-4 col-sm-4 mb-lg-4 mb-5 mb-sm-0">
                    <div className="row">
                      <div className="col-md-4 center">
                        <div className="alert-success order-box">
                          <i className="fas fa-user"></i>
                        </div>
                      </div>
                      <div className="col-md-8 center">
                        <h5>
                          <strong>Khách hàng</strong>
                        </h5>
                        <p>{order.user.name}</p>
                        <p>
                          <a href={`mailto:${order.user.email}`}>{order.user.email}</a>
                        </p>
                      </div>
                    </div>
                  </div>
                  {/* 2 */}
                  <div className="col-lg-4 col-sm-4 mb-lg-4 mb-5 mb-sm-0">
                    <div className="row">
                      <div className="col-md-4 center">
                        <div className="alert-success order-box">
                          <i className="fas fa-truck-moving"></i>
                        </div>
                      </div>
                      <div className="col-md-8 center">
                        <h5>
                          <strong>Thông tin đơn hàng</strong>
                        </h5>
                        <p>Shipping: {order.shippingAddress.city}</p>
                        <p>Phương thức thanh toán: {order.paymentMethod}</p>
                        {
                          order.isPaid ?
                            (
                              <div className="bg-info p-2 col-12">
                                <p className="text-white text-center text-sm-start">
                                  Thanh toán: {moment(order.orderItems.isPaid).locale('vi').format('llll')}
                                </p>
                              </div>
                            )
                            :
                            (
                              <div className="bg-danger p-2 col-12">
                                <p className="text-white text-center text-sm-start">
                                  Chưa thanh toán
                                </p>
                              </div>
                            )
                        }
                      </div>
                    </div>
                  </div>
                  {/* 3 */}
                  <div className="col-lg-4 col-sm-4 mb-lg-4 mb-5 mb-sm-0">
                    <div className="row">
                      <div className="col-md-4 center">
                        <div className="alert-success order-box">
                          <i className="fas fa-map-marker-alt"></i>
                        </div>
                      </div>
                      <div className="col-md-8 center">
                        <h5>
                          <strong>Vận chuyển tới</strong>
                        </h5>
                        <p>
                          Địa chỉ: Arusha Tz, Ngaramtoni Crater, P.O BOX 1234 Arusha Tz
                        </p>
                        <div className="bg-danger p-1 col-12">
                          <p className="text-white text-center text-sm-start">
                            Chưa vận chuyển
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="row order-products justify-content-between">
                  <div className="col-lg-8">
                    {/* <Message variant="alert-info mt-5">Your order is empty</Message> */}

                    <div className="order-product row">
                      <div className="col-md-3 col-6">
                        <img src="/images/4.png" alt="product" />
                      </div>
                      <div className="col-md-5 col-6 d-flex align-items-center">
                        <Link to={`/`}>
                          <h6>Girls Nike Shoes</h6>
                        </Link>
                      </div>
                      <div className="mt-3 mt-md-0 col-6 col-md-2  d-flex align-items-center flex-column justify-content-center ">
                        <h4>SỐ LƯỢNG</h4>
                        <h6>4</h6>
                      </div>
                      <div className="mt-3 mt-md-0 col-md-2 col-6 align-items-end  d-flex flex-column justify-content-center">
                        <h4>TỔNG CỘNG</h4>
                        <h6>$456</h6>
                      </div>
                    </div>
                  </div>
                  {/* total */}
                  <div className="col-lg-3 d-flex align-items-end flex-column mt-5 subtotal-order">
                    <table className="table table-bordered">
                      <tbody>
                        <tr>
                          <td>
                            <strong>Products</strong>
                          </td>
                          <td>$234</td>
                        </tr>
                        <tr>
                          <td>
                            <strong>Shipping</strong>
                          </td>
                          <td>$566</td>
                        </tr>
                        <tr>
                          <td>
                            <strong>Tax</strong>
                          </td>
                          <td>$3</td>
                        </tr>
                        <tr>
                          <td>
                            <strong>Total</strong>
                          </td>
                          <td>$567</td>
                        </tr>
                      </tbody>
                    </table>
                    <div className="col-12">
                      <PayPalButton amount={345} />
                    </div>
                  </div>
                </div>
              </div>
            </>
          )
      }

    </>
  );
};

export default OrderScreen;
