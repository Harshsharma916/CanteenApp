import React, { useState, memo } from "react";
import { Formik } from "formik";
import { useDispatch } from "react-redux";
import { get } from "loadsh";
import { useNavigate } from "react-router";
import { useCookies } from "react-cookie";
import { notification } from "antd";
import { AxiosPost } from "../../Components/Apicaller";
import { loginCreators } from "./reducer";
import { createStructuredSelector } from "reselect";
import { connect } from "react-redux";
import { compose } from "redux";

const Login = ({ dispatchLoginDetails }) => {
  const dispach = useDispatch();
  const navigate = useNavigate();
  const [cookie, setCookie, removeCookie] = useCookies();
  const [loading, setLoading] = useState(false);

  const handleValidate = (value) => {
    const errors = {};
    if (!value.email) {
      errors.email = "Required";
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value.email)) {
      errors.email = "Invalid email address";
    }
    if (!value.password) {
      errors.password = "Required";
    }
    return errors;
  };

  const handleOnSubmit = async (values) => {
    setLoading(true);
    try {
      // const user = await api.post("/api/v1/user/login", values);
      // if (cookie.session) {
      //   removeCookie("session");
      // }
      // setCookie(
      //   "session",
      //   { token: get(user, "data.token"), path: "/home" },
      //   {
      //     maxAge: 24 * 60 * 60,
      //   }
      // );
      // dispach(setAuth({ user: get(user, "data.data.user") }));
      dispach({type:'login', data:values});
      const response = await AxiosPost("login", values);
      if (response.status == "OK") {
        setLoading(false);
        notification.success({
          message: "Successfully Logged In!",
        });
        navigate("/home");
      }
    } catch (err) {
      setLoading(false);
      notification.error({
        message: get(err, "response.data.message", "Error"),
      });
    }
  };

  return (
    <div className="">
      <div className="">
        {/* <img src={logo} alt="" /> */}
        <h1>Welcome Back!</h1>
        <Formik
          initialValues={{ email: "", password: "" }}
          validate={handleValidate}
          onSubmit={handleOnSubmit}
        >
          {({ values, errors, touched, handleChange, handleSubmit }) => (
            <form className="">
              <input
                name="email"
                style={{ marginBottom: "16px" }}
                placeholder="Enter Email"
                type="email"
                className={errors.email && touched.email ? "" : null}
                value={values.email}
                onChange={handleChange}
              />
              <input
                name="password"
                placeholder="Enter Password"
                type="password"
                value={values.password}
                className={errors.password && touched.password ? "" : null}
                onChange={handleChange}
              />
              <button
                type={"submit"}
                className=""
                onClick={handleSubmit}
                loading={loading}
              >
                Login
              </button>
            </form>
          )}
        </Formik>
      </div>
    </div>
  );
};

// const mapStateToProps = createStructuredSelector({

// });

// function mapDispatchToProps(dispatch) {
//   return {
//     dispatchLoginDetails: (data) =>
//       dispatch(loginCreators.requestSendPassword(data)),
//     dispatchLoginFailure: (data) =>
//       dispatch(loginCreators.sendingPasswordFailure()),
//   };
// }

// const withConnect = connect(
//   mapStateToProps,
//   mapDispatchToProps,
// );

export default memo(Login);
