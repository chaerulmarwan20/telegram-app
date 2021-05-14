import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";
import Swal from "sweetalert2";
import { login } from "../configs/redux/actions/user";

import Title from "../components/module/Title";
import Container from "../components/module/Container";
import Row from "../components/module/Row";
import Col from "../components/module/Col";
import Input from "../components/module/Input";
import Button from "../components/module/Button";

import Eye from "../assets/img/eye.png";
import Google from "../assets/img/google.png";

export default function Login() {
  const history = useHistory();

  const dispatch = useDispatch();

  const [type, setType] = useState("password");

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email format").required("Required!"),
      password: Yup.string()
        .min(8, "Minimum 8 characters")
        .required("Required!"),
    }),
    onSubmit: (values) => {
      dispatch(login(values))
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
              history.push("/chat");
            } else {
              history.push("/chat");
            }
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
    },
  });

  const handleToggle = () => {
    if (type === "text") {
      setType("password");
    } else {
      setType("text");
    }
  };

  const handleClickGoogle = () => {
    Swal.fire({
      title: "This feature is coming soon",
      icon: "info",
      confirmButtonText: "Ok",
      confirmButtonColor: "#7E98DF",
    });
  };

  return (
    <section className="auth py-5">
      <Title title="Login"></Title>
      <Container>
        <Row>
          <Col className="col-12 d-flex justify-content-center align-items-center">
            <div className="card p-5">
              <h1 className="text-center">Login</h1>
              <p className="my-4">Hi, Welcome back!</p>
              <form onSubmit={formik.handleSubmit}>
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
                <div
                  className={`form-group password ${
                    formik.errors.password && formik.touched.password && "mb-0"
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
                <Link
                  to="/forgot-password"
                  className="forgot float-right mb-4 mt-2"
                >
                  Forgot password?
                </Link>
                <Button type="submit" className="btn-auth btn-block mt-5">
                  Login
                </Button>
              </form>
              <Row className="mt-4">
                <Col className="col-4">
                  <hr />
                </Col>
                <Col className="col-4">
                  <p className="with text-center">Login with</p>
                </Col>
                <Col className="col-4">
                  <hr />
                </Col>
              </Row>
              <Button
                type="button"
                className="btn-google d-flex justify-content-center align-items-center mt-4"
                onClick={() => handleClickGoogle()}
              >
                <img src={Google} width={24} height={24} alt="Google" />
                <span className="ml-2">Login</span>
              </Button>
              <p className="account mt-5 text-center">
                Don’t have an account? <Link to="/register">Sign Up</Link>
              </p>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
}
