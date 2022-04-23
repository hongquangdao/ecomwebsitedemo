import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Header from "./../components/Header";
import { PayPalButton } from "react-paypal-button-v2";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../components/LoadingError/Loading";
import Message from "../components/LoadingError/Error";
import moment from "moment";
import 'moment/locale/vi';
import axios from "axios";
import { ORDER_PAY_RESET } from "../Redux/Constants/OrderConstants";
import { getOrderDetails, payOrder } from "../Redux/Actions/OrderActions";

const OrderScreen = ({ match }) => {
  window.scrollTo(0, 0);

  const [sdkReady, setSdkReady] = useState(false);
  const orderId = match.params.id;
  const dispatch = useDispatch();

  const orderDetails = useSelector((state) => state.orderDetails);
  const { order, loading, error } = orderDetails;

  const orderPay = useSelector((state) => state.orderPay);
  const { loading: loadingPay, success: successPay } = orderPay;

  // vì ban đầu bắt đầu request loading: true, orderItems: []; nếu không check sẽ bắn ra lỗi reading undefind orderItemskhi refresh lại trang.
  if (!loading) {
    const toDecimals = (num) => {
      return (Math.round(num * 100) / 100).toFixed(2);
    }
    order.itemsPrice = toDecimals(
      order.orderItems.reduce((acc, item) => acc + item.price * item.qty, 0)
    )
  }

  useEffect(() => {
    const addPayPalScript = async () => {
      const { data: clientId } = await axios.get("/api/config/paypal");
      const script = document.createElement("script");
      script.type = "text/javascript";
      script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`;
      script.async = true;
      script.onload = () => {
        setSdkReady(true);
      }
      document.body.appendChild(script);
    }
    if (!order || successPay) {
      dispatch({ type: ORDER_PAY_RESET });
      dispatch(getOrderDetails(orderId));
    } else if (!order.isPaid) {
      if (!window.paypal) {
        addPayPalScript();
      } else {
        setSdkReady(true);
      }
    }
  }, [dispatch, orderId, successPay, order])

  const successPaymentHandle = (paymentResult) => {
    console.log(paymentResult);
    dispatch(payOrder(orderId, paymentResult))
  }

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
                                  Thanh toán: {moment(order.orderItems.isPaid).locale('vi').calendar()}
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
                          Địa chỉ: {order.shippingAddress.city + " " + order.shippingAddress.address + " "
                            + order.shippingAddress.postalCode}
                        </p>
                        {
                          order.isDelivered ?
                            (
                              <div className="bg-info p-2 col-12">
                                <p className="text-white text-center text-sm-start">
                                  Vận chuyển lúc: {moment(order.orderItems.deliveredAt).locale('vi').calendar()}
                                </p>
                              </div>
                            )
                            :
                            (
                              <div className="bg-danger p-2 col-12">
                                <p className="text-white text-center text-sm-start">
                                  Chưa vận chuyển
                                </p>
                              </div>
                            )
                        }
                      </div>
                    </div>
                  </div>
                </div>

                <div className="row order-products justify-content-between">
                  <div className="col-lg-8">
                    {
                      order.orderItems.length === 0 ? (
                        <Message variant="alert-info mt-5">Không có đơn hàng</Message>
                      )
                        :
                        (
                          <>
                            {
                              order.orderItems.map((item, index) => (
                                <div className="order-product row" key={index}>
                                  <div className="col-md-3 col-6">
                                    <img src={item.image} alt={item.name} />
                                  </div>
                                  <div className="col-md-5 col-6 d-flex align-items-center">
                                    <Link to={`/products/${item.product}`}>
                                      <h6>{item.name}</h6>
                                    </Link>
                                  </div>
                                  <div className="mt-3 mt-md-0 col-md-2 col-6  d-flex align-items-center flex-column justify-content-center ">
                                    <h4>Số lượng</h4>
                                    <h6>{item.qty}</h6>
                                  </div>
                                  <div className="mt-3 mt-md-0 col-md-2 col-6 align-items-end  d-flex flex-column justify-content-center ">
                                    <h4>Tổng tiền</h4>
                                    <h6>${item.price * item.qty}</h6>
                                  </div>
                                </div>
                              ))
                            }
                          </>
                        )
                    }
                  </div>
                  {/* total */}
                  <div className="col-lg-3 d-flex align-items-end flex-column mt-5 subtotal-order">
                    <table className="table table-bordered">
                      <tbody>
                        <tr>
                          <td>
                            <strong>Sản phẩm</strong>
                          </td>
                          <td>${order.itemsPrice} <p style={{ color: 'red', fontSize: "10px" }}>{order.itemsPrice > 1000 ? "(Đơn hàng free ship)" : ""}</p></td>
                        </tr>
                        <tr>
                          <td>
                            <strong>Shipping</strong>
                          </td>
                          <td>${order.shippingPrice}</td>
                        </tr>
                        <tr>
                          <td>
                            <strong>Tổng tiền</strong>
                          </td>
                          <td>${order.totalPrice}</td>
                        </tr>
                      </tbody>
                    </table>
                    {
                      !order.isPaid && (
                        <div className="col-12">
                          {loadingPay && <Loading />}
                          {
                            !sdkReady ?
                              (
                                <Loading />
                              )
                              :
                              (
                                <PayPalButton
                                  amount={order.totalPrice}
                                  onSuccess={successPaymentHandle}
                                />
                              )
                          }
                        </div>
                      )
                    }
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
