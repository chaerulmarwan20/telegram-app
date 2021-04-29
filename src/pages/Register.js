import React, { useState, useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
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
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleFormChange = (event) => {
    const dataNew = { ...data };
    dataNew[event.target.name] = event.target.value;
    setData(dataNew);
  };

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

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(signUp(data))
      .then((res) => {
        setData({
          name: "",
          email: "",
          password: "",
        });
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
              <form>
                <div className="form-group">
                  <label htmlFor="name">Name</label>
                  <Input
                    type="text"
                    name="name"
                    placeholder="Enter your name"
                    value={data.name}
                    onChange={handleFormChange}
                  />
                </div>
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
              <button
                type="button"
                className="btn btn-auth mt-4"
                onClick={handleSubmit}
              >
                {!loading ? "Register" : "Please wait..."}
              </button>
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
