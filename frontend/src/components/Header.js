import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { logout } from "../Redux/Actions/UserAction";
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';
import AccountCircleTwoToneIcon from '@mui/icons-material/AccountCircleTwoTone';
import LoyaltyTwoToneIcon from '@mui/icons-material/LoyaltyTwoTone';
import DesktopWindowsTwoToneIcon from '@mui/icons-material/DesktopWindowsTwoTone';

const Header = () => {
  const [keyword, setKeyword] = useState();
  const dispatch = useDispatch();
  let history = useHistory();

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const logoutHandler = () => {
    dispatch(logout())
  }

  const submitHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      history.push(`/search/${keyword}`);
    } else {
      history.push("/")
    }
  }
  console.log(keyword);

  return (
    <div>
      {/* Top Header */}
      <div className="Announcement ">
        <div className="container">
          <div className="row">
            <div className="col-md-6 d-flex align-items-center display-none">
              <p>081812348547</p>
              <p>daoquang1101@gmail.com</p>
            </div>
            <div className=" col-12 col-lg-6 justify-content-center justify-content-lg-end d-flex align-items-center">
              <Link to="">
                <i className="fab fa-facebook-f"></i>
              </Link>
              <Link to="">
                <i className="fab fa-instagram"></i>
              </Link>
              <Link to="">
                <i className="fab fa-twitter"></i>
              </Link>
              <Link to="">
                <i className="fab fa-linkedin-in"></i>
              </Link>
              <Link to="" className="pc-header">
                <i className="fab fa-youtube"></i>
              </Link>
              <Link to="" className="pc-header">
                <i className="fab fa-pinterest-p"></i>
              </Link>
              <div className="col-md-4 d-flex align-items-center justify-content-end Login-Register">
                <div className="logo-user">
                  <Link to="/profile" >
                    <AccountCircleTwoToneIcon sx={{ fontSize: "28px" }} />
                  </Link>
                </div>
                {
                  userInfo ?
                    (
                      <div className="btn-group">
                        <span
                          type="button"
                          className="name-button dropdown-toggle"
                          data-toggle="dropdown"
                          aria-haspopup="true"
                          aria-expanded="false"
                        >
                          <span>Hi,{userInfo.name}</span>
                        </span>
                        <div className="dropdown-menu">
                          <Link className="dropdown-item" to="/profile">
                            Hồ sơ
                          </Link>
                          <Link
                            className="dropdown-item" to="#"
                            onClick={logoutHandler}
                          >
                            Đăng xuất
                          </Link>
                        </div>
                      </div>
                    )
                    :
                    (
                      <>
                        <Link to="/login">
                          Đăng nhập
                        </Link>
                        <Link to="/register">
                          Đăng kí
                        </Link>
                      </>
                    )
                }
                <Link to="/cart" className="pc-header">
                  <ShoppingCartCheckoutIcon sx={{ fontSize: "28px" }} />
                  <span className="badge">{cartItems.length}</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Header */}
      <div className="header">
        <div className="container">

          {/* MOBILE HEADER */}
          <div className="mobile-header">
            <div className="container ">
              <div className="row ">
                <div className="col-4 d-flex align-items-center">
                  <Link className="navbar-brand" to="/">
                    <img alt="logo" style={{ width: 100, height: 100 }} src="/images/laptop.png" />
                  </Link>
                </div>
                <div className="col-8 d-flex align-items-center justify-content-end Login-Register">
                  <Link to="/cart" className="desktop-mobile-icon">
                    <DesktopWindowsTwoToneIcon style={{ color: "#634520" }} sx={{ fontSize: "30px" }} />
                    <div style={{ color: "#634520", fontSize: "8px" }}>Build PC</div>
                  </Link>
                  <Link to="/cart" className="cart-mobile-icon">
                    <LoyaltyTwoToneIcon style={{ color: "#634520" }} sx={{ fontSize: "30px" }} />
                    <div className="badge">{cartItems.length}</div>
                    <div style={{ color: "#634520", fontSize: "8px" }}>Khuyến mãi</div>
                  </Link>
                  <Link to="/cart" className="loyal-mobile-icon">
                    <ShoppingCartCheckoutIcon style={{ color: "#634520" }} sx={{ fontSize: "30px" }} />
                    <div className="badge">{cartItems.length}</div>
                    <div style={{ color: "#634520", fontSize: "8px" }}>Giỏ hàng</div>
                  </Link>
                </div>
                <div className="col-12 d-flex align-items-center">
                  <form className="input-group" onSubmit={submitHandler}>
                    <input
                      type="search"
                      className="form-control rounded search"
                      placeholder="Tìm kiếm"
                      onChange={(e) => setKeyword(e.target.value)}
                    />
                    <button type="submit" className="search-button">
                      Tìm kiếm
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>

          {/* PC HEADER */}
          <div className="pc-header">
            <div className="row">
              <div className="col-md-3 col-3 d-flex align-items-center">
                <Link className="navbar-brand" to="/">
                  <img alt="logo" src="/images/laptop.png" />
                </Link>
              </div>
              <div className="col-md-6 col-6 d-flex align-items-center">
                <form className="input-group" onSubmit={submitHandler}  >
                  <input
                    type="Search"
                    className="form-control rounded search"
                    placeholder="Tìm kiếm"
                    onChange={(e) => setKeyword(e.target.value)}
                  />
                  <button className="search-button" type="submit"> Tìm kiếm</button>
                </form>
              </div>
              <div className="col-md-1 col-1 d-flex align-items-center">
                <Link className="navbar-brand" to="/BuildPC">
                  <DesktopWindowsTwoToneIcon style={{ color: "#634520" }} sx={{ fontSize: 40 }} />
                  <div style={{ fontSize: "15px", color: "#634520" }}>Build Pc</div>
                </Link>
              </div>
              <div className="col-md-2 col-1 d-flex align-items-center">
                <Link className="navbar-brand" to="/sale">
                  <LoyaltyTwoToneIcon style={{ color: "#634520" }} sx={{ fontSize: 40 }} />
                  <div style={{ fontSize: "15px", color: "#634520" }}>Khuyến Mãi</div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
