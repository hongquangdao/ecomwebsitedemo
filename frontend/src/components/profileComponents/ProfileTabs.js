import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { updateUserProfile } from "../../Redux/Actions/UserAction";
import Message from "../LoadingError/Error";
import Loading from "../LoadingError/Loading";
import Toast from "../LoadingError/Toast";

const ProfileTabs = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const toastId = React.useRef(null); // đảm bảo toast không thay đổi khi DOM re-render đột ngột

  const toastObjects = {
    pauseOnFocus: true,
    draggable: false,
    pauseOnHover: false,
    autoClose: 2000,
  }

  const dispatch = useDispatch();

  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;

  const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
  const { loading: updateLoading } = userUpdateProfile;

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
    }
  }, [dispatch, user])

  const submidHandler = (e) => {
    e.preventDefault();
    //Password match
    if (password !== confirmPassword) {
      if (!toast.isActive(toastId.current)) {
        toastId.current = toast.error("Xác nhận mật khẩu không trùng khớp", toastObjects);
      }
    } else {
      dispatch(updateUserProfile({ id: user._id, name, email, password }));
      if (!toast.isActive(toastId.current)) {
        toastId.current = toast.success("Hồ sơ người dùng đã cập nhật", toastObjects);
      }
    }
  }

  return (
    <>
      <Toast />
      {error && <Message variant="alert-danger">{error}</Message>}
      {loading && <Loading />}
      {updateLoading && <Loading />}
      <form className="row  form-container" onSubmit={submidHandler}>
        <div className="col-md-6">
          <div className="form">
            <label htmlFor="account-fn">Tên người dùng</label>
            <input
              className="form-control" type="text"
              required
              value={name || ''}
              onChange={(e) => setName(e.target.value)} />
          </div>
        </div>

        <div className="col-md-6">
          <div className="form">
            <label htmlFor="account-email">Email</label>
            <input
              className="form-control"
              type="email"
              required
              value={email || ''}
              onChange={(e) => setEmail(e.target.value)} />
          </div>
        </div>
        <div className="col-md-6">
          <div className="form">
            <label htmlFor="account-pass">Mật khẩu mới</label>
            <input
              className="form-control"
              type="password"
              required
              value={password || ''}
              onChange={(e) => setPassword(e.target.value)} />
          </div>
        </div>
        <div className="col-md-6">
          <div className="form">
            <label htmlFor="account-confirm-pass">Xác nhận mật khẩu</label>
            <input
              className="form-control"
              type="password"
              required
              value={confirmPassword || ''}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
        </div>
        <button type="submit">Cập nhập hồ sơ</button>
      </form>

    </>
  );
};

export default ProfileTabs;
