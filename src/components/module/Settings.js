import React from "react";
import { Link, useHistory } from "react-router-dom";
import Swal from "sweetalert2";
import axiosApiInstance from "../../helpers/axios";

import UnionBlack from "../../assets/img/union-black.png";
import Lock from "../../assets/img/lock.png";
import Chart from "../../assets/img/data.png";
import ChatSetting from "../../assets/img/chat-setting.png";
import Device from "../../assets/img/device.png";

export default function Settings(props) {
  const history = useHistory();

  const Url = process.env.REACT_APP_API_URL;

  const socket = props.socket;

  const handleClickLogout = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You will exit from this page!",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes, logout!",
      confirmButtonColor: "#FF0000",
      cancelButtonText: "No, cancel!",
      cancelButtonColor: "#1EC15F",
      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed) {
        axiosApiInstance
          .delete(`${Url}/users/socket/${localStorage.getItem("id")}`)
          .then((res) => {
            socket.emit("initialLogout", localStorage.getItem("id"));
            localStorage.clear();
            Swal.fire({
              title: "Logout",
              text: "Successfully",
              icon: "success",
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
              text: err.message,
              icon: "error",
              confirmButtonText: "Ok",
              confirmButtonColor: "#7E98DF",
            });
          });
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire({
          title: "Logout",
          text: "Cancelled :)",
          icon: "info",
          confirmButtonColor: "#7E98DF",
        });
      }
    });
  };

  return (
    <>
      <p className="settings mt-3">Settings</p>
      <Link to="#" className="mt-2">
        <img src={UnionBlack} width={22} alt="Notification" className="mr-4" />
        Notification and Sounds
      </Link>
      <Link to="#">
        <img src={Lock} width={22} alt="Privacy" className="mr-4" />
        Privacy and Security
      </Link>
      <Link to="#">
        <img src={Chart} width={22} alt="Data" className="mr-4" />
        Data and Stronge
      </Link>
      <Link to="#">
        <img src={ChatSetting} width={22} alt="Chat" className="mr-4" />
        Chat settings
      </Link>
      <Link to="#">
        <img src={Device} width={22} alt="Device" className="mr-4" />
        Devices
      </Link>
      <Link to="#" className="text-center" onClick={() => handleClickLogout()}>
        Logout
      </Link>
    </>
  );
}
