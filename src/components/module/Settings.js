import React from "react";
import { Link } from "react-router-dom";

import UnionBlack from "../../assets/img/union-black.png";
import Lock from "../../assets/img/lock.png";
import Chart from "../../assets/img/data.png";
import ChatSetting from "../../assets/img/chat-setting.png";
import Device from "../../assets/img/device.png";

export default function Settings() {
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
    </>
  );
}
