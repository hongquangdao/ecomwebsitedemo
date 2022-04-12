import React from "react";

const CalltoActionSection = () => {
  return (
    <div className="subscribe-section bg-with-black">
      <div className="container">
        <div className="row">
          <div className="col-xs-12">
            <div className="subscribe-head">
              <h2>Bạn cần thêm thông tin?</h2>
              <p>Đăng ký để nhận thông tin miễn phí</p>
              <form className="form-section">
                <input placeholder="Email..." name="email" type="email" />
                <input value="Đồng ý!" name="subscribe" type="submit" />
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalltoActionSection;
