import React, { useState, useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";
import { signUp, verify } from "../configs/redux/actions/user";
import Swal from "sweetalert2";

import Container from "../components/module/Container";
import Row from "../components/module/Row";
import Col from "../components/module/Col";
import Input from "../components/module/Input";

import Eye from "../assets/img/eye.png";
import Google from "../assets/img/google.png";
import Back from "../assets/img/back.png";

export default function Register() {
  const useQuery = () => new URLSearchParams(useLocation().search);

  const query = useQuery();
  let email = query.get("email");
  let token = query.get("token");

  const history = useHistory();

  const dispatch = useDispatch();

  const { loading } = useSelector((state) => state.user);

  const [type, setType] = useState("password");

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().min(3, "Mininum 3 characters").required("Required!"),
      email: Yup.string().email("Invalid email format").required("Required!"),
      password: Yup.string()
        .min(8, "Minimum 8 characters")
        .required("Required!"),
    }),
    onSubmit: (values) => {
      dispatch(signUp(values))
        .then((res) => {
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

  useEffect(() => {
    if (email !== null && token !== null) {
      dispatch(verify(email, token))
        .then((res) => {
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
  }, [dispatch, email, token]);

  return (
    <section className="auth py-5">
      <Container>
        <Row>
          <Col className="col-12 d-flex justify-content-center align-items-center">
            <div className="card p-5">
              <img
                src={Back}
                alt="Back"
                width={10}
                className="back"
                onClick={() => {
                  handleClickBack();
                }}
              />
              <h1 className="text-center register">Register</h1>
              <p className="mt-1 mb-4">Let’s create your account!</p>
              <form onSubmit={formik.handleSubmit}>
                <div className={`form-group ${formik.errors.name && "mb-0"}`}>
                  <label htmlFor="name">Name</label>
                  <Input
                    type="text"
                    name="name"
                    placeholder="Enter your name"
                    className={`${formik.errors.name && "error"}`}
                    value={formik.values.name}
                    onChange={formik.handleChange}
                  />
                </div>
                {formik.errors.name && formik.touched.name && (
                  <small className="error">{formik.errors.name}</small>
                )}
                <div className={`form-group ${formik.errors.email && "mb-0"}`}>
                  <label htmlFor="email">Email</label>
                  <Input
                    type="text"
                    name="email"
                    placeholder="Enter your e-mail"
                    className={`${formik.errors.email && "error"}`}
                    value={formik.values.email}
                    onChange={formik.handleChange}
                  />
                </div>
                {formik.errors.email && formik.touched.email && (
                  <small className="error">{formik.errors.email}</small>
                )}
                <div
                  className={`form-group password ${
                    formik.errors.password && "mb-0"
                  }`}
                >
                  <label htmlFor="password">Password</label>
                  <Input
                    type={type}
                    name="password"
                    placeholder="Enter your password"
                    className={`${formik.errors.password && "error"}`}
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
                <button type="submit" className="btn btn-auth btn-block mt-4">
                  {!loading ? "Register" : "Please wait..."}
                </button>
              </form>
              <Row className="mt-4">
                <Col className="col-4">
                  <hr />
                </Col>
                <Col className="col-4">
                  <p className="with text-center">Register with</p>
                </Col>
                <Col className="col-4">
                  <hr />
                </Col>
              </Row>
              <button
                type="button"
                className="btn btn-google d-flex justify-content-center align-items-center mt-4"
              >
                <img src={Google} width={24} height={24} alt="Google" />
                <span className="ml-2">Register</span>
              </button>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
}
