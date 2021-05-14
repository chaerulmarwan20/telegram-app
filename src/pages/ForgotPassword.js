import React, { useState, useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";
import Swal from "sweetalert2";
import { activate, reset } from "../configs/redux/actions/user";

import Title from "../components/module/Title";
import Container from "../components/module/Container";
import Row from "../components/module/Row";
import Col from "../components/module/Col";
import Input from "../components/module/Input";
import Button from "../components/module/Button";

import Eye from "../assets/img/eye.png";
import Back from "../assets/img/back.png";

export default function ForgotPassword() {
  const useQuery = () => new URLSearchParams(useLocation().search);

  const query = useQuery();

  let email = query.get("email");
  let token = query.get("token");

  const history = useHistory();

  const dispatch = useDispatch();

  const { loading } = useSelector((state) => state.user);

  const [type, setType] = useState("password");
  const [typeConfirm, setTypeConfirm] = useState("password");
  const [showPassword, setShowPassword] = useState(false);

  let validate;

  if (showPassword) {
    validate = {
      password: Yup.string()
        .min(8, "Minimum 8 characters")
        .required("Required!"),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("password")], "Password do not match")
        .required("Required!"),
    };
  } else {
    validate = {
      email: Yup.string().email("Invalid email format").required("Required!"),
    };
  }

  const action = (params) => {
    const data = {
      password: params.password,
      confirmPassword: params.confirmPassword,
    };
    if (showPassword) {
      dispatch(reset(email, token, data))
        .then((res) => {
          formik.resetForm();
          Swal.fire({
            title: "Success!",
            text: res,
            icon: "success",
            confirmButtonText: "Ok",
            confirmButtonColor: "#7E98DF",
          }).then((result) => {
            if (result.isConfirmed) {
              history.push("/");
            } else {
              history.push("/");
            }
          });
        })
        .catch((err) => {
          Swal.fire({
            title: "Error!",
            text:
              err.message === `"confirmPassword" must be [ref:password]`
                ? "Password do not match"
                : err.message,
            icon: "error",
            confirmButtonText: "Ok",
            confirmButtonColor: "#7E98DF",
          });
        });
    } else {
      dispatch(activate(params.email))
        .then((res) => {
          formik.resetForm();
          Swal.fire({
            title: "Success!",
            text: res,
            icon: "success",
            confirmButtonText: "Ok",
            confirmButtonColor: "#7E98DF",
          });
        })
        .catch((err) => {
          Swal.fire({
            title: "Error!",
            text: err.message,
            icon: "error",
            confirmButtonText: "Ok",
            confirmButtonColor: "#7E98DF",
          });
        });
    }
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: Yup.object(validate),
    onSubmit: (values) => {
      action(values);
    },
  });

  const handleClickBack = () => {
    history.push("/");
  };

  const handleToggle = () => {
    if (type === "text") {
      setType("password");
    } else {
      setType("text");
    }
  };

  const handleToggleConfirm = () => {
    if (typeConfirm === "text") {
      setTypeConfirm("password");
    } else {
      setTypeConfirm("text");
    }
  };

  useEffect(() => {
    if (email !== null && token !== null) {
      setShowPassword(true);
    }
  }, [email, token]);

  return (
    <section className="auth py-5">
      <Title title="Forgot Password"></Title>
      <Container>
        <Row>
          <Col className="col-12 d-flex justify-content-center align-items-center">
            <div className="card forgot p-5">
              <img
                src={Back}
                alt="Back"
                width={10}
                className="back"
                onClick={() => {
                  handleClickBack();
                }}
              />
              <h1 className="text-center forgot">Forgot Password</h1>
              <p className="mt-1 mb-4">
                {`${
                  showPassword === false
                    ? "You’ll get messages soon on your e-mail"
                    : "You will have to enter your new password twice"
                }`}
              </p>
              <form onSubmit={formik.handleSubmit}>
                {showPassword === false && (
                  <>
                    <Input
                      type="text"
                      name="email"
                      placeholder="Enter your e-mail"
                      label="Email"
                      classFormGroup={`${
                        formik.errors.email && formik.touched.email && "mb-0"
                      }`}
                      classInput={`${
                        formik.errors.email && formik.touched.email && "error"
                      }`}
                      value={formik.values.email}
                      onChange={formik.handleChange}
                      isFormGroup
                    />
                    {formik.errors.email && formik.touched.email && (
                      <small className="error">{formik.errors.email}</small>
                    )}
                  </>
                )}
                {showPassword && (
                  <>
                    <div
                      className={`form-group password ${
                        formik.errors.password &&
                        formik.touched.password &&
                        "mb-0"
                      }`}
                    >
                      <label htmlFor="password">Password</label>
                      <Input
                        type={type}
                        name="password"
                        placeholder="Enter your password"
                        classInput={`${
                          formik.errors.password &&
                          formik.touched.password &&
                          "error"
                        }`}
                        value={formik.values.password}
                        onChange={formik.handleChange}
                      />
                      <img
                        src={Eye}
                        width={24}
                        height={24}
                        alt="Eye"
                        className="eye-img"
                        onClick={handleToggle}
                      />
                    </div>
                    {formik.errors.password && formik.touched.password && (
                      <small className="error">{formik.errors.password}</small>
                    )}
                    <div
                      className={`form-group password ${
                        formik.errors.confirmPassword &&
                        formik.touched.confirmPassword &&
                        "mb-0"
                      }`}
                    >
                      <label htmlFor="confirmPassword">Confirm Password</label>
                      <Input
                        type={type}
                        name="confirmPassword"
                        placeholder="Repeat your new password"
                        classInput={`${
                          formik.errors.confirmPassword &&
                          formik.touched.confirmPassword &&
                          "error"
                        }`}
                        value={formik.values.confirmPassword}
                        onChange={formik.handleChange}
                      />
                      <img
                        src={Eye}
                        width={24}
                        height={24}
                        alt="Eye"
                        className="eye-img"
                        onClick={handleToggleConfirm}
                      />
                    </div>
                    {formik.errors.confirmPassword &&
                      formik.touched.confirmPassword && (
                        <small className="error">
                          {formik.errors.confirmPassword}
                        </small>
                      )}
                  </>
                )}
                <Button type="submit" className="btn-auth btn-block mt-5">
                  {showPassword === false
                    ? !loading
                      ? "Send"
                      : "Please wait..."
                    : "Reset Now"}
                </Button>
              </form>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
}
