import React from "react";
import { Link, useHistory } from "react-router-dom";
import Swal from "sweetalert2";

import UnionBlack from "../../assets/img/union-black.png";
import Lock from "../../assets/img/lock.png";
import Chart from "../../assets/img/data.png";
import ChatSetting from "../../assets/img/chat-setting.png";
import Device from "../../assets/img/device.png";

export default function Settings() {
  const history = useHistory();

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
        localStorage.clear();
        Swal.fire({
          title: "Logout",
          text: "Successfully.",
          icon: "success",
          confirmButtonColor: "#7E98DF",
        }).then((result) => {
          if (result.isConfirmed) {
            history.push("/");
          } else {
            history.push("/");
          }
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
