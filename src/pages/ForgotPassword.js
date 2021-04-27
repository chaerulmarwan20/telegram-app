import React, { useState, useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

import Container from "../components/module/Container";
import Row from "../components/module/Row";
import Col from "../components/module/Col";
import Input from "../components/module/Input";

import Eye from "../assets/img/eye.png";
import Back from "../assets/img/back.png";

export default function ForgotPassword() {
  const Url = process.env.REACT_APP_API_URL;

  const useQuery = () => new URLSearchParams(useLocation().search);

  const query = useQuery();

  let email = query.get("email");
  let token = query.get("token");

  const history = useHistory();

  const [loading, setLoading] = useState(false);
  const [type, setType] = useState("password");
  const [typeConfirm, setTypeConfirm] = useState("password");
  const [showPassword, setShowPassword] = useState(false);
  const [dataEmail, setDataEmail] = useState({
    email: "",
  });
  const [data, setData] = useState({
    password: "",
    confirmPassword: "",
  });

  const handleClickBack = () => {
    history.push("/");
  };

  const handleChangeEmail = (event) => {
    const emailNew = { ...dataEmail };
    emailNew[event.target.name] = event.target.value;
    setDataEmail(emailNew);
  };

  const handleFormChange = (event) => {
    const dataNew = { ...data };
    dataNew[event.target.name] = event.target.value;
    setData(dataNew);
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

  const handleSend = (event) => {
    event.preventDefault();
    setLoading(true);
    axios
      .post(`${Url}/users/auth/forgot-password`, dataEmail)
      .then((res) => {
        setDataEmail({
          email: "",
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

  const handleReset = (event) => {
    event.preventDefault();
    axios
      .put(
        `${Url}/users/auth/reset-password/?email=${email}&token=${token}`,
        data
      )
      .then((res) => {
        setData({
          password: "",
          confirmPassword: "",
        });
        Swal.fire({
          title: "Success!",
          text: res.data.message,
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
            err.response.data.message ===
            `"confirmPassword" must be [ref:password]`
              ? "Password do not match"
              : err.response.data.message,
          icon: "error",
          confirmButtonText: "Ok",
          confirmButtonColor: "#7E98DF",
        });
      });
  };

  useEffect(() => {
    if (email !== null && token !== null) {
      setShowPassword(true);
    }
  }, [email, token]);

  return (
    <section className="auth py-5">
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
              <form>
                {showPassword === false && (
                  <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <Input
                      type="text"
                      name="email"
                      placeholder="Enter your e-mail"
                      value={dataEmail.email}
                      onChange={handleChangeEmail}
                    />
                  </div>
                )}
                {showPassword && (
                  <>
                    <div className="form-group password">
                      <label htmlFor="password">Password</label>
                      <Input
                        type={type}
                        name="password"
                        placeholder="Enter your new password"
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
                    <div className="form-group password">
                      <label htmlFor="confirmPassword">Confirm Password</label>
                      <Input
                        type={typeConfirm}
                        name="confirmPassword"
                        placeholder="Repeat your new password"
                        value={data.confirmPassword}
                        onChange={handleFormChange}
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
                  </>
                )}
              </form>
              <button
                type="button"
                className="btn btn-auth mt-4"
                onClick={showPassword === false ? handleSend : handleReset}
              >
                {showPassword === false
                  ? !loading
                    ? "Send"
                    : "Please wait..."
                  : "Reset Now"}
              </button>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
}
