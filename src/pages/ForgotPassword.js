import React, { useState, useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { activate, reset } from "../configs/redux/actions/user";
import Swal from "sweetalert2";

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
    dispatch(activate(dataEmail))
      .then((res) => {
        setDataEmail({
          email: "",
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

  const handleReset = (event) => {
    event.preventDefault();
    dispatch(reset(email, token, data))
      .then((res) => {
        setData({
          password: "",
          confirmPassword: "",
        });
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
  };

  useEffect(() => {
    if (email !== null && token !== null) {
      setShowPassword(true);
    }
  }, [email, token]);

  return (
    <HelmetProvider>
      <section className="auth py-5">
        <Helmet>
          <meta charSet="utf-8" />
          <title>Telegram App - Forgot Password</title>
        </Helmet>
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
                    <Input
                      type="text"
                      name="email"
                      placeholder="Enter your e-mail"
                      label="Email"
                      value={dataEmail.email}
                      onChange={handleChangeEmail}
                      isFormGroup
                    />
                  )}
                  {showPassword && (
                    <>
                      <Input
                        type={type}
                        name="password"
                        placeholder="Enter your password"
                        label="Password"
                        value={data.password}
                        onChange={handleFormChange}
                        classFormGroup="password"
                        alt="Eye"
                        classImg="eye-img"
                        onClick={handleToggle}
                        img={Eye}
                        isFormGroup
                      />
                      <Input
                        type={typeConfirm}
                        name="confirmPassword"
                        placeholder="Repeat your new password"
                        label="Confirm Password"
                        value={data.confirmPassword}
                        onChange={handleFormChange}
                        classFormGroup="password"
                        alt="Eye"
                        classImg="eye-img"
                        onClick={handleToggleConfirm}
                        img={Eye}
                        isFormGroup
                      />
                    </>
                  )}
                </form>
                <Button
                  type="button"
                  className="btn-auth mt-4"
                  onClick={showPassword === false ? handleSend : handleReset}
                >
                  {showPassword === false
                    ? !loading
                      ? "Send"
                      : "Please wait..."
                    : "Reset Now"}
                </Button>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </HelmetProvider>
  );
}
