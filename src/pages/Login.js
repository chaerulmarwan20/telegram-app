import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { login } from "../configs/redux/actions/user";
import Swal from "sweetalert2";

import Container from "../components/module/Container";
import Row from "../components/module/Row";
import Col from "../components/module/Col";
import Input from "../components/module/Input";

import Eye from "../assets/img/eye.png";
import Google from "../assets/img/google.png";

export default function Login() {
  const history = useHistory();

  const dispatch = useDispatch();

  const [type, setType] = useState("password");
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const handleToggle = () => {
    if (type === "text") {
      setType("password");
    } else {
      setType("text");
    }
  };

  const handleFormChange = (event) => {
    const dataNew = { ...data };
    dataNew[event.target.name] = event.target.value;
    setData(dataNew);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(login(data))
      .then((res) => {
        setData({
          email: "",
          password: "",
        });
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
    <HelmetProvider>
      <section className="auth py-5">
        <Helmet>
          <meta charSet="utf-8" />
          <title>Telegram App - Login</title>
        </Helmet>
        <Container>
          <Row>
            <Col className="col-12 d-flex justify-content-center align-items-center">
              <div className="card p-5">
                <h1 className="text-center">Login</h1>
                <p className="my-4">Hi, Welcome back!</p>
                <form>
                  <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <Input
                      type="text"
                      name="email"
                      placeholder="Enter your e-mail"
                      value={data.email}
                      onChange={handleFormChange}
                    />
                  </div>
                  <div className="form-group password">
                    <label htmlFor="password">Password</label>
                    <Input
                      type={type}
                      name="password"
                      placeholder="Enter your password"
                      value={data.password}
                      onChange={handleFormChange}
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
                </form>
                <Link to="/forgot-password" className="forgot text-right my-4">
                  Forgot password?
                </Link>
                <button
                  type="button"
                  className="btn btn-auth mt-2"
                  onClick={handleSubmit}
                >
                  Login
                </button>
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
                <button
                  type="button"
                  className="btn btn-google d-flex justify-content-center align-items-center mt-4"
                  onClick={() => handleClickGoogle()}
                >
                  <img src={Google} width={24} height={24} alt="Google" />
                  <span className="ml-2">Login</span>
                </button>
                <p className="account mt-5 text-center">
                  Don’t have an account? <Link to="/register">Sign Up</Link>
                </p>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </HelmetProvider>
  );
}
