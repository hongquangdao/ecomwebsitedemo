import React from "react";
import { Link } from "react-router-dom";
import Product from "./Product";
import products from "./../../data/Products";

const MainProducts = () => {
  return (
    <section className="content-main">
      <div className="content-header">
        <h2 className="content-title">Sản phẩm</h2>
        <div>
          <Link to="/addproduct" className="btn btn-brown">
            Tạo mới
          </Link>
        </div>
      </div>

      <div className="card mb-4 shadow-sm">
        <header className="card-header bg-white ">
          <div className="row gx-3 py-3">
            <div className="col-lg-4 col-md-6 me-auto ">
              <input
                type="search"
                placeholder="Search..."
                className="form-control p-2"
              />
            </div>
            <div className="col-lg-3 col-6 col-md-3">
              <select className="form-select">
                <option>Tất cả danh mục</option>
                <option>Điện tử</option>
                <option>Quần áo</option>
                <option>Một vài thứ khác</option>
              </select>
            </div>
            <div className="col-lg-3 col-6 col-md-3">
              <select className="form-select">
                <option>Được thêm gần nhất</option>
                <option>Rẻ nhất</option>
                <option>Nhiều lượt xem nhất</option>
              </select>
            </div>
          </div>
        </header>

        <div className="card-body">
          <div className="row">
            {/* Products */}
            {products.map((product) => (
              <Product product={product} key={product._id} />
            ))}
          </div>

          <nav className="float-end mt-4" aria-label="Page navigation">
            <ul className="pagination">
              <li className="page-item disabled">
                <Link className="page-link" to="#">
                  Quay lại
                </Link>
              </li>
              <li className="page-item active">
                <Link className="page-link" to="#">
                  1
                </Link>
              </li>
              <li className="page-item">
                <Link className="page-link" to="#">
                  2
                </Link>
              </li>
              <li className="page-item">
                <Link className="page-link" to="#">
                  3
                </Link>
              </li>
              <li className="page-item">
                <Link className="page-link" to="#">
                  Tiếp
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </section>
  );
};

export default MainProducts;
