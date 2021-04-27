import React, { useState, useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

import Container from "../components/module/Container";
import Row from "../components/module/Row";
import Col from "../components/module/Col";
import Input from "../components/module/Input";

import Eye from "../assets/img/eye.png";
import Google from "../assets/img/google.png";
import Back from "../assets/img/back.png";

export default function Register() {
  const Url = process.env.REACT_APP_API_URL;

  const useQuery = () => new URLSearchParams(useLocation().search);

  const query = useQuery();
  let email = query.get("email");
  let token = query.get("token");

  const history = useHistory();

  const [type, setType] = useState("password");
  const [loading, setLoading] = useState(false);
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
    setLoading(true);
    axios
      .post(`${Url}/users/`, data)
      .then((res) => {
        setData({
          name: "",
          email: "",
          password: "",
        });
        setLoading(false);
        Swal.fire({
          title: "Success!",
          text: res.data.message,
          icon: "success",
          confirmButtonText: "Ok",
          confirmButtonColor: "#7E98DF",
        });
      })
      .catch((err) => {
        setLoading(false);
        Swal.fire({
          title: "Error!",
          text: err.response.data.message,
          icon: "error",
          confirmButtonText: "Ok",
          confirmButtonColor: "#7E98DF",
        });
      });
  };

  useEffect(() => {
    if (email !== null && token !== null) {
      axios
        .get(`${Url}/users/auth/verify/?email=${email}&token=${token}`)
        .then((res) => {
          Swal.fire({
            title: "Success!",
            text: res.data.message,
            icon: "success",
            confirmButtonText: "Ok",
            confirmButtonColor: "#7E98DF",
          });
        })
        .catch((err) => {
          Swal.fire({
            title: "Error!",
            text: err.response.data.message,
            icon: "error",
            confirmButtonText: "Ok",
            confirmButtonColor: "#7E98DF",
          });
        });
    }
  }, [Url, email, token]);

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
